"use client";

import { FileTextIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

import { DisclosureChevron } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildAskAiLinks, buildAskAiPrompt } from "@/lib/ask-ai";

interface BlogPostActionsProps {
  markdownHref: string;
  sourceUrl: string;
  title: string;
}

const externalLinkProps = {
  rel: "noopener noreferrer",
  target: "_blank",
} as const;

export function BlogPostActions({
  markdownHref,
  sourceUrl,
  title,
}: Readonly<BlogPostActionsProps>) {
  const context = { sourceUrl, title };
  const links = buildAskAiLinks(context);

  const copyPromptForGemini = async () => {
    if (navigator.clipboard === undefined) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildAskAiPrompt(context));
    } catch {
      // Gemini still opens when clipboard access is unavailable.
    }
  };

  return (
    <nav
      data-analytics-placement="article-actions"
      aria-label="Post actions"
      className="flex shrink-0 items-center sm:gap-4"
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Ask AI about ${title}`}
          title="Ask AI"
          className="[&_.disclosure-chevron]:hidden sm:[&_.disclosure-chevron]:block site-text-link inline-flex min-h-11 w-11 items-center justify-center gap-1.5 rounded-sm sm:w-auto text-sm text-muted-foreground hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <SparklesIcon aria-hidden="true" className="size-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
          <DisclosureChevron />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          aria-label="Choose an AI assistant"
          className="w-52"
          sideOffset={6}
        >
          <DropdownMenuLinkItem
            aria-label="Open this post in ChatGPT"
            closeOnClick
            data-analytics-placement="article-actions"
            href={links.chatGpt}
            {...externalLinkProps}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="size-4 dark:invert"
              height={16}
              src="/brands/chatgpt.svg"
              width={16}
            />
            ChatGPT
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem
            aria-label="Open this post in Claude"
            closeOnClick
            data-analytics-placement="article-actions"
            href={links.claude}
            {...externalLinkProps}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="size-4"
              height={16}
              src="/brands/claude.svg"
              width={16}
            />
            Claude
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem
            aria-label="Copy the prompt and open this post in Gemini"
            closeOnClick
            data-analytics-placement="article-actions"
            href={links.gemini}
            onClick={() => void copyPromptForGemini()}
            {...externalLinkProps}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="size-4"
              height={16}
              src="/brands/gemini.svg"
              width={16}
            />
            Gemini
            <span className="ml-auto text-xs text-muted-foreground">
              copies prompt
            </span>
          </DropdownMenuLinkItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <a
        className="site-text-link inline-flex min-h-11 w-11 items-center justify-center gap-1.5 rounded-sm sm:w-auto text-sm text-muted-foreground hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="View this post as Markdown"
        title="View as Markdown"
        href={markdownHref}
        {...externalLinkProps}
      >
        <FileTextIcon aria-hidden="true" className="size-3.5" />
        <span className="hidden sm:inline">Markdown</span>
      </a>
    </nav>
  );
}
