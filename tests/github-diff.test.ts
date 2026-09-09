import { expect, test } from "bun:test";
import assert from "node:assert/strict";

import { fetchGitHubPullRequestDiff } from "../src/lib/github-activity-processor";
import { githubWorkUnitFileFactsFrom } from "../src/lib/github-change-evidence";
import { recoverGitHubDiffPatches } from "../src/lib/github-diff";
import { githubWorkUnitSummaryDiffEvidenceFrom } from "../src/lib/github-work-unit-core";
import {
  digestGitHubWorkUnitOutcome,
  githubWorkUnitSummaryInputSchema,
} from "../src/lib/github-work-unit-summary";
import { mockFetch, env } from "./helpers";

const file = {
  filename: "bun.lock",
  previousFilename: null,
  status: "added",
  additions: 2,
  deletions: 0,
  patch: null,
};
const rawDiff =
  "diff --git a/bun.lock b/bun.lock\nnew file mode 100644\n--- /dev/null\n+++ b/bun.lock\n@@ -0,0 +1,2 @@\n+first\n+second\n";

test("recovers omitted and truncated patches without accepting a different ledger", () => {
  const recovered = recoverGitHubDiffPatches([file], rawDiff);
  expect(recovered?.[0]?.patch).toBe("@@ -0,0 +1,2 @@\n+first\n+second");
  expect(
    recoverGitHubDiffPatches(
      [{ ...file, patch: "@@ -0,0 +1 @@\n+first" }],
      rawDiff
    )
  ).toEqual(recovered);
  expect(
    recoverGitHubDiffPatches([{ ...file, additions: 3 }], rawDiff)
  ).toBeNull();
  expect(
    recoverGitHubDiffPatches(
      [file],
      rawDiff.replace("+++ b/bun.lock", "+++ b/other.lock")
    )
  ).toBeNull();
  expect(recoverGitHubDiffPatches([file], rawDiff + rawDiff)).toBeNull();
});

test("matches quoted Unicode and renamed paths and preserves no-newline evidence", () => {
  const renamed = {
    ...file,
    filename: "é.ts",
    previousFilename: "old.ts",
    status: "renamed",
    additions: 1,
    deletions: 1,
  };
  const diff =
    'diff --git a/old.ts "b/\\303\\251.ts"\n--- a/old.ts\n+++ "b/\\303\\251.ts"\n@@ -1 +1 @@\n-old\n+new\n\\ No newline at end of file\n';
  expect(recoverGitHubDiffPatches([renamed], diff)?.[0]?.patch).toEndWith(
    "\\ No newline at end of file"
  );
  expect(
    recoverGitHubDiffPatches(
      [{ ...renamed, previousFilename: "wrong.ts" }],
      diff
    )
  ).toBeNull();
});

test("a real binary change remains explicit while the text diff stays eligible", () => {
  const recovered = recoverGitHubDiffPatches([file], rawDiff);
  assert.ok(recovered);
  const facts = githubWorkUnitFileFactsFrom([
    ...recovered,
    { ...file, filename: "resume.pdf", status: "modified", additions: 0 },
  ]);
  const evidence = githubWorkUnitSummaryDiffEvidenceFrom(
    facts,
    2,
    0,
    true,
    false
  );
  assert.ok(evidence);
  const result = digestGitHubWorkUnitOutcome({ mode: "net", diff: evidence });
  expect(result.ok).toBe(true);
  if (!result.ok) {
    throw new Error(result.reason);
  }
  expect(JSON.stringify(result.normalized)).toContain('"kind":"binary"');
  expect(
    githubWorkUnitSummaryInputSchema.safeParse({
      attributionMode: "tracked_authored_pr",
      evidence: result.normalized,
      kind: "pull_request",
      recipe: "github-work-unit-outcome-v2",
      repository: {
        fullName: "example/repo",
        description: null,
        homepageUrl: null,
        topics: [],
      },
      version: 2,
    }).success
  ).toBe(true);
});

test("PR acquisition falls back to a SHA-pinned diff and rejects a moving PR", async () => {
  const originalFetch = globalThis.fetch;
  const originalToken = env.GITHUB_TOKENS;
  env.GITHUB_TOKENS = JSON.stringify({ f0rr0: "test-token" });
  let head = "b".repeat(40);
  const base = "a".repeat(40);
  const paths: string[] = [];
  globalThis.fetch = mockFetch(async (input, options) => {
    const url = new URL(input instanceof Request ? input.url : input);
    paths.push(url.pathname);
    if (url.pathname.endsWith("/files")) {
      return Response.json([file]);
    }
    if (url.pathname.includes("/compare/")) {
      expect(new Headers(options?.headers).get("accept")).toBe(
        "application/vnd.github.diff"
      );
      expect(url.pathname).toEndWith(`${base}...${"b".repeat(40)}`);
      return new Response(rawDiff);
    }
    return Response.json({ base: { sha: base }, head: { sha: head } });
  });
  try {
    const reference = {
      account: "f0rr0" as const,
      repository: "example/repo",
      repositoryId: "1",
      number: 2,
      baseSha: base,
      headSha: head,
      expectedChangedFiles: 1,
    };
    const result = await fetchGitHubPullRequestDiff(reference);
    expect(result.files[0]?.patch).toContain("+second");
    expect(paths).toHaveLength(3);
    head = "c".repeat(40);
    await assert.rejects(fetchGitHubPullRequestDiff(reference), {
      code: "snapshot_stale",
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) {
      delete env.GITHUB_TOKENS;
    } else {
      env.GITHUB_TOKENS = originalToken;
    }
  }
});
