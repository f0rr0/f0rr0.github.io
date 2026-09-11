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

export const buildAssistantLinks = (question: string) => {
  const prompt = encodeURIComponent(question);

  return {
    chatGpt: `https://chatgpt.com/?q=${prompt}`,
    claude: `https://claude.ai/new?q=${prompt}`,
    googleAi: `https://www.google.com/search?udm=50&q=${prompt}`,
    perplexity: `https://www.perplexity.ai/search?q=${prompt}`,
  };
};

export const buildAssistantActions = (prompt: string) => {
  const links = buildAssistantLinks(prompt);
  return [
    { label: "ChatGPT", href: links.chatGpt, iconSrc: "/brands/chatgpt.svg" },
    { label: "Claude", href: links.claude, iconSrc: "/brands/claude.svg" },
    {
      label: "Google AI Mode",
      href: links.googleAi,
      iconSrc: "/brands/google.svg",
    },
    {
      label: "Perplexity",
      href: links.perplexity,
      iconSrc: "/brands/perplexity.svg",
    },
  ];
};
