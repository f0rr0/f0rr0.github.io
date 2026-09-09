import {
  afterAll,
  beforeAll,
  describe,
  expect,
  setDefaultTimeout,
  test,
} from "bun:test";
import assert from "node:assert/strict";
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import migrationJournal from "../drizzle/meta/_journal.json";
import type * as DatabaseClient from "../src/db/client.ts";
import type * as DatabaseSchema from "../src/db/schema.ts";
import type * as GithubActivityWorkerStore from "../src/lib/github-activity-worker-store.ts";
import type * as GithubBackfillStore from "../src/lib/github-backfill-store.ts";
import type {
  GitHubRepositoryFacts,
  GitHubPullRequest,
} from "../src/lib/github-commits-core.ts";
import type * as GithubCommitsStore from "../src/lib/github-commits-store.ts";
import { env } from "./helpers.ts";

setDefaultTimeout(30_000);

const dockerAvailable =
  Bun.spawnSync(["docker", "info"], {
    stderr: "ignore",
    stdout: "ignore",
  }).exitCode === 0;
const migrationsFolder = new URL("../drizzle", import.meta.url).pathname;
const postgresImage = "postgres:17-alpine";
const postgresPassword = "github-pr-store-test";
const repositoryId = "8301";
const firstHeadSha = "a".repeat(40);
const secondHeadSha = "b".repeat(40);
const thirdHeadSha = "c".repeat(40);
const mergeSha = "d".repeat(40);
const providerUpdatedAt = "2026-08-30T12:00:00.000Z";

const repository: GitHubRepositoryFacts = {
  defaultBranch: "main",
  fullName: "f0rr0/pr-store-test",
  htmlUrl: "https://github.com/f0rr0/pr-store-test",
  id: repositoryId,
  ownerAvatarUrl: "https://avatars.example/f0rr0",
  ownerId: "8574219",
  ownerLogin: "f0rr0",
  ownerType: "User",
  pushedAt: providerUpdatedAt,
  visibility: "public",
};

const pullRequest = (
  overrides: Partial<GitHubPullRequest> = {}
): GitHubPullRequest => ({
  action: "synchronize",
  additions: 12,
  author: "f0rr0",
  authorAccount: "f0rr0",
  authorUserId: "8574219",
  baseRef: "main",
  baseRepository: repository,
  baseSha: "e".repeat(40),
  body: "A complete pull request snapshot.",
  changedFiles: 2,
  closedAt: null,
  commitCount: 2,
  createdAt: "2026-08-30T11:00:00.000Z",
  deletions: 4,
  draft: false,
  headRef: "feature",
  headRepository: repository,
  headSha: firstHeadSha,
  id: "991",
  mergeCommitSha: undefined,
  merged: false,
  mergedAt: null,
  nodeId: "PR_pr_store_8301",
  number: 17,
  providerUpdatedAt,
  repository,
  state: "open",
  title: "Consolidate persistence",
  url: "https://github.com/f0rr0/pr-store-test/pull/17",
  ...overrides,
});

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

