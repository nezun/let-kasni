# CHECKPOINT

Canonical handoff file for future local and Codex Cloud sessions.

## Start Here

### GA4 narrow shared-setting approval completed, 2026-09-16

- Owner approved ONLY History + Site search OFF. Saved and reopened existing
  letkasni.rs stream 14595479044 / G-RVJ906DKVF: both OFF; other Enhanced
  Measurement families unchanged ON, redaction unchanged. No production code/env,
  GTM publish, Meta change, campaign/spend or new Preview claim.
- Fresh local REAL SDK capture 2026-09-16T10:55:54.396Z with collector blocked:
  two clean manual pageviews, no search/extra History PV, one UUID Lead despite
  four calls; scroll clean, private-route opt-out true. Two legacy events were
  deliberately requested. Reduced proof: docs/GA4-SDK-ISOLATED-QA-AFTER-2026-09-16.json.
  Measurement regression rerun PASS 37/37. No application source changed.
- Overall BLOCKED remains: other automatic families/full hydrated GA4 checks,
  isolated approved Meta QA access, Preview email/storage/downstream isolation
  and fresh end-to-end claim. No broad toggle authority or release approval.
- Canonical logo/footer edits preserved; existing PR31 worktree session resume
  passed at 8ed5469 with origin/main e7dc38c. Historical entries below are not
  current shared-setting state. Next: finish remaining safe isolated checks;
  platform QA cannot proceed without approved isolated access/side-effect routing.

### GA4 protection / isolated Meta QA, 2026-09-16 — BLOCKED / PREVIEW ONLY

- Latest authority: finish minimal GA4/Meta checks and prepare release, NOT deploy
  production, publish GTM, submit production claims, or create paid advertising.
  This supersedes older deployment/production-test directions below.
- Application candidate `333bb9d64826926862dd56bf96cdc03bb42c6473` on existing
  `codex/google-ads-measurement` / PR #31. GA4 remains direct with safe public-route
  context and manual application pageviews; Ads attribution/browser URL untouched.
  Meta/UUID recovery/PP1.3/SEO/CRM code untouched. Canonical logo/footer edits preserved.
- Full local verify PASS: measurement 37/37 (nine new isolated runtime checks),
  workflow 12, privacy 12, email 5, retirement 8, content/links/benchmark/locales,
  lint, TypeScript and build 195 entries. Initial restricted-network build could
  not fetch fonts; authorized network-enabled full verify passed.
- Fresh browser GA4 stream 14595479044 / property 534756949 / G-RVJ906DKVF:
  History and all seven Enhanced Measurement families ON; email redaction ON,
  query-key redaction OFF. Required shared settings need explicit owner approval.
  Actual SDK local collector-isolation fixture subsequently confirmed clean manual
  initial/SPA/Lead/legacy/scroll contexts, one UUID Lead, but automatic search_term
  and History dl/dr fake-marker leakage plus duplicate SPA PV. No marker sent to
  Google; local fixture/browser stopped. Shared settings are a confirmed blocker.
- Fresh browser Meta: Letkasni.rs portfolio 2535168546914445 has only active
  production dataset 2347588039400204 for letkasni.rs; other LetKasni portfolio
  2443133752879068 has no datasets. Approved isolated QA dataset/access missing.
  Local actual route/CAPI/browser-helper integration matches Lead event IDs;
  platform visibility/dedup remains unverified. No production token copied.
- GTM workspace2 / GTM-WT3B2L8P still five-item UNPUBLISHED draft; variable v2
  eventModel.transaction_id and conversion ID/label/trigger freshly verified.
- Zero new Preview claims: email/storage/downstream isolation not established,
  and safe live Meta configuration missing. Prior UUID positive Preview PASS is
  historical, not a PASS for this candidate. No production canary or paid action.
- Next: obtain exact shared GA4 setting authority + approved isolated Meta QA
  access, isolate Preview side effects, real SDK local privacy proof, one controlled
  Preview Lead and freeze exact candidate/draft for NEW release approval.
  Complete package: docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md.
  Reduced vendor-runtime proof: docs/GA4-SDK-ISOLATED-QA-2026-09-16.json.

