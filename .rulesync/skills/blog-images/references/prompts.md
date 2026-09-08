# Briefs and prompting recipes

These are reusable templates for this blog. Fill them from the finished post. Use GPT Image 2 (`gpt-image-2`), selected through the generation interface rather than named only in the prompt. They are instructions for the assistant/art director; send only the relevant visual brief to the image generator, not the entire publishing checklist.

## Plan visuals from a finished article

> Read [post] in full, inspect its existing media, and take these author suggestions into account: [suggestions]. Identify the main discovery and the places where seeing something would explain it better. Choose the smallest useful set of new visuals, retaining effective existing ones. For each, give its reader-facing purpose, medium, exact heading and preceding sentence, subject, proposed dimensions, filename, alt text, and caption. Distinguish requested ideas from your suggestions. Include a separate social-image decision. Don't rewrite the article or generate images yet.

For a full illustration request, replace the last sentence with “Then create and integrate the selected visuals and inspect the finished article and social card.” Don't turn the plan into an approval checkpoint unless the user requested one.

## Choose a concept before spending image generations

> For [specific passage], suggest up to three distinct visual ideas in one sentence each: one literal scene, one concrete analogy, and one explanatory close-up where appropriate. Say what each lets the reader understand. Select the strongest fit for this post and my requested idea. Describe the visible action without labels; reject a concept that only works after naming its props. Keep the selected cut-paper treatment fixed. Do not add objects merely because they symbolise ‘technology’.

Use this when the visual idea is unclear. If the author already gave a clear scene, go straight to its brief. A new visual direction may justify two or three rough candidates for comparison within the requested generation scope; an established style does not need an exploratory batch for every image. Compare candidates at their final display size, not only full resolution.

## Compare house styles before choosing

The initial comparison is complete: Sid selected **B — Cut paper**. Use the accepted material reference and the grounded version 3 direction in `style.md`; do not rerun this exploration for ordinary posts. The recipe remains useful only when the author requests a new direction.

Use one scene for all candidates: the ZeroClaw lunch concept below, with a central meal card and check mark, three small notes, half a cabbage, and a capsicum. Keep the overhead view, 3:2 aspect, focal scale, quiet background, and absence of lettering comparable. Render each option as its own image.

| Option | Style block |
| --- | --- |
| A — Editorial ink | Confident, slightly irregular charcoal contours on warm cream; sparse flat burnt-amber fills and a few purposeful hatch marks. Restrained, observant, lightly humorous. |
| B — Cut paper | Layered matte paper shapes with subtly imperfect cut edges and shallow soft shadows; cream, charcoal, muted sage, and ochre. Large silhouettes, tactile but uncluttered. |
| C — Coloured pencil | Visible graphite and coloured-pencil strokes, restrained warm ochre and sage shading, generous unmarked ivory paper. A careful notebook drawing with strong readable contours. |
| D — Matte miniatures | A small overhead still life of simplified clay-like objects, soft diffuse daylight, warm ivory ground, charcoal paper pieces, muted sage vegetables, and an amber focal mark. Modest shallow depth; no gloss or toy faces. |

For each, use GPT Image 2 with the same generation settings (start at 1536 × 1024, medium quality when exposed). Display the actual result on `#fafafa` and `#111111`, at the same width; inspect once at 358 CSS px as well. These are the site's surrounding backgrounds, not instructions to generate a browser mockup. Keep options outside published article assets. Once the author chooses, update `style.md` and generate the actual inline and social assets using the selected image as the style reference.

## Production brief

```text
Purpose: [one thing the reader should understand or feel]
Article anchor: [heading + exact preceding sentence; assistant notes only]
Asset: [inline illustration / social scene / other]
Subject and action: [specific visible objects and their relationship]
Style: [paste the stable house paragraph from style.md]
Input images: [Image 1: style reference; Image 2: composition sketch; omit if none]
Composition: [viewpoint, focal placement, background, intended reading direction]
Output target: [final aspect ratio and dimensions; verify actual output]
Safe areas: [essential object box; text reservation only if text will be added]
Exact text: [usually none; if essential, why its exact identity matters]
Preserve: [facts, object identity, colour treatment, or geometry that must survive]
Avoid: [specific misleading details or likely failure modes]
```

A short, concrete brief beats a pile of unrelated style adjectives. Do not ask for “highly detailed” when the result is a small social card. Describe a visible scene rather than asking the model to illustrate “scalable infrastructure” or the article title alone. For user-supplied images, explicitly distinguish a style reference, an edit target, and factual reference material.