describe.skipIf(!dockerAvailable)("GitHub pull request persistence", () => {
  let admin: ReturnType<typeof postgres>;
  let claimGitHubCommitsForEnrichment: (typeof GithubActivityWorkerStore)["claimGitHubCommitsForEnrichment"];
  let claimGitHubCommitsForPullRequestDiscovery: (typeof GithubActivityWorkerStore)["claimGitHubCommitsForPullRequestDiscovery"];
  let closeDatabase: (typeof DatabaseClient)["closeDatabase"];
  let completeGitHubCommitEnrichment: (typeof GithubActivityWorkerStore)["completeGitHubCommitEnrichment"];
  let claimDueGitHubPullRequests: (typeof GithubActivityWorkerStore)["claimDueGitHubPullRequests"];
  let containerId: string | undefined;
  let database: ReturnType<(typeof DatabaseClient)["getDatabase"]>;
  let originalDatabaseUrl: string | undefined;
  let persistGitHubPullRequestBackfillDigest: (typeof GithubBackfillStore)["persistGitHubPullRequestBackfillDigest"];
  let persistGitHubPullRequestMembership: (typeof GithubActivityWorkerStore)["persistGitHubPullRequestMembership"];
  let persistGitHubPullRequestSnapshot: (typeof GithubActivityWorkerStore)["persistGitHubPullRequestSnapshot"];
  let persistGitHubWebhookPullRequest: (typeof GithubCommitsStore)["persistGitHubWebhookPullRequest"];
  let releaseGitHubPullRequestDiscovery: (typeof GithubActivityWorkerStore)["releaseGitHubPullRequestDiscovery"];
  let releaseGitHubPullRequestReconciliation: (typeof GithubActivityWorkerStore)["releaseGitHubPullRequestReconciliation"];
  let readGitHubPullRequestBackfillDigest: (typeof GithubBackfillStore)["readGitHubPullRequestBackfillDigest"];
  let schema: typeof DatabaseSchema;

  beforeAll(async () => {
    originalDatabaseUrl = env.DATABASE_URL;
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
      "POSTGRES_DB=github_pr_store_test",
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
    const databaseUrl = `postgresql://postgres:${postgresPassword}@127.0.0.1:${port}/github_pr_store_test`;
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
      onnotice: (notice) => void notice,
      prepare: false,
    });
    // Exercise an upgrade with an existing checkpoint, not only an empty install.
    const previousMigrations = await mkdtemp(
      path.join(tmpdir(), "github-account-upgrade-")
    );
    const previousEntries = migrationJournal.entries.filter(
      ({ idx }) => idx < 22
    );
    try {
      await mkdir(path.join(previousMigrations, "meta"));
      await writeFile(
        path.join(previousMigrations, "meta/_journal.json"),
        JSON.stringify({ ...migrationJournal, entries: previousEntries })
      );
      await Promise.all(
        previousEntries.map(async ({ tag }) => {
          await copyFile(
            path.join(migrationsFolder, `${tag}.sql`),
            path.join(previousMigrations, `${tag}.sql`)
          );
        })
      );
      await migrate(drizzle({ client: admin }), {
        migrationsFolder: previousMigrations,
      });
      await admin`insert into github_account_checkpoints (account, latest_event_id, paused) values ('f0rr0', '42', true)`;
      await admin`insert into github_repository_inventory_heads (account_user_id, account_login) values ('8574219', 'f0rr0')`;
      await migrate(drizzle({ client: admin }), { migrationsFolder });
      const [upgraded] =
        await admin`select latest_event_id, paused from github_account_checkpoints where account = 'f0rr0'`;
      expect(upgraded).toMatchObject({
        latest_event_id: "42",
        paused: true,
      });
      await admin`delete from github_repository_inventory_heads where account_user_id = '8574219'`;
      await admin`delete from github_account_checkpoints where account = 'f0rr0'`;
    } finally {
      await rm(previousMigrations, { recursive: true, force: true });
    }
    env.DATABASE_URL = databaseUrl;
    schema = await import("../src/db/schema.ts");
    const client = await import("../src/db/client.ts");
    ({ closeDatabase } = client);
    database = client.getDatabase();
    ({
      persistGitHubPullRequestBackfillDigest,
      readGitHubPullRequestBackfillDigest,
    } = await import("../src/lib/github-backfill-store.ts"));
    ({ persistGitHubWebhookPullRequest } =
      await import("../src/lib/github-commits-store.ts"));
    ({
      claimDueGitHubPullRequests,
      claimGitHubCommitsForEnrichment,
      claimGitHubCommitsForPullRequestDiscovery,
      completeGitHubCommitEnrichment,
      persistGitHubPullRequestMembership,
      persistGitHubPullRequestSnapshot,
      releaseGitHubPullRequestDiscovery,
      releaseGitHubPullRequestReconciliation,
    } = await import("../src/lib/github-activity-worker-store.ts"));
  });

  afterAll(async () => {
    await closeDatabase?.();
    await admin?.end({ timeout: 1 });
    if (originalDatabaseUrl === undefined) {
      delete env.DATABASE_URL;
    } else {
      env.DATABASE_URL = originalDatabaseUrl;
    }
    if (containerId !== undefined) {
      Bun.spawnSync(["docker", "stop", "--time", "1", containerId], {
        stderr: "ignore",
        stdout: "ignore",
      });
    }
  });

  test("accepts a configured account name without adding identity registration columns", async () => {
    await database
      .insert(schema.githubAccountCheckpoints)
      .values({ account: "alice" });
    await database.insert(schema.githubWebhookDeliveries).values({
      deliveryId: "00000000-0000-4000-8000-000000999999",
      event: "ping",
      accepted: false,
      account: "alice",
    });
    const [checkpoint] = await database
      .select()
      .from(schema.githubAccountCheckpoints)
      .where(eq(schema.githubAccountCheckpoints.account, "alice"));
    expect(checkpoint?.account).toBe("alice");
    expect(checkpoint).not.toHaveProperty("userId");
  });

  test("promotes an equal-time terminal signal without trusting its merge SHA", async () => {
    const initial = await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000001",
      "f0rr0",
      pullRequest()
    );
    expect(initial.pullRequests).toBe(1);

    await database
      .update(schema.githubPullRequests)
      .set({
        nextReconcileAt: new Date("2026-09-01T00:00:00.000Z"),
        reconcileAttempts: 4,
        reconcileError: "temporary",
      })
      .where(eq(schema.githubPullRequests.nodeId, "PR_pr_store_8301"));

    const terminalSignal = pullRequest({
      action: "closed",
      closedAt: providerUpdatedAt,
      mergeCommitSha: mergeSha,
      merged: true,
      mergedAt: providerUpdatedAt,
      state: "closed",
    });
    const promoted = await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000002",
      "f0rr0",
      terminalSignal
    );
    expect(promoted.pullRequests).toBe(1);

    const [observed] = await database
      .select()
      .from(schema.githubPullRequests)
      .where(eq(schema.githubPullRequests.nodeId, "PR_pr_store_8301"));
    const [version] = await database
      .select()
      .from(schema.githubPullRequestVersions)
      .where(eq(schema.githubPullRequestVersions.isCurrent, true));
    expect(observed).toMatchObject({
      mergeSha: null,
      mergeShaVerifiedAt: null,
      reconcileAttempts: 0,
      reconcileError: null,
      state: "merged",
    });
    assert.ok(observed.terminalAt);
    expect(observed.terminalAt.toISOString()).toBe(providerUpdatedAt);
    expect(version).toMatchObject({
      headSha: firstHeadSha,
      isCurrent: true,
      mergeSnapshot: true,
    });

    await admin`
      update github_public_feed_head set projection_request_token = null
      where id
    `;
    await persistGitHubPullRequestSnapshot("f0rr0", terminalSignal);
    const [verified] = await database
      .select()
      .from(schema.githubPullRequests)
      .where(eq(schema.githubPullRequests.nodeId, "PR_pr_store_8301"));
    expect(verified).toMatchObject({ mergeSha, state: "merged" });
    expect(verified.mergeShaVerifiedAt).not.toBeNull();
    expect([
      ...(await admin`
        select projection_request_token is not null as "projectionRequested"
        from github_public_feed_head
      `),
    ]).toEqual([{ projectionRequested: true }]);
  });

  test("signals an equal-time terminal promotion despite a conflicting head", async () => {
    const nodeId = "PR_pr_store_terminal_head_race_8301";
    await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000011",
      "f0rr0",
      pullRequest({ nodeId, number: 318 })
    );
    await admin`
      update github_public_feed_head set projection_request_token = null
      where id
    `;

    await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000012",
      "f0rr0",
      pullRequest({
        action: "closed",
        closedAt: providerUpdatedAt,
        headSha: secondHeadSha,
        merged: true,
        mergedAt: providerUpdatedAt,
        nodeId,
        number: 318,
        state: "closed",
      })
    );

    expect([
      ...(await admin`
        select state from github_pull_requests where node_id = ${nodeId}
      `),
    ]).toEqual([{ state: "merged" }]);
    expect([
      ...(await admin`
        select projection_request_token is not null as "projectionRequested"
        from github_public_feed_head
      `),
    ]).toEqual([{ projectionRequested: true }]);
  });

  test("round-trips the completed authored-PR traversal digest", async () => {
    expect(
      await readGitHubPullRequestBackfillDigest("yuppiestechdev")
    ).toBeNull();
    await persistGitHubPullRequestBackfillDigest({
      account: "yuppiestechdev",
      digest: "a".repeat(64),
    });
    expect(await readGitHubPullRequestBackfillDigest("yuppiestechdev")).toBe(
      "a".repeat(64)
    );

    await persistGitHubPullRequestBackfillDigest({
      account: "yuppiestechdev",
      digest: "b".repeat(64),
    });
    expect(await readGitHubPullRequestBackfillDigest("yuppiestechdev")).toBe(
      "b".repeat(64)
    );
  });

  test("refreshes an existing out-of-window PR without creating an unrelated one", async () => {
    const nodeId = "PR_pr_store_existing_only_8301";
    const unseen = pullRequest({ nodeId, number: 217 });
    expect(
      await persistGitHubPullRequestSnapshot("f0rr0", unseen, {
        existingOnly: true,
      })
    ).toBeNull();
    expect(
      await database
        .select({ nodeId: schema.githubPullRequests.nodeId })
        .from(schema.githubPullRequests)
        .where(eq(schema.githubPullRequests.nodeId, nodeId))
    ).toHaveLength(0);

    const initial = await persistGitHubPullRequestSnapshot("f0rr0", unseen);
    expect(initial).not.toBeNull();
    assert.ok(initial);
    expect(
      await persistGitHubPullRequestMembership(
        initial,
        firstHeadSha,
        ["f".repeat(40), firstHeadSha],
        true
      )
    ).toBe(true);
    const refreshed = await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({
        commitCount: 1,
        headSha: secondHeadSha,
        nodeId,
        number: 217,
        providerUpdatedAt: "2026-08-30T12:02:00.000Z",
      }),
      { existingOnly: true, refreshMembership: true }
    );

    expect(refreshed).toMatchObject({
      membershipRefreshRequired: true,
      pullRequestNodeId: nodeId,
    });
    assert.ok(refreshed);
    expect(
      await persistGitHubPullRequestMembership(
        refreshed,
        secondHeadSha,
        [secondHeadSha],
        true
      )
    ).toBe(true);
    const versions = await database
      .select({
        headSha: schema.githubPullRequestVersions.headSha,
        isCurrent: schema.githubPullRequestVersions.isCurrent,
      })
      .from(schema.githubPullRequestVersions)
      .where(eq(schema.githubPullRequestVersions.pullRequestNodeId, nodeId));
    expect(versions.filter(({ isCurrent }) => isCurrent)).toEqual([
      { headSha: secondHeadSha, isCurrent: true },
    ]);
    const currentMembership = await database
      .select({ sha: schema.githubPullRequestMemberships.commitSha })
      .from(schema.githubPullRequestMemberships)
      .innerJoin(
        schema.githubPullRequestVersions,
        eq(
          schema.githubPullRequestVersions.id,
          schema.githubPullRequestMemberships.versionId
        )
      )
      .where(
        and(
          eq(schema.githubPullRequestVersions.pullRequestNodeId, nodeId),
          eq(schema.githubPullRequestVersions.isCurrent, true)
        )
      )
      .orderBy(schema.githubPullRequestMemberships.position);
    expect(currentMembership).toEqual([{ sha: secondHeadSha }]);
  });

  test("signals projection only when a newer snapshot changes projection evidence", async () => {
    const nodeId = "PR_pr_store_projection_signal_8301";
    await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({
        changedFiles: null,
        commitCount: null,
        nodeId,
        number: 317,
      })
    );
    await admin`
      update github_public_feed_head set projection_request_token = null
      where id
    `;

    const metadataOnly = await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({
        body: "Only explanatory copy changed.",
        changedFiles: 2,
        commitCount: 2,
        nodeId,
        number: 317,
        providerUpdatedAt: "2026-08-30T12:01:00.000Z",
        title: "A revised title that is not public feed evidence",
      })
    );
    expect(metadataOnly).toMatchObject({ snapshotChanged: false });
    expect([
      ...(await admin`
        select projection_request_token as "projectionRequestToken"
        from github_public_feed_head
      `),
    ]).toEqual([{ projectionRequestToken: null }]);

    const changedHead = await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({
        headSha: secondHeadSha,
        nodeId,
        number: 317,
        providerUpdatedAt: "2026-08-30T12:02:00.000Z",
      })
    );
    expect(changedHead).toMatchObject({ snapshotChanged: true });
    expect([
      ...(await admin`
        select projection_request_token is not null as "projectionRequested"
        from github_public_feed_head
      `),
    ]).toEqual([{ projectionRequested: true }]);
  });

  test("replaces same-head membership after a base retarget", async () => {
    const nodeId = "PR_pr_store_retarget_8301";
    const initial = await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({ nodeId, number: 218 })
    );
    expect(initial).not.toBeNull();
    assert.ok(initial);
    expect(
      await persistGitHubPullRequestMembership(
        initial,
        firstHeadSha,
        ["f".repeat(40), firstHeadSha],
        true
      )
    ).toBe(true);

    const retargeted = await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({
        baseSha: "1".repeat(40),
        nodeId,
        number: 218,
        providerUpdatedAt: "2026-08-30T12:03:00.000Z",
      }),
      { refreshMembership: true }
    );
    expect(retargeted).toMatchObject({
      membershipRefreshRequired: true,
      pullRequestNodeId: nodeId,
    });
    expect(
      await persistGitHubPullRequestMembership(
        initial,
        firstHeadSha,
        ["3".repeat(40), firstHeadSha],
        true
      )
    ).toBe(false);
    assert.ok(retargeted);
    expect(
      await persistGitHubPullRequestMembership(
        retargeted,
        firstHeadSha,
        ["2".repeat(40), firstHeadSha],
        true
      )
    ).toBe(true);

    const membership = await database
      .select({ sha: schema.githubPullRequestMemberships.commitSha })
      .from(schema.githubPullRequestMemberships)
      .where(
        eq(schema.githubPullRequestMemberships.versionId, retargeted.versionId)
      )
      .orderBy(schema.githubPullRequestMemberships.position);
    expect(membership).toEqual([
      { sha: "2".repeat(40) },
      { sha: firstHeadSha },
    ]);
  });

  test("claims due schedules written with PostgreSQL microsecond precision", async () => {
    const nodeId = "PR_pr_store_microsecond_schedule_8301";
    await persistGitHubPullRequestSnapshot(
      "f0rr0",
      pullRequest({ nodeId, number: 117 })
    );
    await admin`
      update github_pull_requests
      set next_reconcile_at = '2026-09-01T00:00:00.000789Z'::timestamptz,
          reconcile_attempts = 0
      where node_id = ${nodeId}
    `;

    const [claimed] = await claimDueGitHubPullRequests(
      "f0rr0",
      Number.POSITIVE_INFINITY,
      1,
      new Date("2026-09-01T00:00:01.000Z")
    );

    expect(claimed).toMatchObject({ attemptCount: 1, nodeId });
    await releaseGitHubPullRequestReconciliation(claimed);
  });

  test("orders provider snapshots and switches only authoritative current versions", async () => {
    const newerAt = "2026-08-30T12:01:00.000Z";
    const nodeId = "PR_pr_store_8302";
    const secondPullRequest = (overrides = {}) =>
      pullRequest({ nodeId, number: 18, ...overrides });
    await persistGitHubPullRequestSnapshot(
      "f0rr0",
      secondPullRequest({
        headSha: secondHeadSha,
        providerUpdatedAt: newerAt,
      })
    );

    await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000003",
      "f0rr0",
      secondPullRequest({ providerUpdatedAt: "2026-08-30T11:59:00.000Z" })
    );
    await persistGitHubWebhookPullRequest(
      "00000000-0000-4000-8000-000000000004",
      "f0rr0",
      secondPullRequest({ providerUpdatedAt: newerAt })
    );

    let [stored] = await database
      .select()
      .from(schema.githubPullRequests)
      .where(eq(schema.githubPullRequests.nodeId, nodeId));
    let versions = await database
      .select()
      .from(schema.githubPullRequestVersions)
      .where(eq(schema.githubPullRequestVersions.pullRequestNodeId, nodeId))
      .orderBy(asc(schema.githubPullRequestVersions.observedAt));
    expect(stored.headSha).toBe(secondHeadSha);
    expect(versions.filter(({ isCurrent }) => isCurrent)).toHaveLength(1);
    expect(versions.find(({ isCurrent }) => isCurrent)?.headSha).toBe(
      secondHeadSha
    );

    await persistGitHubPullRequestSnapshot(
      "f0rr0",
      secondPullRequest({ headSha: thirdHeadSha, providerUpdatedAt: newerAt })
    );
    [stored] = await database
      .select()
      .from(schema.githubPullRequests)
      .where(eq(schema.githubPullRequests.nodeId, nodeId));
    versions = await database
      .select()
      .from(schema.githubPullRequestVersions)
      .where(eq(schema.githubPullRequestVersions.pullRequestNodeId, nodeId));
    expect(stored.headSha).toBe(thirdHeadSha);
    expect(versions.filter(({ isCurrent }) => isCurrent)).toHaveLength(1);
    expect(versions.find(({ isCurrent }) => isCurrent)?.headSha).toBe(
      thirdHeadSha
    );
  });

  test("claims canonical repository names and completes only the active commit lease", async () => {
    const commitSha = "9".repeat(40);
    const commitAt = new Date("2026-09-02T10:00:00.000Z");
    const workerRepositoryId = "8401";
    await database.insert(schema.githubRepositories).values({
      description: "Canonical metadata must survive commit enrichment.",
      fullName: "f0rr0/renamed-worker-path",
      homepageUrl: "https://example.com/worker-path",
      id: workerRepositoryId,
      ownerLogin: "f0rr0",
      topics: ["workers"],
      visibility: "public",
    });
    await database.insert(schema.githubCommits).values({
      author: "f0rr0",
      committedAt: commitAt,
      firstObservedAt: commitAt,
      message: "feat: simplify the worker path",
      repositoryId: workerRepositoryId,
      sha: commitSha,
    });

    const [claimed] = await claimGitHubCommitsForEnrichment(
      1,
      ["f0rr0"],
      new Date("2026-09-02T10:01:00.000Z")
    );
    expect(claimed.repository).toBe("f0rr0/renamed-worker-path");

    const source = {
      authoredAt: commitAt.toISOString(),
      authorUserId: "8574219",
      commit: {
        committedAt: commitAt.toISOString(),
        files: [],
        message: "feat: simplify the worker path",
        parents: [],
        providerFileCapReached: false,
        sha: commitSha,
        stats: { additions: 0, deletions: 0, total: 0 },
      },
      committerAt: commitAt.toISOString(),
      committerUserId: null,
    };
    expect(
      await completeGitHubCommitEnrichment(
        {
          ...claimed,
          leaseToken: "00000000-0000-4000-8000-000000000840",
        },
        source
      )
    ).toBe(false);
    expect(await completeGitHubCommitEnrichment(claimed, source)).toBe(true);

    const [storedCommit] = await database
      .select({
        enrichmentState: schema.githubCommits.enrichmentState,
      })
      .from(schema.githubCommits)
      .where(
        and(
          eq(schema.githubCommits.repositoryId, workerRepositoryId),
          eq(schema.githubCommits.sha, commitSha)
        )
      );
    expect(storedCommit).toEqual({ enrichmentState: "complete" });
    const [storedRepository] = await database
      .select({
        description: schema.githubRepositories.description,
        fullName: schema.githubRepositories.fullName,
        homepageUrl: schema.githubRepositories.homepageUrl,
        topics: schema.githubRepositories.topics,
      })
      .from(schema.githubRepositories)
      .where(eq(schema.githubRepositories.id, workerRepositoryId));
    expect(storedRepository).toEqual({
      description: "Canonical metadata must survive commit enrichment.",
      fullName: "f0rr0/renamed-worker-path",
      homepageUrl: "https://example.com/worker-path",
      topics: ["workers"],
    });

    const [discovery] = await claimGitHubCommitsForPullRequestDiscovery(
      1,
      ["f0rr0"],
      new Date("2026-09-02T10:02:00.000Z")
    );
    expect(discovery.repository).toBe("f0rr0/renamed-worker-path");
    await releaseGitHubPullRequestDiscovery(discovery);

    // A smaller visible result cannot erase a previously verified association.
    const { completeGitHubPullRequestDiscovery } =
      await import("../src/lib/github-activity-worker-store");
    await database.insert(schema.githubCommitPullRequestAssociations).values({
      commitRepositoryId: workerRepositoryId,
      commitSha,
      pullRequestNodeId: pullRequest().nodeId,
    });
    const [reclaimed] = await claimGitHubCommitsForPullRequestDiscovery(
      1,
      ["f0rr0"],
      new Date("2026-09-02T10:03:00.000Z")
    );
    expect(await completeGitHubPullRequestDiscovery(reclaimed, [])).toBe(true);
    const associations = await database
      .select()
      .from(schema.githubCommitPullRequestAssociations)
      .where(
        and(
          eq(
            schema.githubCommitPullRequestAssociations.commitRepositoryId,
            workerRepositoryId
          ),
          eq(schema.githubCommitPullRequestAssociations.commitSha, commitSha)
        )
      );
    expect(associations.map((row) => row.pullRequestNodeId)).toEqual([
      pullRequest().nodeId,
    ]);
  });
});