### Google Ads transaction-ID correction, 2026-09-16 — PREVIEW ONLY

- User approved minimal PR #31 fix, regression and one additional fake Preview
  submission. No production deployment, GTM publication or advertising allowed.
- Existing feature worktree: `letkasni-ads-measurement`, branch
  `codex/google-ads-measurement`; canonical checkout's unrelated logo/footer edits
  preserved. Merged current main e7dc38c without reversing SEO retirement.
- Fix commit 838c996 normalizes fallback/recovery to fresh `eventModel` while
  preserving one dispatch. Existing GTM DLV now `eventModel.transaction_id`, v2,
  no stale default. Container GTM-WT3B2L8P remains an unpublished five-item draft.
- Ads tests 28/28, all other verification suites and lint passed locally. Local
  build could not fetch Google Fonts; GitHub full verify passed in 56 seconds.
- Preview deployment dpl_ECR4fu26sk6T87jTnhNBiPAejiyh confirmed fix SHA;
  one approved repeat claim cce4529e-7aae-4961-bb0d-c282cdf5381b succeeded.
  Native Ads tag resolved that UUID and fired exactly once after refresh/Back;
  GA4 sent one Lead with no inspected contact PII, all four consent states correct.
  Both Vercel Preview checks passed. GTM still unpublished; remaining URL-privacy
  and test-safe Meta QA keep overall NEED_CODE_FIX / DO_NOT_PUBLISH. See
  `docs/GOOGLE-ADS-PREVIEW-QA-2026-09-16.md` for first-test evidence and remaining
  Meta Preview, GA4 URL-privacy and durable-production-storage blockers.

### Retirement release approved, 2026-09-15

- Owner explicitly approved deploy of the final scope below: airline and regional
  pages removed, all general/scenario pages kept and recorded as suggestions only.
- Re-fetched origin/main: still 49d0843, identical to the feature branch base.
  Session-start dirty-tree guard identified only this known, approved package.
  Preserve it, commit it, then run the unchanged clean-tree release gate.
- Pre-landing review covers manifests, source removals, mappings, 404 UI, QA guards
  and report scripts. No database, form/provider, landing or consent code changes.
  GSC-enriched reports remain ignored, outside the public commit.
- Release through a reviewed feature PR, passing CI, GitHub main and Vercel.
  After deployment, run production gate and full retirement/redirect/browser
  checks. Store release results under seo-audit-output/retirement-release/.
  Keep DAILY BLOG paused and general-query suggestions published.

### FINAL scope: general queries restored, 2026-09-15 (LOCAL ONLY)

- This entry supersedes the broader removal decision below. Owner wants airline
  and regional/route pages removed, but general/scenario articles KEPT for now.
  Continue existing `codex/retire-airline-pseo`; all prior own work is preserved.
- Restored 47 general articles / 94 localized URLs, their mappings, enhancements,
  images and guide links from HEAD49d0843. Restored consolidation groups B/C/E/F;
  all A-F now match the approved existing production consolidation policy.
- Still removed: 46 airline + 16 regional articles = 124 canonical URLs and
  248 aliases, 372 direct-404 paths. No airline or regional content revived.
  Active content: 68 articles plus eight guides, bilingual; sitemap 158 URLs.
- `src/content/seo-suggested-removals.json` is an explicit non-executing backlog:
  47 IDs/94 paths, KEEP_PUBLISHED, applyRemoval=false, approvalRequired=true.
  General reasons concern possible intent overlap/fragmentation/template reuse,
  not proven penalties. Historical low traffic alone does not justify removal.
  Backlinks remain UNKNOWN. Future removal needs new explicit owner approval.
- All 152 retained localized content records match the original pre-retirement
  structured snapshot exactly. No claim, provider, admin, landing or legal edits.
  Three mixed daily batches have exact retained-ID QA allowlists (5, 2, 3).
