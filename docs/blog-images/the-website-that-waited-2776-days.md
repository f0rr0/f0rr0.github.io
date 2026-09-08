# Visuals: Website revival

## Editorial review

The paper doorway and calendar sweep work as a social recognition image, but do not substantiate the detailed description of the old website. Inline artwork was replaced by a real local render of the committed archived HTML and moved beside that description. The existing paper social cover was retained; its dates identify the actual eras.

The current direction is **editorial cut paper v3: grounded, complementary scenes**. Preserve the selected B material and richer colour; let actions and objects carry the idea. Text is sparse and earned, never a label quota.

## Assets and placement

| File                     | Dimensions  | Bytes   |
| ------------------------ | ----------- | ------- |
| `archived-homepage.webp` | 1536 × 1024 | 213,840 |
| `opengraph-image.jpg`    | 1200 × 630  | 213,317 |

Asset directory: `src/content/blog/the-website-that-waited-2776-days/`. Inline files use the existing responsive Next image pipeline. Social images use the existing share-image route and both Open Graph and Twitter metadata.

Placement: The introduction crossed out Los Angeles, New Delhi, and Mumbai before arriving in Berlin. I worked at Lufthansa and was passionate about lambda calculus, house music, and Mexican food. Then came the heartbeat. The page said I had been lifelogging since 2014 and promised fresh RescueTime activity and Last.fm plays beneath a tiny **“Crunching latest data...”** animation. That promise had not aged brilliantly.

Alt: The archived YUPPI.ES homepage: pink masthead, cyan links, crossed-out former cities, Berlin and Lufthansa in the introduction, and a loading message for lifelogging feeds.

Caption: The archived homepage, rendered from the HTML preserved on master.

## Capture and social source

The screenshot renders `index.html` from archived `origin/master` commit `0dd47f41a0073b5e9b60f0b2b4596824c3f8bd58`, with its embedded styling. Chrome viewport: 900 × 950 CSS px, device scale 2. JavaScript was disabled to preserve the committed server-rendered content without running obsolete integrations. The top 1800 × 1200 pixels were captured and exported as lossless WebP at 1536 × 1024. This is a current render of historical HTML, not a screenshot claimed to have been taken in 2018. The loading message is the stored initial state.

The paper artwork `website-revival.webp` is retained as a social-art source. Its wide JPEG remains unchanged: an old dark website beside a writing desk, with dates 2018 and 2026. It is a conceptual companion, not a reproduction of either site. Generated master: `exec-677a88dc-b52e-436c-a5f7-9671fe20fce2.png`.

## Validation

The article keeps its original prose, metadata and draft status. The current images passed browser checks at 320, 390, 768 and 1440 px in light and dark themes. Social validation confirmed that served JPEG bytes match each saved file. The existing image, social-card and SEO tests pass (3 tests, 17 assertions). Production notes stay outside the dynamically imported article tree.
