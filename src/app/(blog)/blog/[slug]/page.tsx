import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { ArticleProse } from "@/components/blog/article-prose";
import { BlogPostActions } from "@/components/blog/blog-post-actions";
import { JsonLd } from "@/components/json-ld";
import MDXImage from "@/components/mdx/MDXImage";
import { SiteMain } from "@/components/site-page";
import { Separator } from "@/components/ui/separator";
import {
  getBlogPost,
  getBlogPosts,
  importBlogPostModule,
} from "@/lib/blog-utils";
import { formatDate } from "@/lib/date";
import { publicUrl, siteConfig } from "@/lib/site";
import { buildBlogPostingJsonLd } from "@/lib/structured-data";

type PageParams = Promise<{ slug: string }>;

interface BlogPostModule {
  default: ComponentType<{ components?: MDXComponents }>;
  metadata: unknown;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  const { metadata, date, updatedAt } = post;
  const url = publicUrl(`/blog/${slug}`);
  const shareImageUrl = publicUrl(`/blog/${slug}/share-image`);

  return {
    alternates: {
      canonical: url,
      types: {
        "text/markdown": publicUrl(`/blog/${slug}.md`),
        "application/rss+xml": publicUrl("/rss.xml"),
      },
    },
    description: metadata.summary,
    keywords: metadata.tags,
    openGraph: {
      authors: [metadata.author],
      description: metadata.summary,
      locale: siteConfig.locale,
      images: [{ alt: metadata.title, url: shareImageUrl }],
      modifiedTime: updatedAt?.toISOString(),
      publishedTime: date.toISOString(),
      siteName: siteConfig.name,
      title: metadata.title,
      type: "article",
      url,
    },
    title: metadata.title,
    twitter: {
      card: "summary_large_image",
      description: metadata.summary,
      images: [shareImageUrl],
      title: metadata.title,
    },
  };
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { importPath, metadata, date, readingTime } = post;

  const module = await importBlogPostModule<BlogPostModule>(importPath).catch(
    () => null
  );

  if (module?.default === undefined) {
    notFound();
  }

  const Content = module.default;
  const url = publicUrl(`/blog/${slug}`);
  const jsonLd = buildBlogPostingJsonLd({
    image: publicUrl(`/blog/${slug}/share-image`),
    post,
    url,
  });

  const mdxComponents = {
    Image: (props) => <MDXImage {...props} />,
    img: (props) => <MDXImage {...props} />,
  } satisfies MDXComponents;

  return (
    <SiteMain className="relative">
      <JsonLd data={jsonLd} />
      <article className="flex flex-col gap-8">
        <header className="flex flex-col">
          <h1 className="section-title mb-4 font-serif text-2xl font-normal text-foreground text-balance">
            {metadata.title}
          </h1>
          <div
            className="flex items-center justify-between gap-3 border-y border-border whitespace-nowrap"
            data-slot="blog-post-rail"
          >
            <div className="flex min-h-11 shrink-0 items-center gap-2 text-xs text-muted-foreground sm:gap-3">
              <time dateTime={date.toISOString()}>{formatDate(date)}</time>
              <Separator orientation="vertical" />
              <span>{readingTime}</span>
            </div>
            <BlogPostActions
              markdownHref={`/blog/${slug}.md`}
              sourceUrl={publicUrl(`/blog/${slug}.md`)}
              title={metadata.title}
            />
          </div>
        </header>
        <ArticleProse>
          <Content components={mdxComponents} />
        </ArticleProse>
      </article>
    </SiteMain>
  );
}
