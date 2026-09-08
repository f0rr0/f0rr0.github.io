// Match Next.js server bootstrap before importing its runtime in Bun.
import "next/dist/server/node-environment-baseline";
import { expect, test } from "bun:test";

import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { NextRequest } from "next/server";

import { config, proxy } from "../src/proxy";

test("analytics proxy preserves collector paths and routes assets without forwarding site secrets", () => {
  for (const [path, destination] of [
    [
      "/_r7k2/e/?compression=gzip-js",
      "https://us.i.posthog.com/e/?compression=gzip-js",
    ],
    [
      "/_r7k2/static/array.js",
      "https://us-assets.i.posthog.com/static/array.js",
    ],
    [
      "/_r7k2/array/public/config.js",
      "https://us-assets.i.posthog.com/array/public/config.js",
    ],
  ] as const) {
    const request = new NextRequest(`https://f0rr0.dev${path}`, {
      headers: {
        cookie: "session=private",
        authorization: "Bearer private",
        referer: "https://f0rr0.dev/?secret=private",
        "content-type": "application/json",
        "user-agent": "test-browser",
      },
    });
    const response = proxy(request);
    expect(response.headers.get("x-middleware-rewrite")).toBe(destination);
    expect(response.headers.get("location")).toBeNull();
    for (const name of ["cookie", "authorization", "referer"]) {
      expect(response.headers.get(`x-middleware-request-${name}`)).toBeNull();
      expect(
        response.headers.get("x-middleware-override-headers")?.split(",")
      ).not.toContain(name);
    }
    expect(response.headers.get("x-middleware-request-user-agent")).toBe(
      "test-browser"
    );
    expect(response.headers.get("x-middleware-request-content-type")).toBe(
      "application/json"
    );
  }
});

test("ordinary trailing slashes stay canonical without running the proxy on ordinary page requests", () => {
  for (const [url, expected] of [
    ["/_r7k2/e/", true],
    ["/_r7k2/static/array.js", true],
    ["/journey/", true],
    ["/writing/example/", true],
    ["/journey", false],
    ["/_r7k2-other", false],
    ["/", false],
  ] as const) {
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig: { skipTrailingSlashRedirect: true },
        url,
      })
    ).toBe(expected);
  }
  const response = proxy(
    new NextRequest("https://f0rr0.dev/journey/?utm_source=github")
  );
  expect(response.status).toBe(308);
  expect(response.headers.get("location")).toBe(
    "https://f0rr0.dev/journey?utm_source=github"
  );
});
