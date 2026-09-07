# Research distilled into the workflow

Reviewed 2026-09-07. These are evaluated influences, not instructions to execute third-party skills. The implementation recipes in this skill are original syntheses. Recheck current source and maintenance before installing any external tool.

## What the inspected projects contribute

| Source inspected | Useful practice carried into this skill | What was rejected or needs verification |
| --- | --- | --- |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills), `seo-audit` and `ai-seo` | Start with site context; prioritise indexability; separate technical checks from content judgement. | The inspected AI skill misidentifies crawler roles and says no dedicated Google AI reporting exists. Its 40–60-word answer quotas and claimed citation multipliers are not publishing rules. |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo/tree/a1480c7e590b16001bd9dc1627eacdcd44d580f9), `seo-flow`, `seo-drift`, `seo-google` | Select relevant tasks; snapshot metadata before/after; use actual GSC and field data; distinguish API capabilities. | No need for its full suite, agent hierarchy or SQLite history for this site. Verify newly announced analytics features at the provider. |
| [JeffLi1993/seo-audit-skill](https://github.com/JeffLi1993/seo-audit-skill/tree/523bdfb2c94f4689408a5a344f4ea74ced49ff32), full audit skill and social checker | Deterministic extraction returns JSON; an agent reviews meaning and implements corrections. Fetch real OG/Twitter fields. | Fixed length heuristics are not ranking requirements. A raw HTML parser needs a browser complement, not a claim to see client-rendered data. |
| [itsbeaudean/agent-skills](https://github.com/itsbeaudean/agent-skills/tree/24e0be4faa8221a8cf5dd71cb5b53bea88ed5f48/skills/ai-search-website-audit) | Check whether a real reader question has a clear public answer; convert findings into exact changes and acceptance checks. | Its buyer-oriented framework needs adaptation to a personal technical blog. Do not impose pricing, disclaimers or sales copy on a story. |
| [Bhanunamikaze/Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill/tree/69199160e18372bc5cdf9ddec20ccb9fb1b509f1), llms checker and indexability workflow | Inspect different access controls and parse the actual file rather than assuming it exists. | Its weighted llms score and failure framing for an optional missing file are arbitrary. No adopted numerical readiness score. |
| [seoskillsai/seo-skills-ai](https://github.com/seoskillsai/seo-skills-ai/tree/7daed7f36e2d3a74fe864854014e6a432d23e0f6), `seo-robots-ai` | A crawler matrix is a useful format for agent decisions. | The inspected matrix conflates GPTBot with search and Google-Extended with AI Overviews. Use official provider roles instead. |
| [conorbronsdon/gsc-mcp](https://github.com/conorbronsdon/gsc-mcp/tree/92dd3ef651b2abb31373850830f43aa37369790f), README and entry point | Concrete agent tools for performance, URL inspection and sitemap work; small responses; useful missing-credential messages. Author says it was built for a podcast and personal site. | README's full-scope requirement for URL inspection is stricter than Google's API. Tool operation is not evidence of a ranking lift; demo uses sample data. |
| [samalyxx/gsc-seo-mcp](https://github.com/samalyxx/gsc-seo-mcp), README | Practical property/auth setup and prompts for page/query comparisons; distinguishes Indexing API's special-purpose scope. | Setup instructions and claimed features were inspected, not a live authenticated installation. Do not auto-install or copy secrets into a project. |
| [AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt/tree/f5aed2aeab1df0ea11e49909a3af86739a09d9a3), proposal and `llms_txt/core.py` | Compact guide with links; progressive retrieval of detail; existing parser/context-building examples. | No need to import its Python dependencies just to generate this site's small Markdown guide. Proposal adoption does not establish search ranking benefit. |
| [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse/blob/74d982bd211c5fb12c4b2c18c4a1fc8bc17f6b6c/core/audits/agentic/llms-txt.js) | Verified the actual optional-file check: client errors are N/A, server/fetch errors fail; content checks are simple. | Audit wording about crawling/training is not a replacement for provider policy. A passing audit does not demonstrate engine citation. |
| [ahrefs/ahrefs-mcp-server](https://github.com/ahrefs/ahrefs-mcp-server/tree/ca0e1e9996739f690287c396a5ad6e92255aec22) | Maintenance review matters before choosing a tool. | The old local server explicitly says it is unmaintained and points to a remote offering. Do not install it as the default current integration. |
| [eunomia-bpf/eunomia.dev](https://github.com/eunomia-bpf/eunomia.dev/tree/e091531), publishing/SEO skills | Real content repository connecting writing and SEO steps; bounded review passes. | Reject rigid keyword/description quotas, mandatory caution inventories and model-specific orchestration. |

The [blog-writing research](../../blog-writing/references/sources.md) adds fifteen writing/media repositories and first-person production workflows. These SEO sources complement that work rather than replacing it with marketing prose.

## Firsthand use versus demonstrated results

[Alexander Opalic's SEO audit account](https://alexop.dev/posts/how-i-use-claude-code-for-doing-seo-audits/) describes using Claude Code with browser automation on NuxtPapier and finding development indexing controls left in place. The useful recipe is to inspect the running page and point fixes at source files. His theatrical role prompt is incidental; the post does not establish traffic growth caused by the audit. His [Astro llms.txt implementation](https://alexop.dev/posts/how-i-added-llms-txt-to-my-astro-blog/) is a concrete publishing example, not measured citation uplift.

The GSC MCP repositories demonstrate ways agents can access real search data. Repository stars, screenshots of reports, and tool inventories are not success metrics. Prefer accounts that disclose the workflow and an observable outcome, and label self-reported productivity separately from independently measured audience growth.

The [GEO research paper](https://arxiv.org/abs/2311.09735) reports benchmark improvements, with results varying by domain. This supports testing useful presentation changes under defined conditions. It does not establish a universal percentage gain from adding statistics, quotations or schema to Sid's blog. Never manufacture these elements to imitate a benchmark treatment.

## Rules that survived the research

1. Fix access, canonical identity and source-generated discovery paths before tuning copy.
2. Let deterministic tools collect observable facts; use editorial judgement for meaning and voice.
3. Keep search crawling, training, user fetches and actual citation outcomes separate.
4. Keep machine-readable guides compact and derived from the published content inventory.
5. Inspect visual assets and real rendered pages, not only frontmatter.
6. Use accepted before/after changes and actual provider measurements to improve the workflow.
7. Avoid arbitrary word counts, readiness scores, mandatory FAQs, speculative “agent tags,” bulk low-value pages and invented authority signals.

Google's [generative-content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) permits useful AI assistance while focusing on value for the reader; its [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) address scaled low-value content regardless of production method. For this site, the practical response is to publish substantive accounts of actual work and use agents to make that work readable and discoverable.
