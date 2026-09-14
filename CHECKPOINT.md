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
Generated at: `2026-09-14T14:34:27.049Z`

Branch: `codex/pregled-predmeta`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `cad98a8 Privacy Policy 1.2 and email consent controls (#29)`

Worktree status:

```text
M .env.example
 M CHECKPOINT.md
 M next.config.ts
 M package-lock.json
 M package.json
 M src/app/robots.ts
 M src/components/analytics.tsx
 M src/components/consent-banner.tsx
 M src/components/meta-pixel.tsx
?? src/app/pregled/
?? src/components/pregled/
?? src/components/ui/
?? src/lib/pregled/
?? src/lib/utils.ts
```

Useful commands:

- `npm run session:start`: `bash scripts/start-canonical-session.sh`
- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run workflow:check && npm run privacy:check && npm run meta:check && npm run email:check && npm run content:qa && npm run content:links && npm run content:benchmark && npm run locales:check && npm run lint && npm run build`
- `npm run release:gate`: `bash scripts/release-gate.sh`
- `npm run production:check`: `node scripts/check-production.mjs`
- `npm run workflow:check`: `bash scripts/check-workflow-guards.sh`
- `npm run content:qa`: `node scripts/content-qa.mjs`
- `npm run content:links`: `node scripts/content-link-graph.mjs`
- `npm run content:benchmark`: `node scripts/content-benchmark-review.mjs`
- `npm run checkpoint`: `node scripts/update-checkpoint.mjs`
<!-- END:generated-status -->

## Current State

- 2026-09-14 (`codex/pregled-predmeta`, not merged): CRM database. Migration `supabase/migrations/202609141800_crm.sql` (crm_predmeti, crm_dogadjaji, crm_letovi, crm_sistem; RLS on, no policies, CHECK blocks passport/JMBG in `podaci`). Claim form inserts a NEW case via `src/lib/crm/prijem.ts` when `CRM_SUPABASE_URL` + `CRM_SUPABASE_SERVICE_ROLE_KEY` are set; `/pregled` reads CRM live (15 s cache), falling back to Drive index. Migration NOT applied anywhere yet — staging Supabase project still to be created by Niko.

- 2026-09-14 (`codex/pregled-predmeta`, not merged): LetKasni pipeline handoff on top of `/pregled`. Shared Drive client `src/lib/drive.ts`; claim form hands new claims to Drive `prijem/` (`src/lib/pipeline/prijem.ts`, no-op without `PIPELINE_DRIVE_FOLDER_ID`); client document portal `/dokumenta/[token]` + `POST /api/dokumenta/[token]` (HMAC link from the pipeline, content-sniffed JPG/PNG/HEIC/WEBP/PDF up to 4 MB → Drive `uploads/<REF>/`, no tracking, noindex); signNow webhook `POST /api/potpis/signnow?kljuc=` (stores only document id + event in Drive `dogadjaji/`); `Zadaci` tab and system status on `/pregled`. Branch-scoped Preview env vars only; production env untouched.

- 2026-09-14 staging (branch `codex/pregled-predmeta`, Vercel Preview only, production untouched): Resend delivery is now skipped on any non-production Vercel deployment (`VERCEL_ENV !== "production"`) unless `ALLOW_PREVIEW_EMAIL=1`, because Preview shares the production Resend API key. Preview-scoped, branch-scoped env vars carry the overview key and a Drive TEST index with invented cases (`Letkasni.rs / LetKasni — test / indeks.json`); production env vars were not changed. LetKasni operations are now run by Niko; Nemanja is no longer part of the workflow.
- 2026-09-14 (branch `codex/pregled-predmeta`, not deployed): read-only case overview at `/pregled/<key>` for the team and lawyers. Data comes from the LetKasni pipeline index (`indeks.json`, schema 1) published to Google Drive (`Letkasni.rs / LetKasni — sistem`), read server-side with a personal-account OAuth refresh token; local dev can use `PREGLED_INDEKS_PATH`. Access is per-role secret keys in `PREGLED_KLJUCEVI` (`tim:…,advokati:…`, min 24 chars, timing-safe compare, 404 otherwise). The index intentionally carries no passport, JMBG, address, birth date, phone or email. The page is noindex (metadata + `X-Robots-Tag`), `Referrer-Policy: no-referrer`, excluded in robots.txt, and GA4/Meta Pixel plus the consent banner are disabled on `/pregled` so the key never reaches third parties. Tabs: Predmeti (filters by phase/owner, search) and Potpisivanje (per-passenger signing status; e-sign provider plan visible only to the team role). UI uses shadcn-style components in `src/components/ui` built on brand CSS variables (no shadcn global theme, to avoid clashing with `--muted`/`--accent`).
- 2026-09-10: the user explicitly authorized publishing the full PP 1.2 package before the marketing persistence/CRM integration is activated. PP 1.2 now uses the actual static publication date 10.09.2026. Marketing subscription remains fail-closed and hidden while Supabase and the required feature settings are absent; no campaign product is approved.
- 2026-09-09: Privacy Policy 1.2 and the separate adult email-offer consent flow are implemented on `codex/privacy-marketing-consent`. The flow is fail-closed, uses double opt-in, separate consent/event/suppression tables, POST-only confirmation and unsubscribe, strict expiry/scope/product checks, and a central send gate with visible and one-click unsubscribe. The approved marketing-product registry is empty, so no sales campaign can run from this release.
- PP 1.2 and the subscription UI must ship together. Production `/api/health` at `13d64ce652a4b1dcbc559c1a7759676e81a4aeab` reported `supabaseConfigured: false` on 2026-09-09, so the additive migration and durable consent storage cannot yet be verified. The release remains blocked and feature flags remain off.
- The current production health response reports Meta Pixel/CAPI configured. The PP 1.2 change resets pre-1.2 cookie choices, keeps analytics and advertising separate from email offers, scrubs URL query/hash data, and removes claim contact hashes from CAPI because adult/minor ownership is not proven by the claim flow.
- 2026-09-08: restored VGA EU CONSULTING DOO NIŠ as owner/operator and controller in SR/EN footer, Terms and Privacy. Identity is centralized in `src/lib/site-operator.ts`; legacy operator environment overrides no longer affect public identity.
- Restored identity from canonical history (`5f821e1^`): Bulevar Nemanjića 1, Niš (Medijana), 18000 Niš, Serbia; PIB 113473442; MB 21873446; APR. User explicitly authorized restoration and immediate deployment.
- Production checker now verifies company identity on both landing pages and all four legal routes and rejects retired operator details.

- Canonical local checkout: `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.
- GitHub remote: `https://github.com/nezun/let-kasni.git`.
- GitHub `main` is the only source of truth for deployable code.
- Production URL: `https://letkasni.rs`.
- Deploy target: Vercel.
- Production serves GitHub `main` commit `859b2f9` with the email delivery reliability fix: claim submit waits for admin and user notification delivery, retries transient Resend failures up to three attempts, uses stable idempotency keys, and logs Resend IDs plus attempt counts.
- The final approved bilingual landing and claim flow is on GitHub `main` from production commit `be1c24a` or its descendants.
- The compact post-submit confirmation uses the approved green success palette, check icon, and shared SR/EN styling from production commit `88b7903` or its descendants.
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

