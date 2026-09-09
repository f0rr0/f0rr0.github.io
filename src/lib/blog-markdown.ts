import type { BlogPost } from "@/lib/blog-utils";

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

const FENCE = /^ {0,3}(`{3,}|~{3,})/;
const MARKDOWN_IMAGE = /(!\[[^\]]*\]\()(\.\/[^\s)]+)(\))/g;
const IMAGE_SOURCE = /(\bsrc=["'])(\.\/[^"']+)(["'])/g;

export const resolveBlogMarkdownImages = (
  body: string,
  images: Readonly<Record<string, string>>,
  canonicalUrl: string
) => {
  let fence = "";

  // Authored MDX uses inline image URLs and quoted src attributes; keep fenced code verbatim.
  return body
    .split("\n")
    .map((line) => {
      const marker = FENCE.exec(line)?.[1];
      if (marker !== undefined) {
        if (!fence) {
          fence = marker;
        } else if (
          marker.startsWith(fence.charAt(0)) &&
          marker.length >= fence.length &&
          line.trim() === marker
        ) {
          fence = "";
        }
        return line;
      }
      if (fence) {
        return line;
      }
      const replace = (
        _match: string,
        before: string,
        url: string,
        after: string
      ) => {
        const src = images[url];
        if (!src) {
          throw new Error(`A Markdown image has no compiled asset: ${url}`);
        }
        return `${before}${new URL(src, canonicalUrl)}${after}`;
      };
      return line
        .replace(MARKDOWN_IMAGE, replace)
        .replace(IMAGE_SOURCE, replace);
    })
    .join("\n");
};

export const buildBlogPostMarkdown = ({
  body,
  canonicalUrl,
  post,
}: {
  body: string;
  canonicalUrl: string;
  post: BlogPost;
}) => {
  const { metadata } = post;
  const dates = [`Published ${isoDate(post.date)}`];

  if (post.updatedAt !== undefined) {
    dates.push(`updated ${isoDate(post.updatedAt)}`);
  }

  return `# ${metadata.title}

> ${metadata.summary}

${metadata.author} · ${dates.join(" · ")}

Canonical post: ${canonicalUrl}

---

${resolveBlogMarkdownImages(body, post.images ?? {}, canonicalUrl).trim()}
`;
};
