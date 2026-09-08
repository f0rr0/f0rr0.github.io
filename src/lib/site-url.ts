interface SiteEnvironment {
  VERCEL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  PORT?: string;
  NEXT_PUBLIC_PORT?: string;
}

export const productionSiteOrigin = (hostname: string | undefined) => {
  const host = hostname?.trim();
  if (host === undefined || host.length === 0) {
    throw new Error(
      "VERCEL_PROJECT_PRODUCTION_URL is required for production URLs."
    );
  }
  const url = new URL(`https://${host}`);
  if (
    url.host !== host ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.hostname === "localhost" ||
    url.hostname.endsWith(".localhost")
  ) {
    throw new Error(
      "VERCEL_PROJECT_PRODUCTION_URL must be a production hostname."
    );
  }
  return url.origin;
};

export const siteOriginFrom = (environment: SiteEnvironment) => {
  if (
    (environment.VERCEL_PROJECT_PRODUCTION_URL?.trim().length ?? 0) > 0 ||
    environment.VERCEL === "1"
  ) {
    return productionSiteOrigin(environment.VERCEL_PROJECT_PRODUCTION_URL);
  }
  return new URL(
    `http://localhost:${(environment.PORT?.trim() ?? "") || (environment.NEXT_PUBLIC_PORT?.trim() ?? "") || "3000"}`
  ).origin;
};

// Next config supplies this public value to browser bundles. Scripts use Vercel's original variable.
export const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  siteOriginFrom({
    VERCEL: process.env.VERCEL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    PORT: process.env.PORT,
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
  });
