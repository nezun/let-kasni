# Google measurement release preparation — 2026-09-16

**BLOCKED / DO_NOT_PUBLISH / PAID_TRAFFIC_NOT_AUTHORIZED**

## Candidate and scope

- **Latest pass supersedes the historical candidate/status entries below.**
  Application descendant `2903eddd4641a657e09b785bea1b2aef06c70270` adds only
  Preview email diagnostics (no credentials/addresses or behavior change).
  Measurement implementation remains `333bb9d`; new health regressions bring
  CI measurement coverage to 39 tests. Full local verify passed.
- Actual SDK: all four consent modes and revoke/private-route/return PASS;
  positive form metadata clean. Automatic click/file_download FAIL with synthetic
  private link/file marker. History + Site search are already saved OFF; only
  Outbound clicks + File downloads need the next scoped setting fix and repeat.
  This further change is NOT saved. No video embed found in source.
- Latest owner authority covers safe remaining fixes, but not production deploy/
  env/GTM publication or persistent production Meta credentials. Current
  task-scoped Chrome access timed out and protected Preview redirects to SSO.
  No bypass or new successful Preview claim. One denied-consent hydrated local
  fake claim passed in a new isolated QA directory, not a Vercel/GTM canary.
- Current proof, status table, exact IDs and next actions:
  [final scoped QA](GOOGLE-ADS-FINAL-QA-2026-09-16.md),
  [real SDK scenarios](GA4-SDK-SCENARIOS-QA-2026-09-16.json).
  Historical platform/candidate proofs below do not clear current blockers.

- PR: https://github.com/nezun/let-kasni/pull/31
- Branch: `codex/google-ads-measurement`
- Exact application candidate: `333bb9d64826926862dd56bf96cdc03bb42c6473`.
- Baseline/main at inspection: `e7dc38c0b022f42cad7d1ba98d74e88ecbb5ddaf`.
- Preview deployment for candidate: `DaZjSC7MsSfmkas8qqSanQQAvQfB` (Vercel project `let-kasni`).
- Preview: https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app
- CI: https://github.com/nezun/let-kasni/actions/runs/35085505235
- GitHub verify and both Vercel Preview checks for `333bb9d` passed. Browser GET of Preview `/api/health` at `2026-09-16T10:34:48.386Z` confirmed the exact candidate SHA and `dpl_DaZjSC7MsSfmkas8qqSanQQAvQfB`: `analyticsMode=ga4`, `metaCapiConfigured=false`, `supabaseConfigured=false`, provider off, marketing subscription disabled. This GET is not a form/runtime canary.
- Documentation-only descendants are not new application code. The release operator must verify identical application tree, passing checks and exact approved HEAD before landing; this candidate is NOT approved for production.

No merge/main change, production environment change/deploy, GTM publish, production canary, customer-data test or advertising action occurred in this pass. Zero new successful Preview claims were submitted.

## Status controls

| Control | Status | Evidence / limit |
| --- | --- | --- |
| GA4_URL_PRIVACY | PARTIAL PASS | Owner-approved History + Site search OFF persisted. Fresh real-SDK capture: two clean manual pageviews, no search/extra History hit, one UUID Lead. Other automatic families/full hydrated behavior remain unverified. |
| GOOGLE_ADS_PREVIEW | BLOCKED | Earlier `838c996` Preview resolved the fresh UUID and fired once. No positive canary for `333bb9d`; do not transfer earlier PASS to new code. |
| META_LOCAL_INTEGRATION | PASS | Actual submit route, actual CAPI implementation and actual browser helper execute with external storage/email/API mocked. One new route acceptance -> one CAPI Lead; browser helper uses matching Lead/eventID. Reused route acceptance sends no further CAPI/email. |
| META_LIVE_PREVIEW | BLOCKED | No approved isolated test dataset/Pixel and test credential access found. Production dataset must not be reused for browser QA without explicit authority. |
| CONSENT_AND_ADMIN | PASS (local) | Four consent permutations, existing revoke/recovery regressions and actual GoogleMeasurement admin-path effect pass. Not a fresh live SDK/browser admin-transition proof. |
| RELEASE_CHECKS | PASS | 37 measurement tests, 12 workflow, 12 privacy, 5 email, 8 retirement tests, source-presence Meta check, content/links/benchmark/locales, lint, TypeScript and build; candidate GitHub verify and both Vercel checks passed. Check remote CI/deploy results again for final documentation-only HEAD. |
| RELEASE_APPROVAL | BLOCKED | Explicit shared-stream decision and safe live QA prerequisites remain. Earlier production approval does not supersede this task's prohibition. |

