# f0rr0.dev

Sid Jain's portfolio, writing archive, and GitHub commit timeline. The
site is a Next.js application designed for Vercel.

## Local development

Use Node 24 and Bun:

```sh
bun install --frozen-lockfile
bun run dev
```

The website works without secrets; the persisted commit feed stays empty until
Postgres is configured. See [the commit sync guide](docs/github-commits.md) for
database, Supabase Cron, account polling, and webhook setup.
The separate [Codex stats guide](docs/codex-stats.md) covers its encrypted
account snapshots and scheduled sync.

## Validation

```sh
bun run format:check
bun run lint
bun run typecheck
bun test
bun run build
```

`bun run build` only builds the application. To use the existing production
migrations and Supabase scheduling, set Vercel's **Build Command** to:

```sh
bun scripts/migrate-production-database.ts && bun run build && bun scripts/configure-supabase-cron.ts --production-build
```

Those operational scripts act only on Vercel production deployments. The
migration runs before the build because pages may read the database while
building. Cron configuration follows a successful build; it is not a
post-deployment hook. Local operations remain `bun run db:migrate` and
`bun run supabase:cron`.

## Updating an existing deployment

Move the existing per-account token values into one `GITHUB_TOKENS` JSON object,
keyed by the logins in `src/content/site.ts`. The same tokens can be reused; no
new tokens or account IDs are required. Set this variable in Vercel and set the
same repository secret for the manual backfill Action. Keep the old token
variables until the new deployment has been verified, then remove them.

Keep the existing database, webhook, cron, cursor-signing and OpenAI credentials.
To retain analytics, set `NEXT_PUBLIC_POSTHOG_KEY` to the existing project's public
capture key; `NEXT_PUBLIC_POSTHOG_REGION` defaults to `us`.

For the database-backed installation, set the Build Command above before deploying
this change. It applies migration `0022`, builds against the updated schema, then
updates cron configuration. Migration `0022` only replaces seven username
allowlists with valid-login checks; it adds no tables or columns and rewrites no
stored history. Leave older applied migrations intact.

Vercel supplies the production hostname when system environment variables are
exposed. No manually maintained site URL or blog asset URL is needed.

## Customize once

- `src/content/resume.ts`: identity, social profiles, career, education and PDF paths.
- `src/content/home.ts`: introduction and featured work.
- `src/content/site.ts`: tracked GitHub authors, language and work-log timezone.
- `.env.example`: every supported environment variable, with blank values.

Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the canonical domain, including
for preview metadata. Enable **Automatically expose System Environment Variables**
in the project settings. Local URLs use localhost and the configured port.
There is no separately maintained site URL or blog asset base URL: exported
Markdown uses the image URLs already emitted by the MDX compiler.

GitHub activity uses the public author list in `src/content/site.ts` and a separate
`GITHUB_TOKENS` JSON object, such as `{"alice":"<token>","bob":"<token>"}`.
Each key references a configured author; credentials grant access and never select
which authors appear. Rotation, expiration or removal preserves stored history.
Polling and repository inventory verify the assigned token against the configured
GitHub identity. Webhooks, summaries and database-only processing need no GitHub
token. See the service guides before enabling activity or Codex stats. PostHog is
disabled unless a capture key is supplied and runs only on the canonical production host.

Each installation needs its own database. Cron/Vault names are installation-wide;
sharing one database between independent sites is unsupported. Set `vercel.json`
regions to match your database location (the existing deployment uses Tokyo).
Personal content and the authoring defaults under `.rulesync/` can remain or be
edited independently of the application configuration.

`.worktreeinclude` automatically copies `.env.local` into local worktrees. Use
only development-scoped credentials there; keep production credentials in the
deployment secret store. The copied file remains ignored by Git.

Docker is required for PostgreSQL integration tests; Bun reports those tests as
skipped when Docker is unavailable. Typst tooling is needed to regenerate the
résumé PDF. Versions are pinned in `mise.toml`, `package.json` and `bun.lock`;
CI installs with the frozen lockfile.

GitHub native secret scanning and push protection are enabled for this repository.
Enable those repository settings when creating a fork. The historical Firebase
project configuration still needs an owner-side restrictions/retirement review.
Report credential exposure privately through GitHub's security reporting feature
when enabled. Otherwise, use the maintainer contact in `src/content/resume.ts`;
never paste credentials into a public issue.

## Reuse status

A code license and the reuse policy for personal writing/images still need to be
chosen. Public source availability alone is not a grant of reuse rights. Preserve
upstream copyright/license notices for vendored fonts, assets and authoring skills.
