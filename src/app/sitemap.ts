import type { MetadataRoute } from "next";

import { resumeData } from "@/content/resume";
import { getBlogPosts } from "@/lib/blog-utils";
import { publicUrl } from "@/lib/site";

const newestDate = (dates: Date[]) =>
  dates.toSorted((a, b) => b.getTime() - a.getTime()).at(0);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const resumeUpdatedAt = new Date(resumeData.lastUpdated);
  const latestPostDate =
    newestDate(posts.map((post) => post.date)) ?? resumeUpdatedAt;
  const siteUpdatedAt =
    newestDate([resumeUpdatedAt, latestPostDate]) ?? resumeUpdatedAt;

  return [
    {
      lastModified: siteUpdatedAt,
      url: publicUrl("/"),
    },
    {
      lastModified: resumeUpdatedAt,
      url: publicUrl("/journey"),
    },
    {
      url: publicUrl("/work"),
    },
    {
      lastModified: resumeUpdatedAt,
      url: publicUrl("/resume/sid-jain-resume.pdf"),
    },
    {
      lastModified: latestPostDate,
      url: publicUrl("/writing"),
    },
    ...posts.map((post) => ({
      lastModified: post.date,
      url: publicUrl(`/writing/${post.slug}`),
    })),
  ];
}
