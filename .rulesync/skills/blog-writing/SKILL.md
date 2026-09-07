---
name: blog-writing
description: Write, review, revise, and prepare Sid Jain's personal technical blog posts for publication as narrative prose in his own voice. Use for project stories, engineering retrospectives, and personal essays. Covers authentic source material, selective code, diagrams, illustrations, source embeds, metadata, Open Graph images, and rendered publication checks.
---

# Blog writing

A post is my account of something I did, noticed, or came to understand. It should feel like talking to an interested friend who also builds things: personal, technically curious, and worth reading for the prose. Accuracy is part of the editing work. The reader should not have to sit through that work.

## Find the story before changing the sentences

Read the whole draft, the author's supplied context, and the relevant artifacts. Find the small human reason for the project and the discovery that makes it worth telling. A reader can understand programming without knowing this particular system; explain the unfamiliar mechanism when it starts to matter.

Privately distinguish what happened, what was tried, and what is merely proposed. Check load-bearing details against source or history. Do not turn those notes into a public evidence ledger. If a claim cannot be supported, narrow or remove it; ask the author only when the missing detail is essential to the story.

Keep the author's existing anecdotes, opinions, jokes, and turns of phrase where they work. Never manufacture a late night, a conversation, an emotion, a failed experiment, an observation, or a happy outcome. An illustrative scenario is useful, but introduce it as an example rather than a memory. Prefer a real technical oddity to invented scene-setting.

Start from rough notes, a spoken account, a draft, or the author's account of the project. If the material is thin, ask the smallest useful question about what happened, what was frustrating, or what surprised them. Do not require an interview when the supplied material already carries the story. Capture their language before polishing it.

## Let one thing cause the next

Open where there is already something to notice: a repeated annoyance, a strange packet, an old page, a modest wish. Give enough concrete context to feel situated, then move naturally into the work. Avoid generic industry introductions, inflated stakes, clickbait that needs retracting in paragraph one, and theatrical “little did I know” openings.

Build around changes in understanding: I wanted something; I tried an approach; a result complicated it; that led to another choice; something finally clicked. This is a way to find the story, not a compulsory sequence of headings. Do not invent failures to complete an arc. A quiet discovery can carry a whole post.

Slow down at the interesting turns. Compress installation, scaffolding, routine wiring, file moves, and other logistics unless one of them caused the actual problem. Explain why the next section follows from the previous one. If the middle reads like interchangeable feature cards, find the causal thread again.

Give the reader small rewards along the way: an unexpectedly tiny fix, a useful mental model, a revealing example, a screenshot where the idea becomes visible. Delight comes from the discovery itself; repeated claims that something is “delightful” cannot supply it.

End when something concrete has changed: what works now, what I understand differently, or what I can stop doing. Return to the opening if it lands naturally. Omit recap lists, future-work inventories, grand universal lessons, and calls to action that the story has not earned.

## Sound like me

Use first-person singular for my decisions and plural for work a team actually did. Be direct, conversational, curious, occasionally dry. Use contractions and familiar words. Keep the existing British/Indian English spelling and the historical voice of archive pieces.

Read a few authentic author examples when available. Treat the user's own instructions and accepted corrections as the strongest voice context. Note specific sentence habits and explain why a good example works; do not borrow another writer's persona. Original historical prose can be read from Git history. Do not use an archive of unreviewed AI rewrites as the sole voice reference. When the author corrects a recurring habit, update the relevant rule with a short before/after example instead of accumulating a sprawling blacklist.

Write connected paragraphs with varied sentence length. A short sentence can let a discovery land; longer sentences can carry an explanation or reflection. Do not reduce every paragraph to a one-line aphorism. Headings should mark real turns, not label every few sentences. Lists and tables belong where comparison or sequence genuinely helps.

Prefer “I separated the listeners from the replies” to “the current repository demonstrates a separation of ingestion and response.” Prefer “The timer checks again when my laptop wakes” to a paragraph defending whether the agent really waited. These are voice examples, not facts to import into other posts.

Remove habitual “not X, but Y” framing, “the important distinction,” “what this proves,” “to be precise,” “this does not claim,” and “I can't honestly say.” Keep a qualification when it changes the reader's understanding of the mechanism, outcome, or safe use. State it once, where it matters, in ordinary language.

