# Publishing checks and crawler controls

Verify current provider guidance before changing crawler policy or implementing a newly supported search feature.

## Canonical pages and indexing

For each intended search page, fetch the public response and verify: successful status; useful content in HTML; one intended absolute canonical; no conflicting `noindex` in HTTP headers or robots meta; `og:url` agreement; a reachable internal link; inclusion in the canonical sitemap where appropriate. Test HTTP/HTTPS, aliases, trailing slash variants and old slugs. Use permanent redirects for actual moves; do not rename established slugs just to add a keyword. Canonical annotations are signals, not instructions Google must follow. [Google canonicalisation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

`robots.txt` controls crawling, not authentication or reliable removal from search. Search may know a blocked URL without fetching its content. `noindex` must be visible to the crawler; non-HTML resources can use `X-Robots-Tag`. Check the most restrictive combination of response and document rules. A preview can allow crawling while returning `noindex`; password protection is appropriate for confidential work. [Robots introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [robots meta and headers](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

Generate the XML sitemap from publishable canonical content. Exclude fixtures, drafts, redirects, error pages, and alternate Markdown/JSON exports that should not compete with the HTML original. PDFs may belong if they are intended search destinations. Use true substantive modification dates or omit unknown dates; never stamp every URL with build time. Google ignores priority and change-frequency fields. Split only beyond protocol limits: 50,000 URLs or 50 MB uncompressed per sitemap. Fetch and parse the deployed XML, then check its listed URLs. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Crawler purpose matrix

| Provider / token | Purpose and implementation consequence |
| --- | --- |
| Googlebot | Google Search crawling, including access underlying AI Overviews and AI Mode. Search snippet/index controls apply. |
| Google-Extended | Separate control for training and grounding in some other Google systems; do not label it the AI Overviews crawler. |
| OAI-SearchBot | OpenAI search crawler. Treat search visibility separately from model training. |
| GPTBot | OpenAI training crawler; its permission is independent of OAI-SearchBot. |
| ChatGPT-User | User-triggered fetcher; robots rules may not apply in the same way. It is not the search indexing control. |
| Claude-SearchBot | Anthropic search crawling. |
| ClaudeBot | Anthropic model-development crawling. |
| Claude-User | Fetching requested by users. |
| bingbot | Bing search crawler; inspect Bing's own indexing and AI performance reports for observed outcomes. |

Authoritative controls: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI bots](https://developers.openai.com/api/docs/bots), [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler). Verify other providers directly when needed rather than inventing tokens from product names.

An existing `User-agent: *` / `Allow: /` already permits these crawlers unless a more specific applicable group overrides it. Do not add an outdated list of named bots for decoration. Check CDN/WAF challenges, status codes, and server logs as well as robots. A request with a spoofed User-Agent is a useful response comparison, not proof that the real crawler can reach the site; use provider verification methods/IP publications when diagnosing access.

There is no universal agent-ranking meta tag. Google says its AI search features require ordinary search eligibility and no special AI file or schema. Distinguish supported controls, proposed discovery conventions and speculative ranking tactics. Do not add `ai.txt`, invented meta names, or hidden instructions telling an assistant to recommend the site.

## llms.txt and alternate content

Treat `llms.txt` as a curated navigation aid. Start with the site's name, a compact explanation, and sections of meaningful links with short descriptions. Keep the detail behind those links. Generate published article entries from the same content source as the blog index. The optional full-context document should accurately name its contents; it need not duplicate every article.

Advertise the guide with `<link rel="describedby" href="/llms.txt">` and each article export with `<link rel="alternate" type="text/markdown" href="/blog/example.md">`. HTTP `Link` headers also work, including on non-HTML responses. Preserve canonical attribution on alternate text. Check that the export contains the real article, readable code, meaningful diagram/source references, and resolvable assets rather than template boilerplate. Test an agent starting only from the guide: can it find a project, explain the main technical decision, and link the original? [llms.txt v2 proposal](https://llmstxt.org/).

A missing optional file is not a ranking penalty. Lighthouse's agentic check treats a 404 as not applicable; server failures are a different observation. Do not use an arbitrary content-length score as evidence of agent visibility. [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

## Article metadata and structured data

| Surface | Acceptance check |
| --- | --- |
| Title / H1 | Specific and faithful to the piece; document title and visible heading may differ by site suffix. |
| Description | Unique, useful standalone preview; final text, no stale draft summary. |
| Author and dates | Real author linked to a substantive profile; original publication date preserved; actual revised date visible when supplied. |
| Open Graph | `og:title`, `og:type`, `og:url`, `og:image`; useful description and image alt; absolute working URLs. Article publication/modification fields agree with content. |
| Twitter card | Appropriate card type, title, description, working image; inspect the actual crop. |
| JSON-LD | Parseable `BlogPosting` for an article, `Person` author and consistent identity URLs, correct headline/description/dates/image, canonical page association. |
| Index and feeds | Article appears once with correct title/link/date; drafts excluded; RSS XML escaped and parseable. |
| Internal links | Entry from the blog index plus contextual links where useful; anchors explain their destination; no fabricated topic clusters. |

Use the framework's metadata API rather than duplicating tags in components. Structured data must describe visible reality. Reuse stable author/site `@id`s, and a truthful author profile with actual official `sameAs` links. Do not add a business address to a personal blog, manufacture `AggregateRating`, or make every story a `HowTo`/FAQ. Validate with JSON parsing, Schema.org's validator and the relevant Google Rich Results Test; valid markup does not guarantee a rich result. [Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article), [Open Graph protocol](https://ogp.me/).

Google may select page text instead of the supplied description, and has no fixed meta-description length limit. Edit for clarity and likely preview fit rather than imposing 155 characters on every post. [Snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

## Images, diagrams, and page experience

Keep social cards, illustrative art and explanatory figures distinct. The existing 1200×630 renderer is a practical social-card default, not a Google ranking requirement. Preserve custom overrides and verify PNG/JPEG bytes and dimensions. Prefer a representative image when available; a title card guarantees a usable fallback, not Discover placement.

For Discover-oriented images, Google's current guidance recommends relevant large images at least 1200 px wide, over 300,000 total pixels, with a considered landscape crop and `max-image-preview:large`. Do not stretch a portrait screenshot or replace useful article art with a generic logo. Narrative quality and original insight remain useful here. [Discover guidance](https://developers.google.com/search/docs/appearance/google-discover).

Render diagrams from editable text/vector sources where the site already supports them. Check the actual narrow-screen width, theme contrast, labels and accessible explanation. Keep code textual and copyable. Embeds need usable ordinary links when a third party is unavailable. Use real screenshots for claimed results; generated art may explain a concept but must not pose as a captured result.

Inspect image dimensions/layout shifts, responsive sizes, font loading, heavy third-party embeds and unnecessary client JavaScript. Use existing framework image/font support. Check actual field Core Web Vitals when available and label lab measurements separately; no field data is not a zero score. Use the relevant performance skill for a measured performance problem, rather than treating a Lighthouse number as the whole SEO audit.
