---
name: site-seo
description: Audit and improve website and blog search discoverability, metadata, structured data, indexing controls and agent readability. Use for SEO, AEO, GEO, sitemaps, llms.txt, social previews and search-performance diagnosis.
---

# Site SEO and agent readability

Make the site's content easy to find, understand, share and cite. Reuse its content model, metadata APIs, image renderer, feeds and deployment checks. Pair with `blog-writing` for Sid's articles; search optimisation should support the personal narrative.

## Select the relevant checks

- **Publishing an article:** final title/description, author/dates, representative social image, article schema, internal links, feeds, sitemap and alternate content. Read [publishing.md](references/publishing.md).
- **Auditing the site:** crawl/index controls, canonical origin, redirects, template metadata, link structure and rendered content. Read [publishing.md](references/publishing.md).
- **Improving agent access:** current crawler roles, actual fetchability, compact `llms.txt`, discoverable Markdown and consistent canonical attribution. Read the crawler and alternate-content sections in [publishing.md](references/publishing.md).
- **Diagnosing search or citation changes:** authenticated provider data, comparable periods and page/query cohorts. Read [measurement.md](references/measurement.md) for tool usage and request examples.

## Inspect the real publishing surfaces

Compare the published content inventory with navigation, feeds and sitemap entries. Cover every article on a small site; on a larger site begin with each template and the affected URLs. Include previews, drafts, redirects, alternate formats and a genuinely missing URL.

Inspect HTTP status, headers, canonical links, robots directives, title/description, social fields and JSON-LD before and after changes. Check raw HTML as well as the rendered DOM: text converters may strip schema, while client-injected content needs a browser. Use existing tests and CI for repeatable regression checks, and browser/HTTP tools for deployment validation.

## Fix access and identity first

Prioritise unintended crawl/index blocks, errors and broken canonicals before tuning copy. Use one production origin for canonical URLs, social identity, sitemap entries and structured-data IDs. Previews should not introduce another public identity. Public `noindex` responses must remain readable by crawlers; confidential content needs access control.

Preserve the owner's crawler policy. Search crawlers, user-requested fetchers and training crawlers have different purposes. Verify their current controls with provider documentation rather than inferring bot names from product names or copying an unverified robots template.

Fix a shared generator when several pages have the same defect. Keep discovery exports aligned with the same published-content filter. Preserve truthful modification dates and distinguish canonical pages from alternate representations.

## Support the reader's reason to arrive

Identify the specific question or curiosity the actual work answers. Use search results and available query data to understand that intent, not to copy competing outlines. Retain original insight, concrete examples and useful source links. Link related material where it advances the explanation.

Finalise metadata after the article settles. Choose a specific title and useful standalone description; mention technologies naturally. Avoid word-count targets, keyword quotas, compulsory FAQs, fabricated authority signals and date changes made merely to suggest freshness. Metadata and structured data must agree with the visible article.

## Verify and measure

Render affected templates on narrow and wide screens. Inspect code, diagrams, images, captions, embeds and fallback links. Fetch the actual social image and inspect its crop. On previews, verify indexing controls and the production canonical; test image responses on the deployment being reviewed.

After publication, check the live pages, feeds, sitemap, alternate content and expected missing-page responses. A successful build or sitemap submission does not establish indexing or ranking. Use Search Console/Bing data for those observations, and distinguish search impressions, AI citations and human referral visits. Keep unavailable measurements unknown.

Choose focused changes from measured outcomes, retain the comparison window and evaluate after recrawling. Use the task prompts in [measurement.md](references/measurement.md) when publishing, auditing, refreshing an article or checking agent readability.
