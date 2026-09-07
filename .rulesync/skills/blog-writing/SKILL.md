---
name: blog-writing
description: Write, review, and revise Sid Jain's personal technical blog posts as narrative prose in his own voice. Use for project stories, engineering retrospectives, and personal essays; preserve the period and personality of older posts. Covers selective code, diagrams, illustrations, and source embeds without turning a story into a repository audit.
---

# Blog writing

A post is my account of something I did, noticed, or came to understand. It should feel like talking to an interested friend who also builds things: personal, technically curious, and worth reading for the prose. Accuracy is part of the editing work. The reader should not have to sit through that work.

## Find the story before changing the sentences

Read the whole draft, the author's supplied context, and the relevant artifacts. Find the small human reason for the project and the discovery that makes it worth telling. A reader can understand programming without knowing this particular system; explain the unfamiliar mechanism when it starts to matter.

Privately distinguish what happened, what was tried, and what is merely proposed. Check load-bearing details against source or history. Do not turn those notes into a public evidence ledger. If a claim cannot be supported, narrow or remove it; ask the author only when the missing detail is essential to the story.

Keep the author's existing anecdotes, opinions, jokes, and turns of phrase where they work. Never manufacture a late night, a conversation, an emotion, a failed experiment, an observation, or a happy outcome. An illustrative scenario is useful, but introduce it as an example rather than a memory. Prefer a real technical oddity to invented scene-setting.

## Let one thing cause the next

Open where there is already something to notice: a repeated annoyance, a strange packet, an old page, a modest wish. Give enough concrete context to feel situated, then move naturally into the work. Avoid generic industry introductions, inflated stakes, clickbait that needs retracting in paragraph one, and theatrical “little did I know” openings.

Build around changes in understanding: I wanted something; I tried an approach; a result complicated it; that led to another choice; something finally clicked. This is a way to find the story, not a compulsory sequence of headings. Do not invent failures to complete an arc. A quiet discovery can carry a whole post.

Slow down at the interesting turns. Compress installation, scaffolding, routine wiring, file moves, and other logistics unless one of them caused the actual problem. Explain why the next section follows from the previous one. If the middle reads like interchangeable feature cards, find the causal thread again.

Give the reader small rewards along the way: an unexpectedly tiny fix, a useful mental model, a revealing example, a screenshot where the idea becomes visible. Delight comes from the discovery itself; repeated claims that something is “delightful” cannot supply it.

End when something concrete has changed: what works now, what I understand differently, or what I can stop doing. Return to the opening if it lands naturally. Omit recap lists, future-work inventories, grand universal lessons, and calls to action that the story has not earned.

## Sound like me

Use first-person singular for my decisions and plural for work a team actually did. Be direct, conversational, curious, occasionally dry. Use contractions and familiar words. Keep the existing British/Indian English spelling and the historical voice of archive pieces.

Write connected paragraphs with varied sentence length. A short sentence can let a discovery land; longer sentences can carry an explanation or reflection. Do not reduce every paragraph to a one-line aphorism. Headings should mark real turns, not label every few sentences. Lists and tables belong where comparison or sequence genuinely helps.

Prefer “I separated the listeners from the replies” to “the current repository demonstrates a separation of ingestion and response.” Prefer “The timer checks again when my laptop wakes” to a paragraph defending whether the agent really waited. These are voice examples, not facts to import into other posts.

Remove habitual “not X, but Y” framing, “the important distinction,” “what this proves,” “to be precise,” “this does not claim,” and “I can't honestly say.” Keep a qualification when it changes the reader's understanding of the mechanism, outcome, or safe use. State it once, where it matters, in ordinary language.

A prototype can be called a prototype once. A later improvement can be introduced with “Later…” Technical difficulty is part of the story; an inventory of every unbuilt safeguard is not. Do not erase a consequential failure or describe proposed work as shipped to make the ending cleaner. Move operational follow-up to existing project documentation only when useful and within scope, rather than making an appendix of everything cut.

## Choose the technical close-ups

Include code when it reveals the idea: the decisive guard, the ranking expression, the surprising protocol exception, the query transformation. Introduce what the reader should notice and explain the consequence afterward. Leave out imports, configuration dumps, and full functions when only a few lines matter. Label simplified excerpts or pseudocode naturally; distinguish them from runnable examples. Check new runnable examples, and avoid silently modernising historical APIs.

Use a diagram when the relationship is easier to see than describe. Keep it centred on one question: who owns the state, how a request splits, why a connection stays alive. Prefer the site's existing Mermaid support, with an accessible title and description, to a decorative architecture inventory.

Use real screenshots or existing illustrations at the point they explain. Captions tell the reader what to notice. Give images meaningful alt text; inspect them for fit and private information. New conceptual illustrations may be drawn or generated when useful, but never manufacture screenshots, logs, charts, or results. Do not force every media type into every post.

Embed the repository when it is the project being discussed. Embed a relevant PR or commit where its change enters the story, and the original tweet when it supplied the discovery. Use verified public URLs and the site's supported embed mechanism, with an ordinary usable link as fallback. Never invent a public source for private work. Links to supporting references should live beside the idea they help explain; the article need not narrate its research process.

## Revise and publish

Read opening and ending together. Then read the middle for momentum, repeated explanations, and places where the author disappears behind system descriptions. Read aloud mentally for phrases nobody would say. Revise structure before polishing sentences.

Check that edits preserve what actually happened, whose work it was, the distinction between an example and an event, and the original publication period. Historical articles should remain historical articles. Improve them without rewriting the author's past around today's opinions.

Render the post. Check code fences, diagrams, captions, embeds, local assets, heading order, and narrow-screen overflow. Follow the repository's publishing convention; preserve slugs and original dates unless asked otherwise. Publishing authority comes from the user's request, not this skill. Exclude fixtures and component demos from a request to publish articles, and report accurately whether the changes are local, deployed, or live.

For the research behind these choices, see [sources.md](references/sources.md). For this website's MDX and publishing mechanics, read the root `BLOG.md`.
