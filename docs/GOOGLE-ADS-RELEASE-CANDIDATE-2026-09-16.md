# Google measurement release preparation — 2026-09-16

**GOOGLE_MEASUREMENT_READY / RELEASE_BLOCKED_PENDING_ISOLATED_META_QA / DO_NOT_PUBLISH / NO_PAID_TRAFFIC**

## Current candidate and evidence

### Isolated Meta follow-up, 2026-09-17

Owner confirmations for creation terms, separate QA access and the displayed
Non-discrimination policy were completed. Created dataset **LetKasni QA — Preview
only** `2358413618029924` and separate **Employee** system user `61594371304399`
in portfolio `2535168546914445`, without an ad-account connection. After reload,
only QA Pixel View Pixels and linked QA dataset Use events dataset partial access
are assigned; no production assets or Admin permissions. Existing production
CAPI user/app/token are not reused or modified.

The actual blocker is now **QA CAPI application/token access**: Generate token is
disabled; the portfolio has No apps added and Create a new app ID is disabled.
The developer UI requires new personal Meta for Developers registration, with
Platform Terms/Developer Policies acceptance and an upcoming Verify account step.
That new account-wide action was cancelled without acceptance or verification.
Continuation: owner developer activation is now verified complete in All apps.
Prepared LetKasni QA CAPI Preview with no use case/products/permissions in the
existing Letkasni.rs portfolio. Create app opened Meta's mandatory password
reauthentication dialog, subsequently completed by the owner. App creation now
verified: 4666725866879719, correct portfolio 2535168546914445, Unpublished.
Added measurement API use case only to QA app; final QA user app role Test app
only, token request only ads_read with 60-day expiry. Fresh assigned-asset reload
shows only 3 QA assets (app/Pixel/linked dataset), no production/ad-account access.
Owner subsequently completed account verification and Meta issued the first QA
token. Chrome reconnect automatically exposed it in a tool result; it was never
copied, installed or used. Completed the UI Revoke tokens confirmation for QA
Employee 61594371304399 only; no persistent toast/Graph revocation proof captured.
Replacement request started but issuance is not confirmed. Concurrent owner
navigation and a timed-out inventory reset computer use; automatic review blocked
reconnection because initial UI emission could reveal private content/secrets.
Do not bypass that rejection. Owner later confirmed safe reconnect, which succeeded
but still displayed another issued QA token; automatic initial emission exposed
it too. Completed a second QA-only UI revocation; never copied/installed either.
The replacement wizard is prepared with QA app, 60 days, ads_read only, final
Generate enabled. Immediate remaining action is action-time confirmation for
persistent API-token issuance, not account verification or browser reconnect.
Branch-only Vercel Secret form now has all 3 rows prepared but UNSAVED: token
empty, QA Pixel 2358413618029924, QA Test Events code TEST65347. Non-secret values
verified individually and remasked. Keep active CUA binding; never raw-emit token UI.
Subsequent owner approval/code completion issued the replacement. Transferred
using native Copy/Paste directly into masked branch-only Vercel input, never raw
token output/read. Final refreshed list verifies QA token/test-code Secret rows
and public Pixel Config 2358413618029924, all Preview / codex/google-ads-measurement
ONLY. Test code TEST65347. Batch save initially partially saved valid Secret rows;
public Pixel required separate Config save. Production scopes were never saved.
Preview redeploy GimL6AdSbFj4xFSZNvWpjBfAxjcX for e99798f is Ready, cache OFF.
Alias health pins exact SHA/deployment; Supabase/local fallback/provider/subscriptions
and both email booleans OFF, CAPI configured. Denied optional consent + reload has
0 Meta/GTM/GA4 resources; granted consent shows only QA Pixel PageView 2358413618029924
and existing GTM/direct GA4 loaders. Lead/platform processing still unverified.
Subsequent recovered QA session confirmed all four Google default/update consent
signals and allowlisted fake attribution. Real same-page withdrawal FAILED:
all four Google values denied/attribution cleared, but _fbp persisted and one
post-withdrawal www.facebook.com/tr/ request sent SubscribedButtonClick to QA Pixel
2358413618029924. Wrapper/React gating does not explicitly stop loaded SDK;
cookie expiry omits Domain. SDK callback race/cookie attribute mechanism not
independently instrumented; see exact reproduction and minimal fix in QA report.
Reloaded denied Preview: 0 optional resources, left safe. Do not equate this with
same-page revoke PASS. NEED_CODE_FIX; no Lead attempted because pre-claim gate
failed, one-claim allowance UNUSED. No source/GTM/production tracking change.
Fresh local regression 39/39 PASS and frozen GTM export PASS, not platform proof.

