# LetKasni Google measurement — final scoped QA, 2026-09-16

**GOOGLE_ADS_PREVIEW=PASS / GA4_URL_PRIVACY=PASS / RELEASE=BLOCKED / DO_NOT_PUBLISH / NO_PAID_TRAFFIC**

Google-side measurement is configured and a fresh protected Vercel Preview Lead
was verified. The complete release remains blocked on isolated Meta platform QA.
This is not approval to merge main, deploy production, publish GTM or activate ads.

PR: https://github.com/nezun/let-kasni/pull/31
Branch: `codex/google-ads-measurement`.

## Assets and configuration

GA4 stream/settings and GTM draft/runtime were freshly inspected in Chrome in
this pass. Ads account/action/auto-tagging/link below were verified earlier in
this same task; they were not changed or independently reverified today.

| Asset | Non-secret identity/configuration |
| --- | --- |
| Google Ads | LetKasni, customer `460-732-8439`; auto-tagging ON; existing correct GA4 link |
| GA4 | `letkasni`, property `534756949`, account `392752906`; stream letkasni.rs `14595479044`; `G-RVJ906DKVF` |
| GTM Web | letkasni.rs, account `6376980479`, numeric container `264196113`, `GTM-WT3B2L8P`, workspace `2` |
| Primary conversion | `Lead - successful claim submit`, action `7769128224`; Primary / One / no monetary value / data-driven / 30-day click |
| Conversion ID / label | `18452620232` / `VnU-CKD6zfgcEMjH8t5E` |

Website uses `NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P`, existing direct GA4
`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RVJ906DKVF`, `NEXT_PUBLIC_ANALYTICS_MODE=ga4`.
Ads ID/label belong in GTM, not invented website environment keys.
Exact successful backend event: `lead_submit`. DLV v2:
`eventModel.transaction_id`, the accepted claim UUID.
The five-item GTM workspace is **unpublished**. No Enhanced Conversions PII.

## Status controls

| Control | Status | Evidence / limitation |
| --- | --- | --- |
| Ads account; auto-tagging; GA4 link | DONE earlier | Existing correct assets; no duplicate account/property/action |
| Lead action; Conversion ID/Label | DONE earlier | Primary/One website action with neutral value |
| Conversion Linker; Google tag; Lead tag | DONE draft | Freshly inspected; actual Preview execution; no GA4 tag in GTM |
| GA4_URL_PRIVACY | PASS | Four automatic URL-bearing settings saved OFF; positive real-SDK suppression repeat and actual clean Preview Lead hit |
| CONSENT_AND_ADMIN | PASS local SDK/integration | All four consent modes + revoke/private/return; actual Preview Lead default Denied/update+current Granted for all four signals |
| GOOGLE_ADS_PREVIEW | PASS | One fresh backend-confirmed fake claim; UUID resolved as string; Lead tag Succeeded/Fired 1 time after hard refresh + Back |
| GA4 duplication checked | DONE scoped | One direct destination and one Lead hit; separate legacy generate_lead retained, not a second Primary Ads conversion |
| META_LOCAL_INTEGRATION | PASS | Actual route/CAPI/browser helpers tested with external boundaries mocked; matching event IDs; no reuse replay |
| META_LIVE_PREVIEW | BLOCKED | No approved isolated Pixel/dataset + Preview CAPI test access; production Meta deliberately not reused |
| Preview email isolation | DONE | Preview-branch-only empty-value override; fresh health confirms email transport and admin recipient false |
| RELEASE_CHECKS | PASS tested candidate | 39 measurement, 12 workflow, 12 privacy, 5 email, 8 retirement; content/links/benchmark/locales/lint/TS/build; all four remote checks |
| RELEASE_APPROVAL | NOT_REQUESTED | Full package not ready while isolated Meta platform gate remains |
| PRODUCTION_DEPLOY / GTM_PUBLISH | NOT_DONE | Expressly prohibited; draft ready but not yet release-cleared |
| PAID_TRAFFIC | NOT_AUTHORIZED | No campaigns/budgets/keywords/negatives/spend |

## Fresh Vercel Preview evidence

Test URL:

`https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app/?gclid=TEST_GCLID_FINAL_20260916&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&utm_term=test-google-ads`

At `2026-09-16T12:02:25.532Z`, authenticated `/api/health` confirmed:
- SHA `ad12ca352bc2a150efaaaf3057a5a70013933530`;
- deployment `dpl_4yR44ySVcomCnHyhNvaK56rSP8R5`;
- Supabase/local-admin fallback/Meta CAPI/marketing subscriptions false;
- flight provider off; GA4 mode;
- Preview email transport false; admin claim email recipient false.

Before this deployment a branch-specific `RESEND_API_KEY` whitespace override
was saved ONLY for Preview branch `codex/google-ads-measurement`.
Existing `getEnv` trims it to undefined, disabling both notification transports.
No production secret was read, rotated, copied or changed. No direct Notion/CRM
webhook exists in the actual submit route. Preview fallback storage is not durable
production storage and is not represented as such.

One obvious fake claim only: QA / TEST ONLY, reserved example.com test address,
no phone, reservation/documents or real passenger details. The disabled submit
button remained disabled for an invalid email; that state created no Lead.
Normal landing -> focused form navigation retained the fake gclid and UTMs in
the URL. Consent was granted through the existing banner, not overridden.

