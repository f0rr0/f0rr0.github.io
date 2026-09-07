ALTER TABLE "github_work_unit_summary_attempts" DROP CONSTRAINT "gh_work_unit_summary_attempts_unit_fk";
--> statement-breakpoint
ALTER TABLE "github_work_unit_summary_attempts" ADD COLUMN "identity_key" varchar(180);--> statement-breakpoint
ALTER TABLE "github_work_unit_summary_attempts" ADD COLUMN "repository_id" varchar(32);--> statement-breakpoint
ALTER TABLE "github_work_unit_summary_attempts" ADD COLUMN "request_started_at" timestamp with time zone[] DEFAULT ARRAY[]::timestamptz[] NOT NULL;--> statement-breakpoint
CREATE INDEX "gh_work_unit_summary_attempts_identity_idx" ON "github_work_unit_summary_attempts" USING btree ("identity_key");--> statement-breakpoint
UPDATE github_work_unit_summary_attempts a
SET identity_key = w.identity_key, repository_id = w.repository_id,
    request_started_at = CASE a.started_requests
      WHEN 0 THEN ARRAY[]::timestamptz[]
      WHEN 1 THEN ARRAY[a.last_started_at]
      ELSE ARRAY[NULL::timestamptz, a.last_started_at]
    END
FROM github_work_units w WHERE w.id = a.work_unit_id;
--> statement-breakpoint
ALTER TABLE github_work_unit_summary_attempts ALTER COLUMN identity_key SET NOT NULL;
--> statement-breakpoint
ALTER TABLE github_work_unit_summary_attempts ALTER COLUMN repository_id SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "github_work_unit_summary_attempts" ADD CONSTRAINT "gh_work_unit_summary_request_times" CHECK (cardinality("github_work_unit_summary_attempts"."request_started_at") = "github_work_unit_summary_attempts"."started_requests");
--> statement-breakpoint
-- Migrations precede application rollout. Old workers omit the new identity
-- columns; recording starts here keeps both worker versions auditable.
CREATE FUNCTION record_github_summary_attempt() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' AND (NEW.identity_key IS NULL OR NEW.repository_id IS NULL) THEN
    SELECT identity_key, repository_id INTO NEW.identity_key, NEW.repository_id
    FROM github_work_units WHERE id = NEW.work_unit_id;
  END IF;
  IF TG_OP = 'UPDATE' AND NEW.started_requests = OLD.started_requests + 1 THEN
    NEW.request_started_at := array_append(OLD.request_started_at, NEW.last_started_at);
  END IF;
  RETURN NEW;
END;
$$;
--> statement-breakpoint
CREATE TRIGGER record_github_summary_attempt
BEFORE INSERT OR UPDATE ON github_work_unit_summary_attempts
FOR EACH ROW EXECUTE FUNCTION record_github_summary_attempt();
