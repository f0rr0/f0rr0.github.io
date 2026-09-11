interface AskAiContext {
  sourceUrl: string;
  title: string;
}

export interface AskAiPageContext {
  label: "This article" | "My writing";
  title: string;
  prompt: string;
}

export const buildAskAiPrompt = ({ sourceUrl, title }: AskAiContext) =>
  `Read "${title}" at ${sourceUrl}. Answer my questions using the post as your primary source. Start with a brief summary, cite the post, and tell me if you cannot access it.`;

export const buildAssistantActions = (question: string) => {
  const prompt = encodeURIComponent(question);
  return [
    {
      label: "ChatGPT",
      href: `https://chatgpt.com/?q=${prompt}`,
      iconSrc: "/brands/chatgpt.svg",
    },
    {
      label: "Claude",
      href: `https://claude.ai/new?q=${prompt}`,
      iconSrc: "/brands/claude.svg",
    },
    {
      label: "Google AI Mode",
      href: `https://www.google.com/search?udm=50&q=${prompt}`,
      iconSrc: "/brands/google.svg",
    },
    {
      label: "Perplexity",
      href: `https://www.perplexity.ai/search?q=${prompt}`,
      iconSrc: "/brands/perplexity.svg",
    },
  ];
};
