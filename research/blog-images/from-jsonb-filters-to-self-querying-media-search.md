# Visuals: Image search

## Editorial review

The MEANING/DETAILS lens-and-stencil machine required the reader to decode an invented system and repeated the nearby query-splitting diagram. It was replaced completely with an editor comparing forearm and lower-leg teaching illustrations against a lesson. No labels are needed. The paper anatomical pictures are illustrative, not clinical evidence or actual catalogue assets.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                             | Dimensions  | Bytes   |
| -------------------------------- | ----------- | ------- |
| `choosing-a-teaching-image.webp` | 1536 × 1024 | 252,424 |
| `opengraph-image.jpg`            | 1200 × 630  | 146,265 |

Asset directory: `src/content/blog/from-jsonb-filters-to-self-querying-media-search/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: In September 2024, I explored this through two TypeScript prototypes. One started with the structured content we already had. The other put a language model in front of media retrieval. The useful bit was where they met.

Alt: An editor compares a forearm illustration with the matching picture in a lesson, while setting aside a lower-leg image.

Caption: An image of the right subject can still be the wrong choice for a lesson.

## Generation brief

Built-in image generator, explicitly authorised. GPT Image 2 is the preferred model when selection is exposed; this tool does not verify its backend model. Do not claim these are verified GPT Image 2 outputs. The selected material anchor is `.rulesync/skills/blog-images/assets/cut-paper-reference.png`. All depicted people and screen contents are illustrative.

Create a NEW illustration using the attached image ONLY for matte layered cut-paper material, soft edges, fibre texture, warm ivory, shallow shadows. Rich teal, coral and saffron, natural overlapping shapes. Editorial art for a personal engineering story about an educational-content editor finding the right image for a question.
Depict a close, tangible moment of choosing teaching material: an editor's hands at a desk, one hand holding a small printed illustration of a forearm next to an open lesson page containing a matching forearm illustration and space for prose, the other setting aside a card showing a lower leg. A few overlapping alternative forearm cards, a coloured pencil, a paperclip and a small reference book create the everyday context. The matching card should be the largest, clearest object near centre. Show the anatomical outlines as simple benign educational drawings built from layered paper, no skin conditions, diagnoses or clinical photographs. A modest monitor in the back can show a contact sheet of the same kind of body-location thumbnails with no readable interface details. The editor is comparing assets for a lesson; do not make it look like a craft machine or fantasy processing factory.
The scene should convey 'this one fits the question' through the hand gesture and corresponding pictures, without abstract labels, arrows, stencils, lenses, checkmarks, floating ribbons or badges. No readable text anywhere. No claim to be an actual product screenshot or medical evidence. Landscape 3:2, target1536x1024. Concentrate the choosing hand, the complete forearm card, and its corresponding lesson picture within the middle vertical band y220–800 and central area, so a wide social crop retains the action. Environment can fill the edges. Only artwork, no frame.

Final master: `exec-3b803a4c-9ef3-4ca5-a042-0aa5f8f295d7.png`. PNG masters remain in the generator output directory. The final delivery assets are stored in the article directory, so rendering does not depend on machine-local generation paths.

The social JPEG is a centred wide crop of the revised master. Inspect the focal subject, not just dimensions.

Inline: sRGB WebP quality 88. Social: sRGB JPEG quality 90 with MozJPEG. Sharp performs delivery sizing and encoding only; the built-in generator performs creative edits.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.
