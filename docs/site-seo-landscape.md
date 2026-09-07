# SEO and agent publishing research

Reviewed September 7, 2026. The reusable deliverable is the
[site-seo skill](../.rulesync/skills/site-seo/SKILL.md), paired with
[blog-writing](../.rulesync/skills/blog-writing/SKILL.md). This note is a map to
the research and implementation, not an additional workflow agents must load.

The research covered official Google, Bing, OpenAI, Anthropic, IndexNow,
Open Graph, llms.txt and Lighthouse documentation; a GEO research paper;
firsthand browser-agent SEO accounts; and twelve GitHub implementations.
The earlier [writing landscape](blog-writing-landscape.md) covers the writing,
story, media and production research.

## What to emulate

Agent-driven SEO works best as a short feedback loop: inspect the real page and
provider data, change the shared source, verify the deployment, then measure
what happened. Several repositories make useful parts of that loop concrete:
metadata snapshots in AgriciDaniel's suite, JSON extraction plus judgement in
JeffLi1993's audit, question-to-page mapping in itsbeaudean's skill, and actual
Search Console tools in the GSC MCP projects. The
[source-by-source comparison](../.rulesync/skills/site-seo/references/research.md)
records exactly what was inspected and which ideas were retained.

The strongest firsthand SEO example found was
[Alexander Opalic's browser-agent audit](https://alexop.dev/posts/how-i-use-claude-code-for-doing-seo-audits/):
it found development crawl/index settings on a real blog starter and produced
specific source fixes. That is an observable workflow result. It is not a
controlled demonstration that AI-generated articles or an audit increased
organic traffic. The researched tool repositories likewise provide practical
interfaces, not independently established ranking gains.

## What changes the implementation

Search crawling, model training and user-requested fetching need separate
decisions. Popular skills in the sample get that distinction wrong. The
[crawler matrix](../.rulesync/skills/site-seo/references/publishing.md) uses
provider documentation and preserves the site's existing policy.

`llms.txt` is useful navigation for an agent, with standard link relations for
discovering the guide and Markdown pages. It is not a special Google ranking
file. The skill explains the current proposal and gives a task that tests
whether an agent can actually find and explain the author's work.

Search measurement has changed recently. Google's dedicated generative-AI
impression views were announced in June 2026 and reported as fully rolled out
on August 31; Bing offers an AI Performance preview. The
[measurement recipe](../.rulesync/skills/site-seo/references/measurement.md)
distinguishes those observations from human referral traffic and repeatable
manual citation samples, and includes authenticated API request bodies.

There is no need to replace the site's native publishing stack. Next.js
metadata routes, JSON-LD, RSS, Mermaid, Markdown exports and the shared social
renderer cover production. Browser checks and the bundled standard-library
audit cover public validation. Search Console/Bing account access is the next
capability needed for actual indexing and performance measurement; it is not
required to make and validate the code improvements.

## Applied to this website

- Stable production canonical and entity URLs, including when built as a preview.
- Explicit preview `noindex` in metadata and HTTP headers.
- Article Markdown alternate links and `llms.txt` discovery links.
- Visible authorship and substantive revision dates alongside existing publication dates.
- Sitemap focused on intended search destinations, with real modification dates.
- Simpler robots rules that retain the existing allow-all policy.
- Corrected documentation of the full profile context versus individual article exports.
- Reusable SEO skill, source evaluation, task prompts, measurement recipes and a runnable audit.

The writing changes revise the seven 2026 articles. Shared publishing support
supplies working social previews. All skill instructions protect the author's
personal narrative from keyword quotas, boilerplate FAQs and defensive prose.

The audit records HTTP/HTML observations. A live page and a valid sitemap do
not establish that Google has indexed it or that an answer engine will cite
it. Those outcomes should be checked with the account-backed recipe after
publication, using the actual release date and a consistent comparison window.
