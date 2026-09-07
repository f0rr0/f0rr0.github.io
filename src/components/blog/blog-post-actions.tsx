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
      aria-label="Post actions"
      className="flex items-center gap-4 border-t border-border sm:border-t-0"
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Ask AI about ${title}`}
          className="site-text-link"
        >
          <SparklesIcon aria-hidden="true" className="size-3.5" />
          Ask AI
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
        className="site-text-link"
        aria-label="View this post as Markdown"
        href={markdownHref}
        {...externalLinkProps}
      >
        <FileTextIcon aria-hidden="true" className="size-3.5" />
        Markdown
      </a>
    </nav>
  );
}
