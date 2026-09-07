---
name: site-seo
description: Audit, implement, validate, and maintain website and blog SEO, AEO, GEO, and agent readability. Use for crawlability, indexing, canonical URLs, sitemaps, robots controls, llms.txt, Markdown discovery, JSON-LD, metadata, Open Graph, search performance, and AI citations. Includes repeatable audits and agent workflows from research. Pair with blog-writing for Sid Jain's articles; preserve the author's narrative voice.
---

# Site SEO and agent readability

Make the author's work easy to find, understand, share, and cite. Finish the implementation and verify the deployed result when the user's scope includes fixing or publishing. A report alone does not complete an implementation request.

Read this site's guidance and existing generators first. Reuse its content model, metadata APIs, image renderer, feeds, and deployment checks. For Sid's prose use `blog-writing`; search optimisation must not replace personal stories with generic answer blocks, compulsory FAQs, repeated caveats, or keyword inventories.

## Choose the work from the trigger

| Trigger | Work to perform | Completion evidence |
| --- | --- | --- |
| New or substantially revised article | Reader/topic fit, final metadata, images, author/dates, internal discovery, schema, rendered checks | Working production article, image, index, feed, sitemap, Markdown |
| Whole-site audit or redesign | Inventory every template and URL class; inspect crawl/index controls, canonical origin, redirects, schema, links, mobile experience | Before/after observations tied to changed files and URLs |
| Traffic or citation decline | Compare consistent periods and page/query cohorts before proposing edits | Observed change, plausible cause, targeted fix, measurement window |
| Agent access / llms.txt | Check crawler roles, actual fetchability, compact index, discoverable clean content | An agent can find and explain relevant work from the published links |

For detailed acceptance checks and crawler policy, read [publishing.md](references/publishing.md). For data tools, executable request examples, and recurring recipes, read [measurement.md](references/measurement.md). For researched implementations and rejected shortcuts, read [research.md](references/research.md). Open only the reference needed for the current task.

## 1. Establish the baseline

Infer the canonical domain, audience, article inventory, draft rules, publishing authority, and existing analytics from the repository and session. Ask only for missing information that changes the work. Missing Search Console access prevents measuring indexed status; it does not prevent fixing a bad canonical or testing a page.

Inventory the homepage, profile/about page, blog index, articles, other substantive sections, feeds, machine exports, PDFs, redirects, missing URLs, previews, and drafts. Small site: inspect every published article. Large site: start with all templates and high-value/problem URLs; state the sample and expand only where findings justify it. Compare the sitemap with actual navigation and the content inventory to catch orphan or missing pages.

Capture a before snapshot using `scripts/audit.py` (Python standard library):

```sh
python3 path/to/site-seo/scripts/audit.py https://example.com > /tmp/seo-before.json
python3 path/to/site-seo/scripts/audit.py http://localhost:3000 --canonical-origin https://example.com > /tmp/seo-local.json
```

The script fetches the sitemap and its listed pages, captures raw HTML metadata and JSON-LD, and reports mechanical review items. It does not measure ranking, execute JavaScript, validate all schema semantics, or decide writing quality. It deliberately follows only the supplied origin, with bounded requests. Use the browser and provider reports for the remaining checks; never turn its output into an invented SEO score.

## 2. Fix access and identity before polishing snippets

Resolve errors in this order: unintended public-page `noindex` or access blocks; broken/redirecting canonical URLs; missing or duplicate discovery paths; unusable mobile content or assets; inaccurate metadata/schema; editorial improvements.

Keep one stable production origin for canonical URLs, `og:url`, sitemap locations, article identities, and author `@id`s. Preview and local hostnames are testing locations. Public previews should emit `noindex`; private material needs actual access control. Let crawlers read a public `noindex` response instead of simultaneously hiding it behind `robots.txt`.

Inspect raw responses and rendered DOM. Text-only page converters may strip JSON-LD. Raw HTML can contain server-rendered schema; client-injected schema needs a browser. Inspect actual redirects and headers rather than trusting source configuration. Use a real missing URL to detect a soft 404. Fix the shared generator when multiple pages share the defect.

Preserve the owner's crawler policy. Search crawlers, user-requested fetchers, and training crawlers have different purposes. Do not expand or revoke training access merely to improve search. Verify current names and controls against provider documentation before editing rules.

## 3. Make the article worth arriving at

Identify the specific reader question or curiosity the real experience answers. Search related phrasing and competing pages to understand intent and missing explanations, not to copy their outline. Use actual GSC queries when available. A technical diary can satisfy curiosity through a story; it does not have to become a tutorial.

Keep the original insight, examples, distinctive project details, and earned conclusion. Clarify unfamiliar mechanisms at the point they matter. Name technologies naturally. Link a related article where it advances the explanation; use descriptive anchors and real source links. Never manufacture experience, benchmark numbers, credentials, reviews, citations, or a publication date for discoverability.

After the draft settles, finish the title, standalone description, stable slug, author, original date, substantive updated date, useful topic tags, social image, and article JSON-LD. Preserve narrative titles when they work. Search previews may truncate or rewrite text; character counts are editing aids, not ranking rules. Site topic tags help organisation; `meta keywords` is not an optimisation strategy.

Use illustrations, real screenshots, diagrams, and interesting code according to the story. Check readable text, alt/captions, dimensions, mobile crops, and actual public image responses. A correct image URL in HTML does not prove that the image loads or looks good. Keep all discovery exports generated from the same published-content filter.

## 4. Verify the whole release

Run the repository's relevant checks and build. Browse changed templates on a narrow and wide viewport. Inspect light/dark diagrams, broken images, content overflow, code, embeds and fallback links. Check metadata and JSON-LD values against the visible article. Confirm drafts and fixtures remain absent from public routes and exports.

Run the snapshot again, compare affected URLs and fields, and investigate unexpected drift. On a preview use `--expect-noindex`; canonical URLs should still point to production. Fetch social images on the deployment being tested even when its canonical image tag points to production. Validate the final live domain after release, including image bytes, Markdown, RSS, sitemap, and a missing article.

Report separately: implemented, locally validated, live, indexed according to provider data, and measured traffic/citation changes. These are different observations. Never claim a ranking improvement from a passing build, a sitemap submission, bot access, or a successful `llms.txt` fetch.

## 5. Learn from actual outcomes

Use the measurement recipe to choose a small number of changes from real data. Retain the query set, page cohort, date range, deployment date and before snapshot. Diagnose impressions, clicks, CTR, indexing and AI citations separately. Keep unavailable data unavailable rather than filling it with zero or synthetic estimates.

Turn accepted recurring corrections into this skill or the publishing generator. Keep experiments bounded and reversible. Do not create a paid-tool stack, a bulk-content pipeline, a scheduled job, or an external distribution campaign unless it serves the requested scope.