## Application changes

- `src/lib/analytics-privacy.ts`: exact application public-route allowlist; URL query/fragment/private-referrer-path scrubbing; safe analytics title rather than dynamic document title; value-level campaign and legacy metadata allowlists.
- `src/lib/analytics-public-paths.ts`: builds the route allowlist from the same article/guide registry as the sitemap. Includes bilingual public/legal/intake routes, excludes admin/auth/token/private-document routes. No SEO/content changes.
- `src/lib/analytics.ts`: one initialized direct GA4 destination, `send_page_view:false`, one manual application pageview per transition, destination-scoped safe context and legacy events, supported per-measurement-ID opt-out on nonpublic paths/revocation.
- `src/components/analytics.tsx` and `src/app/layout.tsx`: wire public paths and consent/navigation synchronization before application config/events. No second GA4/GTM tag or cookie banner.
- `scripts/measurement-runtime.regression-2.test.mjs`: nine runtime regressions with isolated external boundaries; included in `google-ads:check`, therefore existing unchanged verify CI runs them automatically.
- `scripts/ga4-sdk-isolated-fixture.mjs`: repeatable LOCAL diagnostic serving actual compiled application tracking modules and the real Google SDK; collector hooks/CSP are installed before SDK load. Never deploy/serve this fixture as website code. Reduced evidence is `docs/GA4-SDK-ISOLATED-QA-2026-09-16.json`.
- `package.json`: adds the new regression file to the existing check. No dependency or CI workflow changes; existing tests were not changed/weakened.

Google journey event/UUID recovery code, Meta Pixel/CAPI code, backend/persistence architecture, PP 1.3, SEO, public copy, campaigns and unrelated canonical checkout logo/footer changes were not modified.

### Attribution consequences

Browser URL is never rewritten. Existing consent-aware claim/Ads attribution continues to retain gclid/gbraid/wbraid and UTMs under its existing contract; existing attribution regressions still pass. GA4 display URL is a separate path.

GA4 display URL retains only exact approved values: sources `google/facebook/instagram/newsletter`, media `cpc/paid_social/email/organic/referral`, campaign `SEARCH_RS_CORE`. Free-form `utm_term/content`, other campaign values and opaque click IDs are omitted from GA4 **display URL**, not erased from Ads/claim attribution. Arbitrary campaign strings cannot be safely classified as nonpersonal from spelling alone. Add future approved campaign metadata to this explicit registry and regressions; do not broaden it to arbitrary alphanumeric values. This narrow registry may reduce GA4 campaign naming for other campaigns; paid Ads attribution/storage is unchanged. Real Google SDK campaign parsing and other implicit parameters must be verified before rollout.

Same-origin approved public referrers retain origin/path without query; unknown/private/external referrer paths retain only the origin. Document title is not read into application-controlled GA4 payloads.

## External configuration — two approved GA4 settings changed

### GA4 shared stream: History + Site search OFF, saved and verified

**Latest state supersedes the historical inspection/proposal below.** Owner approved ONLY History + Site search OFF. Saved in stream 14595479044 and reopened the editor: History checkbox 0, Site search OFF; Page loads, Scrolls, Outbound clicks, Form interactions, Video engagement and File downloads unchanged ON. Redaction unchanged. This shared Google setting affects existing stream behavior; no production website code/env or GTM publication occurred.

Fresh real-SDK capture at `2026-09-16T10:55:54.396Z`: initial and SPA manual pageviews exactly once per transition, no `view_search_results`, no extra automatic History pageview, one `lead_submit` UUID despite four helper calls (two initial, two delayed). All six inspected GA4 hits have no private marker in URL/body; scroll clean. Two separate legacy `generate_lead` hits were deliberately requested, not duplicates of the UUID Lead. Private-route opt-out became true; no private-route collector hit appeared at inspection. Collector transport blocked throughout; no real claim/backend/platform acceptance. Evidence: [after settings capture](GA4-SDK-ISOLATED-QA-AFTER-2026-09-16.json). Outbound/form/video/download privacy and full hydrated revoke/return behavior remain unverified. The broader proposal below is NOT approved/applied; any further shared-setting change needs new authority.

