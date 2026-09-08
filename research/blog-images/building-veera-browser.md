# Visuals: Veera browser

## Editorial review

The lifting gesture fits subtraction, but circuitry and a spanner implied hardware repair. These were replaced with browser pages and source-document layers; the GN tag was removed. An editable diagram now explains how a successful build can contain a different implementation.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                    | Dimensions  | Bytes   |
| ----------------------- | ----------- | ------- |
| `browser-teardown.webp` | 1536 × 1024 | 355,590 |
| `opengraph-image.jpg`   | 1200 × 630  | 190,507 |

Asset directory: `src/content/blog/building-veera-browser/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: Brave offered a great deal that would have been wasteful to reproduce: Chromium integration, selected privacy infrastructure, and years of decisions about carrying a browser downstream. It also arrived as a product with assumptions of its own. Before we invested in Veera's product surface, I needed to know whether a small team could separate those assumptions from the platform beneath them and understand what remained.

Alt: Paper hands lift browser interface panels to reveal layered pages and source documents beneath.

Caption: Taking features out exposed the paths that assembled the browser.

## Generation brief

Built-in image generator, explicitly authorised. GPT Image 2 is the preferred model when selection is exposed; this tool does not verify its backend model. Do not claim these are verified GPT Image 2 outputs. The selected material anchor is `.rulesync/skills/blog-images/assets/cut-paper-reference.png`. All depicted people and screen contents are illustrative.

Revise this cut-paper illustration about removing features from a software browser. Preserve the central hands lifting the coral browser interface layer, the teal/coral/saffron palette, paper material and rich overlapping composition. Remove the GN luggage tag entirely, the spanner, and the decorative gear. Replace the electronic circuit-board-like components beneath the lifted page with layered flat paper browser pages and folded source-document sheets, visibly containing unlettered indented horizontal paper strips. They should read as software and document layers, not a phone being repaired. Keep the upper browser toolbar and the tray of removed interface panels at left. The workbench is dismantling browser software. No hardware chips, connectors, technical signage, readable text, logos or invented code. Maintain 3:2 framing and the choosing/lifting action in the central crop.

Final master: `exec-f68b7db2-fbbe-441d-9fe3-0115d9197ad1.png`. Edit target: `exec-ef32c83a-213b-43c0-ade0-88073baf7225.png`. PNG masters remain in the generator output directory. The final delivery assets are stored in the article directory, so rendering does not depend on machine-local generation paths.

The social JPEG is a centred wide crop of the revised master. Inspect the focal subject, not just dimensions.

Inline: sRGB WebP quality 88. Social: sRGB JPEG quality 90 with MozJPEG. Sharp performs delivery sizing and encoding only; the built-in generator performs creative edits.

## Additional explanatory figure

A native Mermaid diagram follows the source-redirection explanation in “The green build I didn’t trust”. It compares an override-present path through Brave with an override-removed path through Chromium; both can reach a successful build. Accessible title and description preserve the distinction.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.

The added diagram renders at 320, 390 and 1440 px in both themes, with readable labels and no internal horizontal scrolling. Its local Mermaid spacing and wrapped labels preserve natural font size.
