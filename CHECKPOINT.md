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
Generated at: `2026-08-12T21:58:34.027Z`

Branch: `codex/capi-quality-matching`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `91f7201 fix: make cookie banner discreet (#13)`

Worktree status:

```text
M docs/META-ADS-TRACKING.md
 M scripts/meta-tracking-check.mjs
 M src/app/claim/submit/route.ts
 M src/lib/meta-conversions.ts
```

Useful commands:

- `npm run session:start`: `bash scripts/start-canonical-session.sh`
- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run workflow:check && npm run meta:check && npm run content:qa && npm run content:links && npm run content:benchmark && npm run locales:check && npm run lint && npm run build`
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
- The final approved bilingual landing and claim flow is on GitHub `main` from production commit `be1c24a` or its descendants.
- Historical sibling folders are non-canonical and must not be used for deploys.
- Production now implements the screenshot-matched bilingual consent banner with separate Analytics and Marketing choices, Terms of Use and Privacy Policy links, and a footer privacy-settings reset path.
- On desktop, the banner measures its right edge against the embedded claim form and leaves an 8px gap before the form begins; on smaller screens it uses the full available width.
- Meta Pixel, browser Meta events, analytics events, and server-side Meta Lead delivery are now gated by the matching consent category.
- Server-side Meta Lead now forwards `_fbp`/`_fbc` when present, builds an `fbc` fallback from same-origin `fbclid`, forwards the first `x-forwarded-for` IP, and sends hashed first name, last name, country, and claim ID as `external_id`; phone remains unchanged and optional.
- Local independent browser QA passed for SR, EN, mobile, granular selection, withdrawal, `/privacy`, and `/terms`; report is in `.gstack/qa-reports/qa-report-letkasni-rs-2026-08-12.md`.

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

- Add the real Meta Pixel ID and Conversions API token in Vercel Production, then run the Test Events flow from `docs/META-ADS-TRACKING.md`.
- Confirm whether campaign traffic will use canonical `letkasni.rs` or a separate `leadcast.rs` host before domain verification and release.
- After Meta Test Events and privacy/consent review pass, run `npm run release:gate` and deploy only with explicit release authorization.
- Complete a real Meta Test Events submission with disposable data and verify the new `fbc`, `fbp`, IP, name, country, and `external_id` fields in Events Manager.
- Use this canonical workflow for every future LetKasni task and deploy.
- Audit the legacy dirty folders in a separate task without resetting or deleting their local work.
- With explicit authorization, add the existing Supabase service-role credential to Vercel production and verify durable claim persistence with `REQUIRE_SUPABASE=1 npm run production:check`.

## Locked / Do Not Change Without Approval

- Do not change production credentials or external integrations.
- Do not alter deploy target away from Vercel.
- Do not rewrite approved public content architecture without checking `AGENTS.md` content rules.
- Do not use `air-help-next`, `air-help-next-live`, or another sibling folder as an implicit source for production code.

## Manual Work Still Needed

- Meta Business setup is still manual: Pixel/Dataset, domain verification, `Lead` event prioritization, Pixel ID, and server access token.
- Phone matching remains intentionally unchanged and optional; this task did not add a phone requirement or alter phone collection.
- `leadcast.rs` could not be resolved from the current environment and is not the canonical production domain in this checkout; do not silently switch domains.
- Privacy/cookie consent and final Meta data-processing terms require business/legal review before enabling production tracking.
- The implementation does not claim full GDPR compliance. Final legal review remains required, and the English legal pages have not been independently translated.
- Explicit authorization before transmitting the local Supabase service-role credential to Vercel.
- Business/legal review for claim, fee, eligibility, payout, and regulator workflow assumptions.
- A separate audit decision for preserving, committing, or archiving changes in legacy dirty folders.

## Verification Log

- `npm run checkpoint`: refreshes the generated status block in this file.
- `npm run session:start`: verifies canonical remote, branch, and clean worktree before work starts.
- `npm run release:gate`: runs the full SR/EN release gate and shows the exact proposed production diff.
- `npm run release:gate -- --production`: verifies the live deployment commit, both locales, health, Step 2 routes, and safe submit validation.
- `npm run production:check`: diagnostic primitive used by the production gate; do not use it alone for a release decision.
- Production releases still require an agent-driven SR/EN browser interaction pass; the HTTP smoke check cannot prove hydration or client-side transitions.
- `npm run verify`: passed on `codex/meta-tracking`, including `npm run meta:check`, content QA, locale checks, lint, and production build.
- Consent redesign validation: `npm run lint`, `npm run meta:check`, `npm run build`, and independent local browser QA passed on `codex/consent-banner-redesign`; production deploy was intentionally not performed.
- Cookie banner reference validation: `npm run verify`, local SR/EN browser QA, desktop 8px form gap check, settings interaction check, and `npm run release:gate -- --production` passed on production commit `be1c24a`.
- Local smoke test: `/` and `/en` rendered with the Meta Pixel component when a dummy Pixel ID was supplied; honeypot submit returned success without a Meta token and no external CAPI request was attempted.
- CAPI quality matching patch: `npm run meta:check`, `npm run lint`, `npm run build`, and `npm run verify` passed on `codex/capi-quality-matching`; no real Meta payload was sent because production Meta credentials are not configured in this checkout.
- Add latest successful `npm run lint`, `npm run build`, `npm run verify`, deploy URL, and known failures here after each substantial session.

## Paste-Ready Prompt

Continue in `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.

Read `AGENTS.md` and `CHECKPOINT.md` first. Run `npm run session:start`, then continue autonomously from "Next Work". For a new task, use `npm run session:start -- --new <task-slug>`. Never deploy from a sibling folder or a local preview. Preserve guardrails and update `CHECKPOINT.md` before finishing.