Browser freshly verified property `letkasni` **534756949**, account **392752906**, stream `letkasni.rs` **14595479044**, measurement **G-RVJ906DKVF**. Legacy Replit stream **14595763317** was not selected or changed.

Historical initial Enhanced Measurement: Page loads ON, History page changes ON, Scrolls ON, Outbound clicks ON, Site search ON, Form interactions ON, Video engagement ON, File downloads ON. Email data redaction active, query-key redaction inactive.

**Historical broader proposal, superseded by the two-setting approval above:**

1. Admin -> Data streams -> `letkasni.rs` -> Enhanced measurement -> Configure.
2. Page views -> Advanced: uncheck **Page changes based on browser history events**. Keep Page loads (disabled/mandatory option) unchanged; candidate code suppresses config-generated pageviews and sends its own sanitized initial/navigation pageviews.
3. Set **Outbound clicks**, **Site search**, **Form interactions**, **Video engagement**, **File downloads** OFF, because their automatic link/form/search/video/file values bypass application event scrubbing. Keep Scrolls ON and use the existing manual lead/intake events. This removes those five automatic measurement families, not their underlying website functionality.
4. Optional defense-in-depth: enable URL query-key redaction for `email,phone,pnr,booking_reference,token,access_token,code,document_url`. Do not add gclid/gbraid/wbraid/UTM keys blindly. Email redaction remains ON. Redaction is not a complete path/title/free-form-value privacy solution.