Current evidence and continuation:
[isolated Meta QA](META-QA-PREVIEW-2026-09-17.md).
**RELEASE remains BLOCKED**, not READY_FOR_RELEASE_APPROVAL. Existing coordinated
release order, rollback and separate durable/atomic storage gate below remain.

This current snapshot supersedes the earlier access/automatic-event/Preview
blockers recorded in git history. It does not waive the separate Meta platform,
release-approval, production-canary or durable-storage gates.

- PR: https://github.com/nezun/let-kasni/pull/31
- Feature branch: `codex/google-ads-measurement`, targeting main.
- Baseline main: `e7dc38c0b022f42cad7d1ba98d74e88ecbb5ddaf`.
- Measurement implementation: `333bb9d64826926862dd56bf96cdc03bb42c6473`.
- Latest application change: `2903eddd4641a657e09b785bea1b2aef06c70270`,
  Preview-only health email booleans, no secret/address/notification behavior change.
- Tested backend candidate: `ad12ca352bc2a150efaaaf3057a5a70013933530`.
- Health-confirmed Preview deployment: `dpl_4yR44ySVcomCnHyhNvaK56rSP8R5`.
- Preview: https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app
- CI: https://github.com/nezun/let-kasni/actions/runs/35093051509
- Tested candidate verify + both Vercel checks + Preview comments: PASS.
- Fresh local full verify PASS after allowing public font retrieval; the initial
  restricted-network run failed only to fetch Google Fonts. No dependency/font/
  application workaround introduced.
- Current release-note/export-check descendants do not change the tested
  `src`, package manifests or Next config tree. Before landing, verify identical
  application tree, exact final HEAD and its remote checks; never silently
  transfer runtime evidence to a behavior-changing descendant.

Actual test evidence: [final scoped QA](GOOGLE-ADS-FINAL-QA-2026-09-16.md) and
[actual SDK repeat](GA4-SDK-SCENARIOS-AFTER-2026-09-16.json).

One fresh safe Preview claim: `6138eaa7-011f-45a5-9459-239405a1e6fa`.
Tag Assistant event 73 lead_submit; exact DLV UUID; Lead Succeeded and Fired
1 time after hard refresh/Back. One clean direct GA4 Lead hit; existing legacy
generate_lead separate. Fake gclid/UTMs retained across landing -> form.
This proves runtime wiring, not real-paid-click Ads attribution.

## Status controls

