import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  setDefaultTimeout,
  test,
} from "bun:test";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import type * as DatabaseClient from "../src/db/client.ts";
import type * as GithubWorkUnitSummaryStore from "../src/lib/github-work-unit-summary-store.ts";
import { env } from "./helpers.ts";

setDefaultTimeout(30_000);

const dockerAvailable =
  Bun.spawnSync(["docker", "info"], {
    stderr: "ignore",
    stdout: "ignore",
  }).exitCode === 0;
const migrationsFolder = new URL("../drizzle", import.meta.url).pathname;
const postgresImage = "postgres:17-alpine";
const postgresPassword = "github-work-unit-summary-store-test";
const repositoryId = "9901";
const recipe = "github-work-unit-outcome-v2";
const digest = (character: string) => character.repeat(64);
const instant = (value: Date | null | undefined) =>
  value?.toISOString() ?? null;

const checkedOutput = (
  result: Bun.SyncSubprocess<"pipe", "pipe">,
  operation: string
) => {
  if (result.exitCode !== 0) {
    throw new Error(
      `${operation} failed: ${result.stderr.toString("utf-8").trim()}`
    );
  }
  return result.stdout.toString("utf-8").trim();
};

const providerResult = (outcome: string) => ({
  inputTokens: 41,
  latencyMs: 17,
  model: "gpt-5.4-nano-2026-03-17" as const,
  outcome,
  outputTokens: 12,
});

