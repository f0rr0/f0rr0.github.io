# One Cent, Three Ledger Entries: image notes

Article: `src/content/blog/one-cent-three-ledger-entries/page.mdx`.

## Direction

House treatment: editorial cut paper, version 2. Asset revision: 3, abstract amounts.

The author approved the rich workshop scenes but found the numerical amounts confusing. Targeted edits replace the amounts with physical metaphors while preserving the composition, people, colour, texture and supporting objects. The opening and social card use a lone shared token; the refund keeps receipts labelled “Paid” and “Returned”; the ledger drives an unnumbered mechanical gauge. The lost-acknowledgement illustration remains unchanged.

Token counts and the gauge position are conceptual, not a second worked numerical example. Exact amounts belong to the article's prose, table and code. The prose, metadata and Mermaid diagram are unchanged; captions and alt text match the edited artwork. These images are analogies, not screenshots or records of real events.

## Generation and references

Route: built-in image generator, backend model unverified. Revisions used the approved version 2 originals as edit targets, inspected before editing. All semantic changes were made through the generator. Export used the installed Sharp dependency.

The original visual family used `/home/sid/.codex/skills/blog-images/assets/cut-paper-reference.png` for material and lighting and `/home/sid/.codex/skills/blog-images/assets/cut-paper-scene-reference.webp` for richer scene density. Their subjects were excluded. The first selected workshop illustration supplied the reference for subsequent scenes.

Final assets are beside the article. Originals remain outside the published content tree. These notes live in `docs/blog-images/` so the article importer does not treat them as a runtime module.

## Exports

| File                        | Dimensions  | Encoding                  |   Bytes |
| --------------------------- | ----------- | ------------------------- | ------: |
| `competing-requests.webp`   | 1536 × 1024 | WebP, quality 82          | 280,616 |
| `charge-and-refund.webp`    | 1536 × 1024 | WebP, quality 82          | 256,274 |
| `ledger-projection.webp`    | 1536 × 1024 | WebP, quality 82          | 235,592 |
| `lost-acknowledgement.webp` | 1536 × 1024 | WebP, quality 82          | 278,622 |
| `opengraph-image.jpg`       | 1200 × 630  | JPEG, quality 88, mozjpeg | 199,878 |

All exports retain an opaque ivory background. Inline masters are 1536 × 1024. The separately composed social edit is 1731 × 909, exported at 1200 × 630 without stretching.

## Placements and final prompts

### competing-requests.webp

Purpose: Make the opening race tangible with two simultaneous jobs competing for one remaining balance.

Placement: After the opening paragraph ending “what an error actually told me.”

Alt: Two couriers bring unmarked job slips to a shared workshop till holding a lone paper token.

Caption: Both requests reach for the same remaining balance.

Edited original: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-cabdb68b-7376-463d-9e7c-e16e1da3e9b6.png`.

Edit target: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-2e674145-53c0-4fa5-b168-ca5442c0d580.png`.

Final edit prompt:

```text
Use case: precise-object-edit. Edit the attached image locally. Preserve the accepted composition, people, gestures, warm ivory paper, saturated teal/coral/saffron palette, layered matte cut-paper texture, lighting, rich workshop setting, film strips and other supporting objects. The author likes the scene but finds its numerical amounts confusing. Replace literal arithmetic with a clear physical metaphor. Do not introduce any digits, currency symbols, equations, numerical scales or new decorative text. Keep all other artwork as close to the original as possible.
Replace both '200' request cards with plain cream folded job slips, with a subtle embossed paper fold and no printing. Replace the central '200 left' sign with a small glass-fronted recess built into the same teal-and-saffron till, holding a SINGLE LARGE plain saffron paper token, visibly the remaining shared resource. It must look like a tangible disc inside a compartment, not an icon on a blank sign. Remove all loose coins from the open drawer so the drawer is empty; the lone unmarked token in the central compartment is the only credit token in this scene. The two arriving couriers still converge on that same counter with their unnumbered job slips. Preserve the dynamic converging paths, rich scenery and original character poses. No lettering anywhere in the edited focal objects. No denominations or symbols on the token. Keep the original landscape aspect ratio.
Target inline composition: 1536 by 1024.
```

### charge-and-refund.webp

Purpose: Show a return creating new evidence while the original payment record stays intact.

Placement: Replace the original ledger illustration after the reserve-versus-charge paragraph ending “open-ended usage or partial-delivery pricing.”