| Control | Status | Limit |
| --- | --- | --- |
| GA4_URL_PRIVACY | PASS | History/Search/Outbound/Downloads saved OFF, positive SDK repeat and actual Preview clean Lead |
| GOOGLE_ADS_PREVIEW | PASS | One new backend-confirmed UUID, tag exactly once after refresh/Back |
| META_LOCAL_INTEGRATION | PASS | Actual route/CAPI/browser helpers with external boundaries mocked, matching IDs, no reuse replay |
| META_LIVE_PREVIEW | FAIL pre-claim gate / RELEASE BLOCKED | Runtime isolation and QA PageView verified; same-page withdrawal sends SDK automatic event; no Lead/CAPI/Test Events/dedup test |
| CONSENT_AND_ADMIN | FAIL real Meta withdrawal; local mocks PASS | Google all4 correct, attribution cleared; Meta _fbp persists and SubscribedButtonClick follows withdrawal; actual admin transition pending |
| RELEASE_CHECKS | PASS tested candidate | 39 measurement tests, full verify/build; remote candidate all4 PASS; final descendant checks still must be read |
| RELEASE_APPROVAL | NOT_REQUESTED | Not full READY_FOR_RELEASE_APPROVAL while Meta platform gate remains |
| PRODUCTION_DEPLOY / GTM_PUBLISH | NOT_DONE | No main merge, production env/deploy, GTM publication or production claim |
| PAID_TRAFFIC | NOT_AUTHORIZED | No campaign, budget, spend, keywords or negatives |

## Frozen GTM draft

Fresh Google UI export at **2026-09-16 12:10:26 UTC**:
[GTM workspace export](GTM-WT3B2L8P-workspace2-2026-09-16.json).

- Account `6376980479`, container `264196113` / `GTM-WT3B2L8P`, workspace `2`.
- Export containerVersionId **0** represents the draft, NOT a published version.
- SHA-256: `f776ac715d9a71ec070aaf6a4dc3912faed052ca5a9bda6ef201b1ad38504e1d`.
- Three tags, one custom trigger, one custom variable, five built-in variables
  (ten exported items; five pending Added workspace items).
- Trigger 4: CE - lead_submit, exact custom event `lead_submit`.
- Variable 3: DLV - transaction_id, v2, `eventModel.transaction_id`, no default.
- Tag 5: Conversion Linker - All Pages.
- Tag 8: Google Tag AW-18452620232, Initialization trigger.
- Tag 7: Lead - successful claim submit, ID `18452620232`,
  label `VnU-CKD6zfgcEMjH8t5E`, transaction `{{DLV - transaction_id}}`,
  trigger 4. No GA4/Meta/PII tag introduced.
- Admin export selector showed existing **version 1 Empty Container**, with
  published date. It was not changed; this is the verified rollback version.
- Proposed future version name: **LetKasni PP1.3 + Ads Lead — approved SHA**.
  No new published/numeric release version was created.

Repeat read-only contract validation:
`node scripts/gtm-export-check.mjs [path-to-new-export.json]`.
It checks actual export IDs/label/DLV/event/page-vs-lead triggers and rejects
parallel tags or secret/user-data fields. It never imports or publishes.
Runtime consent/platform evidence remains separate; export alone is not a canary.
Positive export validation PASS; synthetic negative checks also reject a stale
top-level UUID path and an extra GA4 tag. These are separate script checks, not
additional tests in the 39-test measurement CI count.

## Environment and privacy boundaries

| Key/configuration | Value or boundary |
| --- | --- |
| NEXT_PUBLIC_GTM_ID | GTM-WT3B2L8P, existing branch Preview ONLY; production not written |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | G-RVJ906DKVF; existing direct GA4, no duplicate GTM GA4 |
| NEXT_PUBLIC_ANALYTICS_MODE | ga4; preserve architecture |
| Ads customer/action | 460-732-8439 / 7769128224 |
| GTM conversion ID/label | 18452620232 / VnU-CKD6zfgcEMjH8t5E; not website env keys |
| Preview RESEND_API_KEY | Whitespace override ONLY for codex/google-ads-measurement; existing getEnv trims to undefined |
| RESEND_ADMIN_TO_EMAIL / RESEND_FROM_EMAIL | Existing production-only configuration unchanged; no values exported |
| NEXT_PUBLIC_META_PIXEL_ID | Isolated approved QA dataset only for Preview; no production dataset reuse |
| META_CONVERSIONS_API_ACCESS_TOKEN | Secret; approved isolated Preview test access required; never include/copy production token |
| META_TEST_EVENT_CODE | Existing CAPI test facility; not browser Pixel audience isolation |

