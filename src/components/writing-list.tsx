import Image from "next/image";
import Link from "next/link";

import { LocalDateTime } from "@/components/local-date-time";
import {
  HoverCardGroup,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { findMetadataImageAsset } from "@/lib/blog-utils";
import type { BlogPost } from "@/lib/blog-utils";

export async function WritingList({ posts }: Readonly<{ posts: BlogPost[] }>) {
  const entries = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      hasPreview:
        (await findMetadataImageAsset(post.importPath, "opengraph")) !== null,
    }))
  );
  return entries.length === 0 ? (
    <p className="text-muted-foreground">No published writing yet.</p>
  ) : (
    <HoverCardGroup>
      <ol className="site-list">
        {entries.map((post) => (
          <li key={post.slug}>
            <HoverCardTrigger
              payload={
                <HoverCardContent>
                  {post.hasPreview ? (
                    <Image
                      alt=""
                      className="aspect-[1200/630] w-full border-b object-cover"
                      height={168}
                      src={`/blog/${post.slug}/share-image`}
                      unoptimized
                      width={320}
                    />
                  ) : null}
                  <div className="space-y-2 p-4">
                    <p className="font-medium">{post.metadata.title}</p>
                    <p className="text-muted-foreground">
                      {post.metadata.summary}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <LocalDateTime dateTime={post.date.toISOString()} /> ·{" "}
                      {post.readingTime}
                      {post.metadata.draft === true ? " · Draft preview" : ""}
                    </p>
                  </div>
                </HoverCardContent>
              }
              className="site-row group"
              render={<Link href={`/blog/${post.slug}`} prefetch={false} />}
            >
              <span className="site-row-title group-hover:underline">
                {post.metadata.title}
              </span>
              <LocalDateTime
                className="site-row-meta hidden sm:flex"
                dateTime={post.date.toISOString()}
              />
            </HoverCardTrigger>
          </li>
        ))}
      </ol>
    </HoverCardGroup>
  );
}