## Worked example: the backwards packet

This uses the existing Messenger article as a planning example; no new asset is implied to exist.

- **Placement:** in “A small packet, backwards”, after the paragraph ending “start with the public standard, keep what matches, and put each private variation behind a narrow seam.” This keeps the code and its interpretation together and leaves the opening's two-byte reveal uninterrupted.
- **Job:** make the surprising direction memorable. The existing shared-session diagram already explains the transport relationship; do not duplicate it with an architecture poster.
- **Medium:** a cut-paper conceptual illustration. If the precise `PINGREQ`/`PINGRESP` exchange needs explaining instead, choose a small editable sequence diagram.
- **Caption:** “The broker had started the keepalive exchange.”

```text
Rich editorial cut-paper protocol-archaeology workbench, matching the material
reference while using teal, coral and saffron layers. A coral packet labelled
exactly "C0 00" curves from the server on the right back toward the client
on the left. Use a single clear right-to-left ribbon arrow. An ordinary engineer's notebook, pencil and a coiled network cable establish the
workbench. No open envelope or payload contents: this keepalive is empty.
Keep the main packet dominant.
Landscape 3:2, target 1536 × 1024. No other lettering, invented protocol fields,
logos, realistic capture UI, or decorative extra arrows.
```

If a real style reference is available, attach it and identify its role. Don't put “use the previous image” into an otherwise standalone prompt.

## Worked example: lunch without another meeting

For the ZeroClaw post, retain the existing Telegram screenshots and state diagrams. A single scene can establish household coordination near the end of the opening, before “Why ZeroClaw”; five decorative replacements for its evidence are unnecessary.

```text
[Stable house style paragraph; supply an actual selected reference if available.]
An involved kitchen-table scene shows scattered family context becoming a usable lunch decision.
A cook and household context frame an active meal-planning scene: vegetables, a pantry photo, a grocery receipt, paper messages, and a selected lunch. Use overlapping coloured paper and expressive gestures. Let the cook, food and household activity carry the scene without a sign naming lunch.
The arrangement suggests scattered household context becoming one usable
decision. Warm, matter-of-fact, gently humorous. Keep the vegetables and
notes subordinate to the central decision. No robot chef, fake Telegram
screen, shopping logos, fabricated dietary labels, or photographic claims.
3:2 inline composition with clear silhouettes, interacting subjects, and enough edge room for the intended export.
```

This illustrates a concept from the article. It should not claim that this table or paper workflow literally existed. If the author specifically asks for a chat-based depiction, adapt the concept using clearly schematic message shapes rather than inventing a real conversation.

## Derive a social image from selected art

> Use Image 1 as the selected source illustration. Preserve its subject identity, ivory paper tone, layered edges, shadows, and amber treatment. Recompose for 1200 × 630; retain a few meaningful secondary elements and simplify only unreadable detail. Keep essential content within x 82–1118 and y 72–558. Make the focal object recognisable within the central x 325–875 region. Carry over only essential lettering from the selected art; do not add signs that paraphrase the title or surrounding prose. Do not stretch the original or add new facts. Treat dimensions as the export target and inspect the resulting crop.

Only add a title reservation when the actual card layout calls for one:

> Leave [specified bounding box] quiet for a separately rendered headline. Place the illustration in [specified box], large enough to read at 360 px card width. Keep [exact headline] in the composition notes; do not render it into this art layer.

The bounds must fit the real title. Don't apply an arbitrary left/right split to every post. An art-only card avoids sacrificing subject size to a long headline; title-only remains the existing fallback.

## Edit without losing the selected image

> Edit Image 1. Change only [one concrete defect, such as removing an extra envelope or moving the focal object inward]. Preserve the palette, paper texture, edge character, shadows, background, viewpoint, object identity, and remaining layout. Keep all essential content inside [bounds]. Add no text or new objects.

For a local defect, make a local edit. If the whole result has drifted into a different medium, restart from the original accepted reference and the brief. Do not make the newest imperfect edit the reference for the next generation indefinitely. Recheck the complete image after any edit; preserved regions can still change.

## Review the set, not just the individual images

> Compare [selected images] beside the accepted house reference at the same displayed width. Check palette temperature, paper-edge character, shadow depth, texture density, viewpoint, and visual complexity. Then inspect each at its actual article/social size. Report only specific defects and correct those that affect meaning, readability, or family resemblance. Keep deliberate differences in subject and framing. Do not continue generating variants after the requirements pass.