- Verify PASS: 37 tests, content QA/link graph/benchmark, locales, lint, TS/build
  (195 static generation entries). HTTP audit: 907 PASS, 0 failures, including
  all retired query variants, 158 live URLs and SR/EN alternates. All A-F redirect
  monitor checks PASS (61). Browser: 12 PASS across SR/EN, desktop/mobile, covering
  404 navigation, restored article rendering and form contact step; no submission.
  The audit follows the existing schema contract: articles require JSON-LD;
  unchanged main guides do not. Their metadata and hreflang are verified.
- Final evidence and full map: `seo-audit-output/retirement-final/REPORT.md`,
  `MAPA-I-POPIS.md`, `OSTAJE-158-URL.csv`, `UKLONJENO-124-STRANICE.csv`,
  `SUGGESTED-FOR-REMOVAL-94-URL.csv`, `sitemap-local.xml`, HTTP/browser/redirect JSON.
  GSC-enriched outputs stay ignored. Earlier retirement reports are historical.
  Repeatable report generator: `python3 scripts/seo-retirement-report.py`.
- Local tested preview: http://localhost:3003, PID28640 (verify before reuse).
  No commit, push, deploy or GSC write. DAILY BLOG remains paused; not restarted.
- ONLY next release prerequisite: owner's explicit deploy approval. Then review
  final diff and follow clean-commit/main/Vercel gates. After live checks, extend
  the existing read-only monitor with removal checks while retaining A-F, refresh
  GSC access and assess retained pages over 7/14/28 days. Do not delete suggestions.

### Programmatic scope confirmed and removed, 2026-09-15 (LOCAL ONLY)

- Owner confirmed "specific flight" means route/country/airport and generated
  scenario pages, and explicitly asked to remove them. The earlier scope blocker
  is resolved. Continued existing `codex/retire-airline-pseo` dirty work intact;
  session guard was run and identified only this checkpointed in-progress package.
- Removed 126 additional live localized URLs (32 regional/route/airport, 94
  scenarios): 63 bilingual articles. Each of the 12 remaining daily source batches
  was checked against approved IDs before deletion. Their five inactive prior-merge
  source definitions were removed too. Original core articles remain.
- Added `src/content/seo-retired-programmatic.json`: 63 live article pairs plus
  four previously redirected source pairs (B/C/E/F). Removed those four redirect
  groups since their targets were deleted. Groups A/D remain valid permanent
  redirects to the main delay guide and original missed-connection article.
- Combined retirement: 218 formerly live localized pages + eight former source
  paths = 226 canonical paths and 452 legacy aliases, 678 direct-404 URLs.
  Sitemap 282 -> 190 -> 64. Remaining content: 21 original active articles plus
  eight main guides, bilingual. The airport action plan is preserved.
- Removed scenario-specific appendices and registrations. No claim/provider/admin
  changes. 54/58 surviving localized records identical; only two main guides in
  both locales had retired links removed and four sentences changed into direct
  evidence/date-checking steps. Minimum content QA limits remain unchanged.
- Eight retirement regression tests are in verify. Obsolete mixed-batch exception
  was removed. DAILY BLOG still PAUSED (verified). Browser harness now uses group D
  for form checks, since group E is gone. Historical phase-specific audit artifacts
  are not fresh expected baselines for this larger owner-approved scope.
- Private evidence: `seo-audit-output/retirement-programmatic/REPORT.md`,
  `additional-programmatic-pages.csv` (126), `all-retired-urls.csv` (678),
  `http-verification.json`, `browser/results.json`, `retained-redirects/latest.json`.
  All GSC exports/reports remain ignored and must stay out of public git.
- Verify PASS: 37 tests, content/link/benchmark/locales, lint, TS/build (101 routes).
  HTTP: 1425 checks PASS. Remaining redirect checks: 21 PASS. Browser: eight SR/EN
  desktop/mobile 404 + form-contact-transition checks PASS; no real submission.
- Local preview updated on http://localhost:3003, PID 23730. Old preview PID15221
  was stopped before starting this build. Verify process identity before reuse.
