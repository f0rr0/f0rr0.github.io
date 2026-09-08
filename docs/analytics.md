# Analytics

The site uses PostHog US Cloud for pageviews, acquisition attribution, and explicit interactions.

## Configuration

- `src/instrumentation-client.ts` initializes the SDK only in production on `f0rr0.dev`. The public project token and API path are configured in source; no PostHog environment variables are needed.
- `src/proxy.ts` forwards `/_r7k2/*` to fixed US ingestion and asset hosts. It strips Cookie, Authorization, and Referer headers. Collector trailing slashes are preserved; ordinary page trailing slashes receive a 308 redirect.
- The SDK uses always-cookieless mode, memory persistence, and no person profiles. Autocapture, replay, surveys, heatmaps, automatic exceptions, performance collection, and feature flags are disabled.
- Do Not Track and Global Privacy Control signals do not change capture behavior.
- `src/lib/analytics.ts` contains the typed event contract, link classification, and property redaction. URL queries and fragments, referrer paths, ad click IDs, and search terms are removed. Campaign values must be short public slugs.

The PostHog project must enable **Cookieless server hash mode** for ingestion. Public browser tokens may be committed; personal API keys must remain secret. See [PostHog cookieless configuration](https://posthog.com/tutorials/cookieless-tracking).

## Events

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

Custom events carry `schema_version: 1`. Link tracking includes keyboard and middle-click activation; portaled article menus supply explicit placement. Capture never includes Ask AI prompts, copied content, DOM text, or private work descriptions.

Disclosures count user-triggered opens, including reopening, but not closes or initial state. Journey uses one shared expansion toggle, so opening it records one event. Copy and load-more events require success.

Article depth measures viewport exposure to the article body, not reading comprehension. Each threshold fires once per mounted article. A short article or jump to the bottom can immediately reach 100%. Use distinct article pageview IDs as the denominator for depth rates. SDK previous-page duration properties describe the previous page, not the page carrying the event.

## Attribution

Use PostHog's built-in acquisition channels and session-entry source, medium, campaign, and landing page. Keep visible profile links clean; use public UTM slugs on distributed campaign links, never internal links. Referrers can be absent, so direct traffic does not prove a bookmark or typed URL.

Cookieless identifiers reset daily and may collide for shared networks. They do not establish monthly unique people or cross-device journeys. Verify ingested session fields before building session funnels. AI referral visits, Ask AI clicks, and crawler requests are separate measurements.

## Verification

Run `bun test`, `bun run lint`, and `bun run typecheck`. Build with `bunx next build` when checking analytics alone; `bun run build` also invokes production database migration and cron configuration.

Serve the production build and intercept analytics requests locally while testing with the canonical hostname:

- Confirm initial and SPA pageviews, no hash-only duplicate, disclosure opens, article milestones, and keyboard/middle-click links.
- Confirm capture with DNT and GPC enabled, and no initialization on development or preview hosts.
- Inspect decoded payloads for retained campaign fields and removed URL/prompt content. Check that analytics creates no cookies or browser storage and uses only `/_r7k2/*`.
- Block analytics requests and confirm navigation and disclosures still work.

Local interception verifies outgoing events, not cloud ingestion. Verify actual ingestion, forwarded client IP handling, cookieless session attribution, and hosting usage on the deployed platform. The proxy consumes hosting requests and bandwidth. Keep the published privacy notice consistent with the configured collection.
