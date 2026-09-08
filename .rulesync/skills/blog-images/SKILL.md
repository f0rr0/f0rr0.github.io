---
name: blog-images
description: Plan, create, and place illustrations for an already-written blog post, and prepare matching Open Graph images. Use for visual briefs, image prompts, consistent art direction, social crops, and integrating article images; preserve the finished prose unless a local introduction or caption is needed.
---

# Blog images

Turn a finished article into a purposeful set of visually rich illustrations. Decide what the reader needs to see before deciding what to draw. Honour the author's requested subjects, references, placements, and exclusions; resolve unspecified choices from the article and the house style.

This skill handles both inline art and social images so they share one visual language. A request for a plan or prompts ends with those deliverables. A request to illustrate a post includes making the assets, integrating them, and reviewing the result. It does not imply publishing the article.

## Read and choose

Read the complete post, its metadata, the author's image suggestions, and existing assets. Inspect images visually, including any proposed style references. Read the project's `BLOG.md` and relevant image components before editing MDX or metadata. In Sid's repository, the mechanics and known routing details are in [production.md](references/production.md); confirm them against the current checkout.

Identify the article's central discovery, unfamiliar relationships, and moments where seeing something would help. Consider existing diagrams, code blocks, tables, and screenshots as part of its visual rhythm. Keep a good existing visual instead of illustrating its point again.

Ground each illustration in a recognisable situation from the post: someone comparing teaching images, preparing food, examining a packet, or getting on with their evening. State what the picture adds that the adjacent prose does not already show. Test the concept without its caption or labels: the action should still make sense. If it depends on naming abstract props, rethink the scene. A concrete analogy can work, but should not introduce a second system the reader has to decode.

Choose the medium by the job:

| Reader need | Medium |
| --- | --- |
| Understand a mechanism, ordering, or boundary | Editable Mermaid or SVG with verified labels and arrows |
| See what actually happened in an interface | Real screenshot or recording, cropped around the relevant state |
| Compare measured outcomes | Chart generated from the actual data, with units and source |
| Recognise a scene, analogy, or emotional beat | Conceptual illustration using the house style |
| Recognise the article in a feed | A separately composed social image or the existing title-card fallback |

Generated artwork must not pose as evidence: no invented UI captures, logs, conversations, benchmark results, or historical scenes presented as records. A screenshot request with no capture available stays an identified missing asset; continue with the other visuals.

## Make the insertion plan

For each chosen asset, record **purpose, exact placement, medium, source/subject, composition, dimensions, alt text, caption, and filename**. A compact table plus briefs is enough. Identify placement by heading and an exact nearby sentence, not a line number that will drift. Record whether it fulfils an author request or is an editorial suggestion.

Place an explanatory figure immediately after the paragraph that gives the reader its question and vocabulary. Keep the explanation and caption beside it. Avoid interrupting a setup and its payoff, a sentence and its code block, or the final paragraph. A hero is optional; prefer putting the opening scene after the opening paragraphs when it would otherwise push the story off the first mobile screen. Social-only art has no required inline insertion.

There is no image-per-word quota. Add a visual when it explains, substantiates, or establishes a specific scene. Omit redundant filler, even in a long section. If the author explicitly requests decoration, treat it as decoration and preserve that choice. Explain any practical conflict with their suggestion and supply the closest workable treatment; don't quietly replace the suggestion with your own.

## Direct and make

Read [style.md](references/style.md) for the author-selected **editorial cut-paper** treatment, richer narrative composition, broader palette, reference strategy, and allowed variation. The selected material anchor is `assets/cut-paper-reference.png`; `assets/cut-paper-scene-reference.webp` demonstrates the current grounded scene treatment. Read [prompts.md](references/prompts.md) when preparing generation or editing briefs. For dimensions, crop geometry, social typography, accessibility, and exports, read the relevant sections of [production.md](references/production.md). The project's `research/blog-images-research.md` records the research behind these choices.

Use **GPT Image 2** (`gpt-image-2`) for conceptual bitmap art, as requested by the author, following the installed `imagegen` skill. Select the model through an exposed model control; writing its name in a prompt does not select it. When the built-in tool cannot verify the model, the bundled CLI supports explicit `--model gpt-image-2` and requires a locally configured `OPENAI_API_KEY`. Do not claim an unverified backend is GPT Image 2 or silently substitute another model. The author has explicitly authorised the built-in generator for this workflow even when its backend model is unverified; use it directly unless they restore a strict model requirement. Keep GPT Image 2 as the preferred model when selection is exposed. Use native editable sources for diagrams and exact typography.

When the author asks to choose a house style, generate a small comparison set using the same article-specific scene, aspect ratio, and similar visual density. Show each candidate against the actual light and dark site backgrounds. Wait for their selection before establishing the recurring style or integrating final artwork; their request defines this selection step. Save the chosen reference and update the style guide, then produce relevant inline and social compositions from it.

When generating several related images, begin with one representative illustration and use the selected result as a style reference for the rest. Preserve the same style brief; vary the subject and composition. Refer to actual attached/loaded reference images, not an inaccessible filename in the prompt. Compare the set side by side at equal displayed size. Keep the original selected reference as an anchor instead of repeatedly inheriting the newest imperfect edit. Inspect each result, correct a concrete defect with a targeted edit, and stop when the brief and checks pass. Do not run an open-ended variant search or claim a seed guarantees consistency.

Use text sparingly. Default to letting action, gesture, objects, and composition carry the illustration. A word being present in the post does not earn it a sign in the picture: “LUNCH”, “EVIDENCE”, “LATER”, and abstract headings on imaginary machines made earlier scenes feel manufactured. Remove unnecessary signs rather than replacing them with blank signs or badges. Retain text when its specific identity matters, such as the diagnostic bytes `C0 00` or dates in an archive story. This is editorial judgment, not a blanket ban on lettering. Precise explanatory diagrams still need readable labels; use native editable text for them. Check any retained lettering at feed and article sizes. The existing renderer is a text-only fallback, not an already-implemented artwork compositor.

## Integrate and review

Save selected assets inside the project and preserve editable sources or generation briefs. For a post receiving new artwork, keep compact production notes at `research/blog-images/<slug>.md` outside the imported article tree with the final prompts, reference roles and paths, style version, actual output dimensions, capture/source attribution, and placements. Do not store rejected generations or private captures in the published content directory. Copying an asset should not silently replace unrelated existing artwork.

Use the site's normal image/figure support, its existing spacing, and natural aspect ratios. Add useful captions and context-sensitive alt text. Keep the author's title, slug, dates, claims, and draft status unless the request includes changing them.

Inspect the rendered article at narrow and wide widths, in both themes, and inspect social exports at actual small preview sizes. Check the crop, lettering, visual accuracy, bytes, paths, and served metadata using [production.md](references/production.md). A plan-only task reports proposed values; a production task reports measured output and any unavailable checks. Show the selected artwork and saved paths, plus a short account of placement and validation.

Starting requests:

- “Use $blog-images to illustrate this finished post. Include my idea of a packet travelling backwards. Choose the other visuals and insert them where useful.”
- “Use $blog-images to plan the images for this post; give me placement anchors and ready-to-run prompts, without generating them.”
- “Use $blog-images to make an Open Graph image for this article that matches the rest of my blog.”