- Nothing committed, pushed or deployed. Only remaining release prerequisite is
  explicit deploy approval, then normal clean-commit/main/Vercel release gates.
  After production verification, update existing read-only monitor expectations
  to A/D plus both retirement manifests, verify www, and refresh GSC access.
  No claim of Google removal, zero backlinks, or guaranteed ranking improvement.

### Airline SEO retirement, 2026-09-15 (LOCAL ONLY)

- Current branch `codex/retire-airline-pseo`, started through session guard from
  synchronized `origin/main` `49d0843` (the prior Phase 1 + 3A release is live).
- Owner explicitly requested ending airline-specific and specific-flight pSEO.
  Definite airline scope implemented: 46 original articles / 92 localized
  canonical URLs plus 184 legacy aliases now return 404 locally. Sitemap 282 ->
  190. Seven airline-only source batches deleted; four carrier articles removed
  from mixed 05-07 batch while its two duration articles are preserved.
- Removed article/image registrations, parent/child mappings and airline-only
  enhancement generator. No claim, provider, airline catalogue, admin, landing
  or prior consolidation redirect changes. Remaining 184 localized content
  records are byte-equivalent as parsed structured data to the before snapshot.
- Native 404 chosen because no equivalent carrier-specific replacement exists;
  no blanket redirects/noindex pages/robots blocking. Shared bilingual 404 view
  provides header/footer and optional rights/claim navigation. Its UI renders via
  Next RSC; HTTP audit checks the actual 404/noindex and browser QA checks the UI.
- Manifest `src/content/seo-retired-airlines.json` plus six regression tests are
  part of `npm run verify`. Content QA permits only the exact two surviving
  mixed-batch IDs. DAILY BLOG was already PAUSED and remains paused.
- Private report and full inventories: `seo-audit-output/retirement/REPORT.md`,
  `canonical-pages-with-evidence.csv` (92), `all-retired-urls.csv` (276),
  `other-pseo-scope-to-confirm.csv` (126). Keep all GSC evidence OUT of public git.
  Runbook: `docs/SEO-RETIREMENT-RUNBOOK.md`.
- Verify PASS: 35 tests, content/link/benchmark/locales, lint, TS/build (227 routes).
  Retirement HTTP audit: 747 checks PASS; previous-release local monitor: 61 PASS;
  browser: 8 SR/EN desktop/mobile checks PASS (404 UI + form contact step, no send).
  Local production-build preview remains at http://localhost:3003 (PID 15221;
  verify current process before stopping/reusing, and do not reuse stale builds).
- BLOCKER / next work: owner has not clarified "specific flight". No public
  flight-number/date SEO generator found; 32 regional/route/airport and 94 scenario
  URLs remain untouched pending that decision. Async clarification was sent.
- This new package is NOT deployed, committed or pushed. Obtain separate explicit
  deploy approval and follow normal release gate. Prior phase's approval must not
  be reused. After deployment, extend the existing read-only monitor with retirement
  checks, verify www, then refresh GSC. Preserved GSC ends 2026-09-12; backlinks
  UNKNOWN. Do not claim deletion from Google or guaranteed ranking improvements.

### SEO release authorized, 2026-09-15

- Owner approved steps 4 and 5: deploy the prepared Phase 1 + Phase 3A package
  and monitor the result. Earlier LOCAL ONLY entries below describe preparation,
  not the current authorization. No additional content batches are approved.
- Release preparation uses the inherited `codex/seo-recovery` branch. The initial
  session guard reported its known uncommitted SEO package; preserve and commit
  that reviewed package before running the unchanged clean-tree release gate.
- Private GSC exports and detailed evidence stay local under ignored
  `seo-audit-output/`; never add that directory to the public repository.
- Added `scripts/seo-release-monitor.py` and three redirect-contract tests.
  The monitor is read-only and does not assert Google indexing from HTTP status.
  Live browser output can be isolated with `SEO_BROWSER_OUTPUT`.
