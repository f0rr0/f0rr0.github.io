---
name: blog-writing
description: Write and revise Sid Jain's personal technical blog posts in his voice, with a narrative of discovery, selective technical explanation, and purposeful visuals. Use for project stories, engineering retrospectives, and personal essays.
---

# Blog writing

Write a personal account of something the author did, noticed, or came to understand. The prose should reward reading, with the curiosity and specificity of a conversation between people who build things. Accuracy belongs in the editing process; the article should not sound like testimony about what a repository proves.

## Find the material that can carry a story

Read the draft, the author's context, and the relevant artifacts. Find the human reason for the work and the discovery worth telling. Preserve the author's anecdotes, opinions, jokes and turns of phrase where they work. When context is missing, ask the smallest question that would reveal what happened or what surprised them; don't require an interview when the supplied material already carries the story.

Check details privately. Distinguish events, illustrative examples and proposed work. Narrow an unsupported claim or remove it. Never manufacture a conversation, emotion, failed attempt or successful outcome to make a story more compelling.

## Build movement

Open with something concrete already worth noticing: a repeated annoyance, a strange packet, a modest wish, an unexpected result. Give enough context for the situation to feel real, then move into the work. Avoid generic industry introductions, inflated stakes and theatrical foreshadowing.

Find the causal thread: a wish led to an attempt; something about the result changed the next decision; a useful idea emerged. This is a way to discover the structure, not a required plot or set of headings. A quiet observation can carry a whole essay. Don't invent obstacles to complete an arc.

Spend detail on changes in understanding. Compress routine setup, installation, wiring and file moves unless one of them caused the interesting problem. If sections read like interchangeable feature cards, reconnect them through the author's decisions.

Let discoveries supply small rewards: a surprisingly tiny fix, a revealing example, a useful mental model, a screenshot where the idea becomes visible. Repeatedly calling something delightful cannot create that effect.

End when something concrete has changed: what works, what the author understands differently, or what they can stop doing. Return to the opening when it lands naturally. Avoid recap inventories, unearned universal lessons and compulsory future-work sections.

## Calibrate the voice

Use first-person singular for the author's decisions and plural for actual team work. Keep the voice direct, conversational, curious and occasionally dry. Use contractions, familiar words and the author's spelling preferences.

Use authentic author examples and accepted corrections to calibrate rhythm and phrasing. Specific examples teach more than adjectives such as “engaging.” Don't use unreviewed AI prose as the sole voice reference or borrow another writer's persona.

Write connected paragraphs with varied sentence lengths. Let a short sentence land a discovery; let a longer one carry an explanation. Headings should mark real turns. Use lists and tables when sequence or comparison is clearer that way, rather than turning the essay into an outline.

Prefer “I separated the listeners from the replies” to “the current repository demonstrates a separation of ingestion and response.” Prefer “The timer checks again when my laptop wakes” to a paragraph defending whether the agent really waited. These illustrate phrasing, not facts to import into another article.

Cut habitual “not X, but Y” framing, staged revelations, “what this proves,” and qualifications added merely to defend the author. Keep a limitation when it changes the reader's understanding of the result or mechanism; state it once in ordinary language. Technical difficulty belongs in the story. An inventory of everything unimplemented usually doesn't.

## Select the technical close-ups

Choose code that reveals an idea: a decisive guard, a ranking expression, a protocol exception, a query transformation. Tell the reader what to notice and what follows from it. Omit imports, configuration dumps and whole functions when a few lines carry the explanation. Identify simplified excerpts naturally and check examples presented as runnable.

Choose a diagram for a relationship that is easier to see than describe. Centre it on one question, such as who owns the state or why a connection stays alive. Prefer the site's editable Mermaid/vector support to a decorative architecture inventory.

Place real screenshots and existing illustrations where they help the explanation. Use captions to direct attention and alt text to convey meaning. Generated conceptual art can supply an analogy or atmosphere; it must not impersonate a screenshot, benchmark, log or result. Don't force every media type into every piece.

Embed the repository when it is the project under discussion, a relevant PR or commit where its change enters the story, and the original tweet when it prompted the discovery. Verify public URLs and use the site's supported embeds with usable ordinary links as fallbacks. Keep supporting links beside the ideas they help explain.

## Revise and package

Read opening and ending together, then the middle for momentum, repeated explanations and places where the author disappears behind system descriptions. Read as a first-time reader without silently supplying repository knowledge. Fix the exact passages where context is missing or a promised payoff never arrives. Stop polishing when the remaining changes are merely interchangeable wording.

Finalise the title and standalone summary after the story settles. Explore distinct title directions when useful and choose the honest promise the piece delivers. Mention technologies naturally; avoid keyword quotas and compulsory FAQs. Use the site's author, date, slug and topic conventions.

Choose assets by purpose: explanatory figure, screenshot, illustration or social card. Inspect the actual rendered article and feed-size card for legibility, crop, contrast, overflow and working links. A hero image is not automatically a good social crop. Keep title, summary, social metadata and article structured data consistent.

For drafting, voice calibration, editing and visual briefs, use [prompts.md](references/prompts.md). For the evaluated research behind these choices, see [sources.md](references/sources.md). Read the project's `BLOG.md` for its publishing mechanics. Use `site-seo` when the task includes discovery, metadata validation, indexing or search measurement; its checks support the narrative rather than dictating its structure.
