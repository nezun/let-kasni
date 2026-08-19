# CHECKPOINT

Canonical handoff file for future local and Codex Cloud sessions.

## Start Here

1. Read `AGENTS.md`.
2. Read this `CHECKPOINT.md`.
3. Run `npm run session:start` to verify a clean, synchronized canonical checkout.
4. For new work, run `npm run session:start -- --new <task-slug>`.
5. For explicitly checkpointed unfinished work, run `npm run session:start -- --resume`.
6. Continue from the first open item in "Next Work".

## Generated Status

<!-- BEGIN:generated-status -->
Generated at: `2026-08-19T19:55:10.900Z`

Branch: `main`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `cbf83ca Finalize mobile result flow and fix consent hydration warning (#22)`

Worktree status:

```text
clean
```

Useful commands:

- `npm run session:start`: `bash scripts/start-canonical-session.sh`
- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run workflow:check && npm run meta:check && npm run email:check && npm run content:qa && npm run content:links && npm run content:benchmark && npm run locales:check && npm run lint && npm run build`
- `npm run release:gate`: `bash scripts/release-gate.sh`
- `npm run production:check`: `node scripts/check-production.mjs`
- `npm run workflow:check`: `bash scripts/check-workflow-guards.sh`
- `npm run content:qa`: `node scripts/content-qa.mjs`
- `npm run content:links`: `node scripts/content-link-graph.mjs`
- `npm run content:benchmark`: `node scripts/content-benchmark-review.mjs`
- `npm run checkpoint`: `node scripts/update-checkpoint.mjs`
<!-- END:generated-status -->

## Current State

- Canonical local checkout: `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.
- GitHub remote: `https://github.com/nezun/let-kasni.git`.
- GitHub `main` is the only source of truth for deployable code.
- Production URL: `https://letkasni.rs`.
- Deploy target: Vercel.
- Production serves GitHub `main` commit `859b2f9` with the email delivery reliability fix: claim submit waits for admin and user notification delivery, retries transient Resend failures up to three attempts, uses stable idempotency keys, and logs Resend IDs plus attempt counts.
- The final approved bilingual landing and claim flow is on GitHub `main` from production commit `be1c24a` or its descendants.
- Historical sibling folders are non-canonical and must not be used for deploys.
- Production now implements the screenshot-matched bilingual consent banner with separate Analytics and Marketing choices, Terms of Use and Privacy Policy links, and a footer privacy-settings reset path.
- On desktop, the banner measures its right edge against the embedded claim form and leaves an 8px gap before the form begins; on smaller screens it uses the full available width.
- Meta Pixel, browser Meta events, analytics events, and server-side Meta Lead delivery are now gated by the matching consent category.
- Server-side Meta Lead now forwards `_fbp`/`_fbc` when present, builds an `fbc` fallback from same-origin `fbclid`, forwards the first `x-forwarded-for` IP, and sends hashed first name, last name, country, and claim ID as `external_id`; phone remains unchanged and optional.
- Consent now uses a 12-month `lk_consent` cookie as the server CAPI authority. A blocking head bootstrap hides the banner before first paint for valid cookie consent and migrates legacy localStorage consent only when no valid cookie exists; cookie path is `/`, `SameSite=Lax`, `Secure`, and not `HttpOnly` so privacy settings can clear it.
- Total independent production QA passed for SR, EN, mobile, consent gating, GA4, Meta Pixel loading, claim-flow transitions, public links, and legal routes; report is in `.gstack/qa-reports/qa-report-letkasni-rs-2026-08-13.md`.

## Guardrails

- Follow `AGENTS.md` first.
- Run `npm run session:start` at the beginning of every new chat or resumed task.
- Do not stage unrelated dirty files.
- Keep work on a feature branch until the user explicitly requests deploy.
- Run `npm run release:gate` before merging an approved release into GitHub `main`.
- Deploy only a tree that is traceable to GitHub `main`; never deploy from a sibling folder or random local preview.
- Treat landing design experiments, generated design routes, and imported assets as local exploration until explicitly selected.
- Keep public Serbian content in Latin script.
- Always verify Serbian `/` and English `/en` together unless the user explicitly requests an exception.

## Next Work

- After the immediate reliability release, add a durable email outbox plus Resend delivery/bounce webhooks once Supabase production persistence is configured; this is the remaining step that can recover emails after all in-request retries fail.
- Add the real Meta Pixel ID and Conversions API token in Vercel Production, then run the Test Events flow from `docs/META-ADS-TRACKING.md`.
- Confirm whether campaign traffic will use canonical `letkasni.rs` or a separate `leadcast.rs` host before domain verification and release.
- After Meta Test Events and privacy/consent review pass, run `npm run release:gate` and deploy only with explicit release authorization.
- Complete a real Meta Test Events submission with disposable data and verify the new `fbc`, `fbp`, IP, name, country, and `external_id` fields in Events Manager.
- Configure durable Supabase persistence in Vercel production and rerun the production gate with `REQUIRE_SUPABASE=1`.
- The root layout still reads the existing `x-site-locale` request header for the `<html lang>` attribute; the consent change deliberately adds no `cookies()` read to the layout. A separate locale-layout refactor would be needed if static ISR output is required.
- Use this canonical workflow for every future LetKasni task and deploy.
- Audit the legacy dirty folders in a separate task without resetting or deleting their local work.
- With explicit authorization, add the existing Supabase service-role credential to Vercel production and verify durable claim persistence with `REQUIRE_SUPABASE=1 npm run production:check`.

