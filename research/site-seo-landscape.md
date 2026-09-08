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
[source-by-source comparison](#github-implementations)
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
renderer cover production. Browser and HTTP checks cover public validation. TypeScript tests in the
existing CI cover canonical URLs, preview indexing controls, Markdown exports
and social-image generation. Search Console/Bing account access is the next
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
- Reusable SEO guidance, publishing checks, task prompts and measurement recipes.

The writing changes revise the seven 2026 articles. Shared publishing support
supplies working social previews. All skill instructions protect the author's
personal narrative from keyword quotas, boilerplate FAQs and defensive prose.

Public-response checks record HTTP/HTML observations. A live page and a valid sitemap do
not establish that Google has indexed it or that an answer engine will cite
it. Those outcomes should be checked with the account-backed recipe after
publication, using the actual release date and a consistent comparison window.

## GitHub implementations

| Source inspected                                                                                                                                                            | Useful practice carried into this skill                                                                                                                                               | What was rejected or needs verification                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills), `seo-audit` and `ai-seo`            | Start with site context; prioritise indexability; separate technical checks from content judgement.                                                                                   | The inspected AI skill misidentifies crawler roles and says no dedicated Google AI reporting exists. Its 40–60-word answer quotas and claimed citation multipliers are not publishing rules. |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo/tree/a1480c7e590b16001bd9dc1627eacdcd44d580f9), `seo-flow`, `seo-drift`, `seo-google`                  | Select relevant tasks; snapshot metadata before/after; use actual GSC and field data; distinguish API capabilities.                                                                   | No need for its full suite, agent hierarchy or SQLite history for this site. Verify newly announced analytics features at the provider.                                                      |
| [JeffLi1993/seo-audit-skill](https://github.com/JeffLi1993/seo-audit-skill/tree/523bdfb2c94f4689408a5a344f4ea74ced49ff32), full audit skill and social checker              | Deterministic extraction returns JSON; an agent reviews meaning and implements corrections. Fetch real OG/Twitter fields.                                                             | Fixed length heuristics are not ranking requirements. A raw HTML parser needs a browser complement, not a claim to see client-rendered data.                                                 |
| [itsbeaudean/agent-skills](https://github.com/itsbeaudean/agent-skills/tree/24e0be4faa8221a8cf5dd71cb5b53bea88ed5f48/skills/ai-search-website-audit)                        | Check whether a real reader question has a clear public answer; convert findings into exact changes and acceptance checks.                                                            | Its buyer-oriented framework needs adaptation to a personal technical blog. Do not impose pricing, disclaimers or sales copy on a story.                                                     |
| [Bhanunamikaze/Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill/tree/69199160e18372bc5cdf9ddec20ccb9fb1b509f1), llms checker and indexability workflow | Inspect different access controls and parse the actual file rather than assuming it exists.                                                                                           | Its weighted llms score and failure framing for an optional missing file are arbitrary. No adopted numerical readiness score.                                                                |
| [seoskillsai/seo-skills-ai](https://github.com/seoskillsai/seo-skills-ai/tree/7daed7f36e2d3a74fe864854014e6a432d23e0f6), `seo-robots-ai`                                    | A crawler matrix is a useful format for agent decisions.                                                                                                                              | The inspected matrix conflates GPTBot with search and Google-Extended with AI Overviews. Use official provider roles instead.                                                                |
| [conorbronsdon/gsc-mcp](https://github.com/conorbronsdon/gsc-mcp/tree/92dd3ef651b2abb31373850830f43aa37369790f), README and entry point                                     | Concrete agent tools for performance, URL inspection and sitemap work; small responses; useful missing-credential messages. Author says it was built for a podcast and personal site. | README's full-scope requirement for URL inspection is stricter than Google's API. Tool operation is not evidence of a ranking lift; demo uses sample data.                                   |
| [samalyxx/gsc-seo-mcp](https://github.com/samalyxx/gsc-seo-mcp), README                                                                                                     | Practical property/auth setup and prompts for page/query comparisons; distinguishes Indexing API's special-purpose scope.                                                             | Setup instructions and claimed features were inspected, not a live authenticated installation. Do not auto-install or copy secrets into a project.                                           |
| [AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt/tree/f5aed2aeab1df0ea11e49909a3af86739a09d9a3), proposal and `llms_txt/core.py`                              | Compact guide with links; progressive retrieval of detail; existing parser/context-building examples.                                                                                 | No need to import its Python dependencies just to generate this site's small Markdown guide. Proposal adoption does not establish search ranking benefit.                                    |
| [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse/blob/74d982bd211c5fb12c4b2c18c4a1fc8bc17f6b6c/core/audits/agentic/llms-txt.js)                         | Verified the actual optional-file check: client errors are N/A, server/fetch errors fail; content checks are simple.                                                                  | Audit wording about crawling/training is not a replacement for provider policy. A passing audit does not demonstrate engine citation.                                                        |
| [ahrefs/ahrefs-mcp-server](https://github.com/ahrefs/ahrefs-mcp-server/tree/ca0e1e9996739f690287c396a5ad6e92255aec22)                                                       | Maintenance review matters before choosing a tool.                                                                                                                                    | The old local server explicitly says it is unmaintained and points to a remote offering. Do not install it as the default current integration.                                               |
| [eunomia-bpf/eunomia.dev](https://github.com/eunomia-bpf/eunomia.dev/tree/e091531), publishing/SEO skills                                                                   | Real content repository connecting writing and SEO steps; bounded review passes.                                                                                                      | Reject rigid keyword/description quotas, mandatory caution inventories and model-specific orchestration.                                                                                     |

The [blog-writing research](blog-writing-landscape.md) adds fifteen writing/media repositories and first-person production workflows. These SEO sources complement that work rather than replacing it with marketing prose.

## Firsthand use versus demonstrated results

[Alexander Opalic's SEO audit account](https://alexop.dev/posts/how-i-use-claude-code-for-doing-seo-audits/) describes using Claude Code with browser automation on NuxtPapier and finding development indexing controls left in place. The useful recipe is to inspect the running page and point fixes at source files. His theatrical role prompt is incidental; the post does not establish traffic growth caused by the audit. His [Astro llms.txt implementation](https://alexop.dev/posts/how-i-added-llms-txt-to-my-astro-blog/) is a concrete publishing example, not measured citation uplift.

The GSC MCP repositories demonstrate ways agents can access real search data. Repository stars, screenshots of reports, and tool inventories are not success metrics. Prefer accounts that disclose the workflow and an observable outcome, and label self-reported productivity separately from independently measured audience growth.

The [GEO research paper](https://arxiv.org/abs/2311.09735) reports benchmark improvements, with results varying by domain. This supports testing useful presentation changes under defined conditions. It does not establish a universal percentage gain from adding statistics, quotations or schema to Sid's blog. Never manufacture these elements to imitate a benchmark treatment.
