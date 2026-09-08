import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  url.hostname =
    url.pathname.startsWith("/static/") || url.pathname.startsWith("/array/")
      ? "us-assets.i.posthog.com"
      : "us.i.posthog.com";
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
