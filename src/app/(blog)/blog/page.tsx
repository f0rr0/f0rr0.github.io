import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { SiteMain } from "@/components/site-page";
import { WritingList } from "@/components/writing-list";
import { getBlogPosts } from "@/lib/blog-utils";
import { publicUrl, siteConfig } from "@/lib/site";
import { buildBlogCollectionJsonLd } from "@/lib/structured-data";

const description = `Notes on what ${siteConfig.author.name} is building and learning.`;

export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  description,
  openGraph: {
    description,
    images: [siteConfig.author.image],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Sid Jain Blog",
    type: "website",
    url: publicUrl("/blog"),
  },
  title: "Blog",
  twitter: {
    card: "summary",
    description,
    images: [siteConfig.author.image],
    title: "Sid Jain Blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd data={buildBlogCollectionJsonLd(posts)} />
      <SiteMain>
        <h1 className="sr-only">Blog</h1>
        <WritingList posts={posts} />
      </SiteMain>
    </>
  );
}