- GSC browser access initially blocked because the Mac was locked. User notified;
  technical deploy checks can proceed independently. Confirm actual GSC access
  before claiming refreshed index/performance data.
- Deployment result is recorded in the local release report after live gates.

### SEO Recovery Phase 3A, 2026-09-15

- Read `seo-audit-output/phase3a-summary.md`, `phase3a-merge-results.csv` and
  `docs/SEO-CONSOLIDATION-RUNBOOK.md`. LOCAL ONLY; no commit, push, deployment
  or indexing request. Inherited Phase 1/2 work remains preserved and uncommitted.
- Implemented only six approved concepts in both languages: general delay,
  crew duty time, separate tickets, same-booking connections, arrival/door time,
  and overnight hotel care. Targets were improved before redirects were added.
- Twelve canonical sources plus 24 historical aliases redirect in one hop (308)
  to final localized targets, including query and www checks. Active lists,
  routing and sitemap exclude the sources; raw content definitions are retained.
- Sitemap 294 -> 282; technically indexable self-canonical URLs 296 -> 284.
  Crawl: 343 URLs, zero broken internal links; incoming source-document edges
  38 -> 0. These are local technical results, not Google indexing/ranking gains.
- Five target articles bypass generic runtime appendices and use focused
  topic-coverage QA instead of padding to a word count. Other 264 localized
  content records and inherited Phase 1 identity/legal/utility protections remain
  unchanged. Main delay guide retains its 15-section outline and legal boundaries.
- Full verify PASS: 29 unit tests, content/link/benchmark/locale checks, ESLint,
  TypeScript and production build (319 routes). Browser: 24 target viewport
  checks + four SR/EN form transitions PASS; final guide copy rechecked in
  four viewports. No actual claim/contact submission or provider delivery test.
- Visual follow-up: mobile contact-modal logo partly covered by the fixed header;
  shared modal/header styles were not modified. Keep this separate from SEO scope.
- Ground handling remains HUMAN_REVIEW pending verified causation distinctions.
  No airline Tier 3, country/regional, new-page, noindex or 410 work authorized.
  The remaining Phase 2 merge proposals are not approved for automatic execution.
- Build AND start with `NEXT_PUBLIC_SITE_URL=https://letkasni.rs` for canonical
  QA. Read the runbook for repeatable audit, browser, CSV and report generation.
- Next recommended work: shared boilerplate in one separately approved family,
  then airline Tier 1 strengthening. Production release requires explicit approval
  and the normal clean-commit/release-gate workflow; do not bypass inherited dirt.

### SEO Recovery Phase 2, 2026-09-15

- Read `seo-audit-output/PHASE2-REPORT.md` and the main
  `final-seo-consolidation-proposal.csv`. Analysis only; no additional website,
  redirect, sitemap or content changes in Phase 2. Phase 1 changes remain dirty
  and preserved on `codex/seo-recovery`; nothing deployed.
- Native GSC data: Web, 2026-04-29 through 2026-09-12; max/6m/90d/28d exports.
  All 171 reported page metrics mapped to 144 current URLs; 296 canonical URLs
  covered (294 sitemap plus two English legal pages).
- 156 exact-page query/day exports saved. Google HTTP 429 blocked 15 low-volume
  remaining URLs (22 impressions, zero clicks). A later retry also refused;
  do not hammer the endpoint. Missing detail stays unknown. No API credentials.
- Proposal: sitemap KEEP_STRONG 6, KEEP_IMPROVE 184, conditional MERGE_301 30,
  HUMAN_REVIEW 74, NOINDEX_KEEP 0, REMOVE_410 0. Projected sitemap 264 includes
  all unresolved pages. Review backlog reduced from 136, not eliminated.
- Locked: no automatic execution of matrix. Every merge requires human approval
  and a useful, verified target integrating the preservation brief FIRST.
  Keep UK/Turkey/UAE/Israel regimes distinct; no generic carrier-to-home redirects.
  Backlinks UNKNOWN. Similarity and no reported traffic alone cannot delete pages.
