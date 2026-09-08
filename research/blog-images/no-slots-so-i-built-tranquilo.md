# Visuals: Tranquilo

## Editorial review

The oversized clock/calendar, Saved Request and AFTER 6 labels repeated the prose; checkmarks could imply booked appointments. The replacement shows the benefit: reading at home while a phone notification waits beside a laptop. A separate native diagram makes the recheck/cart/payment boundary explicit.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                   | Dimensions  | Bytes   |
| ---------------------- | ----------- | ------- |
| `an-evening-back.webp` | 1536 × 1024 | 331,056 |
| `opengraph-image.jpg`  | 1200 × 630  | 173,572 |

Asset directory: `src/content/blog/no-slots-so-i-built-tranquilo/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: There were two parts to that request. “An hour tomorrow after six” needed interpretation. “Keep looking” needed something that would still remember the request after I'd closed the conversation. The second part turned out to be the more interesting one.

Alt: A person reads in an armchair while a phone notification sits beside an open laptop on the side table.

Caption: The watch could keep looking while I got on with my evening.

## Generation brief

Built-in image generator, explicitly authorised. GPT Image 2 is the preferred model when selection is exposed; this tool does not verify its backend model. Do not claim these are verified GPT Image 2 outputs. The selected material anchor is `.rulesync/skills/blog-images/assets/cut-paper-reference.png`. All depicted people and screen contents are illustrative.

Recompose this illustration as a natural domestic evening in the same rich tactile cut-paper style and teal/coral/saffron palette. Keep the relaxed reader in a coral armchair, open book, cup, leafy plant, floor lamp and night window. Remove the giant clock, giant calendar, Saved Request note, AFTER 6 label, all checkmarks, winding path, floating bell and blank card in the reader's hand. The reader now has both hands naturally holding the open book and is absorbed in reading. On a small ordinary side table nearer the centre sits a phone showing just one understated notification-shaped panel, with no text, ticks or confirmation symbols; beside it an open laptop has a very simple unlettered appointments-grid silhouette. The machines sit quietly in the room; no arrows or connecting ribbons. The subject is relief from repeatedly checking an app, not a magical booking machine. Make the phone, book and reader the connected focal group; retain enough detail in the lamp, folds, furniture and window to feel warm and involved. No readable text or numerals anywhere, no reservation/payment imagery. Landscape3:2; complete face, phone and book inside middle vertical band y180–815 for later wide social crop.

Final master: `exec-d4b44983-fc44-4d2f-9bb8-c30bbcb02496.png`. Edit target: `exec-78dca124-2e96-4fff-9d88-d673db6d32f6.png`. PNG masters remain in the generator output directory. The final delivery assets are stored in the article directory, so rendering does not depend on machine-local generation paths.

The social JPEG is a centred wide crop of the revised master. Inspect the focal subject, not just dimensions.

Inline: sRGB WebP quality 88. Social: sRGB JPEG quality 90 with MozJPEG. Sharp performs delivery sizing and encoding only; the built-in generator performs creative edits.

## Additional explanatory figure

A native Mermaid diagram follows the paragraph ending “find something, choose it, then pay” in “The slot can still disappear”. It shows notification, human choice, an exact-slot recheck, fresh cart state, the overbooking path, and human payment approval. It complements the earlier scheduler sequence, which ends at notification.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.

The added diagram renders at 320, 390 and 1440 px in both themes, with readable labels and no internal horizontal scrolling. Its local Mermaid spacing and wrapped labels preserve natural font size.
