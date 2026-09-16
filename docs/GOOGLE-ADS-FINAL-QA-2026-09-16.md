# LetKasni Google measurement — final scoped QA, 2026-09-16

**BLOCKED / DO_NOT_PUBLISH / NO_PAID_TRAFFIC**

This is a measurement QA report, not a production release or a blanket site audit.
No production deployment/env change, GTM publication, campaign/spend, billing,
Meta configuration/credential change, real customer test or CRM architecture change.
PR: https://github.com/nezun/let-kasni/pull/31, branch `codex/google-ads-measurement`.

## Assets and configuration

These Google/Meta assets were verified earlier in this task. Authenticated UI
access could not be refreshed in the latest pass; do not treat this as a new live
inspection of every setting.

| Asset | Non-secret identity/configuration |
| --- | --- |
| Google Ads | LetKasni, customer `460-732-8439`; auto-tagging ON; existing GA4 link verified earlier |
| GA4 | `letkasni`, property `534756949`, account `392752906`; stream letkasni.rs `14595479044`; `G-RVJ906DKVF` |
| GTM Web | letkasni.rs, account `6376980479`, numeric container `264196113`, `GTM-WT3B2L8P`, workspace `2` |
| Primary online conversion | `Lead - successful claim submit`, action `7769128224`; Primary / One / no monetary value / data-driven / 30-day click |
| Conversion ID / label | `18452620232` / `VnU-CKD6zfgcEMjH8t5E` |

Website uses `NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P`, existing direct GA4
`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RVJ906DKVF`, `NEXT_PUBLIC_ANALYTICS_MODE=ga4`.
Ads ID/label are GTM tag configuration, not invented website environment keys.
Exact successful backend event is `lead_submit`; Transaction ID is v2 DLV
`eventModel.transaction_id`, the claim UUID. Never trigger on submit click/start.
Conversion Linker, AW Google tag, Lead tag, DLV and CE trigger remain five draft
items, **unpublished**. No Enhanced Conversions PII.

## Completed / blocked

| Control | Status | Evidence / limitation |
| --- | --- | --- |
| Ads account ready; auto-tagging; GA4 linked | DONE earlier | Correct account/property, not reverified in latest access-blocked pass |
| Lead action; ID/label obtained | DONE earlier | Actual existing Primary/One website action, no duplicate action |
| Linker; Lead tag; successful-event trigger | DONE draft | Unpublished five-item workspace; exact UUID variable verified earlier |
| History + Site search OFF | DONE | Saved/reopened earlier; fresh actual SDK no search/extra History PV |
| Four consent combinations | DONE local SDK | None/marketing: zero GA4 collector hits. Analytics/both: two manual PV, one UUID Lead; all four consent signals captured |
| Revoke/private-route/return | DONE local SDK | Opt-out true while denied/private, no extra private hit; clean public PV on reconsent |
| GA4 duplication/privacy | PARTIAL | Manual initial/SPA/Lead clean and once; automatic outbound/download privacy FAIL |
| Hydrated actual backend form | DONE local only | One fake claim, isolated disk storage, external email/Meta/Supabase/provider disabled; consent denied |
| Existing Meta regression | DONE local integration | Actual route/CAPI/browser helpers with mocked external boundaries; matching IDs, no reused-claim replay |
| Real Meta platform dedup | BLOCKED | Only active production dataset found; no approved isolated QA access. No token copied/created |
| Fresh Vercel Preview / Tag Assistant | BLOCKED | Preview `/api/health` redirects to Vercel login/SSO; task-scoped native Chrome attempts time out |
| Fresh Preview Lead tag exactly once | BLOCKED | Zero new Preview claims for current candidate. Prior `838c996` positive evidence is historical |
| GTM published / ready to publish | NOT DONE | Do not publish: fresh Preview and privacy gates are still open |
| Local checks | DONE | Full verify passed: 39 measurement, 12 workflow, 12 privacy, 5 email, 8 retirement; content/links/benchmark/locales, lint, TS/build |

## Test evidence

### Actual Google SDK, collector blocked

At `2026-09-16T11:21:31.182Z`, repeatable runner executed all four consent modes
plus revoke/private/return using actual compiled tracking modules and real
`gtag/js?id=G-RVJ906DKVF`. Local URL:

`http://127.0.0.1:3016/?qa_consent=analytics&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&q=TEST_PRIVATE_MARKER_20260916&email=TEST_PRIVATE_MARKER_20260916%40example.com`

CSP and transport hooks precede SDK loading; no-referrer blocks fake private
URLs in script request referrers. No marker was sent to Google; no Ads/Meta SDK,
application backend/email or real identity was used. SDK batches were parsed
line-by-line after the actual flush delay. No cookie/client/session IDs retained.

