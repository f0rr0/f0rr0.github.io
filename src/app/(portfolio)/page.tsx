import { Star, GitFork } from "lucide-react";
import type { Metadata } from "next";

import { CodexStats } from "@/components/codex-stats";
import { GitHubTimeline } from "@/components/github-timeline";
import { LanguageIcon } from "@/components/language-icon";
import { SiteMain, SiteSection } from "@/components/site-page";
import { SiteShell } from "@/components/site-shell";
import {
  HoverCardGroup,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { WritingList } from "@/components/writing-list";
import {
  featuredProjectNames,
  homeIntroduction,
  projectEditorial,
} from "@/content/home";
import { resumeData } from "@/content/resume";
import { getBlogPosts } from "@/lib/blog-utils";
import { getPublicCodexStats } from "@/lib/codex/public-stats";
import { getInitialGitHubActivity } from "@/lib/github-activity-feed";
import { getGitHubProfile } from "@/lib/github-profile";
import type { GitHubProfile } from "@/lib/github-profile";
import { publicUrl, siteConfig } from "@/lib/site";

const { description } = siteConfig;
const title = `${siteConfig.author.name} — ${siteConfig.author.role}`;
const images = [
  { alt: title, height: 630, url: "/opengraph-image", width: 1200 },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description,
  openGraph: {
    description,
    images,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    type: "website",
    url: publicUrl("/"),
  },
  title: { absolute: title },
  twitter: { card: "summary_large_image", description, images, title },
};

export const dynamic = "force-dynamic";

function OpenSource({ github }: Readonly<{ github: GitHubProfile }>) {
  const projects = featuredProjectNames.flatMap((name) => {
    const project = github.projects.find(
      (candidate) => candidate.name === name
    );
    return project === undefined ? [] : [project];
  });

  return projects.length === 0 ? null : (
    <SiteSection id="open-source" title="Open source">
      <HoverCardGroup>
        <ol className="site-list">
          {projects.map((project) => (
            <li key={project.name}>
              <HoverCardTrigger
                payload={
                  <HoverCardContent side="left">
                    <div className="p-4">
                      <p className="break-words">{project.name}</p>
                      <p className="mt-2 text-muted-foreground">
                        {projectEditorial[
                          project.name as keyof typeof projectEditorial
                        ]?.description ?? project.description}
                      </p>
                      <div className="site-row-meta mt-2 justify-start">
                        {project.language === null ? null : (
                          <LanguageIcon language={project.language} />
                        )}
                        {project.stars === null ? null : (
                          <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${project.stars} stars`}
                          >
                            <Star aria-hidden="true" className="size-3.5" />
                            {project.stars}
                          </span>
                        )}
                        {project.forks === null ? null : (
                          <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${project.forks} forks`}
                          >
                            <GitFork aria-hidden="true" className="size-3.5" />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                }
                className="site-row group"
                href={project.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="site-row-title group-hover:underline">
                  {project.name}
                </span>
                {project.stars === null ? null : (
                  <span
                    aria-label={`${String(project.stars)} GitHub stars`}
                    className="site-row-meta"
                  >
                    <Star aria-hidden="true" className="size-3" />
                    {project.stars}
                  </span>
                )}
              </HoverCardTrigger>
            </li>
          ))}
        </ol>
      </HoverCardGroup>
    </SiteSection>
  );
}

export default async function Home() {
  const [codexStats, activity, posts, github] = await Promise.all([
    getPublicCodexStats(),
    getInitialGitHubActivity(),
    getBlogPosts(),
    getGitHubProfile(),
  ]);
  return (
    <SiteShell currentPath="/">
      <SiteMain>
        <h1 className="sr-only">{resumeData.person.name}</h1>
        <p>{homeIntroduction}</p>

        <SiteSection id="writing" title="Writing">
          <WritingList posts={posts.slice(0, 3)} />
        </SiteSection>

        <GitHubTimeline initialPage={activity} preview />
        {codexStats === null ? (
          <SiteSection id="token-log" title="Token log">
            <p className="py-2.5 text-muted-foreground">
              Token activity is unavailable right now.
            </p>
          </SiteSection>
        ) : (
          <CodexStats stats={codexStats} />
        )}

        <OpenSource github={github} />
      </SiteMain>
    </SiteShell>
  );
}
