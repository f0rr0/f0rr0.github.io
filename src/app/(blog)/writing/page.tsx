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
    canonical: "/writing",
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
    title: `${siteConfig.name} Writing`,
    type: "website",
    url: publicUrl("/writing"),
  },
  title: "Writing",
  twitter: {
    card: "summary",
    description,
    images: [siteConfig.author.image],
    title: `${siteConfig.name} Writing`,
  },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd data={buildBlogCollectionJsonLd(posts)} />
      <SiteMain>
        <h1 className="sr-only">Writing</h1>
        <WritingList posts={posts} />
      </SiteMain>
    </>
  );
}