Fresh Preview health confirms both email booleans false, Supabase/local admin
fallback/Meta CAPI/subscriptions false, provider off. No direct Notion webhook in
submit route. ONE fake claim was submitted; no second test is allowed here.

Shared GA4 stream 14595479044 / G-RVJ906DKVF now has History, Site search,
Outbound clicks and File downloads OFF, saved/reopened. Page loads/Forms/
Scrolls/Video/redaction unchanged. Shared automatic collection behavior changed;
production website code/env did not. Earlier failing captures precede these
settings and are retained as historical evidence.

GA4 display URL is separate from Ads/claim attribution. Safe display URL keeps
only approved campaign values and strips free-form term/content/click IDs/
private paths/referrers/title. Browser URL and consented first-paid-touch
gclid/gbraid/wbraid/UTMs retain the existing attribution contract.
Do not broaden campaign value allowlists without tests.

## Genuine blockers and future release order

**Now: BLOCKED_PENDING_ISOLATED_META_QA**, not full READY_FOR_RELEASE_APPROVAL.

1. Approved isolated QA Pixel/dataset and Preview-only CAPI test access are
   missing. Only active production dataset 2347588039400204 was found in
   business 2535168546914445. Actual browser/server events, acceptance, visibility
   and Meta platform dedup remain unverified. No credentials/access created or
   copied, no production Meta changes. Local integration is PASS, not platform PASS.
2. Once that gate is resolved, validate the saved export against current workspace,
   freeze exact HEAD/deployment/export and request ONE combined owner approval
   for production code/env/GTM/canary. User's latest instruction leaves critical
   risky actions for the report; no implicit production authority is inferred.
3. Only after explicit approval, run clean-tree release gate and land reviewed
   PR to main. main pushes deploy production automatically. Preserve SEO and
   unrelated canonical logo/footer changes; never deploy experimental siblings.
4. Inspected main does not load this GTM container. With explicit authority, publish
   the exact approved compatible export while production still has no GTM ID,
   then add production NEXT_PUBLIC_GTM_ID and land/rebuild the reviewed candidate.
   Recheck the premise before any publication: if live production now loads the
   container, determine compatible coordinated order again. Do not publish first
   under genuine uncertainty. Keep existing direct GA4 and Meta production env.
5. Run explicitly authorized SR/EN production canary and ONE isolated accepted
   production Lead, exact UUID once, safe GA4 and actual Meta evidence.
6. Separately verify/resolve durable atomic production claim storage before paid
   traffic. No database/CRM/offline work is done here. Then prepare paused Search
   campaign only with owner involvement on keywords/negatives; activation/spend
   needs separate authority.

## Rollback plan — future actions require approval

- Preserve baseline main SHA/deployment; prefer GitHub revert and normal main
  Vercel deploy, not reset/force-push or an experimental checkout.
- Restore only explicitly changed production env keys; removal of GTM ID prevents
  new page loading, but already-open tabs require reload.
- Preserve existing **GTM version 1 Empty Container**; republish that exact
  baseline if the approved tracking release regresses. Code and GTM rollback
  are separate; neither touches direct GA4/Meta/SEO.
- Do not automatically restore unsafe original GA4 History/Search/Outbound/
  Downloads ON: that reopens demonstrated privacy/duplicate risk. Fail closed,
  record owner decision and rerun the real SDK privacy checks.
- Keep paid traffic off during rollout and rollback. Do not delete test/customer
  claims or rotate production credentials as a shortcut.

## Repeatability

Existing CI runs 39 measurement + privacy/workflow/email/retirement and all
site/build checks. Actual SDK runner adds optional explicit positive suppression
assertions; GTM export now has a read-only repeatable contract/hash. Existing
tests/dependencies/CI workflow unchanged in this final pass.

Manual/security boundary: approved isolated Meta access and final production
release authority. Next automation improvement: that isolated Meta environment
plus controlled production canary/monitoring after approval, not automatic spend.
