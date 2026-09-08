import { expect, test } from "bun:test";

test("deployment aliases never replace public identity, and only previews receive noindex headers", () => {
  for (const deployment of ["preview", "production"] as const) {
    const result = Bun.spawnSync(
      [
        process.execPath,
        "--eval",
        `const { default: config } = await import("./next.config.ts");
         const { siteConfig, publicUrl } = await import("./src/lib/site.ts");
         console.log(JSON.stringify({ origin: siteConfig.url, article: publicUrl("/writing/example"), headers: await config.headers(), redirects: await config.redirects(), rewrites: await config.rewrites() }));`,
      ],
      {
        env: {
          ...process.env,
          NODE_ENV: "production",
          VERCEL_ENV: deployment,
          VERCEL_URL: "deployment-alias.vercel.app",
          VERCEL_PROJECT_PRODUCTION_URL: "project-alias.vercel.app",
        },
      }
    );
    expect(result.exitCode).toBe(0);
    const output = JSON.parse(result.stdout.toString());
    expect(output.origin).toBe("https://f0rr0.dev");
    expect(output.article).toBe("https://f0rr0.dev/writing/example");
    expect(output.redirects).toEqual([
      {
        source: "/blog/:path*",
        destination: "/writing/:path*",
        permanent: true,
      },
      {
        source: "/work-log/:path*",
        destination: "/work/:path*",
        permanent: true,
      },
      { source: "/resume", destination: "/journey", permanent: true },
    ]);
    expect(output.rewrites).toEqual([
      { source: "/writing/:slug.md", destination: "/writing/:slug/markdown" },
    ]);
    expect(output.headers).toEqual(
      deployment === "preview"
        ? [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex" }],
            },
          ]
        : []
    );
  }
});
