# Agent measurement and execution recipes

## Start with the tools already available

Use shell HTTP requests for headers/raw HTML/XML, an available browser for rendered content and visual checks, the repository's tests/build for regressions, and existing authenticated analytics tools for outcomes. Search available tool descriptions before proposing a new integration. Do not install an entire SEO suite to check a small Next.js blog.

For this repository the native stack already supplies metadata routes, server-rendered JSON-LD, a shared PNG social renderer, Mermaid, RSS, and Markdown exports. Run commands through `rtk`, as required by its local instructions. Canonical sources live in `.rulesync/skills`; keep agent-visible copies in sync when editing a skill.

## Search Console with an authenticated tool or API

1. List verified properties; select the exact domain or URL-prefix property for the canonical site.
2. Query the last 28 complete days and the preceding equivalent period, then check longer/seasonal context when meaningful. Record the data's freshness. Separate brand queries from technical discovery queries.
3. Fetch site totals separately from page/query rows. Privacy filtering, aggregation and row limits mean detailed rows need not sum to total clicks/impressions. Use consistent filters and query pagination; do not imply the API returns every possible query.
4. Inspect affected URLs for Google's chosen canonical, indexing state, last crawl and reported problems. URL Inspection API describes Google's indexed copy; it is not a live-page fetch or indexing request.
5. Pick a specific opportunity: broken indexability, a relevant page with impressions but an unclear preview, a real unanswered technical question, or an old article needing a substantive correction. Rewrite only the relevant parts and preserve the author's voice.

Example request bodies, to send through an already authenticated connector/client:

```json
{
  "startDate": "2026-08-10",
  "endDate": "2026-09-06",
  "dimensions": ["page", "query"],
  "type": "web",
  "rowLimit": 25000,
  "startRow": 0
}
```

Endpoint: `POST https://www.googleapis.com/webmasters/v3/sites/{URL-encoded-property}/searchAnalytics/query`. Replace the example dates; do not keep them as a permanent window. [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

```json
{
  "inspectionUrl": "https://f0rr0.dev/blog/building-on-zeroclaw",
  "siteUrl": "sc-domain:f0rr0.dev",
  "languageCode": "en-US"
}
```

Endpoint: `POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`. The official API accepts `webmasters.readonly` or `webmasters`; a wrapper may impose a stricter requirement. Prefer the access actually needed. [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect).

If no authenticated access exists, finish all public-response and repository work, state that indexed status/performance is unmeasured, and identify the precise connection needed. Never put credentials in reports, prompts, shell traces, or committed files. Do not claim `site:` search results provide a complete indexed-page count.

## AI visibility: measure different things separately

Google's June 2026 announcement, updated August 31, says dedicated generative-AI performance views are available worldwide. They show impressions with page, country, date and (for Search) device views; the data also remains in overall performance reporting. Check the live account and current API support instead of repeating older advice that no dedicated report exists or inventing API fields. Use an authorised UI export if the needed breakdown is not exposed by the available API. [Google announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports).

Bing's AI Performance public preview reports citations, cited pages, sample grounding queries and trends. These are visibility observations, not an authority score or a stable position in every answer. Record availability and reporting window. [Bing AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview).

Keep three measurements distinct:

- Search/AI impressions and citations from provider reports.
- Human referral visits and meaningful outcomes from existing analytics (for example, article reading followed by a project visit). Assistant requests and bots are not human sessions.
- A small, fixed manual query set across named engines: exact prompt, date, engine/mode, cited URL, and whether it actually supports the answer. Repeat samples; answers vary by time, locale and context. Absence in one answer is not proof of exclusion from an engine.

For this blog, useful query subjects include the project's actual mechanisms: self-querying media search, a household assistant's listening/reply distinction, protocol reverse engineering, and hot module replacement on a server. Start with questions a reader could reasonably ask; avoid a manufactured list of commercial “best tools” queries.

## Recrawl and notification

Check the live canonical page and sitemap first. With existing authority and credentials, submit the sitemap through the supported Search Console endpoint/tool and inspect submission status. Manual URL inspection can request recrawling where the UI allows it. **Do not use Google's Indexing API for ordinary blog articles**: it is limited to eligible job-posting and livestream pages. [Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api).

For IndexNow, when the site has opted into it, publish and verify the ownership key file, then submit only actually added/changed/deleted canonical URLs after a successful production release. A JSON request includes `host`, `key`, optional `keyLocation`, and `urlList`; batches may contain up to 10,000 URLs. Handle 202 as pending key validation and 429 with backoff; do not resend the whole site on every audit. Success acknowledges receipt, not indexing or ranking. [IndexNow protocol](https://www.indexnow.org/documentation).

Do not add a persistent scheduler solely because an agent can run these steps. When recurring monitoring is requested, save a bounded task using the app's automation tools: compare snapshots and provider data, act within authorised scope, and notify only on meaningful change or required action.

## Reusable task prompts

### Publish a post

> Read the blog-writing and site-seo skills. Finish this article's story first, then its title, description, dates, author, visual assets, social card and structured data. Reuse the existing generators. Validate its rendered page and public discovery paths, fix observed failures, and carry out the already authorised publication. Report the live URL and anything that remains unmeasured.

### Audit and fix the website

> Read site-seo. Inventory public templates, articles, aliases and exports. Save a baseline, identify concrete failures in access, canonical identity, discovery, metadata and rendering, and fix their shared source. Compare the final deployment with the baseline. Preserve the site's crawler policy and narrative voice. Do not stop at a report or invent a numerical SEO score.

### Refresh from search data

> Use the verified site's last 28 complete days and previous period, with a longer comparison if seasonality matters. Separate totals from query rows and brand from technical discovery. Identify at most three article opportunities supported by the data, inspect the actual pages, and make the authorised focused improvements. Save what changed and how to evaluate it after recrawling; do not promise a causal traffic lift.

### Test agent readability

> Start with the site's llms.txt and only follow its public links. Find the article relevant to [real reader question], explain its key mechanism, and cite the canonical page. Record dead ends, unclear labels, broken assets or missing context, then repair the discovery/export layer. Preserve the human article rather than adding instructions that tell agents what to think.
