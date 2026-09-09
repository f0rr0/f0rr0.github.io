ALTER TABLE "github_account_checkpoints" DROP CONSTRAINT "github_account_checkpoints_tracked_account";--> statement-breakpoint
ALTER TABLE "github_commits" DROP CONSTRAINT "github_commits_tracked_author";--> statement-breakpoint
ALTER TABLE "github_issues" DROP CONSTRAINT "github_issues_tracked_account";--> statement-breakpoint
ALTER TABLE "github_pull_request_signals" DROP CONSTRAINT "github_pull_request_signals_account";--> statement-breakpoint
ALTER TABLE "github_pull_requests" DROP CONSTRAINT "github_pull_requests_tracked_account";--> statement-breakpoint
ALTER TABLE "github_push_observations" DROP CONSTRAINT "github_push_observations_tracked_account";--> statement-breakpoint
ALTER TABLE "github_webhook_deliveries" DROP CONSTRAINT "github_webhook_deliveries_tracked_account";--> statement-breakpoint
ALTER TABLE "github_account_checkpoints" ADD CONSTRAINT "github_account_checkpoints_tracked_account" CHECK ("github_account_checkpoints"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_commits" ADD CONSTRAINT "github_commits_tracked_author" CHECK ("github_commits"."author_login" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_issues" ADD CONSTRAINT "github_issues_tracked_account" CHECK ("github_issues"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_pull_request_signals" ADD CONSTRAINT "github_pull_request_signals_account" CHECK ("github_pull_request_signals"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_pull_requests" ADD CONSTRAINT "github_pull_requests_tracked_account" CHECK ("github_pull_requests"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_push_observations" ADD CONSTRAINT "github_push_observations_tracked_account" CHECK ("github_push_observations"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');--> statement-breakpoint
ALTER TABLE "github_webhook_deliveries" ADD CONSTRAINT "github_webhook_deliveries_tracked_account" CHECK ("github_webhook_deliveries"."account" IS NULL OR "github_webhook_deliveries"."account" ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$');
