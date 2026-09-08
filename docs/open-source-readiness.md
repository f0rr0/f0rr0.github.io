# Open-source readiness checklist

Rechecked September 8, 2026 against default branch `next` at `fdc15f9` and the
changes in this pull request. Personal writing, photographs, résumé, journey,
project content and authoring preferences remain intentionally in the repository.

**20 of 23 findings are addressed.** One remains an owner-side review, one is
partially addressed, and the code license is deliberately undecided. This is a
configuration-portability cleanup, not a claim that every security or licensing
question is settled.

| Audit finding                                 | Status             | Resolution or remaining work                                                                                                                                                                                              |
| --------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Historical Firebase configuration          | Open               | Owner must review current key restrictions and database/storage rules, or retire the old project. Copies remain in historical commits and old branches. No credential validity probes or history rewrites were performed. |
| 2. Cron targeting the original deployment     | Addressed          | Requires the Vercel production hostname; missing/invalid targets fail before writes.                                                                                                                                      |
| 3. Hardcoded GitHub identities                | Addressed          | Public author records in `src/content/site.ts`; immutable-ID checks retained.                                                                                                                                             |
| 4. Seven personal database constraints        | Addressed          | Forward migration replaces personal allowlists with login-shape checks, preserving existing checkpoints.                                                                                                                  |
| 5. Duplicated, two-account token selection    | Addressed          | One validated `GITHUB_TOKENS` object and shared lookup/fallback helpers. Credentials do not control author visibility.                                                                                                    |
| 6. Personal backfill workflow inputs/secrets  | Addressed          | Generic account input and token object; configured accounts are validated.                                                                                                                                                |
| 7. Build requires/mutates infrastructure      | Addressed          | `build` only builds; existing operational scripts compose through Vercel's Build Command when wanted.                                                                                                                     |
| 8. Dedicated-database assumption              | Addressed          | Documented one database per installation; existing lock/job names retained for compatibility.                                                                                                                             |
| 9. Fixed canonical domain                     | Addressed          | Vercel supplies the production hostname; previews retain canonical production identity.                                                                                                                                   |
| 10. Duplicated page/social-card identity      | Addressed          | Consumers derive names, images and domain text from shared configuration.                                                                                                                                                 |
| 11. Separate machine-readable biography       | Addressed          | JSON résumé and structured data use shared person, social and education records.                                                                                                                                          |
| 12. Hardcoded footer/PDF links                | Addressed          | Consumers reuse configured social links and PDF output path.                                                                                                                                                              |
| 13. Markdown images tied to one GitHub branch | Addressed          | Exports reuse the MDX compiler's deployed image URLs.                                                                                                                                                                     |
| 14. Fixed public GitHub discovery account     | Addressed          | Uses the configured primary GitHub profile.                                                                                                                                                                               |
| 15. Fixed PostHog project/region              | Addressed          | Optional capture key and shared US/EU region; production-host guard retained.                                                                                                                                             |
| 16. Automatic copying of runtime credentials  | Addressed          | README and `.worktreeinclude` explicitly require development-only local credentials; production credentials belong in deployment storage.                                                                                 |
| 17. Optional services/publication boundaries  | Addressed          | Setup/publication documented; polling, summaries and Codex scheduling follow their own prerequisites. Database-only publication remains available without GitHub tokens.                                                  |
| 18. Timezone/region preferences               | Addressed          | Shared timezone with derived label; deployment region/database relationship documented.                                                                                                                                   |
| 19. Application code license                  | Deferred by choice | User explicitly left the license undecided. This PR does not introduce one.                                                                                                                                               |
| 20. Vendored licenses/provenance              | Partial            | Font and agent-browser notices bundled; remaining skill origins/revisions and complete notices still need verification. See `THIRD_PARTY.md`.                                                                             |
| 21. Secret-scanning prevention                | Addressed          | GitHub native secret scanning and push protection verified enabled. Additional Gitleaks CI removed as requested; forks must enable their own protection settings.                                                         |
| 22. Configurability regression coverage       | Addressed          | Alternate profile/domain/account tests and disposable PostgreSQL upgrade/history tests; Docker prerequisite documented.                                                                                                   |
| 23. Contributor configuration guidance        | Addressed          | README customization map, blank environment template, deployment instructions and private-reporting guidance.                                                                                                             |

Direct dependencies are also pinned to the existing resolved versions. Bun saves
exact versions and CI uses the frozen lockfile; no package upgrades were bundled.

## Validation

The application changes passed 324 tests across 43 files, including real disposable
PostgreSQL databases; the added alternate-profile regression also passes. Lint,
full/deployment-source typechecks and a Vercel-style build with no service credentials
passed. The build reports nonfatal unauthenticated GitHub embed 403s and existing
filesystem-tracing warnings.

Coverage includes token rotation/removal, zero-token polling/publication, retained
commit-to-PR evidence after reduced visibility, configured-author issue filtering,
and cache/cursor invalidation after author-policy changes. These checks do not
verify live Firebase rules, production credentials or every vendored file's origin.

## Before deployment

- Set `GITHUB_TOKENS` to the documented login-to-token object in Vercel and the
  backfill Action. Remove obsolete personal token variable names after switching.
- Set optional analytics configuration if keeping analytics enabled.
- For the existing database-backed deployment, apply the README's Vercel Build
  Command so migrations run before the build and cron setup follows it.
- Resolve the remaining Firebase review and vendored provenance separately. The
  code-license decision remains deferred.

Production database migrations and Vercel/cron configuration have not been applied
by this change. Applied historical migrations and personal content remain intact.