- Reproduce: `python3 scripts/seo-performance-import.py`, then
  `python3 scripts/seo-consolidation-proposal.py`, then
  `python3 scripts/seo-phase2-check.py`. Read `PHASE2-SETUP.md` for API setup.
- Offline checks passed with source limitations; new API script syntax and ESLint
  passed. Live API auth untested; full application build not repeated in Phase 2.
- Next work only after approval: edit targets bilingually, approve explicit
  redirect subset, update links/metadata/sitemap and run normal release gate.
  70 airline + four airport URLs need concrete business/utility evidence.

### SEO Recovery, 2026-09-15

- Current task branch: `codex/seo-recovery`, based on `origin/main` `cad98a8`.
- Read `seo-audit-output/REPORT.md` and `seo-audit-output/README.md` for the
  completed audit, all URL decisions, evidence and repeatable commands.
- Used the three native GSC CSV exports in `../GSC-EXPORT-2026-09-15/`: 57 crawled,
  8 canonical, 2 historical 404. Public baseline and local candidate each cover
  320 URLs, including all 294 sitemap entries. Never invent Google-selected
  canonical values from those CSVs; that field is absent.
- Prepared homepage WebSite/operator schema, legal metadata/canonicals in SR/EN,
  noindex on four token utility pages, and JSON-LD escaping. No new redirects,
  article deletion, blanket noindex, legal-body changes or tracking changes.
- Locked decision: high text similarity is a review signal, not evidence enough
  for mass consolidation. Editorial/route/airline ambiguity stays HUMAN_REVIEW.
- Next work: review candidate decisions, obtain article-specific research and
  performance evidence before consolidation; deploy this technical patch only
  when explicitly requested, using the normal release gate.
- Manual work: after approved deploy, optionally request homepage reindexing;
  no mass request for all excluded articles. No production changes made here.
- Verification: workflow/privacy/email tests, Meta/content/link/benchmark/locale
  checks, lint and build TypeScript passed. Build enumerated 331 routes. Full
  `seo-recovery-check.py` passed: same 294 sitemap URLs, all 200/self-canonical,
  no accidental noindex, valid JSON-LD, no bad internal destinations, identical
  visible sitemap content, legal hreflang, utility noindex and historical redirects.
- Build must use `NEXT_PUBLIC_SITE_URL=https://letkasni.rs` for production-canonical
  QA; the existing environment-free fallback is a local development URL.
- Browser QA passed initial SR/EN claim transitions from homepage through delay
  selection to flight-details inputs, with optional cookies rejected. No real
  claim was submitted. Evidence: `seo-audit-output/browser-qa.md`.

1. Read `AGENTS.md`.
2. Read this `CHECKPOINT.md`.
3. Run `npm run session:start` to verify a clean, synchronized canonical checkout.
4. For new work, run `npm run session:start -- --new <task-slug>`.
5. For explicitly checkpointed unfinished work, run `npm run session:start -- --resume`.
6. Continue from the first open item in "Next Work".

## Generated Status

<!-- BEGIN:generated-status -->
Generated at: `2026-09-16T10:57:15.770Z`

Branch: `codex/google-ads-measurement`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `8ed5469 test: capture real GA4 SDK privacy blockers with isolated transport`

Worktree status:

```text
M CHECKPOINT.md
 M docs/GOOGLE-ADS-LAUNCH.md
 M docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md
?? docs/GA4-SDK-ISOLATED-QA-AFTER-2026-09-16.json
```

Useful commands:

