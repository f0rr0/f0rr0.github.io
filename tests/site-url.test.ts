import { expect, test } from "bun:test";

import { productionSiteOrigin, siteOriginFrom } from "../src/lib/site-url";

test("derives local and production URLs without an author-specific fallback", () => {
  expect(siteOriginFrom({})).toBe("http://localhost:3000");
  expect(
    siteOriginFrom({
      PORT: "",
      NEXT_PUBLIC_PORT: "",
      VERCEL_PROJECT_PRODUCTION_URL: "",
    })
  ).toBe("http://localhost:3000");
  expect(siteOriginFrom({ PORT: "4200" })).toBe("http://localhost:4200");
  expect(
    siteOriginFrom({
      VERCEL: "1",
      VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app",
    })
  ).toBe("https://example.vercel.app");
  for (const hostname of [
    undefined,
    "",
    "localhost",
    "https://example.com",
    "example.com/path",
    "user:password@example.com",
    "example.com?target=other",
  ]) {
    expect(() => productionSiteOrigin(hostname)).toThrow();
  }
  expect(() => siteOriginFrom({ VERCEL: "1" })).toThrow();
});

test("browser URL uses public configuration while T3 blocks server variables", () => {
  const result = Bun.spawnSync(
    [
      process.execPath,
      "--eval",
      `
      globalThis.window = {};
      const { env } = await import("./src/env.ts");
      const { CANONICAL_SITE_URL } = await import("./src/lib/site-url.ts");
      const blocked = ["DATABASE_URL", "GITHUB_TOKENS", "VERCEL_PROJECT_PRODUCTION_URL"].every(key => {
        try { env[key]; return false; } catch { return true; }
      });
      console.log(JSON.stringify({ origin: CANONICAL_SITE_URL, blocked }));
    `,
    ],
    { env: { NEXT_PUBLIC_SITE_ORIGIN: "https://example.com" } }
  );
  expect(result.exitCode).toBe(0);
  expect(JSON.parse(result.stdout.toString())).toEqual({
    origin: "https://example.com",
    blocked: true,
  });
});