Alt: A workshop clerk returns a token after a failed print job while receipts marked Paid and Returned remain together in the ledger.

Caption: The return gets a new entry. The earlier charge remains in the record.

Edited original: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-21cee819-85c9-4d76-a3bc-48cdb4c8cf34.png`.

Edit target: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-edefd8af-8762-4fb5-bfe2-656f91d77b43.png`.

Final edit prompt:

```text
Use case: precise-object-edit. Edit the attached image locally. Preserve the accepted composition, people, gestures, warm ivory paper, saturated teal/coral/saffron palette, layered matte cut-paper texture, lighting, rich workshop setting, film strips and other supporting objects. The author likes the scene but finds its numerical amounts confusing. Replace literal arithmetic with a clear physical metaphor. Do not introduce any digits, currency symbols, equations, numerical scales or new decorative text. Keep all other artwork as close to the original as possible.
Keep the clerk handing the saffron token back to the customer, the curved return ribbon and the open ledger containing BOTH intact receipts. Remove '200' from each receipt. The earlier left receipt should read exactly 'Paid' and the newly added right receipt exactly 'Returned', centred and cleanly printed with generous paper around the words. These are the only focal labels, with no amounts or units. Preserve the attached old receipt, the failed print job and all physical action. Avoid substituting symbols or diagrams for the receipts. Target 1536 by 1024.
```

### ledger-projection.webp

Purpose: Show a balance as a consequence of the ledger rather than an independently edited number.

Placement: In “Let the ledger own the balance”, after “A correction goes through a new entry.”

Alt: A receipt enters a paper ledger whose gears and belt drive a protected, unnumbered balance gauge.

Caption: The ledger drives the balance. The gauge has no independent write path.

Edited original: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-b50eb019-3954-4a66-bfe2-81515cdadae8.png`.

Edit target: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-a63a7bd9-4233-4843-ac8e-9a3e63d50028.png`.

Final edit prompt:

```text
Use case: precise-object-edit. Edit the attached image locally. Preserve the accepted composition, people, gestures, warm ivory paper, saturated teal/coral/saffron palette, layered matte cut-paper texture, lighting, rich workshop setting, film strips and other supporting objects. The author likes the scene but finds its numerical amounts confusing. Replace literal arithmetic with a clear physical metaphor. Do not introduce any digits, currency symbols, equations, numerical scales or new decorative text. Keep all other artwork as close to the original as possible.
Replace the '200' card being fed into the ledger with an unprinted cream receipt with a folded corner. Replace the entire numeric '800 credits' counter face with a cream SEMICIRCULAR ANALOG DIAL: a simple teal-and-saffron arc and one dark pointer, without numbers, tick marks, units, percentages, letters or labels. The dial is an abstract balance indicator, not a data chart. Keep the dial behind the same protective translucent cover and visibly connected to the ledger through the existing saffron gears and belt. Preserve the ledger pages, receipts, inspector and magnifying glass. Do not add an independent handle or control to the gauge. Target 1536 by 1024.
```

### lost-acknowledgement.webp

Purpose: Separate completed durable work from an acknowledgement that failed to reach its recipient.

Placement: In “A timeout doesn't tell me whether the money moved”, after “If I blindly repeat the top-up, I can deliver them twice.”

Alt: A purchase receipt marked Recorded remains safely filed while its acknowledgement envelope tears in transit, leaving the recipient with no reply.

Caption: The credits can be recorded even when the acknowledgement never arrives.

