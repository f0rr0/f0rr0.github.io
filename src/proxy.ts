import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/env";

export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname !== "/_r7k2" && !url.pathname.startsWith("/_r7k2/")) {
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.replace(/\/+$/, "");
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  url.pathname = url.pathname.slice("/_r7k2".length) || "/";
  const region = env.NEXT_PUBLIC_POSTHOG_REGION;
  url.hostname =
    url.pathname.startsWith("/static/") || url.pathname.startsWith("/array/")
      ? `${region}-assets.i.posthog.com`
      : `${region}.i.posthog.com`;
  url.protocol = "https:";
  url.port = "";
  const headers = new Headers(request.headers);
  headers.set("host", url.hostname);
  // Same-origin requests can carry site credentials and unsanitized page URLs.
  headers.delete("cookie");
  headers.delete("authorization");
  headers.delete("referer");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/_r7k2/:path*", "/:path+/"],
};
