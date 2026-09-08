# Research: consistent AI imagery for a personal technical blog

Researched September 8, 2026. This review follows the image-related leads in the repository's earlier writing/SEO research, then expands into firsthand publishing workflows, inspectable generation code, design systems, and current platform documentation. The operational decisions live in [the skill](../.rulesync/skills/blog-images/SKILL.md), [style.md](../.rulesync/skills/blog-images/references/style.md), [prompts.md](../.rulesync/skills/blog-images/references/prompts.md), and [production.md](../.rulesync/skills/blog-images/references/production.md).

## What was already in the repository

Initially inspected `origin/next` at `d9c99bc99c7eb54089a19b6747298d4bbf26022d`, then refreshed the working branch to `50db6fb956d997889c05a0080a74f81f07c1e447`. The intervening `9174563` moved research out of skill references and into `docs`; this report follows that convention. Its preceding commit `84ca332` introduced the recent writing/SEO work. The remote has no `main`; `master` at `0dd47f41a0073b5e9b60f0b2b4596824c3f8bd58` contains the historical static site. The useful current research is on `next`:

- `docs/blog-writing-landscape.md`: actual writers and public workflows, useful visual roles, Every's writing toolkit, Opalic's diagrams/screenshots, Satori, Excalidraw, and an inspected cover-generator implementation that was still a TODO at the earlier review.
- `docs/site-seo-landscape.md` and the `site-seo` references: metadata, image accessibility, representative search/social images, responsive rendering, and publication checks.
- `docs/blog-elements-2026.md` and `BLOG.md`: current article components and publishing mechanics.
- `.rulesync/skills/blog-writing/references/prompts.md`: a compact visual brief, but no maintained illustration style or complete image-selection workflow.
- `src/lib/blog-share-image.tsx`: the existing 1200 × 630 cream/charcoal/amber title card, with 82 px horizontal and 72 px vertical padding.
- `src/components/blog/article-prose.tsx`, `src/components/mdx/MDXImage.tsx`, and `src/components/mdx/Mermaid.tsx`: natural-ratio images, figure/caption spacing, screenshot grids, static imports, and theme-aware diagrams.

The gap was art direction across posts and the process from a finished article to selected subjects, precise insertion points, prompts, and inspected final crops. There was no need for another publishing platform or image service.

## What established publishers and practitioners actually do

“Successful” needs a useful definition here: observable sustained publishing and an inspectable working technique. These sources do **not** establish that AI illustrations caused audience growth. Public demonstrations, reported production workflows, and product documentation are different kinds of evidence. Some commercial guides overstate repeatability; their transferable techniques are retained without those guarantees.

### Lucas Crespo / Every: art direction is a repeatable editorial practice

Every's creative lead explicitly says the publication relies on Midjourney for article imagery and that his guide began as internal documentation. His accessible guide recommends exploring simple concepts before narrowing with detail. The article still contains old interface instructions despite an updated date, so it is evidence of a workflow, not a current setup manual. Only the accessible portion was used. [Firsthand guide](https://every.to/p/a-definitive-guide-to-using-midjourney).