Retained original: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-f94e6d8d-76ec-434b-ac2f-cd4ee84d35f3.png`.

Generation inputs: the selected version 2 competing-requests original and the material reference. The submitted prompt below retains an inert leading assembly token.

Final generation prompt:

```text
undefined
Image 1 is the selected illustration from this article: preserve its paper character, people treatment, palette and richness, but create the new scene below. Image 2 supplies the original paper material and lighting only; do not copy its subject.
Create a lively cut-paper postal-workshop scene about a completion acknowledgement being lost after the real work is already recorded. Left half: a teal-clad worker has already placed a large cream purchase receipt and saffron credit tokens safely in an open but solid archive drawer. The receipt bears the single large legible word 'RECORDED', a stamp physically printed on the paper. The drawer contains orderly older records and feels settled. Centre: the worker's lightweight coral acknowledgement envelope is flying out through a window, where a gust bends its paper trail and tears the envelope into a few large pieces. Right half: a second person at a small coral desk waits with an empty in-tray and a modest paper clock; a short desk note reads exactly 'No reply'. Their reaching gesture follows the interrupted delivery path back toward the left. Keep the recorded receipt and credits untouched and clearly present while the message is lost. Build overlapping planes, folded curtains, paper floor strips, layered drawers and the dramatic curling message path; every object supports either durable storage, message travel, or waiting. Use the same teal, coral, saffron, warm cream and charcoal palette. Landscape 1536 by 1024 with large enough receipt and desk note to read on a phone. No title overlay, no software screenshot, no extra words or digits. This is a visual analogy for a lost acknowledgement, not a literal delivery event.
```

### opengraph-image.jpg

Purpose: Represent the post in a feed with the same competing-request scene and richer palette.

Placement: Existing Open Graph/Twitter share-image route; no inline placement.

Alt: Two requests converge on a workshop till holding one shared token.

Edited original: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-a0026fa5-69cb-4283-8052-b531ed6e1351.png`.

Edit target: `/home/sid/.codex-outlook/generated_images/01a07e86-f16a-7361-9b55-180a20e3b66f/exec-55c3387e-f1ad-4bf7-b13d-701721f373b5.png`.

Final edit prompt:

```text
Use case: precise-object-edit. Edit the attached image locally. Preserve the accepted composition, people, gestures, warm ivory paper, saturated teal/coral/saffron palette, layered matte cut-paper texture, lighting, rich workshop setting, film strips and other supporting objects. The author likes the scene but finds its numerical amounts confusing. Replace literal arithmetic with a clear physical metaphor. Do not introduce any digits, currency symbols, equations, numerical scales or new decorative text. Keep all other artwork as close to the original as possible.
Replace both '200' request cards with plain cream folded job slips, with a subtle embossed paper fold and no printing. Replace the central '200 left' sign with a small glass-fronted recess built into the same teal-and-saffron till, holding a SINGLE LARGE plain saffron paper token, visibly the remaining shared resource. It must look like a tangible disc inside a compartment, not an icon on a blank sign. Remove all loose coins from the open drawer so the drawer is empty; the lone unmarked token in the central compartment is the only credit token in this scene. The two arriving couriers still converge on that same counter with their unnumbered job slips. Preserve the dynamic converging paths, rich scenery and original character poses. No lettering anywhere in the edited focal objects. No denominations or symbols on the token. Keep the original landscape aspect ratio.
Preserve the existing wide social composition, targeting a 1.905:1 landscape image around 1731 by 909. Keep the shared token compartment and both approaching job slips clustered centrally so the action remains recognisable in a small central-square thumbnail. No title overlay.
```

## Review

The revised local draft passed browser checks at 320, 390, 768 and 1440 CSS pixels in light and dark themes. All four images decoded, the Mermaid diagram rendered, and there was no page overflow or browser runtime error. Visually inspected the set at equal sizes, mobile figures, desktop dark rendering and social previews. No numerical amounts remain in the artwork or its figure descriptions.

The actual Open Graph and Twitter metadata use the same share-image URL. Its local response matched the exported JPEG byte for byte: 1200 × 630, 199,878 bytes. Reviewed 600 × 315 and 360 × 189 previews plus a central square thumbnail; the shared token and both approaching slips remain visible.

At the checked 1080-pixel optimized size, image responses were 107,092 bytes for competing requests, 106,084 for the refund, 97,865 for the projection and 105,089 for the retained acknowledgement. Responsive mobile delivery uses the existing image pipeline.

A before/after comparison confirmed every character outside the figures, including article prose and metadata, was preserved. Formatting passed. The post remains a local draft. The earlier article build, TypeScript and blog Markdown checks predate this image revision; the current revision was verified on the development server and has not been published.

Artifacts:

- `/home/sid/.codex-outlook/visualizations/2026/09/08/01a07e86-f16a-7361-9b55-180a20e3b66f/ledger-v3-browser-results.json`
- `/home/sid/.codex-outlook/visualizations/2026/09/08/01a07e86-f16a-7361-9b55-180a20e3b66f/ledger-v3-final-verification.json`
- `/home/sid/.codex-outlook/visualizations/2026/09/08/01a07e86-f16a-7361-9b55-180a20e3b66f/ledger-v3-four-scenes.png`
