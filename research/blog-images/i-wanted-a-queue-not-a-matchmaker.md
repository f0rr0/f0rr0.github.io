# Visuals: Hinge queue

## Editorial review

The spread of fictional profile cards and pencil already convey unhurried choice and editable drafts. The LATER divider contributed no new information and was removed entirely. The existing joining diagram covers how feed and profile context become one card.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                     | Dimensions  | Bytes   |
| ------------------------ | ----------- | ------- |
| `queue-on-my-terms.webp` | 1536 × 1024 | 311,182 |
| `opengraph-image.jpg`    | 1200 × 630  | 179,048 |

Asset directory: `src/content/blog/i-wanted-a-queue-not-a-matchmaker/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: The first client fetched the recommendation feeds, joined them to profiles and media, and saved the information needed to act later. It gave me the queue I wanted: I could look without making a choice just to move the interface along.

Alt: A hand spreads five fictional profile cards while another edits a separate conversation draft with a pencil.

Caption: A queue gave me room to look, leave, and choose later.

## Generation brief

Built-in image generator, explicitly authorised. GPT Image 2 is the preferred model when selection is exposed; this tool does not verify its backend model. Do not claim these are verified GPT Image 2 outputs. The selected material anchor is `.rulesync/skills/blog-images/assets/cut-paper-reference.png`. All depicted people and screen contents are illustrative.

Make a local edit to this finished cut-paper illustration. Remove the entire cream divider labelled LATER behind the rightmost profile card; reveal the normal ivory and teal desk background there. Preserve all five illustrated profile/hobby cards, their different people and activities, the hands, drafting pencil, draft sheet, eraser, envelope, rich plum/coral/teal/sage colours, material and shadows. Do not put a blank sign in place of the divider, and do not replace the word with a badge or icon. No readable text anywhere. The spread of cards and the hand editing a draft already convey browsing and human choice. Keep 3:2.

Final master: `exec-9a888ce5-0524-4254-95a6-f52013350f3d.png`. Edit target: `exec-bb99f603-c84f-4e87-9dfc-c02f0160dbc3.png`. PNG masters remain in the generator output directory. The final delivery assets are stored in the article directory, so rendering does not depend on machine-local generation paths.

The social JPEG is a centred wide crop of the revised master. Inspect the focal subject, not just dimensions.

Inline: sRGB WebP quality 88. Social: sRGB JPEG quality 90 with MozJPEG. Sharp performs delivery sizing and encoding only; the built-in generator performs creative edits.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.
