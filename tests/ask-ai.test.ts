import { describe, expect, test } from "bun:test";

import { buildAskAiLinks, buildAskAiPrompt } from "../src/lib/ask-ai.ts";
import { buildAskAgentLinks } from "../src/lib/resume.ts";
import { publicUrl } from "../src/lib/site.ts";

const context = {
  sourceUrl: "https://f0rr0.dev/writing/a-post.md",
  title: "A post & its source",
};

describe("Ask AI links", () => {
  test("gives every provider the same canonical context", () => {
    const prompt = buildAskAiPrompt(context);
    const links = buildAskAiLinks(context);

    expect(prompt).toBe(
      'Read "A post & its source" at https://f0rr0.dev/writing/a-post.md. Answer my questions using the post as your primary source.'
    );
    expect(new URL(links.chatGpt).searchParams.get("q")).toBe(prompt);
    expect(new URL(links.claude).searchParams.get("q")).toBe(prompt);
    expect(new URL(links.gemini).searchParams.get("q")).toBe(prompt);
  });
});

test("portfolio assistants share the visible prompt and use regular web chats", () => {
  const { actions, prompt } = buildAskAgentLinks();
  expect(prompt).toContain(publicUrl("/llms.txt"));
  expect(prompt).toContain("Cite your sources");
  expect(actions.map((action) => action.label)).toEqual([
    "ChatGPT",
    "Claude",
    "Google AI Mode",
    "Perplexity",
  ]);
  for (const action of actions) {
    const url = new URL(action.href);
    expect(url.protocol).toBe("https:");
    expect(url.searchParams.get("q")).toBe(prompt);
    expect(url.pathname).not.toBe("/code");
  }
  const google = new URL(actions[2].href);
  expect(google.hostname).toBe("www.google.com");
  expect(google.searchParams.get("udm")).toBe("50");
});
