interface AskAiContext {
  sourceUrl: string;
  title: string;
}

export const buildAskAiPrompt = ({ sourceUrl, title }: AskAiContext) =>
  `Read "${title}" at ${sourceUrl}. Answer my questions using the post as your primary source.`;

export const buildAssistantLinks = (question: string) => {
  const prompt = encodeURIComponent(question);

  return {
    chatGpt: `https://chatgpt.com/?q=${prompt}`,
    claude: `https://claude.ai/new?q=${prompt}`,
    gemini: `https://gemini.google.com/app?q=${prompt}`,
    googleAi: `https://www.google.com/search?udm=50&q=${prompt}`,
    perplexity: `https://www.perplexity.ai/search?q=${prompt}`,
  };
};

export const buildAskAiLinks = (context: AskAiContext) =>
  buildAssistantLinks(buildAskAiPrompt(context));