- `npm run session:start`: `bash scripts/start-canonical-session.sh`
- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run workflow:check && npm run privacy:check && npm run meta:check && npm run google-ads:check && npm run email:check && npm run seo:retirement:check && npm run content:qa && npm run content:links && npm run content:benchmark && npm run locales:check && npm run lint && npm run build`
- `npm run release:gate`: `bash scripts/release-gate.sh`
- `npm run production:check`: `node scripts/check-production.mjs`
- `npm run workflow:check`: `bash scripts/check-workflow-guards.sh`
- `npm run content:qa`: `node scripts/content-qa.mjs`
- `npm run content:links`: `node scripts/content-link-graph.mjs`
- `npm run content:benchmark`: `node scripts/content-benchmark-review.mjs`
- `npm run checkpoint`: `node scripts/update-checkpoint.mjs`
<!-- END:generated-status -->

## Current State

- 2026-09-15: The user explicitly approved bilingual Privacy Policy 1.3. Google Ads billing onboarding and advertiser verification are complete; no campaign or spend was created.
- 2026-09-15: Native Google Ads conversion `Lead - successful claim submit` is configured as Primary, no monetary value (UI evidence supersedes the older EUR 0 note), Count One, 30-day click-through window, data-driven attribution and enhanced conversions off. Conversion ID `18452620232`; label `VnU-CKD6zfgcEMjH8t5E`.
- 2026-09-15: GTM draft now contains five changes: `DLV - transaction_id`, `CE - lead_submit`, `Conversion Linker - All Pages`, `Google Tag AW-18452620232`, and `Lead - successful claim submit`. The conversion tag uses the claim UUID transaction ID and fires only on `CE - lead_submit`; the container remains unpublished.
- 2026-09-15: External Preview measurement setup is active but intentionally unpublished. GTM account `LetKasni`, Web container `GTM-WT3B2L8P`, Vercel Preview env, `DLV - transaction_id`, `CE - lead_submit`, and `Conversion Linker - All Pages` are configured. Tag Assistant verified consent gating, the existing direct GA4 tag and one firing of the Conversion Linker.
- 2026-09-15: Real Preview QA found that a `gtag` event plus a second explicit object push could duplicate journey events under accept-all consent. Commit `f2d35e2` now emits one data-layer message per journey event; the updated regression test and live Tag Assistant check both pass.
- 2026-09-15: Bilingual Privacy Policy 1.3 and consent-detail copy now explicitly name Google Tag Manager / Google Ads, describe the limited conversion payload, and use consent notice `privacy-1.3-2026-09-15` so existing choices are requested again on release. PP 1.3 and the v0.2.0 production release are approved; the production deploy has not yet run.
- 2026-09-15: Google Ads online measurement is code-ready on `codex/google-ads-measurement`. The site now has an optional consent-gated GTM container, Consent Mode v2 defaults/updates, 90-day first-paid-touch capture for Google click IDs and UTMs, success-only deduplicated `lead_submit`, and secondary `claim_start`, phone and WhatsApp events. The real GTM ID is enabled only on the feature-branch Preview; Production remains unchanged.
- Attribution is allowlisted, query-stripped and stored with the existing claim input snapshot only when the server-verified advertising consent cookie permits it. GA4 remains direct, Meta Pixel/CAPI remains on its existing path, and no PII is added to GA4/GTM events. Exact UI setup and blockers are in `docs/GOOGLE-ADS-LAUNCH.md`.
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

- Current Google measurement task: follow the BLOCKED / PREVIEW ONLY entry above.
  Do NOT execute older production/GTM/Supabase/CRM instructions in this task.
- Run GTM Preview with one controlled successful claim. Publish GTM and add `GTM-WT3B2L8P` to Vercel Production only after exactly one Ads conversion is observed.
- After Preview QA, deploy the approved v0.2.0 release and run one controlled production claim to verify GTM, Google Ads, GA4 and Meta together. Keep `SEARCH_RS_CORE` paused until this passes; keywords and negative keywords require the owner's active review.
- Configure a durable Supabase production project, confirm its region/account DPA/transfer basis, apply `202609091200_marketing_email_consent.sql`, and test pending -> confirmed -> withdrawn using only a controlled test address.
- Confirm account-level DPA/transfer evidence for Vercel, Resend and the applicable Google contracting entity. Only then set the two marketing flags, token secret and `MARKETING_TRANSFER_REVIEW_VERSION=2026-09-09`; if publication occurs after 09.09.2026, update PP 1.2's static effective date to the actual deployment date.
- After the immediate reliability release, add a durable email outbox plus Resend delivery/bounce webhooks once Supabase production persistence is configured; this is the remaining step that can recover emails after all in-request retries fail.
- Add the real Meta Pixel ID and Conversions API token in Vercel Production, then run the Test Events flow from `docs/META-ADS-TRACKING.md`.
- Confirm whether campaign traffic will use canonical `letkasni.rs` or a separate `leadcast.rs` host before domain verification and release.
- After Meta Test Events and privacy/consent review pass, run `npm run release:gate` and deploy only with explicit release authorization.
- Complete a real Meta Test Events submission with disposable data and verify the new `fbc`, `fbp`, IP, name, country, and `external_id` fields in Events Manager.
- Configure durable Supabase persistence in Vercel production and rerun the production gate with `REQUIRE_SUPABASE=1`.
- Treat durable Supabase claim persistence as a hard Google Ads launch blocker: the Vercel `/tmp` fallback cannot atomically deduplicate concurrent submissions into one claim UUID and one Ads transaction ID.
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

- Current release blockers and exact shared GA4 approval request are in
  `docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md`; older approvals below are
  historical and do not authorize this candidate's deployment or GTM publish.
- Google-owned configuration is complete through the direct conversion action and GTM draft. One controlled successful Preview conversion is still required before publishing the container.
- PP 1.3 and the v0.2.0 release are approved; production stays unchanged until the release workflow reaches the deploy step.
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

- 2026-09-15 v0.2.0 ship gate: all 25 Google Ads measurement tests passed, together with privacy, Meta, email, content, link, benchmark, SR/EN locale, lint, TypeScript and optimized production-build checks. Security, performance, API, maintainability, design and adversarial review passes reported no remaining release-blocking code finding.
- 2026-09-15 Google Ads conversion Preview: Tag Assistant connected only after advertising consent and found direct GA4 `G-RVJ906DKVF`, GTM `GTM-WT3B2L8P`, and Ads `AW-18452620232`. `Conversion Linker - All Pages` and `Google Tag AW-18452620232` each fired once; `Lead - successful claim submit` correctly did not fire on page load or before a successful claim. Positive successful-submit verification is intentionally pending because no fake CRM claim was created.
- 2026-09-15 PP 1.3 Preview QA: Vercel deployment `AhPkmBfAShY2Go8VFeuB7LXXm8Zp` for `3e536b3` reached Ready. The prior PP 1.2 consent cookie was rejected, the banner requested a new choice, the advertising detail named Meta and Google, `/privacy` rendered PP 1.3 dated 15.09.2026 with the limited Google Ads payload disclosure, and rejecting optional tracking kept GTM inactive. All verification stages through lint passed; the final permitted network build passed and generated 331 pages.
- 2026-09-15 real Preview QA: Vercel deployment `8ps2NiPdvcxydpK4F9GXkMcVDEWh` for `f2d35e2` reached Ready. Tag Assistant connected only after advertising consent, found `GTM-WT3B2L8P` plus direct GA4 `G-RVJ906DKVF`, fired the Conversion Linker, and showed one `claim_start` after the duplicate-dispatch fix. The full verification chain passed through lint; the initial sandboxed build could not fetch Google Fonts, and a permitted rerun of `npm run build` passed with all 331 pages.
- 2026-09-15 Google Ads readiness: full `npm run verify` passed on `ae1b35e`, including 12 workflow checks, 12 privacy checks, Meta check, 7 Google Ads measurement tests, 5 email tests, content/link/benchmark checks, SR/EN locale alignment, lint, TypeScript and an optimized build of 331 pages. Local browser QA covered pre-consent, analytics-only, advertising-only, accept-all and revoke states; mock GCLID/UTM navigation; phone/WhatsApp events; SR end-to-end submission with stored attribution; and EN campaign-parameter navigation. QA found and fixed missing client exposure of `NEXT_PUBLIC_GTM_ID`, a lint-only test issue, and pre-consent `claim_start` replay.
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
