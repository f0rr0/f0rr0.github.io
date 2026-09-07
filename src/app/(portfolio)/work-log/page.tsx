import type { Metadata } from "next";

import { GitHubTimeline } from "@/components/github-timeline";
import { SiteMain } from "@/components/site-page";
import { SiteShell } from "@/components/site-shell";
import { publicUrl, siteConfig } from "@/lib/site";

const description =
  "A day-by-day record of what Sid Jain is building, fixing, and shipping.";

export const metadata: Metadata = {
  alternates: { canonical: "/work-log" },
  description,
  openGraph: {
    description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Sid Jain Work Log",
    type: "website",
    url: publicUrl("/work-log"),
  },
  title: "Work Log",
  twitter: {
    card: "summary",
    description,
    title: "Sid Jain Work Log",
  },
};

export const dynamic = "force-dynamic";

export default function WorkLogPage() {
  return (
    <SiteShell activeHref="/work-log">
      <SiteMain>
        <GitHubTimeline />
      </SiteMain>
    </SiteShell>
  );
}