A prototype can be called a prototype once. A later improvement can be introduced with “Later…” Technical difficulty is part of the story; an inventory of every unbuilt safeguard is not. Do not erase a consequential failure or describe proposed work as shipped to make the ending cleaner. Move operational follow-up to existing project documentation only when useful and within scope, rather than making an appendix of everything cut.

## Choose the technical close-ups

Include code when it reveals the idea: the decisive guard, the ranking expression, the surprising protocol exception, the query transformation. Introduce what the reader should notice and explain the consequence afterward. Leave out imports, configuration dumps, and full functions when only a few lines matter. Label simplified excerpts or pseudocode naturally; distinguish them from runnable examples. Check new runnable examples, and avoid silently modernising historical APIs.

Use a diagram when the relationship is easier to see than describe. Keep it centred on one question: who owns the state, how a request splits, why a connection stays alive. Prefer the site's existing Mermaid support, with an accessible title and description, to a decorative architecture inventory.

Use real screenshots or existing illustrations at the point they explain. Captions tell the reader what to notice. Give images meaningful alt text; inspect them for fit and private information. New conceptual illustrations may be drawn or generated when useful, but never manufacture screenshots, logs, charts, or results. Do not force every media type into every post.

Embed the repository when it is the project being discussed. Embed a relevant PR or commit where its change enters the story, and the original tweet when it supplied the discovery. Use verified public URLs and the site's supported embed mechanism, with an ordinary usable link as fallback. Never invent a public source for private work. Links to supporting references should live beside the idea they help explain; the article need not narrate its research process.

## Finish the whole publishing package

Finalise the title and metadata after the story settles. If the title needs work, generate a few distinct directions and choose the specific, honest promise the article delivers. Write a standalone summary in the same voice, suitable for the index, RSS and a search snippet. Mention the technology naturally when it helps someone find the article. Use meaningful tags, a real author, the original date, and an updated date only for an actual substantive revision. Preserve existing slugs. Avoid keyword stuffing, compulsory FAQs, and character-count rules that flatten a good title.

Plan visual assets by purpose. A screenshot shows the actual thing; a diagram explains a relationship; an illustration supplies an analogy or atmosphere; an Open Graph card makes the article recognisable in a feed. Choose the assets the piece needs. For generated illustration, specify the concept, composition, palette, aspect ratio and crop-safe space. Keep exact typography in the site's deterministic renderer. Inspect the image, write alt text and a useful caption, and keep editable diagram sources when available.

Ensure every post has a working social preview. Reuse the site's shared card and co-located overrides before introducing a new service. Check the actual image at feed size: title legibility, margins, crop, contrast and a working public URL. A hero image is not automatically a good social crop. Metadata, Open Graph/Twitter fields and article structured data should describe the same finished piece. Existing machine-readable exports are useful publishing surfaces, not a reason to change the story into search-engine prose.

## Revise and publish

Read opening and ending together. Then read the middle for momentum, repeated explanations, and places where the author disappears behind system descriptions. Read aloud mentally for phrases nobody would say. Revise structure before polishing sentences.

Make a first-time reader pass using only the article and its intended audience. Do not silently fill gaps with repository knowledge. Find exact passages where the reader would stumble, lose interest, or expect a payoff that never arrives; fix those passages. Keep this separate from checking source details. Use as many passes as the actual issues require, without ritual reviewer panels or repeated polishing after the piece works.

Check that edits preserve what actually happened, whose work it was, the distinction between an example and an event, and the original publication period. Historical articles should remain historical articles. Improve them without rewriting the author's past around today's opinions.

Render the post. Check code fences, diagrams, captions, embeds and fallback links, local assets, heading order, light/dark readability, and narrow-screen overflow. Inspect the rendered title, description, canonical, social tags, image responses and structured data. Check production discoverability through the blog index, RSS, sitemap and existing Markdown exports. Follow the repository's publishing convention; preserve slugs and original dates unless asked otherwise. Publishing authority comes from the user's request, not this skill. Exclude fixtures and component demos from a request to publish articles, and report accurately whether the changes are local, deployed, or live. Draft social copy only when requested; publishing an article does not by itself authorise sending social posts or email.

For task-specific starting prompts, see [prompts.md](references/prompts.md). For the research behind these choices, see [sources.md](references/sources.md). For this website's MDX and publishing mechanics, read the root `BLOG.md`.
