import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { env } from "./src/env";
import { siteOriginFrom } from "./src/lib/site-url";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_ORIGIN: siteOriginFrom(env),
    NEXT_PUBLIC_DEPLOYMENT_ENV: env.VERCEL_ENV ?? env.NODE_ENV ?? "development",
  },
  headers: async () =>
    env.VERCEL_ENV === "preview"
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex" }],
          },
        ]
      : [],
  experimental: {
    useTypeScriptCli: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "files.openai.com",
        pathname: "/content",
        protocol: "https",
      },
    ],
  },
  outputFileTracingExcludes: {
    "/*": ["./next.config.ts"],
  },
  outputFileTracingIncludes: {
    "/": ["./src/content/**/*"],
    "/writing/[slug]": ["./src/content/**/*"],
    "/writing/[slug]/markdown": ["./src/content/**/*"],
    "/writing/[slug]/opengraph-image": ["./src/content/**/*"],
    "/writing/[slug]/share-image": ["./src/content/**/*"],
    "/writing/[slug]/twitter-image": ["./src/content/**/*"],
    "/llms.txt": ["./src/content/**/*"],
    "/llms-full.txt": ["./src/content/**/*"],
    "/rss.xml": ["./src/content/**/*"],
    "/sitemap.xml": ["./src/content/**/*"],
  },
  reactCompiler: true,
  // The proxy preserves collector slashes and redirects ordinary page slashes.
  skipTrailingSlashRedirect: true,
  redirects: async () => [
    { source: "/blog/:path*", destination: "/writing/:path*", permanent: true },
    {
      source: "/work-log/:path*",
      destination: "/work/:path*",
      permanent: true,
    },
    { source: "/resume", destination: "/journey", permanent: true },
  ],
  rewrites: async () => [
    {
      destination: "/writing/:slug/markdown",
      source: "/writing/:slug.md",
    },
  ],
};

const remarkStaticImageImports = new URL(
  "src/lib/remark-static-image-imports.mjs",
  import.meta.url
).pathname;
const remarkMermaid = new URL("src/lib/remark-mermaid.mjs", import.meta.url)
  .pathname;
const remarkEmbedGitHub = new URL(
  "src/lib/remark-embed-github.mjs",
  import.meta.url
).pathname;

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
          },
        },
      ],
      [
        "rehype-pretty-code",
        {
          defaultLang: {
            block: "plaintext",
          },
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
          keepBackground: false,
        },
      ],
    ],
    remarkPlugins: [
      remarkStaticImageImports,
      remarkEmbedGitHub,
      remarkMermaid,
      "remark-gfm",
    ],
  },
});

export default withMDX(nextConfig);