There are inspectable published results: the MoviePass/COGS article credits Crespo and exposes a cover prompt built around isolated mechanical cogs with a vintage cross-hatched treatment. This connects a specific editorial idea, a visual medium, and a real article rather than merely promising “on-brand images.” [Published cover and prompt credit](https://every.to/napkin-math/cogs-how-i-bankrupted-moviepass-c6535dbb-3ea2-4329-ac3e-1249415ae81b).

In his firsthand Flora review, Crespo values keeping alternatives visible together, refining them, and combining useful parts instead of repeatedly starting over in disconnected apps. That is useful even without adopting Flora: compare candidates in one view and retain the selected direction. The piece is a designer's product review, not evidence that Every generates every cover with Flora. [Canvas workflow](https://every.to/source-code/when-an-ai-tool-finally-gets-you).

**Adopt:** article-specific visual concepts, a stable treatment, visible comparisons, targeted refinement. **Do not import:** Every's exact aesthetic, its old tool instructions, or a mandatory stack of design applications.

### Daniel Nest / Why Try AI: short style controls, concrete subjects

Nest's recurring illustrated newsletter demonstrates several subjects under the same short medium descriptor and publishes its own featured-image prompt. His February 2024 examples make differences such as continuous linework, risograph, and flat illustration easy to compare. These are public experiments by an active publisher, not comparative audience tests. [Illustration examples](https://www.whytryai.com/p/best-midjourney-prompts-february-2024).

His style-reference demonstration keeps a spaceship subject while transferring the appearance of a separate cartoon reference, and contrasts it with the unintended content mixing of a normal image prompt. That makes “reference for style” versus “reference for subject” a concrete production distinction. The examples use an older Midjourney version. [Style-reference demonstration](https://www.whytryai.com/p/10x-ai-37-bard-upgrades-midjourney-niji-6).

**Adopt:** separate subject from style, inspect what the reference actually controls, avoid sprawling contradictory prompt modifiers. **Do not import:** old parameters without checking the current provider or another creator's signature treatment.

### Ryan Brown / stylegen: preserve the recipe alongside the image

Brown describes using pixel art for his blog and publishes reference images, outputs, and a CLI. The inspected implementation loads real reference-image bytes, adds a style instruction, reads reusable prompts from files, and saves a JSON sidecar separately from the image. It also supports generating candidates. This is source-visible mechanics; it is not evidence of large readership or better SEO. [Repository and examples](https://github.com/ryanbbrown/stylegen), [inspected implementation](https://github.com/ryanbbrown/stylegen/blob/main/sgen.py).

**Adopt:** keep the final prompt and reference identity in a text file that a future agent can read; retain a selected reference; generate a small candidate set when concept selection benefits. **Do not import:** another API wrapper, its price assumptions, mandatory parallel generation, or its pixel-art identity. A Markdown note and the available image tool cover this blog's needs.

### Allen Finn / Skio: generate reusable pieces, then compose exact covers

Finn reports that generating complete covers caused mascot and typography variation. His replacement was to generate 16 mascot variants once, store them as assets, and use a small Pillow compositor for the background, exact font, wrapping, and placement. He frames the problem as 2,438 covers and reports a newly working pipeline; the post does not independently prove that every one was generated or that they improved traffic. [Firsthand production account](https://www.linkedin.com/posts/allenfinn_how-do-you-generate-2438-blog-post-cover-activity-7435029405594427394-U_uh).

**Adopt:** stable reusable artwork for recurring motifs and deterministic typography. **Do not import:** a mascot that Sid did not request, a 16-image prerequisite, their Python/cloud/Notion pipeline, or their claims about other tools' current limitations. Sid already has ImageResponse.

### Dom Kirby: imagery is part of finishing the actual article

Kirby describes Gemini/Nano Banana for recent graphics and infographics, Canva for more directed graphics, and using the final article's context when preparing its publication/distribution material. This confirms a working personal-blog practice. He reports better speed and output, without a measured improvement attributable to the images. [Blogging workflow, especially “Graphics”](https://domkirby.com/blog/ai-assisted-blog-writing-workflow/).

**Adopt:** create graphics from the settled article and inspect them before publication. **Do not import:** obligatory model switching, an AI-generated infographic when verified diagram source is better, or a Canva dependency.

### Alexander Opalic: AI-assisted media includes diagrams and real captures

Opalic demonstrates explanation → Mermaid source → revision, and separately publishes a browser skill that captures real pages with annotations. These are useful technical-blog media workflows with concrete artifacts, even though they do not establish a cross-post raster-art style. [Diagram workflow](https://alexop.dev/posts/how-to-use-ai-for-effective-diagram-creation-a-guide-to-chatgpt-and-mermaid/), [screenshot workflow](https://alexop.dev/posts/app-screenshots-claude-code-skill/).

**Adopt:** use AI to choose and author a diagram or focus a screenshot, with native data/text preserved. **Do not import:** capturing every page, rigid annotation quotas, or a second browser stack. The existing session diagram and Telegram captures in Sid's posts already do these jobs.

### Jordan Hong Tai: one style paragraph plus an inspected reference library

Hong Tai publishes a style block, a same-subject comparison, and a workflow that saves selected images and their prompts for later reference. The guide uses Higgsfield and discloses an affiliate link. Its guarantees of zero drift and its rule against all editing are stronger than the demonstration supports. [Guide and comparison](https://www.jordanhongtai.com/guides/consistent-ai-brand-images).

**Adopt:** persistent reference images plus a reusable text block. **Modify:** keep a stable original anchor so recursive reuse does not gradually drift; edit local defects and restart only when the overall direction is wrong. **Do not import:** exact-colour guarantees from hex codes or another subscription.

### A useful counterexample: Victoria Lo's consistency is not AI

Lo explicitly says her covers are made with Photoshop and reused design elements, and describes the linked piece as her 242nd post. She uses illustration libraries and an established routine. A reader's assumption that consistent covers must be AI-generated was incorrect. [Her account](https://lo-victoria.com/why-i-dont-ai-generate-my-blog-images).

**Adopt:** consistent composition and reusable elements are independent of the generation tool. **Do not claim:** that a polished blogger uses AI based only on the visual appearance of their work.

## Practical techniques translated into this skill

| Technique                                         | Application here                                                                                        | When it is useful                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Separate concept selection from rendering         | Write two or three brief visual directions, choose the one tied to the article's discovery, then render | When the author supplied a topic but no clear scene                        |
| Hold style constant and vary subject              | Stable paragraph plus actual reference image; article-specific action and objects                       | Every subsequent illustration in the series                                |
| Separate reference roles                          | Identify style, object identity, composition sketch, and edit target explicitly                         | Prevents copying an irrelevant subject or accidentally editing a reference |
| Keep the best source as the anchor                | Return to the original selected reference after accumulated drift                                       | Across posts and multiple editing sessions                                 |
| Compare at equal displayed size                   | Side-by-side review of colour, line weight, texture, and complexity                                     | A set can be inconsistent even when every image looks good alone           |
| Generate reusable components only when they recur | Reuse a selected motif; compose exact titles with native layout                                         | Repeated identity elements or a regular social-card format                 |
| Reserve space before generation                   | Specify the real title box or crop-safe object area in the brief                                        | Prevents rescuing a beautiful but unusable social image later              |
| Change one thing at a time                        | Target a local defect; preserve the remaining selected image                                            | Keeps iteration understandable and limits unnecessary generations          |
| Keep a readable recipe                            | Per-post notes with final prompts, sources, references, settings when exposed, and actual dimensions    | Makes the next session reproducible without relying on chat history        |
| Simplify for the smallest view                    | Preview thumbnail before adding details; prefer large silhouettes                                       | Desktop artwork otherwise often becomes illegible on phones                |

These are practical adaptations, not controlled claims that any one recipe improves clicks. The skill deliberately avoids a required image count, global fine-tuning, mass generation before articles exist, and an automatic generation/rejection loop. A completed post supplies better subjects than a generic stock library.

## Provider controls that support the techniques

- **Midjourney:** its current Style Reference documentation distinguishes style from objects, offers reference influence controls, and warns that older style codes can change between versions. Use those controls only if the author chose Midjourney; do not paste `--sref` or `--sw` into an unrelated tool. Record the version and chosen references. [Official Style Reference guide](https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference).
- **Seeds:** the provider explicitly says seeds do not store a visual style across different prompts. They can help controlled experiments but are not the persistence mechanism for the blog. [Official seed guidance](https://docs.midjourney.com/hc/en-us/articles/32604356340877-Seeds).
- **Recraft:** custom styles can be built from reference images and revised by changing the reference mix. A saved style is useful when a team already uses that product. This is a documented capability, not a reason to install it for one blog. [Custom-style documentation](https://www.recraft.ai/docs/recraft-studio/styles/custom-styles/how-to-create-a-custom-style).
- **Gemini:** the official image documentation supports reference-guided generation and using previous images for consistency. Transfer the general method, not provider-specific limits or advertised quality claims. [Image documentation](https://ai.google.dev/gemini-api/docs/image-generation).
- **Current local tool:** the installed `imagegen` skill supports a built-in tool, labelled reference roles, and targeted edits. Its actual callable schema takes precedence over older skill examples. The author selected **GPT Image 2** (`gpt-image-2`). The bundled CLI can select it explicitly; the built-in tool currently exposes no model selector. Record the actual route and model evidence; a model name in a prompt does not select the backend.

## Design, accessibility, and delivery evidence

| Source                                                                                                                                                                                      | What it supports                                                                                          | Decision                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [IBM illustration principles](https://www.ibm.com/design/language/illustration/overview/) and [composition guidance](https://www.ibm.com/design/language/illustration/tips-and-techniques/) | A repeatable visual grammar, clear purpose, and different detail levels for different roles               | Define medium, palette, contours, viewpoint, and density together; don't copy IBM's brand            |
| [Julia Evans on useful programming comics](https://jvns.ca/blog/2020/12/05/how-i-write-useful-programming-comics/)                                                                          | Choosing useful things to explain matters more than sophisticated drawing tools                           | Start with the insight the reader needs to see                                                       |
| [NN/g image eyetracking research](https://www.nngroup.com/articles/photos-as-web-content/)                                                                                                  | Relevant information attracts attention; decorative filler can be ignored                                 | No automatic section-divider or image-per-word quota; research was not an AI-blog traffic experiment |
| [Open Graph protocol](https://ogp.me/)                                                                                                                                                      | Image URLs and their descriptive metadata                                                                 | Fetch real bytes and inspect the emitted tags; OG defines no universal padding rectangle             |
| [LinkedIn sharing requirements](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin)                                                            | Its sharing module's aspect, dimensions, and file limit                                                   | Keep the existing 1200 × 630 export; accommodate an exact destination brief when requested           |
| [Google image guidance](https://developers.google.com/search/docs/appearance/google-images)                                                                                                 | Relevant nearby text, meaningful image alternatives, crawlable image elements, and representative imagery | Place figures beside their explanation; don't substitute a generic logo for article art              |
| [Discover guidance](https://developers.google.com/search/docs/appearance/google-discover)                                                                                                   | Large representative images and a considered landscape crop                                               | Treat a text-heavy social title card and search art as separate editorial decisions                  |
| [WAI image tutorial](https://www.w3.org/WAI/tutorials/images/)                                                                                                                              | Alternatives depend on image purpose                                                                      | Describe meaning; provide nearby explanations for complex visuals                                    |
| [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [graphical contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)        | Legibility requirements for meaningful information                                                        | Check rendered size and adjacent colours, not only source pixels                                     |
| [web.dev responsive art direction](https://web.dev/learn/images/prescriptive) and [LCP](https://web.dev/articles/optimize-lcp)                                                              | Source selection and loading should match the actual slot                                                 | Native responsive delivery; reserve dimensions and don't lazy-load the principal above-fold image    |
| [Next ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response) and [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)              | Deterministic social rendering and framework metadata behaviour                                           | Reuse the existing pipeline and inspect final output instead of guessing from filenames              |

**Unverified platform detail:** Meta's sharing best-practice page returned HTTP 429 during this review; legacy X/Twitter large-card documentation redirected to the developer overview rather than the old specification. No current X-specific dimensional guarantee is inferred from copied third-party charts. The optional 2:1 and square previews are crop stress tests. Recheck official documentation and real previews for a destination-specific task. [Meta page attempted](https://developers.facebook.com/docs/sharing/best-practices/), [X page attempted](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image).

## Decisions and limits

The initial proposed treatment was warm editorial ink because it fits this site's existing card palette and restrained diagrams, and can express both technical and personal subjects. Research supports maintaining a small visual grammar; it does not select this exact palette. Sizes, internal breathing room, preview test widths, file budgets, and the inherited 82/72 px card inset are house decisions, labelled accordingly.

The author subsequently compared editorial ink, cut paper, coloured pencil, and matte miniature scenes using the same ZeroClaw lunch subject on both site themes, then selected **B — Cut paper**. That selection now defines editorial cut paper, version 1. The accepted sample is bundled with the skill as its persistent style anchor; new subjects should match its material and palette without copying its vegetables or card layout.

## First style comparison

Four 1536 × 1024 samples of the same ZeroClaw lunch scene were generated with the built-in tool after the author explicitly authorised that route. The backend model was not exposed, so these are not labelled verified GPT Image 2 outputs. The samples compare editorial ink, cut paper, coloured pencil, and matte miniatures. A browser-rendered contact sheet shows each unchanged image on the site's light and dark background colours. Sid selected cut paper. Two reference-guided final images now illustrate the ZeroClaw post: a 1536 × 1024 inline scene after the introduction and a separate 1200 × 630 social composition. Their final prompts and export details are recorded in [the post's image notes](blog-images/building-on-zeroclaw.md). The strongest outlines are in the ink candidate; the paper and pencil candidates are softer. This is visual review, not a measured engagement result.

## Revision from the author's visual feedback

Sid liked the cut-paper material but found the first pair sparse and monotonous. Version 2 keeps the matte paper, soft edges, and lighting while using fuller narrative scenes, people and hands where meaningful, overlapping layers, more colour, stronger movement, and short relevant labels. A minimum object count or blanket ban on text would work against that direction. The original B sample remains a material reference; a richer production example is bundled separately to prevent later sessions from reverting to the sparse layout.

The resulting set covers all eight articles dated 2026, including the unpublished Namefi draft. The latest fetched `origin/next` (`db064cb`) adds dependency updates but no further articles relative to the inspected content. Each post now has one purposefully placed inline illustration and a 1200 × 630 social image. Existing screenshots, diagrams, article text, dates, and draft states remain intact. Exact generation prompts, corrections, export sizes, and placement anchors live in `docs/blog-images/<slug>.md`. The revised ZeroClaw and image-search social scenes were separately recomposed to protect their framing and labels; the other social files use inspected crops of their article masters.

The generator added unwanted lettering to two scenes despite a restrictive prompt. Those outputs were edited to remove unsupported protocol labels and invented grocery/schedule details. This reinforces an operational rule: asking for exact text does not replace visual review. Short labels such as `C0 00`, `GN`, `MEANING`, and `DETAILS` are useful when they clarify the article's actual idea; decorative pseudo-documentation is not.

Fresh browser validation exposed that co-located Markdown production notes were included by the broad dynamic content import and failed Turbopack compilation. Production notes now live in `docs/blog-images/`; the skill records this repository-specific boundary. No new loader or application abstraction was needed.

## Editorial correction after the full 2026 set

The author liked the cut-paper finish and richer colour but rejected the abstract MEANING/DETAILS machinery and the habit of converting nearby terminology into signs. The current direction is v3: grounded, complementary scenes with sparing, earned text. This is author feedback and editorial judgment, not a new research finding. [The full visual review](blog-images/visual-review.md) records decisions for all eight articles and the other insertion points considered.

Seven illustrations and their social covers were revised. The website retrospective now uses a current render of its committed archive HTML inline and keeps its paper artwork for social recognition. Two native diagrams were added where they explain previously unillustrated boundaries: Veera's successful fallback to upstream code and Tranquilo's availability recheck before checkout. The initial query-splitting artwork was replaced by the concrete act of choosing an image for a lesson.