## Locked / Do Not Change Without Approval

- Do not change production credentials or external integrations.
- Do not alter deploy target away from Vercel.
- Do not rewrite approved public content architecture without checking `AGENTS.md` content rules.
- Do not use `air-help-next`, `air-help-next-live`, or another sibling folder as an implicit source for production code.

## Manual Work Still Needed

- No manual email reliability step remains. A controlled production claim to `kontakt@letkasni.rs` was accepted by Resend for both admin and user messages; inbox routing can still be checked independently when needed.
- Meta Business setup is still manual: Pixel/Dataset, domain verification, `Lead` event prioritization, Pixel ID, and server access token.
- Phone matching remains intentionally unchanged and optional; this task did not add a phone requirement or alter phone collection.
- `leadcast.rs` could not be resolved from the current environment and is not the canonical production domain in this checkout; do not silently switch domains.
- Privacy/cookie consent and final Meta data-processing terms require business/legal review before enabling production tracking.
- The implementation does not claim full GDPR compliance. Final legal review remains required; the English legal pages were added and browser-verified in the 2026-08-13 QA release, but legal review remains manual.
- Explicit authorization before transmitting the local Supabase service-role credential to Vercel.
- Business/legal review for claim, fee, eligibility, payout, and regulator workflow assumptions.
- Final browser verification after the 2026-08-13 deployment covered first visit, consented return visit, GA4/Meta loading, mobile navigation, and footer legal links. A controlled real-lead CAPI check remains manual.
- A separate audit decision for preserving, committing, or archiving changes in legacy dirty folders.

## Verification Log

- 2026-08-19 email reliability production release: PR #20 merged as `859b2f9`; `npm run release:gate -- --production` passed and `/api/health` matched GitHub `main`. Controlled claim `02d6cb2d-848d-4b75-9569-c864c5a5b8e8` returned HTTP 200, while Vercel logged admin Resend ID `848f3123-669c-447f-8a9f-acd581713828` and user Resend ID `1459438d-d0c9-4a15-83c6-a4e8d297a7ee`, both on attempt 1.
- 2026-08-19 email reliability patch: `npm run email:check` passed 5 regression tests covering `ECONNRESET`, `ETIMEDOUT`, retryable 5xx/409 responses, non-retryable 4xx responses, stable idempotency keys, and awaited claim notification delivery. `npm run verify` passed, including workflow guards, content checks, locale alignment, lint, TypeScript, and the production build.
- `npm run checkpoint`: refreshes the generated status block in this file.
- `npm run session:start`: verifies canonical remote, branch, and clean worktree before work starts.
- `npm run release:gate`: runs the full SR/EN release gate and shows the exact proposed production diff.
- `npm run release:gate -- --production`: verifies the live deployment commit, both locales, health, Step 2 routes, and safe submit validation.
- `npm run production:check`: diagnostic primitive used by the production gate; do not use it alone for a release decision.
- Production releases still require an agent-driven SR/EN browser interaction pass; the HTTP smoke check cannot prove hydration or client-side transitions.
- 2026-08-13 total independent QA: `npm run verify`, `npm run release:gate -- --production`, production public-link audit (294 sitemap pages / 328 linked URLs), SR/EN desktop and 375px mobile browser pass, legal-link regression fix, consent gating pass, and GA4 collection confirmed HTTP 204.
- `npm run verify`: passed on `codex/meta-tracking`, including `npm run meta:check`, content QA, locale checks, lint, and production build.
- Consent redesign validation: `npm run lint`, `npm run meta:check`, `npm run build`, and independent local browser QA passed on `codex/consent-banner-redesign`; production deploy was intentionally not performed.
- Cookie banner reference validation: `npm run verify`, local SR/EN browser QA, desktop 8px form gap check, settings interaction check, and `npm run release:gate -- --production` passed on production commit `be1c24a`.
- Local smoke test: `/` and `/en` rendered with the Meta Pixel component when a dummy Pixel ID was supplied; honeypot submit returned success without a Meta token and no external CAPI request was attempted.
- CAPI quality matching patch: `npm run meta:check`, `npm run lint`, `npm run build`, and `npm run verify` passed on `codex/capi-quality-matching`; no real Meta payload was sent because production Meta credentials are not configured in this checkout.
- Consent cookie gating validation: local fresh visit showed the banner, acceptance wrote `lk_consent` with `Path=/`, return reload showed no banner, localStorage-only migration wrote the cookie before hydration, footer privacy settings removed the cookie and restored the banner, and no browser console errors were observed.
- Add latest successful `npm run lint`, `npm run build`, `npm run verify`, deploy URL, and known failures here after each substantial session.

## Paste-Ready Prompt

Continue in `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.

Read `AGENTS.md` and `CHECKPOINT.md` first. Run `npm run session:start`, then continue autonomously from "Next Work". For a new task, use `npm run session:start -- --new <task-slug>`. Never deploy from a sibling folder or a local preview. Preserve guardrails and update `CHECKPOINT.md` before finishing.