Observed `page_view` twice and `lead_submit` once with the same fake UUID called
twice; separate deliberately requested legacy `generate_lead` is not the Ads
conversion. `scroll`, static local `form_start`/`form_submit` metadata clean;
input marker not captured. Positive reserved `.invalid` outbound/file links
produce **click and file_download with the private marker in link_url/file_name**.
This is a synthetic demonstrated collection risk, not evidence that real
customer data was sent. Video embeddings are absent in current source, not a
positive video measurement validation.

Primary proof: [SDK scenarios](GA4-SDK-SCENARIOS-QA-2026-09-16.json).
Supporting [automatic-family capture](GA4-SDK-AUTO-EVENTS-QA-2026-09-16.json) and
[earlier after-two-settings capture](GA4-SDK-ISOLATED-QA-AFTER-2026-09-16.json).

### Hydrated local form, denied consent

New empty QA directory `/private/tmp/letkasni-local-qa.oma3Cv`, production build
served on localhost:3017, no existing local claims reused. Health confirmed
Supabase/Meta CAPI off, provider off, marketing subscriptions off, both Preview
email booleans false. No direct Notion/CRM webhook in actual submit route.

Start URL:
`http://127.0.0.1:3017/?gclid=TEST_GCLID_123&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&utm_term=test-google-ads`

Rejected optional cookies; navigated to `/proveri-let?step=2&issue=delay`.
Incomplete/invalid contact state disabled submit and produced no Lead. ONE fake
claim POST `/claim/submit` returned 200 and inline successful acceptance message.
At `2026-09-16T11:30:30.201Z`, isolated file contained exactly one claim UUID
`bfe49b2a-4fcb-403d-b667-466c9b179fb2`, still one after refresh/Back. Zero tracking
scripts/resources/dataLayer events on the final page, as expected with consent
denied. Attribution parameters disappear from navigation URL; marketing-denied
attribution must not be persisted. This does **not** verify marketing-granted
Vercel attribution or a live GTM conversion. Screenshot inspected locally:
`.gstack/qa-reports/screenshots/local-claim-accepted.png` (only obvious fake data).
No local-app console error observed; Vercel SSO errors are separate historical
browser log entries, not application errors.

## Minimal remaining operational actions

1. Restore task-scoped authenticated Google/Vercel browser access. Broad private
   Gmail/CRM capture was rejected; no bypass, protection disabling or cookie/token
   extraction. This is an access blocker, not an instruction to weaken security.
2. In the same GA4 stream, set only **Outbound clicks + File downloads OFF** and
   repeat the positive SDK scenarios. History/Search are already OFF. Keep clean
   tested Forms/Scrolls and unrelated settings unchanged. Latest owner authority
   covers safe remaining fixes, but this setting has **not** been saved.
3. On the latest PR Preview verify `/api/health` exact deployed SHA and Preview
   email booleans, Supabase/Meta/provider/subscription configuration. False email
   transport plus isolated storage is needed before a new fake claim; booleans
   do not certify all downstream routing when transport is enabled.
4. Complete fresh GTM Preview / Tag Assistant with one isolated fake successful
   claim, exact UUID Lead once, failed validation/no Lead, granted attribution
   across internal navigation, four consent states, refresh/Back and clean GA4.
5. Real Meta platform QA requires approved isolated dataset/secure test access.
   Creating persistent credentials/access or copying production token is risky
   and is left unexecuted. `META_TEST_EVENT_CODE` alone does not isolate browser
   Pixel data. Production dataset `2347588039400204` is not a QA dataset.
6. Freeze current PR SHA/Preview and tested GTM draft only after these gates pass.
   Production website deploy/GTM publish/canary remain expressly prohibited by
   this task; do not transfer earlier release approval to an untested candidate.

**Next exact state: BLOCKED_PENDING_ACCESS_AND_PREVIEW_QA**, not
READY_FOR_PR31_DEPLOY / READY_FOR_GTM_PUBLISH / READY_FOR_PRODUCTION_CANARY /
READY_TO_BUILD_PAUSED_SEARCH_CAMPAIGN. No demonstrated additional tracking-code
fix is required yet for the two Google automatic-family issues; fix shared
settings first and retest. Durable production storage remains a separate paid
launch blocker; no database/CRM work was performed here.

## Repeatability / automation

Two new health-contract tests run in the existing unchanged CI, bringing
measurement checks to 39. Real SDK scenario orchestration is now reusable:
start `node scripts/ga4-sdk-isolated-fixture.mjs`, then run
`LETKASNI_QA_BROWSE_BINARY=/absolute/path/to/existing/browse node scripts/ga4-sdk-browser-qa.mjs`.
Use only the isolated owned browser; never import real cookies or deploy the
fixture. Automatic-family FAIL remains explicit even when consent assertions
pass. Run `npm run verify` for local regression/build verification.

Authenticated settings, protected Preview and Meta platform evidence still
require safe access/human security approval. Next automation improvement: a
secure isolated Preview fixture/environment plus GTM draft export contract,
so future canaries repeat without touching production customer operations.
