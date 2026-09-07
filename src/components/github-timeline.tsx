import {
  GitHubActivityLiveProvider,
  GitHubActivityStatus,
} from "@/components/github-activity-status";
import { GitHubTimelinePager } from "@/components/github-timeline-pager";
import { SiteSection } from "@/components/site-page";
import { getInitialGitHubActivity } from "@/lib/github-activity-feed";

export async function GitHubTimeline({
  preview = false,
}: Readonly<{ preview?: boolean }>) {
  const initialPage = await getInitialGitHubActivity();
  return (
    <SiteSection
      className={preview ? "home-section" : ""}
      heading={preview ? "h2" : "h1"}
      headingClassName={preview ? undefined : "sr-only"}
      href={preview ? "/work-log" : undefined}
      id="timeline"
      title="Work log"
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
