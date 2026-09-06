import { resumeData } from "@/content/resume";
import { env } from "@/env";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

const withProtocol = (value: string) => {
  const normalized = value.trim().replace(/\/+$/, "");

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }
  return normalized.includes("localhost")
    ? `http://${normalized}`
    : `https://${normalized}`;
};

const resolveSiteUrl = () => {
  if (env.NODE_ENV === "development") {
    const devPort = env.PORT ?? env.NEXT_PUBLIC_PORT ?? "3000";
    return `http://localhost:${devPort}`;
  }

  if (env.VERCEL_ENV === "production") {
    if (
      env.VERCEL_PROJECT_PRODUCTION_URL !== undefined &&
      env.VERCEL_PROJECT_PRODUCTION_URL !== ""
    ) {
      return withProtocol(env.VERCEL_PROJECT_PRODUCTION_URL);
    }
    if (env.VERCEL_URL !== undefined && env.VERCEL_URL !== "") {
      return withProtocol(env.VERCEL_URL);
    }
  }

  if (env.VERCEL_URL !== undefined && env.VERCEL_URL !== "") {
    return withProtocol(env.VERCEL_URL);
  }

  if (
    env.VERCEL_PROJECT_PRODUCTION_URL !== undefined &&
    env.VERCEL_PROJECT_PRODUCTION_URL !== ""
  ) {
    return withProtocol(env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  return CANONICAL_SITE_URL;
};

export const siteConfig = {
  author: {
    bio: resumeData.summary,
    handle: "f0rr0",
    image: "/resume/sid-jain-profile.png",
    name: resumeData.person.name,
    role: resumeData.person.role,
  },
  description: `${resumeData.person.name}. ${resumeData.summary}`,
  language: "en-US",
  locale: "en_US",
  name: "Sid Jain",
  shortName: "F0RR0",
  url: resolveSiteUrl(),
};

const absoluteUrl = (path: string, baseUrl = siteConfig.url) =>
  new URL(path, baseUrl).toString();

export const publicUrl = (path: string) =>
  absoluteUrl(
    path,
    siteConfig.url.includes("localhost") ? CANONICAL_SITE_URL : siteConfig.url
  );