- Before any merge of `codex/pregled-predmeta`: choose production values for `PIPELINE_DRIVE_FOLDER_ID`, `DOKUMENTA_TAJNA`, `SIGNNOW_WEBHOOK_KLJUC` (leave empty to keep the handoff off). Preview shares production Supabase: do not submit the claim form on preview to test the handoff — test with the pipeline e2e (`scripts/sistem/test/e2e.mjs`).

- Case overview (`codex/pregled-predmeta`): after the Google OAuth client exists, publish the index from the pipeline (`node scripts/drive/objavi-indeks.mjs`), set `PREGLED_KLJUCEVI`, `PREGLED_INDEKS_DRIVE_FILE_ID`, `GOOGLE_DRIVE_CLIENT_ID/SECRET/REFRESH_TOKEN` in Vercel, then release only with explicit authorization. E-sign decision (Nemanja, 13.09.2026): buy signNow Business now (SES, Draw only, manual send from dashboard, no API), trial Youtrust Plus and Eurosign in parallel; in 2–3 months add an API provider (Skribble Pro, Youtrust API or signNow API) behind a five-function SignatureProvider adapter (createRequest, getSigningUrl, getStatus, downloadSignedPdf, downloadAuditTrail). Until then the pipeline records manual e-sign status (`scripts/potpis.mjs`) into the index (`kanal: e_potpis`, provider name, audit-trail flag).
- Configure a durable Supabase production project, confirm its region/account DPA/transfer basis, apply `202609091200_marketing_email_consent.sql`, and test pending -> confirmed -> withdrawn using only a controlled test address.
- Confirm account-level DPA/transfer evidence for Vercel, Resend and the applicable Google contracting entity. Only then set the two marketing flags, token secret and `MARKETING_TRANSFER_REVIEW_VERSION=2026-09-09`; if publication occurs after 09.09.2026, update PP 1.2's static effective date to the actual deployment date.
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

- 2026-09-10 release preparation: PP 1.2 publication date and consent-notice identifier were updated to 10.09.2026. A concurrent subscription-write finding was fixed with an atomic database upsert. Privacy checks (12 tests), lint, TypeScript and the 331-route production build passed before the final release gate.
- 2026-09-09 privacy/marketing implementation: `npm run verify` passed, including 12 workflow checks, 10 privacy/marketing tests, 5 Resend tests, Meta checks, content checks, locale alignment, lint, TypeScript and a production build of 331 routes. SR/EN `/privacy` and `/email-offers` pages were checked locally at desktop and 375px mobile; the privacy page had no horizontal overflow, and rejecting optional tracking wrote the current v3 consent with GA and Meta disabled.
- 2026-09-09 production preflight: public `/api/health` matched commit `13d64ce652a4b1dcbc559c1a7759676e81a4aeab`, reported `supabaseConfigured: false`, `metaCapiConfigured: true`, and `supportEmail: kontakt@letkasni.rs`. No deployment was attempted because durable consent storage and account-level transfer evidence are mandatory publication conditions.
- 2026-08-19 green submit confirmation release: PR #24 merged as `88b7903`; the local and production release gates passed, `/`, `/en`, both Step 2 routes, `/api/health`, and invalid-submit validation passed, and production matched GitHub `main`.
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
