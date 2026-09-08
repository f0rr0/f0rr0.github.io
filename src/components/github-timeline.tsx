import {
  GitHubActivityLiveProvider,
  GitHubActivityStatus,
} from "@/components/github-activity-status";
import { GitHubTimelinePager } from "@/components/github-timeline-pager";
import { SiteSection } from "@/components/site-page";
import type { PublicGitHubActivityPage } from "@/lib/github-activity-types";

export function GitHubTimeline({
  initialPage,
  preview = false,
}: Readonly<{ initialPage: PublicGitHubActivityPage; preview?: boolean }>) {
  return (
    <SiteSection
      className={preview ? "home-section mt-12 [scroll-margin-top:2rem]" : ""}
      heading={preview ? "h2" : "h1"}
      headingClassName={preview ? undefined : "sr-only"}
      href={preview ? "/work" : undefined}
      id="timeline"
      title="Work"
    >
      <GitHubActivityLiveProvider
        feedRevision={initialPage.head.feedRevision}
        orderingRevision={initialPage.orderingRevision}
      >
        <GitHubActivityStatus initialHead={initialPage.head} />
        <div className="grid gap-4">
          <GitHubTimelinePager
            initialPage={initialPage}
            preview={preview}
            now={new Date().toISOString()}
            key={`${initialPage.head.feedRevision}:${initialPage.orderingRevision}`}
          />
        </div>
      </GitHubActivityLiveProvider>
    </SiteSection>
  );
}