describe.skipIf(!dockerAvailable)("GitHub work-unit summary store", () => {
  let admin: ReturnType<typeof postgres>;
  let claimGitHubWorkUnitSummary: (typeof GithubWorkUnitSummaryStore)["claimGitHubWorkUnitSummary"];
  let closeDatabase: (typeof DatabaseClient)["closeDatabase"];
  let completeGitHubWorkUnitSummary: (typeof GithubWorkUnitSummaryStore)["completeGitHubWorkUnitSummary"];
  let containerId: string | undefined;
  let deferGitHubWorkUnitSummary: (typeof GithubWorkUnitSummaryStore)["deferGitHubWorkUnitSummary"];
  let originalDatabaseUrl: string | undefined;
  let originalOpenAiApiKey: string | undefined;
  let reconcileGitHubWorkUnitSummaryStatus: (typeof GithubWorkUnitSummaryStore)["reconcileGitHubWorkUnitSummaryStatus"];
  let sequence = 0;
  let terminalGitHubWorkUnitSummary: (typeof GithubWorkUnitSummaryStore)["terminalGitHubWorkUnitSummary"];

  const seedUnit = async ({
    activityAt,
    attemptRevision = 1,
    contentObservedAt = activityAt,
    debounceUntil,
    lastStartedAt = null,
    leaseToken = null,
    leaseUntil = null,
    outcomeDigest,
    requestPayload,
    startedRequests = 0,
    state = "pending",
    summaryEvaluationDigest = digest("e"),
    summaryEvaluatedDigest = summaryEvaluationDigest,
    summaryInputDigest = digest("b"),
    workUnitRevision = 1,
  }: {
    activityAt: Date;
    attemptRevision?: number;
    contentObservedAt?: Date;
    debounceUntil: Date;
    lastStartedAt?: Date | null;
    leaseToken?: string | null;
    leaseUntil?: Date | null;
    outcomeDigest?: string;
    requestPayload?: string;
    startedRequests?: number;
    state?: string;
    summaryEvaluationDigest?: string | null;
    summaryEvaluatedDigest?: string | null;
    summaryInputDigest?: string | null;
    workUnitRevision?: number;
  }) => {
    sequence += 1;
    const suffix = String(sequence).padStart(12, "0");
    const workUnitId = `00000000-0000-4000-8000-${suffix}`;
    const branchLineageId = `10000000-0000-4000-8000-${suffix}`;
    const sha = sequence.toString(16).padStart(40, "0");
    const unitOutcomeDigest = outcomeDigest ?? sha.padStart(64, "0");
    const activityDay = activityAt.toISOString().slice(0, 10);
    const payload = requestPayload ?? JSON.stringify({ unit: sequence });
    await admin`
      insert into github_commits (
        author_login, committed_at, message, repository_id, sha
      ) values (
        'f0rr0', ${instant(activityAt)}, ${`summary store ${String(sequence)}`},
        ${repositoryId}, ${sha}
      )
    `;
    await admin`
      insert into github_work_units (
        activity_anchor_at, activity_at, activity_day, additions,
        attribution_mode, branch_lineage_id, content_observed_at, deletions,
        facts_digest, file_count, first_activity_at, id, identity_key, kind,
        last_activity_at, member_count, membership_digest,
        newest_commit_repository_id, newest_commit_sha, outcome_digest,
        repository_id, revision, summary_evaluated_digest,
        summary_evaluation_digest, summary_input_digest, visibility
      ) values (
        ${instant(activityAt)}, ${instant(activityAt)}, ${activityDay}, 3,
        'branch_owned_composite', ${branchLineageId}, ${instant(contentObservedAt)}, 1,
        ${digest("c")}, 1, ${instant(activityAt)}, ${workUnitId},
        ${`branch:${branchLineageId}`}, 'branch', ${instant(activityAt)}, 1,
        ${digest("d")}, ${repositoryId}, ${sha}, ${unitOutcomeDigest},
        ${repositoryId}, ${workUnitRevision}, ${summaryEvaluatedDigest},
        ${summaryEvaluationDigest}, ${summaryInputDigest}, 'public'
      )
    `;
    await admin`
      insert into github_work_unit_summary_attempts (
        attribution_mode, created_at, debounce_until, input_tokens,
        last_started_at, lease_token, lease_until, outcome_digest, recipe, request_started_at,
        request_payload, revision, started_requests, state,
        summary_input_digest, work_unit_id, identity_key, repository_id
      ) values (
        'branch_owned_composite', ${instant(contentObservedAt)},
        ${instant(debounceUntil)}, 37, ${instant(lastStartedAt)}, ${leaseToken},
        ${instant(leaseUntil)}, ${unitOutcomeDigest},
        ${recipe}, case when ${startedRequests} = 0 then ARRAY[]::timestamptz[] when ${startedRequests} = 1 then ARRAY[${instant(lastStartedAt)}::timestamptz] else ARRAY[null, ${instant(lastStartedAt)}::timestamptz] end,
        ${payload}, ${attemptRevision}, ${startedRequests}, ${state},
        ${summaryInputDigest}, ${workUnitId}, ${`branch:${branchLineageId}`}, ${repositoryId}
      )
    `;
    return {
      identityKey: `branch:${branchLineageId}`,
      outcomeDigest: unitOutcomeDigest,
      payload,
      revision: attemptRevision,
      workUnitId,
    };
  };

  const readAttempt = async (unit: Awaited<ReturnType<typeof seedUnit>>) => {
    const [row] = await admin`
      select * from github_work_unit_summary_attempts
      where work_unit_id = ${unit.workUnitId}
        and revision = ${unit.revision}
    `;
    return row;
  };

  const readHead = async () => {
    const [row] = await admin`select * from github_public_feed_head where id`;
    return row;
  };

  const readUsage = async () =>
    await admin`
      select day::text, started_requests
      from github_work_unit_summary_daily_usage
      order by day
    `;

  const seedUsage = async (
    rows: { day: string; startedRequests: number }[]
  ) => {
    for (const row of rows) {
      await admin`
        insert into github_work_unit_summary_daily_usage (
          day, started_requests
        ) values (${row.day}, ${row.startedRequests})
      `;
    }
  };

  beforeAll(async () => {
    originalDatabaseUrl = env.DATABASE_URL;
    originalOpenAiApiKey = env.OPENAI_API_KEY;
    env.OPENAI_API_KEY = "summary-status-test-key";
    const started = Bun.spawnSync([
      "docker",
      "run",
      "--detach",
      "--rm",
      "--publish",
      "127.0.0.1::5432",
      "--env",
      `POSTGRES_PASSWORD=${postgresPassword}`,
      "--env",
      "POSTGRES_DB=github_work_unit_summary_store_test",
      postgresImage,
    ]);
    containerId = checkedOutput(started, "Starting ephemeral PostgreSQL");
    const publishedPort = checkedOutput(
      Bun.spawnSync(["docker", "port", containerId, "5432/tcp"]),
      "Resolving ephemeral PostgreSQL port"
    );
    const port = /:(\d+)$/u.exec(publishedPort)?.[1];
    if (port === undefined) {
      throw new Error("Docker returned an invalid PostgreSQL port.");
    }
    const databaseUrl = `postgresql://postgres:${postgresPassword}@127.0.0.1:${port}/github_work_unit_summary_store_test`;
    let ready = false;
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const probe = postgres(databaseUrl, {
        connect_timeout: 1,
        max: 1,
        prepare: false,
      });
      try {
        await probe`select 1`;
        await probe.end({ timeout: 1 });
        ready = true;
        break;
      } catch {
        await probe.end({ timeout: 1 }).catch(() => null);
        await delay(100);
      }
    }
    if (!ready) {
      throw new Error("Ephemeral PostgreSQL did not become ready.");
    }
    admin = postgres(databaseUrl, {
      max: 1,
      prepare: false,
    });
    await migrate(drizzle({ client: admin }), { migrationsFolder });
    env.DATABASE_URL = databaseUrl;
    ({ closeDatabase } = await import("../src/db/client.ts"));
    ({
      claimGitHubWorkUnitSummary,
      completeGitHubWorkUnitSummary,
      deferGitHubWorkUnitSummary,
      reconcileGitHubWorkUnitSummaryStatus,
      terminalGitHubWorkUnitSummary,
    } = await import("../src/lib/github-work-unit-summary-store.ts"));
    await admin`
      insert into github_repositories (
        facts_verified_at, full_name, id, visibility
      ) values (
        '2026-09-01T00:00:00Z', 'f0rr0/summary-store-test',
        ${repositoryId}, 'public'
      )
    `;
  });

  beforeEach(async () => {
    await admin`delete from github_work_unit_summary_attempts`;
    await admin`delete from github_work_unit_accepted_summaries`;
    await admin`delete from github_work_unit_summary_daily_usage`;
    await admin`delete from github_work_units`;
    await admin`delete from github_issues`;
    await admin`delete from github_commits where repository_id = ${repositoryId}`;
    await admin`
      update github_repositories set visibility = 'public'
      where id = ${repositoryId}
    `;
    await admin`
      update github_public_feed_head
      set feed_revision = 0, head_content_revision = 0,
          last_published_at = null, ordering_revision = 0, summarizing = false
      where id
    `;
  });

  afterAll(async () => {
    await closeDatabase?.();
    await admin?.end({ timeout: 1 });
    if (originalDatabaseUrl === undefined) {
      delete env.DATABASE_URL;
    } else {
      env.DATABASE_URL = originalDatabaseUrl;
    }
    if (originalOpenAiApiKey === undefined) {
      delete env.OPENAI_API_KEY;
    } else {
      env.OPENAI_API_KEY = originalOpenAiApiKey;
    }
    if (containerId !== undefined) {
      Bun.spawnSync(["docker", "stop", "--time", "1", containerId], {
        stderr: "ignore",
        stdout: "ignore",
      });
    }
  });

  const seedAcceptedSummary = async (
    unit: Awaited<ReturnType<typeof seedUnit>>,
    acceptedAt: Date,
    outcomeDigest = unit.outcomeDigest
  ) => {
    await admin`
      insert into github_work_unit_accepted_summaries (
        accepted_at, attribution_mode, identity_key, outcome, outcome_digest,
        recipe, repository_id, summary_input_digest
      ) values (
        ${instant(acceptedAt)}, 'branch_owned_composite', ${unit.identityKey},
        ${JSON.stringify({ headline: "Valid cached outcome", summary: "The accepted summary describes the same authored changes." })},
        ${outcomeDigest}, ${recipe}, ${repositoryId}, ${digest("f")}
      )
    `;
  };

  test("reuses unchanged outcomes for free even when the daily budget is exhausted", async () => {
    const now = new Date("2026-09-01T12:00:00Z");
    const unit = await seedUnit({
      activityAt: now,
      debounceUntil: new Date("2026-09-01T13:00:00Z"),
    });
    await seedAcceptedSummary(unit, new Date("2026-08-31T12:00:00Z"));
    await seedUsage([{ day: "2026-09-01", startedRequests: 100 }]);
    expect(await claimGitHubWorkUnitSummary({ now })).toBeNull();
    expect(await readAttempt(unit)).toMatchObject({
      state: "accepted",
      started_requests: 0,
      request_payload: null,
      lease_token: null,
    });
    expect([...(await readUsage())]).toEqual([
      { day: "2026-09-01", started_requests: 100 },
    ]);
    expect(await readHead()).toMatchObject({ summarizing: false });
  });

  test("serves missing summaries newest first before refreshing existing prose", async () => {
    const now = new Date("2026-09-01T12:00:00Z");
    const refresh = await seedUnit({
      activityAt: new Date("2026-09-01T11:00:00Z"),
      debounceUntil: now,
    });
    await seedAcceptedSummary(
      refresh,
      new Date("2026-08-31T12:00:00Z"),
      digest("c")
    );
    const newer = await seedUnit({
      activityAt: new Date("2026-09-01T10:00:00Z"),
      debounceUntil: now,
    });
    const older = await seedUnit({
      activityAt: new Date("2026-08-31T10:00:00Z"),
      debounceUntil: now,
    });
    for (const expected of [newer, older, refresh]) {
      const claim = await claimGitHubWorkUnitSummary({ now });
      assert.ok(claim);
      expect(claim.workUnitId).toBe(expected.workUnitId);
      await terminalGitHubWorkUnitSummary(claim, now);
    }
  });

  test("retains paid history and accepts an in-flight result after projection deletion", async () => {
    const now = new Date("2026-09-01T12:00:00Z");
    const unit = await seedUnit({ activityAt: now, debounceUntil: now });
    const claim = await claimGitHubWorkUnitSummary({ now });
    assert.ok(claim);
    await admin`delete from github_work_units where id = ${unit.workUnitId}`;
    expect(
      await completeGitHubWorkUnitSummary(
        claim,
        providerResult("Retained authored work."),
        now
      )
    ).toEqual({ accepted: true });
    expect(await readAttempt(unit)).toMatchObject({
      state: "accepted",
      started_requests: 1,
      identity_key: unit.identityKey,
    });
    const [cached] =
      await admin`select identity_key from github_work_unit_accepted_summaries where identity_key = ${unit.identityKey}`;
    expect(cached.identity_key).toBe(unit.identityKey);
    expect([...(await readUsage())]).toEqual([
      { day: "2026-09-01", started_requests: 1 },
    ]);
  });

  test("shows active work at the cap only while a provider claim is still running", async () => {
    const now = new Date("2026-09-01T12:00:00Z");
    await seedUnit({ activityAt: now, debounceUntil: now });
    await seedUnit({ activityAt: now, debounceUntil: now });
    await seedUsage([{ day: "2026-09-01", startedRequests: 99 }]);
    const claim = await claimGitHubWorkUnitSummary({ now });
    assert.ok(claim);
    expect(await readHead()).toMatchObject({ summarizing: true });
    await terminalGitHubWorkUnitSummary(claim, now);
    expect(await readHead()).toMatchObject({ summarizing: false });
    expect(await claimGitHubWorkUnitSummary({ now })).toBeNull();
  });

  test("records each paid start across a UTC-day boundary", async () => {
    const first = new Date("2026-09-01T23:50:00Z");
    const second = new Date("2026-09-02T00:10:00Z");
    const unit = await seedUnit({ activityAt: first, debounceUntil: first });
    const claim = await claimGitHubWorkUnitSummary({ now: first });
    assert.ok(claim);
    await deferGitHubWorkUnitSummary(claim, second, first, "TimeoutError");
    const retry = await claimGitHubWorkUnitSummary({ now: second });
    assert.ok(retry);
    await terminalGitHubWorkUnitSummary(retry, second, "output_html");
    await admin`delete from github_work_units where id = ${unit.workUnitId}`;
    const starts =
      await admin`select started::date::text as day, count(*)::integer as started_requests from github_work_unit_summary_attempts, unnest(request_started_at) started group by started::date order by day`;
    expect([...starts]).toEqual([...(await readUsage())]);
    expect([...starts]).toEqual([
      { day: "2026-09-01", started_requests: 1 },
      { day: "2026-09-02", started_requests: 1 },
    ]);
  });

  test("paces historical work while keeping remaining daily capacity available to recent work", async () => {
    const midnight = new Date("2026-09-01T00:00:00Z");
    await seedUnit({
      activityAt: new Date("2026-08-28T12:00:00Z"),
      debounceUntil: midnight,
    });
    await seedUnit({
      activityAt: new Date("2026-08-29T12:00:00Z"),
      debounceUntil: midnight,
    });
    expect(await claimGitHubWorkUnitSummary({ now: midnight })).toBeNull();
    await seedUsage([{ day: "2026-09-01", startedRequests: 49 }]);
    const noon = new Date("2026-09-01T12:00:00Z");
    const historical = await claimGitHubWorkUnitSummary({ now: noon });
    assert.ok(historical);
    await terminalGitHubWorkUnitSummary(historical, noon);
    expect(await claimGitHubWorkUnitSummary({ now: noon })).toBeNull();
    const recent = await seedUnit({ activityAt: noon, debounceUntil: noon });
    expect(await claimGitHubWorkUnitSummary({ now: noon })).toMatchObject({
      workUnitId: recent.workUnitId,
    });
    expect([...(await readUsage())]).toEqual([
      { day: "2026-09-01", started_requests: 51 },
    ]);
  });

  test("claims current work by newest activity then newest content", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const stale = await seedUnit({
      activityAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    await admin`
      update github_work_units
      set summary_input_digest = ${digest("e")}
      where id = ${stale.workUnitId}
    `;
    const newest = await seedUnit({
      activityAt: new Date("2026-08-31T10:00:00.000Z"),
      contentObservedAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const older = await seedUnit({
      activityAt: new Date("2026-08-31T10:00:00.000Z"),
      contentObservedAt: new Date("2026-09-01T10:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const historical = await seedUnit({
      activityAt: new Date("2026-07-01T10:00:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });

    const first = await claimGitHubWorkUnitSummary({ now });
    expect(first).toMatchObject({
      revision: newest.revision,
      serializedInput: newest.payload,
      startedRequests: 1,
      workUnitId: newest.workUnitId,
    });
    expect(await readAttempt(newest)).toMatchObject({
      request_payload: newest.payload,
      started_requests: 1,
      state: "processing",
    });
    assert.ok(first);
    expect(await terminalGitHubWorkUnitSummary(first, now)).toBe(true);

    const second = await claimGitHubWorkUnitSummary({ now });
    expect(second).toMatchObject({
      serializedInput: older.payload,
      workUnitId: older.workUnitId,
    });
    assert.ok(second);
    expect(await terminalGitHubWorkUnitSummary(second, now)).toBe(true);

    const third = await claimGitHubWorkUnitSummary({ now });
    expect(third).toMatchObject({ workUnitId: historical.workUnitId });
    expect(await readAttempt(stale)).toBeUndefined();
  });

  test("claims a current payload after its repository becomes private", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const unit = await seedUnit({
      activityAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    await admin`
      update github_repositories set visibility = 'private'
      where id = ${repositoryId}
    `;
    await admin`
      update github_work_units set visibility = 'private'
      where id = ${unit.workUnitId}
    `;

    expect(await claimGitHubWorkUnitSummary({ now })).toMatchObject({
      workUnitId: unit.workUnitId,
    });
    expect(await readAttempt(unit)).toMatchObject({ state: "processing" });
  });

  test("accepts completed output after a unit becomes private", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const unit = await seedUnit({
      activityAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const claim = await claimGitHubWorkUnitSummary({ now });
    await admin`
      update github_repositories set visibility = 'private'
      where id = ${repositoryId}
    `;
    await admin`
      update github_work_units set visibility = 'private'
      where id = ${unit.workUnitId}
    `;

    assert.ok(claim);
    expect(
      await completeGitHubWorkUnitSummary(
        claim,
        providerResult("Summarized private repository work."),
        now
      )
    ).toEqual({ accepted: true });
    expect(await readAttempt(unit)).toMatchObject({
      outcome: "Summarized private repository work.",
      request_payload: null,
      state: "accepted",
    });
  });

  test("retains retry payloads after a unit becomes private", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const unit = await seedUnit({
      activityAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const claim = await claimGitHubWorkUnitSummary({ now });
    await admin`
      update github_repositories set visibility = 'private'
      where id = ${repositoryId}
    `;
    await admin`
      update github_work_units set visibility = 'private'
      where id = ${unit.workUnitId}
    `;

    assert.ok(claim);
    expect(
      await deferGitHubWorkUnitSummary(
        claim,
        new Date("2026-09-01T13:00:00.000Z"),
        now
      )
    ).toBe("deferred");
    expect(await readAttempt(unit)).toMatchObject({
      request_payload: unit.payload,
      state: "retryable",
    });
  });

  test("compacts a superseded input without resetting its retry budget", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const unit = await seedUnit({
      activityAt: new Date("2026-09-01T11:30:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const claim = await claimGitHubWorkUnitSummary({ now });
    await admin`
      update github_work_units
      set summary_evaluation_digest = ${digest("f")}
      where id = ${unit.workUnitId}
    `;

    assert.ok(claim);
    expect(
      await deferGitHubWorkUnitSummary(
        claim,
        new Date("2026-09-01T13:00:00.000Z"),
        now
      )
    ).toBe("stale");
    expect(await readAttempt(unit)).toMatchObject({
      request_payload: null,
      started_requests: 1,
      state: "retryable",
    });
  });

  test("serializes concurrent claims at the configured UTC-day cap", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    await seedUsage([{ day: "2026-09-01", startedRequests: 99 }]);
    for (const hour of [11, 10, 9]) {
      await seedUnit({
        activityAt: new Date(
          `2026-09-01T${String(hour).padStart(2, "0")}:00:00.000Z`
        ),
        debounceUntil: new Date("2026-09-01T08:00:00.000Z"),
      });
    }

    const claims = await Promise.all([
      claimGitHubWorkUnitSummary({ now }),
      claimGitHubWorkUnitSummary({ now }),
      claimGitHubWorkUnitSummary({ now }),
    ]);
    expect(claims.filter((claim) => claim !== null)).toHaveLength(1);
    expect([...(await readUsage())]).toEqual([
      { day: "2026-09-01", started_requests: 100 },
    ]);
    const [states] = await admin`
      select
        count(*) filter (where state = 'pending')::integer as pending,
        count(*) filter (where state = 'processing')::integer as processing
      from github_work_unit_summary_attempts
    `;
    expect(states).toEqual({ pending: 2, processing: 1 });
  });

  test("stops at the 3000-request UTC-month boundary", async () => {
    const now = new Date("2026-09-30T12:00:00.000Z");
    await seedUsage([
      ...Array.from({ length: 29 }, (_, index) => ({
        day: `2026-09-${String(index + 1).padStart(2, "0")}`,
        startedRequests: 100,
      })),
      { day: "2026-09-30", startedRequests: 99 },
    ]);
    await seedUnit({
      activityAt: new Date("2026-09-30T11:00:00.000Z"),
      debounceUntil: new Date("2026-09-30T10:00:00.000Z"),
    });
    await seedUnit({
      activityAt: new Date("2026-09-30T10:00:00.000Z"),
      debounceUntil: new Date("2026-09-30T10:00:00.000Z"),
    });

    expect(await claimGitHubWorkUnitSummary({ now })).not.toBeNull();
    expect(await claimGitHubWorkUnitSummary({ now })).toBeNull();
    const [usage] = await admin`
      select sum(started_requests)::integer as monthly
      from github_work_unit_summary_daily_usage
      where day >= '2026-09-01' and day < '2026-10-01'
    `;
    expect(usage).toEqual({ monthly: 3000 });
  });

  test("recovers expired leases once and settles facts-only at two starts", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const exhausted = await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-31T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-01T10:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000001",
      leaseUntil: new Date("2026-09-01T11:00:00.000Z"),
      startedRequests: 2,
      state: "processing",
    });
    const recoverable = await seedUnit({
      activityAt: new Date("2026-08-30T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-30T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-01T10:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000002",
      leaseUntil: new Date("2026-09-01T11:00:00.000Z"),
      startedRequests: 1,
      state: "processing",
    });

    const claim = await claimGitHubWorkUnitSummary({ now });
    expect(claim).toMatchObject({
      startedRequests: 2,
      workUnitId: recoverable.workUnitId,
    });
    const exhaustedAttempt = await readAttempt(exhausted);
    expect(exhaustedAttempt).toMatchObject({
      request_payload: null,
      state: "terminal",
    });
    expect(new Date(exhaustedAttempt.completed_at).getTime()).toBe(
      now.getTime()
    );
    assert.ok(claim);
    expect(
      await deferGitHubWorkUnitSummary(
        claim,
        new Date("2026-09-01T13:00:00.000Z"),
        now
      )
    ).toBe("terminal");
    const recoverableAttempt = await readAttempt(recoverable);
    expect(recoverableAttempt).toMatchObject({
      request_payload: null,
      started_requests: 2,
      state: "terminal",
    });
    expect(new Date(recoverableAttempt.completed_at).getTime()).toBe(
      now.getTime()
    );
    expect(await claimGitHubWorkUnitSummary({ now })).toBeNull();
  });

  test("presents queued initial-page work regardless of age", async () => {
    const now = new Date("2026-09-06T12:00:00.000Z");
    await seedUnit({
      activityAt: new Date("2026-07-01T10:00:00.000Z"),
      debounceUntil: new Date("2026-09-06T10:00:00.000Z"),
      lastStartedAt: new Date("2026-09-06T11:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000010",
      leaseUntil: new Date("2026-09-06T13:00:00.000Z"),
      startedRequests: 1,
      state: "processing",
    });

    expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(true);
    expect(await readHead()).toMatchObject({
      head_content_revision: "1",
      summarizing: true,
    });

    delete env.OPENAI_API_KEY;
    try {
      expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(false);
    } finally {
      env.OPENAI_API_KEY = "summary-status-test-key";
    }
  });

  test("presents an initial-page reevaluation before its input is built", async () => {
    const now = new Date("2026-09-06T12:00:00.000Z");
    const unit = await seedUnit({
      activityAt: new Date("2026-09-06T10:00:00.000Z"),
      debounceUntil: new Date("2026-09-06T13:00:00.000Z"),
      summaryEvaluatedDigest: digest("f"),
    });
    await admin`
      delete from github_work_unit_summary_attempts
      where work_unit_id = ${unit.workUnitId}
    `;

    expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(true);
    expect(await readHead()).toMatchObject({
      head_content_revision: "1",
      summarizing: true,
    });
  });

  test("includes private issue days when tracking initial-page work", async () => {
    const now = new Date("2026-09-06T12:00:00.000Z");
    const revokedRepositoryId = "999001";
    await admin`
      insert into github_repositories (
        facts_verified_at, full_name, id, visibility
      ) values (
        '2026-09-01T00:00:00Z', 'private/revoked-summary-test',
        ${revokedRepositoryId}, 'private'
      ) on conflict (id) do update set visibility = 'private'
    `;
    for (const day of [1, 2, 3, 4, 5]) {
      await admin`
        insert into github_issues (
          account, author_user_id, created_at, node_id, number,
          repository_id, title_snapshot, url_snapshot
        ) values (
          'f0rr0', '8574219',
          ${`2026-09-0${String(day)}T12:00:00.000Z`},
          ${`ISSUE_revoked_summary_${String(day)}`}, ${day},
          ${revokedRepositoryId}, 'Revoked private issue',
          ${`https://github.com/private/revoked-summary-test/issues/${String(day)}`}
        )
      `;
    }
    await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-31T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-06T11:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000099",
      leaseUntil: new Date("2026-09-06T13:00:00.000Z"),
      startedRequests: 1,
      state: "processing",
    });

    expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(false);
    expect(await readHead()).toMatchObject({ summarizing: false });
  });

  test("keeps one active transition while another current summary settles", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    await seedUnit({
      activityAt: new Date("2026-08-30T12:00:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });

    const first = await claimGitHubWorkUnitSummary({ now });
    const second = await claimGitHubWorkUnitSummary({ now });
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(await readHead()).toMatchObject({
      head_content_revision: "1",
      summarizing: true,
    });

    assert.ok(first);
    expect(
      await completeGitHubWorkUnitSummary(
        first,
        providerResult("Builds one coherent public outcome."),
        now
      )
    ).toEqual({ accepted: true });
    expect(await readHead()).toMatchObject({
      feed_revision: "1",
      head_content_revision: "2",
      summarizing: true,
    });

    assert.ok(second);
    expect(
      await deferGitHubWorkUnitSummary(
        second,
        new Date("2026-09-01T13:00:00.000Z"),
        now
      )
    ).toBe("deferred");
    expect(await readHead()).toMatchObject({
      feed_revision: "1",
      head_content_revision: "2",
      summarizing: true,
    });
  });

  test("reconciles expired leases exactly once", async () => {
    const beforeExpiry = new Date("2026-09-01T12:00:00.000Z");
    const retryable = await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-31T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-01T11:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000011",
      leaseUntil: new Date("2026-09-01T12:30:00.000Z"),
      startedRequests: 1,
      state: "processing",
    });
    const exhausted = await seedUnit({
      activityAt: new Date("2026-08-30T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-30T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-01T11:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000012",
      leaseUntil: new Date("2026-09-01T12:30:00.000Z"),
      startedRequests: 2,
      state: "processing",
    });

    expect(await reconcileGitHubWorkUnitSummaryStatus(beforeExpiry)).toBe(true);
    expect(await readHead()).toMatchObject({
      head_content_revision: "1",
      summarizing: true,
    });

    const afterExpiry = new Date("2026-09-01T13:00:00.000Z");
    expect(await reconcileGitHubWorkUnitSummaryStatus(afterExpiry)).toBe(true);
    expect(await reconcileGitHubWorkUnitSummaryStatus(afterExpiry)).toBe(true);
    expect(await readAttempt(retryable)).toMatchObject({
      request_payload: retryable.payload,
      state: "retryable",
    });
    expect(await readAttempt(exhausted)).toMatchObject({
      request_payload: null,
      state: "terminal",
    });
    expect(await readHead()).toMatchObject({
      head_content_revision: "1",
      summarizing: true,
    });
  });

  test("reconciles an active summary leaving the initial five-day page", async () => {
    const now = new Date("2026-09-06T12:00:00.000Z");
    const active = await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      debounceUntil: new Date("2026-08-31T12:00:00.000Z"),
      lastStartedAt: new Date("2026-09-06T11:00:00.000Z"),
      leaseToken: "20000000-0000-4000-8000-000000000013",
      leaseUntil: new Date("2026-09-06T13:00:00.000Z"),
      startedRequests: 1,
      state: "processing",
    });
    expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(true);

    for (const day of [1, 2, 3, 4, 5]) {
      await admin`
        insert into github_issues (
          account, author_user_id, created_at, node_id, number,
          repository_id, title_snapshot, url_snapshot
        ) values (
          'f0rr0', '8574219',
          ${`2026-09-0${String(day)}T12:00:00.000Z`},
          ${`ISSUE_initial_page_${String(day)}`}, ${day},
          ${repositoryId}, 'Initial-page issue',
          ${`https://github.com/f0rr0/summary-store-test/issues/${String(day)}`}
        )
      `;
    }
    expect(await reconcileGitHubWorkUnitSummaryStatus(now)).toBe(false);
    expect(await readAttempt(active)).toMatchObject({ state: "processing" });
    expect(await readHead()).toMatchObject({
      head_content_revision: "2",
      summarizing: false,
    });
  });

  test("accepts exact output and advances the head only for initial-page days", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const units = [];
    for (const day of [31, 30, 29, 28, 27, 26]) {
      units.push(
        await seedUnit({
          activityAt: new Date(
            `2026-08-${String(day).padStart(2, "0")}T12:00:00.000Z`
          ),
          debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
        })
      );
    }

    const newestClaim = await claimGitHubWorkUnitSummary({ now });
    expect(await readHead()).toMatchObject({
      feed_revision: "0",
      head_content_revision: "1",
      summarizing: true,
    });
    assert.ok(newestClaim);
    const newestResult = await completeGitHubWorkUnitSummary(
      newestClaim,
      providerResult("Adds deterministic summary leasing."),
      now
    );
    expect(newestResult).toEqual({ accepted: true });
    expect(await readAttempt(units[0])).toMatchObject({
      input_tokens: 41,
      lease_token: null,
      model: "gpt-5.4-nano-2026-03-17" as const,
      outcome: "Adds deterministic summary leasing.",
      output_tokens: 12,
      request_payload: null,
      state: "accepted",
    });
    let head = await readHead();
    expect(head).toMatchObject({
      feed_revision: "1",
      head_content_revision: "2",
      summarizing: true,
    });
    expect(new Date(head.last_published_at).getTime()).toBe(now.getTime());

    for (let index = 1; index < 5; index += 1) {
      const claim = await claimGitHubWorkUnitSummary({ now });
      expect(claim).toMatchObject({ workUnitId: units[index].workUnitId });
      assert.ok(claim);
      expect(await terminalGitHubWorkUnitSummary(claim, now)).toBe(true);
    }
    const oldClaim = await claimGitHubWorkUnitSummary({ now });
    expect(oldClaim).toMatchObject({ workUnitId: units[5].workUnitId });
    assert.ok(oldClaim);
    expect(
      await completeGitHubWorkUnitSummary(
        oldClaim,
        providerResult("Refines an older implementation."),
        now
      )
    ).toEqual({ accepted: true });
    head = await readHead();
    expect(head).toMatchObject({
      feed_revision: "1",
      head_content_revision: "3",
      summarizing: false,
    });
  });

  test("publishes exact rewrites, caches stale output, and rejects invalid output", async () => {
    const now = new Date("2026-09-01T12:00:00.000Z");
    const rewrite = await seedUnit({
      activityAt: new Date("2026-08-31T12:00:00.000Z"),
      attemptRevision: 2,
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    await admin`
      insert into github_work_unit_summary_attempts (
        accepted_at, attribution_mode, completed_at, debounce_until,
        input_tokens, last_started_at, latency_ms, model, outcome,
        outcome_digest, output_tokens, recipe, revision, started_requests,
        state, summary_input_digest, work_unit_id, identity_key, repository_id, request_started_at
      ) values (
        '2026-08-31T13:00:00Z', 'branch_owned_composite',
        '2026-08-31T13:00:00Z', '2026-08-31T12:00:00Z', 40,
        '2026-08-31T13:00:00Z', 10, 'previous-model',
        'Prior prose for the same outcome.', ${rewrite.outcomeDigest}, 10,
        'github-work-unit-outcome-v0', 1, 1, 'accepted', ${digest("e")},
        ${rewrite.workUnitId}, ${rewrite.identityKey}, ${repositoryId}, ARRAY['2026-08-31T13:00:00Z'::timestamptz]
      )
    `;
    const rewriteClaim = await claimGitHubWorkUnitSummary({ now });
    assert.ok(rewriteClaim);
    expect(
      await completeGitHubWorkUnitSummary(
        rewriteClaim,
        providerResult("Improves the same represented outcome."),
        now
      )
    ).toEqual({ accepted: true });
    let head = await readHead();
    expect(head).toMatchObject({
      feed_revision: "1",
      head_content_revision: "2",
      summarizing: false,
    });

    const stale = await seedUnit({
      activityAt: new Date("2026-09-01T10:00:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const staleClaim = await claimGitHubWorkUnitSummary({ now });
    expect(staleClaim).toMatchObject({ workUnitId: stale.workUnitId });
    await admin`
      update github_work_units set outcome_digest = ${digest("f")}
      where id = ${stale.workUnitId}
    `;
    assert.ok(staleClaim);
    expect(
      await completeGitHubWorkUnitSummary(
        staleClaim,
        providerResult("Reusable output for the prior evidence."),
        now
      )
    ).toEqual({ accepted: true });
    expect(await readAttempt(stale)).toMatchObject({
      outcome: "Reusable output for the prior evidence.",
      request_payload: null,
      state: "accepted",
    });

    const invalid = await seedUnit({
      activityAt: new Date("2026-09-01T09:00:00.000Z"),
      debounceUntil: new Date("2026-09-01T11:00:00.000Z"),
    });
    const invalidClaim = await claimGitHubWorkUnitSummary({ now });
    expect(invalidClaim).toMatchObject({ workUnitId: invalid.workUnitId });
    assert.ok(invalidClaim);
    expect(
      await terminalGitHubWorkUnitSummary(invalidClaim, now, "input_invalid")
    ).toBe(true);
    expect(await terminalGitHubWorkUnitSummary(invalidClaim, now)).toBe(false);
    const invalidAttempt = await readAttempt(invalid);
    expect(invalidAttempt).toMatchObject({
      error_code: "input_invalid",
      outcome: null,
      request_payload: null,
      state: "terminal",
    });
    expect(new Date(invalidAttempt.completed_at).getTime()).toBe(now.getTime());
    head = await readHead();
    expect(head).toMatchObject({
      feed_revision: "1",
      head_content_revision: "6",
      summarizing: false,
    });

    const [cached] = await admin`
      select * from github_work_unit_accepted_summaries
      where identity_key = ${stale.identityKey}
    `;
    expect(cached).toMatchObject({
      outcome: "Reusable output for the prior evidence.",
      outcome_digest: stale.outcomeDigest,
    });
    await admin`
      delete from github_work_units where id = ${stale.workUnitId}
    `;
    expect(await readAttempt(stale)).toMatchObject({
      started_requests: 1,
      state: "accepted",
    });
    const [retained] = await admin`
      select * from github_work_unit_accepted_summaries
      where identity_key = ${stale.identityKey}
    `;
    expect(retained).toEqual(cached);
  });
});
