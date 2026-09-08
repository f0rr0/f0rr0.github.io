# Portfolio analytics: measure, improve, repeat

Research and implementation brief · 8 September 2026 · base: `origin/next` at `d92f294`.

Use PostHog for anonymous acquisition and deliberate interactions. The useful question is **which sources bring people who explore the work, use the writing, and follow a project?** Traffic volume alone is a supporting metric.

## What the implementation measures

One pinned `posthog-js` dependency, one native Next.js client initializer, a small typed event function, and explicit interaction hooks. No server SDK, user accounts, identity stitching, experiment framework, or consent banner. The implementation follows PostHog’s [Next.js installation guide](https://posthog.com/docs/libraries/next-js), using `instrumentation-client.ts` rather than adding a React provider.

| Event                     | Meaning                                            | Properties / interpretation                                                                           |
| ------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `$pageview`               | Initial load or pathname navigation                | SDK pageview ID, canonical path, referrer origin, campaign labels, browser/device                     |
| `$pageleave`              | SDK page exit measurement                          | Page duration and document scroll; delivery on exit is best effort                                    |
| `details_opened`          | User opens a disclosure                            | `section`: `work`, `journey`, `token-log`; work also has `item_kind`                                  |
| `outbound_link_clicked`   | HTTP(S) link leaves the site                       | `destination_host`, `destination_path`, `placement`; GitHub repository paths identify public projects |
| `ask_ai_clicked`          | Visitor chooses ChatGPT, Claude, or Gemini         | `provider`, `placement`; never sends the prompt or destination query                                  |
| `markdown_opened`         | Visitor activates an internal `.md` link           | `destination_path`, `placement`; not evidence that an agent fetched it                                |
| `resume_download_clicked` | Visitor activates an internal PDF link             | `destination_path`, `placement`; not proof of a completed download                                    |
| `email_copied`            | Email address successfully copied                  | `method`: clipboard or fallback; no address                                                           |
| `code_copied`             | Code example successfully copied                   | `language`; no code content                                                                           |
| `github_activity_loaded`  | Earlier work successfully appended after load-more | `days_loaded`; failed/stale requests do not count                                                     |
| `article_depth_reached`   | Viewport reaches 25/50/75/100% of article body     | `article_slug`, `depth_percent`; each threshold once per mounted article                              |

Custom events carry `schema_version: 1`; PostHog supplies page context. Link handling is delegated so dynamically loaded work, MDX links, keyboard activation, and middle clicks use the same rules. Menu links carry explicit placement because portals sit outside the article. No DOM text, private work descriptions, work IDs, email addresses, or Ask AI prompts are collected by custom events. Work opens are aggregate by kind; public GitHub outbound clicks provide project-level detail.

Journey currently uses one global expansion state for all experience/education entries. One click opening it is one event, regardless of how many roles appear. Work and token disclosures capture user-triggered opens only; closing, initial state, and browser find-in-page reveals do not inflate opens.

Depth measures **content exposure**, not reading comprehension or active reading time. A short article can immediately reach 100%; jumping to its end also reaches 100%. Resize and late-loading content update the geometry. Use duration as another signal, not as proof of attention. The SDK attaches previous-page duration/scroll properties to the following `$pageview` or `$pageleave`: join using `$prev_pageview_id` and `$prev_pageview_pathname`, not the next page’s URL. Its scroll fractions are 0–1; the custom depth values are 25–100. See the [SDK’s actual page-view implementation](https://github.com/PostHog/posthog-js/blob/main/packages/browser/src/page-view.ts).

## Cookieless setup and its limits

Set `cookieless_mode: "always"`, `person_profiles: "never"`, memory persistence, and never call identify/alias/group. Enable **Cookieless server hash mode** in the website project before releasing: otherwise ingestion rejects these events. PostHog derives anonymous IDs server-side using a daily salt, project, IP, user agent, and hostname. Daily resets and possible shared-network collisions mean weekly/monthly unique IDs are not unique humans. Long-term retention, cross-device journeys, and lifetime first-touch attribution are unsuitable. IP enrichment, including GeoIP, is unavailable; client user-agent bot filtering is a different mechanism. [Cookieless tracking documentation](https://posthog.com/tutorials/cookieless-tracking).

The initializer honors DNT and Global Privacy Control, runs only on production `f0rr0.dev`, and disables autocapture, replay, surveys, heatmaps, automatic exceptions, performance collection, feature flag requests, and external extension loading. Query strings and fragments are removed from URL properties; referrers retain only origin. Ad click identifiers and search terms are removed. Campaign values must be short public slugs. An SDK upgrade needs a payload review because SDK-generated properties can change. [SDK configuration reference](https://posthog.com/docs/references/posthog-js/types/PostHogConfig).

Cookieless is a technical choice, not a universal consent exemption. Applicable audience-measurement exemptions are conditional. Publish an accurate privacy notice before enabling production, describing PostHog, purposes, data, retention and how to object; do not claim that hashing removes every legal obligation. [CNIL audience-measurement guidance](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications).

Suggested notice text to adapt: “I use PostHog to understand where visits come from and which writing and projects people explore. Analytics uses no cookies or browser storage and does not create named profiles. It records page visits, selected interactions, browser information and referrer/campaign information. PostHog uses network information to generate a daily anonymous identifier. Do Not Track and Global Privacy Control disable this collection.” Add the selected hosting region, retention period and contact details after project setup.

## First-party proxy and route choice

The SDK sends requests through `https://f0rr0.dev/_r7k2/*`. This opaque, stable namespace reserves no useful page name and requires no additional DNS or service. Only that exact prefix belongs to PostHog; future routes with similar names remain independent. Keep the initializer, proxy matcher and tests synchronized if changing it. Do not use Next.js-owned namespaces such as `/_next` or rotate the path per request/build.

The reviewed public examples use `/ingest` ([Next.js discussion with implementation](https://github.com/vercel/next.js/discussions/71487)), `/resources/ingest` ([React Router implementation](https://gist.github.com/arpitdalal/ccc807fa6a15638b86a128d9b7ac51a1)), `/ph` ([smoll-url](https://github.com/tashifkhan/smoll-url)), or a short subdomain such as `e.example.com` ([nginx proxy example](https://github.com/algomo/posthog-proxy)). These are examples, not a prevalence survey. PostHog's current [Next.js guidance](https://posthog.com/docs/advanced/proxy/nextjs) recommends app-specific names instead of obvious analytics keywords; its [Railway template](https://railway.com/deploy/posthog-proxy) also discourages `/ingest`. Our opaque prefix follows that advice without taking a meaningful product route.

A first-party path reduces exposure to provider-domain and generic-path block rules; it is neither secret nor unblockable. Requests, SDK code and payloads remain inspectable. DNT/GPC suppression stays in place. There is no script obfuscation or custom transport protocol.

The native Next.js proxy forwards to fixed US ingestion and asset hosts, preserving methods, bodies, queries and collector trailing slashes. It strips Cookie, Authorization and Referer request headers: same-origin referrers can otherwise expose full page queries despite event-body redaction. Request overrides use `request: { headers }`. Normal page trailing slashes still receive a 308 canonical redirect. The proxy matcher skips ordinary slashless pages. See [PostHog's proxy-file guide](https://posthog.com/docs/advanced/proxy/nextjs-middleware).

Proxy requests consume hosting requests and bandwidth. With replay disabled, this stays limited to the selected analytics traffic; inspect actual Vercel usage after release. A managed proxy or separate worker becomes relevant if hosting cost warrants another service. Verify forwarded client IP handling and cookieless session behavior on the deployed platform; local routing tests cannot establish production identity accuracy.

## Acquisition: keep the useful context

Use PostHog’s built-in Web Analytics channel classification, including its AI referral channel. Do not maintain another classifier. Analyze the **session entry** source/medium/campaign alongside landing page and downstream actions; validate the ingested session fields first. “Direct” means there was no usable source, which also includes messaging apps and stripped referrers. It does not prove a bookmark or brand recall. [Channel types](https://posthog.com/docs/data/channel-type), [UTM segmentation](https://posthog.com/docs/data/utm-segmentation).

Use lowercase public campaign slugs:

| Distribution                           | Example                                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| LinkedIn article post                  | `utm_source=linkedin&utm_medium=social&utm_campaign=article-slug&utm_content=post-1`   |
| GitHub profile link                    | Clean `https://f0rr0.dev`; use referrer attribution when available                     |
| Newsletter                             | `utm_source=newsletter&utm_medium=email&utm_campaign=2026-09&utm_content=article-slug` |
| A second headline for the same article | Keep source/medium/campaign; change `utm_content=headline-b`                           |

Keep visible profile website fields clean. Referrer attribution can identify GitHub traffic when supplied, but does not distinguish a bio from a README. Add placement tags only when that distinction answers a concrete question; do not display a long UTM query in the profile.

Do not use UTMs on internal links; placement already describes internal context. Do not put personal names, emails, prompts, or arbitrary text in campaign parameters. Search queries and ad click IDs are intentionally unavailable. AI referral traffic measures humans arriving from those services, not model training, citations, impressions, or bot fetches. Pair this with Search Console impressions/clicks/queries and separate HTTP crawler logs if investigating discovery; never combine bot hits and browser pageviews as one traffic metric.

Cookieless ingestion assigns session identifiers server-side. Verify the actual project’s session boundaries and entry properties before saving session funnels; do not invent client session IDs or rely on browser persistence. The [ingestion implementation](https://github.com/PostHog/posthog/blob/master/nodejs/src/ingestion/common/cookieless/cookieless-manager.ts) describes the server handling. Counts of inferred sessions remain estimates.

## Three views to maintain

1. **Acquisition:** sessions and daily anonymous visitors by channel, referrer domain, source/medium/campaign, and landing page. Compare equal 28-day windows; show counts beside rates. Avoid presenting a monthly unique-person total.
2. **Meaningful exploration:** sessions with a work/Journey/token open, a GitHub/project outbound click, or a resume click, broken down by entry channel. Also show each action separately so an expansion is not equated with an outbound visit. Use “sessions with any action / eligible landing sessions” as a broad exploration rate, not a section click-through rate: there are no section/row impression events yet.
3. **Writing usefulness:** article pageviews; pageviews reaching 75%/100%; Markdown and Ask AI choices by article/provider; public project outbound clicks from articles; previous-page duration. Depth rate is distinct qualifying pageview IDs divided by article pageview IDs, not raw event count divided by visitors. A long read spanning midnight may split daily identity; pageview IDs are the better article denominator.

Start with Web Analytics plus one small product dashboard. Session funnels should require the same session; arbitrary multi-day person funnels overstate connected journeys. For a below-the-fold row-specific CTR, add a deliberate visible-exposure event only when that decision matters. Until then, compare aggregate exploration and report the denominator honestly.

## Weekly operating loop

- **Baseline:** collect two to four weeks, excluding your own checks and previews. Review missing events, unusually high direct traffic, duplicate pageviews, payloads, and release dates before interpreting trends.
- **Choose one hypothesis:** e.g. GitHub referrals explore projects but rarely find writing; move the relevant article link closer to that project. Or LinkedIn brings article landings with low depth; revise the opening and check mobile rendering.
- **Make one reversible change:** record the date, affected page, expected direction, primary metric and guardrail. Use GitHub PRs as the change log. Keep campaign naming consistent so distribution changes are visible.
- **Compare:** use matching weekdays/windows and acquisition mix. Report numerators and denominators. At portfolio traffic levels, small changes in a few visitors are noise; before/after is directional evidence, not causality. Skip formal A/B testing until volume supports a meaningful decision.
- **Repeat or undo:** keep changes supported by useful exploration and content use. Watch page performance and broken-link/error reports separately; do not trade site speed for a larger analytics dashboard.

The current free tier includes 1 million analytics events per month; without a card, usage stops at the free limit. See [current PostHog pricing](https://posthog.com/pricing).

Budget example, not a traffic forecast: 10,000 pageviews plus roughly 10,000 exits, 4,000 article landings × at most four depth events, and 5,000 interactions is around 41,000 events. Check the project’s actual usage and current pricing before setting a spend limit; other PostHog products have separate meters.

## What other implementations teach

- The [hraness personal website template](https://github.com/hraness/personal-monorepo-template) uses production-origin checks, optional configuration, cookieless tracking and redaction. Its root-only pageview redaction removes referrers/campaigns and disables pageleave, so copying it wholesale would defeat this site’s acquisition and reading questions. Borrow its restraint, not its event contract.
- The [Video.js v10 analytics proposal](https://github.com/videojs/v10/issues/893) discusses script weight, cookies, cookieless mode, idle loading and proxying. It is an issue/proposal, not evidence that every approach shipped. Server request counts versus browser analytics are not a valid accuracy benchmark. Avoid idle initialization here because it preferentially misses short visits.
- The [official Next.js SDK playground](https://github.com/PostHog/posthog-js/blob/main/playground/nextjs/src/posthog.ts) demonstrates integration mechanics but has different consent/identity assumptions. This site’s anonymous settings take precedence.
- The [official PostHog wizard](https://github.com/PostHog/wizard) can inspect and instrument the app and create analytics artifacts. It requires project authentication and organization permission for third-party AI processing. Its defaults still need review against this event contract. Do not enable replay, self-driving product features, server identity or a warehouse just to measure this portfolio.

## Release and validation

- The public project token and first-party proxy path are source configuration in `src/instrumentation-client.ts`; US upstream hosts are fixed in `src/proxy.ts`. No PostHog environment variables are required. These values identify the website project; personal API keys remain secrets and must never be committed.
- Enable project-side cookieless hashing and select a retention/spend policy. Development and preview hosts remain excluded by the initializer. Changing the source configuration requires a rebuild.
- Confirm one initial and one navigation pageview; no hash-only duplicates. Test keyboard, middle click, portaled AI links, dynamically loaded work, close/reopen, and browser find reveal. Confirm prompt/query redaction in outgoing requests.
- Verify no PostHog cookies/local/session storage, no replay/flag/survey calls, and no capture for DNT/GPC, localhost or preview hosts. Block the analytics network and verify navigation/disclosures still work.
- On the real project, inspect a tagged entry followed by SPA navigation and an outbound click. Confirm session identity, entry channel and pageview association before creating funnels. Do not treat a successful mocked request as proof of production ingestion.
- Run repository lint, typecheck, tests and a production Next build without invoking production database migration scripts. Browser-smoke the built app. Keep this change in a separate PR against `next`; do not merge or deploy as part of research.

## Brief for PostHog’s instrumentation agent

> Read this document and inspect the existing implementation before changing it. Use the selected website project only. Preserve always-cookieless mode, never profiles, DNT/GPC, canonical production gating, URL redaction and the event contract. Do not add autocapture, replay, surveys, identify, a server SDK, a provider, or a second pageview implementation. Audit actual open transitions and link navigation, including portaled Ask AI menus and private work records. Validate article depth as exposure, not reading. Check session entry attribution in ingested data. Create only the three views described above after data is validated. Report required project settings and any unverified assumptions. Keep changes within this separate analytics PR and never deploy or merge it.

## Wizard run and handoff

The official wizard was authenticated remotely to project `394144` on US Cloud. It added successful email/code-copy and work-history-load instrumentation, supplied the public project values now stored in source, and created a [starter dashboard](https://us.posthog.com/project/394144/dashboard/2077380). Its four supplemental views cover these new actions; they are setup artifacts, not evidence of live traffic or the three full analytical views proposed above.

The wizard’s default initializer removed the explicit anonymous/cookieless options and enabled exception capture. Review restored the required privacy configuration, development/preview exclusion, and explicit pageview behavior. The final repository implementation and this report supersede the wizard’s default setup report. Its temporary instructions/cache are excluded from the PR. No merge or deployment was performed.

## Validation evidence

- Repository suite: **314 passing tests, zero failures**. Focused analytics checks cover redaction, retained campaign/page context, AI/Markdown/PDF/outbound classification, malformed URLs and depth geometry. Lint and production TypeScript checks pass.
- Proxy checks cover regional asset/collector routing, stripped request headers, namespace boundaries, and canonical slash redirects. The running production server returned 200 for a proxied public SDK asset, 308 for a slash-suffixed Journey URL, and 404 for a neighboring unreserved path. Chromium analytics requests used only `/_r7k2/e/`; direct PostHog requests would fail the check.
- Production Next build succeeds. Existing dynamic filesystem-tracing warnings remain; unauthenticated GitHub preview fetches returned 403 and used the existing content fallback. No production database migration or cron configuration was performed.
- A Chromium smoke test served the production build under an intercepted `f0rr0.dev` origin. It captured initial/SPA pageviews, two user Journey opens (including keyboard activation), all four article milestones, Markdown and GitHub middle-clicks and a portaled ChatGPT choice. A hash-only change did not add a pageview. No PostHog cookies were set; site local storage and session storage were empty. DNT, GPC and a preview hostname produced no analytics. Requests were intercepted locally; no synthetic traffic was sent to the project.
- Payload inspection confirmed that `utm_source=linkedin`, medium and campaign survive SPA navigation, while a test email query is removed. Article events share the article `$pageview_id`; the next pageview carries the previous page’s duration and ID. Server-assigned session IDs and ingestion remain unverified until the production project is enabled.
- Production bundle comparison with the base revision adds approximately **91 KiB gzipped** on Journey, Writing and a sampled article (93,082 / 92,872 / 93,492 bytes). This compares compressed script files referenced by initial HTML, not field loading time or Core Web Vitals. Keeping the environment validator out of the client saved roughly 63 KiB from the wizard’s initial output. The standard SDK is still a real performance cost; measure mobile field performance after release.

Before production activation: enable **Cookieless server hash mode** for project 394144, publish the accurate privacy notice, and verify real ingestion/session attribution. These are release prerequisites, not claims that deployment has occurred.