Backend UI acknowledgement: “Podaci su primljeni. Javićemo Vam se sa rezultatom provere.”
GTM event **73 lead_submit**: DLV transaction string
**6138eaa7-011f-45a5-9459-239405a1e6fa**.
Lead tag **Succeeded**; summary **Fired 1 time**, including after hard refresh
and browser History -> Back. Linker and AW Google tag fired once per page load
(seven loads during this debugging session), not on Lead alone.
Tag Assistant Console **(0)**. No GTM configuration changes were needed.

Consent at Lead: `ad_storage`, `analytics_storage`, `ad_user_data`,
`ad_personalization` all default **Denied**, update and current **Granted**.
Four individual consent permutations/private/revoke cases are positively
covered by the isolated SDK/integration tests, not claimed as four separate
fresh Preview submissions.

Actual GA4 hit details: exactly one `lead_submit` to `G-RVJ906DKVF`,
with the same UUID, `gcs=G111`, form locale sr and provider_skipped_budget.
Page location:
`https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app/proveri-let?utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE`.
Referrer: Preview origin + /. Safe title: `LetKasni | /proveri-let`.
No test name/email/phone, fake click ID or free-form term in this inspected hit.
One separate existing `generate_lead` hit is intentional legacy tracking.
No duplicate GA4 destination introduced.

Deployment precision: the connected popup's Vercel toolbar showed a different
injected toolbar deployment reference. The authenticated backend health above
pins the serving alias; `git diff 2903edd..ad12ca3 -- src package.json package-lock.json next.config.ts`
is empty. Application tracking/source/config tree has therefore not changed
between those descendants. Do not infer deployment identity from the toolbar.

Fake gclid + Tag Assistant Succeeded proves wiring/runtime execution, NOT a
conversion attributed in Ads to a real paid interaction. No own ad was clicked.

## GA4 shared setting fix and actual SDK repeat

Saved/reopened stream 14595479044: History changes OFF, Site search OFF,
Outbound clicks OFF, File downloads OFF. The last two were safely saved in
this pass under the owner's authority to finish remaining fixes.
Page loads, Forms, Scrolls and Video remain unchanged ON; redaction unchanged.
These are shared GA4 settings, so production measurement behavior changed for
those automatic families; **production website code/environment did not change**.

At `2026-09-16T11:51:35.911Z` the existing real SDK fixture repeated all four
consent modes and revoke/private/return: PASS. Positive form/input-marker checks
clean. Actual positive outbound/file clicks now produce zero corresponding hits:
**PASS_SUPPRESSED**, asserted by optional `--expect-auto-link-events-off`.
Collector transport was blocked before SDK loading: no private marker sent to
Google. Video embeds absent in current source; no positive video test claimed.

Current proof: [after-settings SDK scenarios](GA4-SDK-SCENARIOS-AFTER-2026-09-16.json).
Earlier failing captures are historical before-settings evidence, not open failures.
Earlier denied-consent localhost and older Preview canaries remain historical;
the current fresh Preview claim above supplies the new Google runtime evidence.

## Genuine remaining blockers / exact next state

**BLOCKED_PENDING_ISOLATED_META_QA**, not full READY_FOR_RELEASE_APPROVAL.
The Google-specific measurement gate is complete; no demonstrated additional
Google code fix is required.

1. Meta live QA needs an approved isolated QA Pixel/dataset and Preview-only CAPI
   test access. Only active production dataset `2347588039400204` was found in
   business `2535168546914445`. No new persistent access/token was created;
   no production Meta dataset/token/campaign was changed. `test_event_code`
   alone does not isolate browser Pixel audience events.
2. Actual [GTM draft export](GTM-WT3B2L8P-workspace2-2026-09-16.json) is now saved
   and verified with `node scripts/gtm-export-check.mjs`; draft version 0 is not
   published. Existing Empty Container version 1 was verified in the selector.
   After the Meta gate: freeze final candidate and revalidate export, seek ONE explicit
   release approval for code/env/GTM/canary together. None is executed here.
3. Before paid traffic, durable/atomic production claim storage must independently
   be verified/resolved in the separate programmer workstream. No database work
   or claim deletion happened here. Production canary and owner-reviewed
   keywords/negatives remain later gates.

## Repeatability / automation

39 measurement checks run in unchanged CI. Repeat privacy QA with the existing
isolated owned browser, no real cookies:

`node scripts/ga4-sdk-isolated-fixture.mjs`, then
`LETKASNI_QA_BROWSE_BINARY=/absolute/path/to/existing/browse node scripts/ga4-sdk-browser-qa.mjs docs/GA4-SDK-SCENARIOS-AFTER-2026-09-16.json --expect-auto-link-events-off`.

Never deploy the fixture. Stop its local server/browser afterwards.
Read-only GTM export validation: `node scripts/gtm-export-check.mjs [export.json]`.
Run `npm run verify` for regressions/build. Future improvement: approved isolated
Meta Preview environment and an exported-GTM contract artifact; mock/static checks
must never substitute for real platform acceptance/dedup evidence.