These settings are shared with current production, not branch scoped. **Explicit owner approval is required before saving them.** Merely using `send_page_view:false` does not disable History-based Enhanced Measurement. [Google manual pageview documentation](https://developers.google.com/analytics/devguides/collection/ga4/views), [configuration reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/config), [data redaction limitations](https://support.google.com/analytics/answer/13544947).

Real SDK local test WAS executed after the Node tests. `node scripts/ga4-sdk-isolated-fixture.mjs` starts only localhost:3016. Its CSP denies connect/image/frame transport, hooks capture SDK attempts before first load and no-referrer prevents marker URLs leaking through SDK-script request referrers. The real `gtag/js?id=G-RVJ906DKVF` ran with actual application tracking modules. No collector/test marker was transmitted to Google; no claim, database, email, Meta or Ads tag was used. Local fixture/browser were stopped afterwards.

Observed real collector attempts (batch lines parsed individually):

- Initial manual page_view: sanitized URL with exact google/cpc/SEARCH_RS_CORE metadata, safe title, no fake private marker. Auto scroll context also clean.
- SPA manual page_view: clean `/en` URL, safe title; fake marker in utm_campaign excluded from this hit.
- `lead_submit`: exactly one attempt despite calling the same UUID twice; fake UUID `00000000-0000-4000-8000-000000000006`, clean inspected URL/title payload. One separate legacy `generate_lead` attempt, also clean. This is not backend/platform acceptance or a fresh Vercel canary.
- **Automatic view_search_results FAIL:** its `ep.search_term` includes fake marker from `q` even though page_location is sanitized.
- **Automatic History page_view FAIL:** extra pageview includes fake marker in dl/dr, including sensitive value inside utm_campaign. Email best-effort redaction masks email, not other values. This proves current stream behavior is NOT privacy-safe and creates duplicate SPA pageviews.
- Admin fixture transition set the supported GA4 opt-out flag true; no additional collector attempt appeared at inspection. Full hydrated app/browser transition and revoke/return suite still pending.

Full reduced evidence: [actual SDK collector attempts](GA4-SDK-ISOLATED-QA-2026-09-16.json). No cookie/client/session IDs are retained. The fixture is diagnostic/manual, not an unattended CI platform test.

After approved shared-setting change, REPEAT real SDK capture before live QA: initial/SPA/legacy/Lead, scroll/engagement, sensitive query/encoded/fragment/path/referrer and allowed-UTM value, private route transition and revoke/return, link/form/video/file auto-event suppression. Outbound/download click was attempted with prevented external navigation but no collector event was observed, so no positive suppression/privacy proof is claimed for those families. Form/video behavior remains unverified. The Node harness models config-to-transport output; it is **not** the real SDK. Neither test clears the still-failing shared-stream gate.

### Meta assets and safety

Browser freshly inspected both visible portfolios:

- `LetKasni` business **2443133752879068**, ad account **1698484371380752**: dataset list says no data sources.
- `Letkasni.rs` business **2535168546914445**, ad account `Letkasni - osnovni` **888673360636659**: one dataset **2347588039400204**, website **letkasni.rs**, both Pixel and CAPI present, PageView/Initiate checkout/Lead active.

This is active production data, not an isolated test dataset. No new dataset, token, advanced matching or audience/campaign configuration was created/changed. No credential was read/exported/copied.

Missing for live QA: an explicitly approved isolated QA Pixel/dataset and its Preview-only CAPI access through the normal secure environment workflow. Existing `META_TEST_EVENT_CODE` can mark CAPI tests; it does **not** by itself isolate browser Pixel events. Production CAPI token must not be copied to Preview.

Local evidence: actual route parsing/current consent cookie and CAPI transport execute; same client/server `Lead` ID, safe event_source_url, no em/ph/fn/ln/external_id contact hashes and no manufactured fbp/fbc. Missing configuration, denied/stale consent and invalid submission produce no CAPI transmission. Mock 4xx/transport failure does not reject an accepted claim; reuse does not retry CAPI. Matching IDs prove the application's dedup contract, **not** Meta's actual platform deduplication.

### Preview claim side effects

The actual accepted-submit route calls `sendAdminClaimNotification` and `sendUserClaimConfirmation` on a new claim; both are awaited and production email delivery can have external side effects. CAPI is also called only for new claims with current server-authoritative advertising consent. There is no direct Notion/CRM webhook call in this route.

All local test email/storage/CAPI boundaries were mocked. Vercel Preview Resend routing/absence and downstream email-based CRM automation have NOT been verified safe for a new claim. Therefore no new live Preview claim was made. Before the single new allowed QA claim, verify branch-specific Resend disabled or isolated QA recipient routing, no production persistence/webhook/CRM path and approved fake test identity. An example.com destination alone does not isolate the admin email.

## Frozen GTM draft and public environment IDs

Fresh browser inspection: account **6376980479**, container numeric **264196113**, Web ID **GTM-WT3B2L8P**, Default workspace **2**, five pending added items. No published release version was created.

- Trigger **4**: `CE - lead_submit`, exact `lead_submit` custom event.
- Variable **3**: `DLV - transaction_id`, v2, `eventModel.transaction_id`; no stale default. Verified by opening existing item.
- Tag **5**: Conversion Linker - All Pages.
- Tag **8**: Google Tag AW-18452620232.
- Tag **7**: Lead - successful claim submit, Conversion ID **18452620232**, label **VnU-CKD6zfgcEMjH8t5E**, Transaction ID `{{DLV - transaction_id}}`, Once per event, trigger `CE - lead_submit`. Freshly opened/verified.

Proposed version name (not created/published): **LetKasni PP1.3 + Ads Lead — approved candidate SHA**. Snapshot/export the final draft after QA and before approval; do not invent a numeric version ID or claim this workspace is immutable.

| Environment / asset | Exact value or boundary |
| --- | --- |
| `NEXT_PUBLIC_GTM_ID` | `GTM-WT3B2L8P`; existing branch Preview only, production unchanged |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-RVJ906DKVF` (existing direct measurement fallback); no replacement property |
| `NEXT_PUBLIC_ANALYTICS_MODE` | `ga4`; preserve current architecture |
| Ads customer | `460-732-8439` |
| Ads Lead action | `7769128224`, `Lead - successful claim submit`, Primary / One / no monetary value |
| GTM conversion configuration | ID `18452620232`, label `VnU-CKD6zfgcEMjH8t5E`; not invented code environment variables |
| `NEXT_PUBLIC_META_PIXEL_ID` | QA dataset ID only if explicitly approved; never silently use production `2347588039400204` for tests |
| `META_CONVERSIONS_API_ACCESS_TOKEN` | Secret; secure Preview-only approved test access required, never include in report |
| `META_TEST_EVENT_CODE` | Existing supported CAPI test mechanism; set only through safe approved QA config |
| `META_GRAPH_API_VERSION` | Existing default `v23.0`; not changed |
| Preview email side-effect keys | `RESEND_API_KEY`, `RESEND_ADMIN_TO_EMAIL`, `RESEND_FROM_EMAIL`; verify isolation without exposing values |

## Exact next workflow and future release order

**Now: BLOCKED, not READY_FOR_RELEASE_APPROVAL.**

1. Two approved GA4 changes and scoped local real-SDK repeat are complete. Verify remaining automatic families without changing their settings, and obtain approved isolated Meta QA access. Keep production website/GTM unpublished and paid traffic prohibited.
2. Isolate Preview operational email/storage/webhook side effects, execute real SDK local privacy checks, then one controlled synthetic Preview claim on the exact candidate with the exact GTM draft. Test false validation, normal/recovery UUID paths, all consent states/admin transition, refresh/Back, no duplicate GA4, actual Meta Test Events/dedup evidence. Record any unverified platform step honestly.
3. Rerun full `npm run verify` and remote checks, freeze candidate HEAD/deployment and exported GTM draft. Present this exact package for NEW release approval. Any code change creates a new candidate requiring relevant repeat QA.
4. Only after explicit production/GTM/canary approval: clean-tree `npm run release:gate`, reviewed PR landing to GitHub main, Vercel deployment traceable to that merge SHA. Preserve main's SEO and unrelated owner changes. Configure production `NEXT_PUBLIC_GTM_ID` only with explicit environment authority, then publish the exact approved GTM version according to the approved order; do not publish an untested later workspace.
5. Run explicitly authorized production SR/EN canary and one safely isolated production test Lead with Ads UUID once, GA4 no-PII/no-duplicate and existing Meta/browser-server verification. Only after canary and separate durable-storage readiness may a paused Search campaign be prepared. No paid activation without a separate owner decision; owner actively reviews keywords/negatives.

## Rollback plan (future actions require authority)

- Preserve baseline main SHA `e7dc38c0b022f42cad7d1ba98d74e88ecbb5ddaf` / its Vercel deployment before landing. Prefer GitHub revert of the measurement merge and normal Vercel main deploy, not destructive Git reset or an old experimental checkout.
- Save previous production env configuration; restore only the authorized changed keys. Removing production GTM ID disables new container loading on new pages; already-open tabs need reload.
- Save the previous GTM live version before publication. Restore that exact version if a later published candidate regresses; if none exists, use an approved empty/safe version rather than claim a nonexistent previous version. Code on inspected main does not load this Web GTM container.
- Record all Enhanced Measurement toggle states before any approved save. Reverting these settings to the original ON/History ON state restores collection behavior but reopens the privacy/duplicate risk; it is not a safe automatic fallback while sensitive-URL QA fails. Keep suspect measurement fail-closed, collect owner decision and rerun QA.
- Never roll back Meta token/dataset, SEO or unrelated code as a tracking shortcut. Keep paid traffic off throughout rollback.

## Blockers by decision boundary

**Measurement:** remaining automatic-family/full hydrated GA4 privacy checks; isolated Meta dataset/access + platform evidence; safe Preview email/storage routing and fresh single-claim end-to-end QA. History + Site search authority and scoped collector proof are complete.

**Release:** measurement gates above, exact candidate/draft freeze and new explicit production/GTM/canary approval. Local passing tests alone do not authorize release.

**Paid traffic:** production canary, durable/atomic production claim persistence (earlier health reported Supabase unconfigured; not changed/reopened here), owner-reviewed keywords/negatives and independent campaign/spend approval. This task creates no database/CRM/offline work.

Automation: nine new regressions run in existing CI on every PR, and the new real-SDK collector-isolation fixture makes local vendor-runtime diagnosis repeatable. Next improvement is scripted scenario/assertion orchestration around this fixture plus an exported-GTM contract artifact; neither a static check nor a mock replaces platform canary evidence.
