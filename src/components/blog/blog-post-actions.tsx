import { FileTextIcon } from "lucide-react";

export function BlogPostActions({
  markdownHref,
}: Readonly<{ markdownHref: string }>) {
  return (
    <nav
      data-analytics-placement="article-actions"
      aria-label="Post actions"
      className="flex shrink-0 items-center"
    >
      <a
        className="site-text-link inline-flex min-h-11 w-11 items-center justify-center gap-1.5 rounded-sm sm:w-auto text-sm text-muted-foreground hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="View this post as Markdown"
        title="View as Markdown"
        href={markdownHref}
        rel="noopener noreferrer"
        target="_blank"
      >
        <FileTextIcon aria-hidden="true" className="size-3.5" />
        <span className="hidden sm:inline">Markdown</span>
      </a>
    </nav>
  );
}
