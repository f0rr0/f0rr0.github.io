# Visuals: ZeroClaw lunch

## Editorial review

The kitchen and household context support the real problem. The LUNCH tag and ribbon merely narrated the picture, so both were removed. The scene establishes the household; the existing Telegram captures and three diagrams supply the evidence and mechanisms.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                     | Dimensions  | Bytes   |
| ------------------------ | ----------- | ------- |
| `lunch-decision-v2.webp` | 1536 × 1024 | 338,458 |
| `opengraph-image.jpg`    | 1200 × 630  | 204,477 |

Asset directory: `src/content/blog/building-on-zeroclaw/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: Opening, immediately before “Why ZeroClaw”, after the household coordination setup.

Alt: A paper kitchen scene with a cook chopping vegetables, a pantry of ingredients, and a family member using a phone at a nearby desk.

Caption: Messages, pantry photos, and old orders finally add up to lunch.

## Generation brief

Built-in image generator, explicitly authorised. GPT Image 2 is the preferred model when selection is exposed; this tool does not verify its backend model. Do not claim these are verified GPT Image 2 outputs. The selected material anchor is `.rulesync/skills/blog-images/assets/cut-paper-reference.png`. All depicted people and screen contents are illustrative.

Edit this existing cut-paper kitchen illustration. Preserve the people, cooking action, food, pantry, home-office, materials, colour, shadows and composition. Remove the entire foreground tag bearing LUNCH, including its string, and remove the broad cream ribbon stretched across the front of the counter. Reveal the natural teal cabinet/counter beneath them. Keep the small food photo lying naturally by the vegetables and the unlettered receipt by the grocery bag. The food and cook already communicate the subject; there must be no title, word or label anywhere. Do not replace the tag with a blank sign. Keep the rich scene intact and 3:2 landscape.

Final master: `exec-52172c0d-ca19-40b9-8833-1ed901926222.png`. Edit target: `exec-78bd295f-22df-43dd-80c4-f0e4a87b226e.png`. PNG masters remain in the generator output directory. The final delivery assets are stored in the article directory, so rendering does not depend on machine-local generation paths.

Social recomposition prompt:

Recompose this finished cut-paper illustration as a wide social cover, aspect ratio1200:630. Preserve the exact scene, people, gestures, objects, warm paper material, rich colour and soft shallow shadows. Rearrange rather than crop so every person's complete head and the central cook's hands, chopping board and meal remain comfortably inside the canvas, with at least10% vertical edge room. Fill the wider room naturally with existing environment; do not add a new conceptual prop. No readable text, labels, badges, signs or title. Keep the central action recognisable in a square central crop. Full artwork only; no frame or blank bands.

Social master: `exec-d0158959-5689-4483-ab26-a895cdea5800.png`.

Inline: sRGB WebP quality 88. Social: sRGB JPEG quality 90 with MozJPEG. Sharp performs delivery sizing and encoding only; the built-in generator performs creative edits.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.
