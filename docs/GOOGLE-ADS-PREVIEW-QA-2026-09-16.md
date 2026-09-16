# Google Ads Preview QA — 2026-09-16

Decision: **NEED_CODE_FIX / DO_NOT_PUBLISH**. No production code deploy, GTM publish, campaign, budget, keywords, billing or Meta changes were performed during this QA pass.

## Assets and configuration

| Asset | Verified configuration |
| --- | --- |
| Google Ads | LetKasni, customer `460-732-8439` |
| GA4 | `letkasni`, property `534756949`, measurement `G-RVJ906DKVF` |
| GTM | LetKasni / letkasni.rs, Web container `GTM-WT3B2L8P` |
| Lead action | `Lead - successful claim submit`, action `7769128224`, conversion ID `18452620232`, label `VnU-CKD6zfgcEMjH8t5E` |
| Ads settings | Primary, One, no monetary value, 30-day click window, data-driven; Enhanced Conversions not configured |
| Existing link | GA4 linked to Ads with auto-tagging enabled on 2026-09-15; Google link-created notification visible during this pass |
| GTM draft | Conversion Linker All Pages; Ads Google tag Initialization All Pages; Lead conversion custom-event trigger `lead_submit`; `DLV - transaction_id` v2 |
| Vercel env | `NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P`, Preview-only feature-branch scope; not added to Production |

Asset creation/settings above were performed in earlier setup passes and recorded in the launch runbook. This pass freshly verified the active three Google tag IDs, actual Preview deployment commit, successful Lead tag, consent and payloads.

## Test environment

- PR: https://github.com/nezun/let-kasni/pull/31 — open; all four GitHub/Vercel checks passed before the test.
- Preview health: commit `4118a80fe009c3cda0ec12aa59a13fba4733c92b`, deployment `dpl_8UG9QErNEzPiQB2o4uVL1TxHG2N1`.
- Test URL: https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app/?gclid=test-letkasni-final&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE
- Internal navigation retained those parameters on `/proveri-let`.
- One submission only: obvious TEST/QA names, example.com email, no telephone, no real customer data. Fake route BEG–LHR, direct, Air Serbia, 2026-09-15.
- Test claim UUID: `2f74985d-5921-42c8-9bd8-87d8498a802c`.

## Live evidence

| Check | Result / evidence |
| --- | --- |
| Site / validation | Page and flow loaded normally; continuing without a problem selection displayed the required-choice error, without creating a Lead |
| Successful backend acknowledgement | Inline `Podaci su primljeni. Javićemo Vam se sa rezultatom provere.` appeared; submit disabled |
| Journey | `claim_start`, then one `lead_submit` after success; existing `generate_lead` also observed |
| Ads tag | `Lead - successful claim submit` → Google Ads Conversion Tracking → `Succeeded`; summary `Fired 1 time` |
| Refresh / Back | Reload reset the form to step 1; Back returned to the landing page. Lead tag still `Fired 1 time`; no second Lead |
| Browser dedup | `sessionStorage['letkasni-google-event:lead_submit:2f74985d-5921-42c8-9bd8-87d8498a802c']` = `1` |
| Consent Mode v2 | All four on-page defaults Denied; after accept-all, updates/current states Granted at `lead_submit` |
| Linker / Ads base | Fired on consented pages, not on the Lead event; summary totals 4 before reload/back, 6 after those page loads |
| Attribution | `letkasni-attribution-v1` stored fake gclid and google/cpc/SEARCH_RS_CORE plus query-stripped initial landing URL and capture timestamp; persisted through navigation/reload/back |
| GA4 | One direct `G-RVJ906DKVF` destination; one `lead_submit` hit in Hits Sent, UUID in `ep.transaction_id`; no GTM GA4 tag introduced |
| Contact PII | No name, email or phone appeared in inspected GA4 Lead parameters; Enhanced Conversions remained off |
| Diagnostics | Tag Assistant Console `(0)` |
| Transaction ID — FAIL | GTM `DLV - transaction_id` returned `undefined`, while the Lead data-layer model held UUID under `eventModel.transaction_id` |
| Meta — NOT VERIFIED | Browser `fbq` absent and no `meta-pixel` inline/script; Preview health `metaCapiConfigured=false`. Production health `metaCapiConfigured=true`; no production Meta change |
| Persistence — BLOCKED | Both Preview and Production health `supabaseConfigured=false`; durable/atomic production dedup remains outside this task |
| URL privacy — INCOMPLETE | GA4 Lead hit `dl`/`dr` retained full fake query. No contact PII was sent in this test, but query leakage protection is not proven |

Only the browser's attribution store was inspected. Backend durable attribution persistence was not independently verified, and no database/CRM access or work was performed. Tag Assistant success proves tag execution, not an attributed Google Ads report entry; the click ID was fake and there was no paid click.

## Required follow-up

1. Align the GTM transaction-ID contract across both normal `gtag` and Ads-only recovery paths; retain exactly one message per conversion. Add an automated regression that checks what the actual GTM variable resolves, not just emitted parameters.
2. Audit GA4 query/referrer handling with synthetic PII markers and preserve direct GA4 architecture.
3. Repeat one controlled positive Preview test after the fix, verifying the Ads tag's resolved transaction ID and no duplicate. Obtain approval for the additional disposable test; this pass already consumed the requested one submission.
4. Verify Meta in a separately approved test-safe configuration. Do not copy production tokens or enable real PII.
5. Keep GTM unpublished until all measurement QA gates pass. Any website production deploy requires authority under the latest request.
6. Before paid traffic, resolve durable production claim storage and run the production canary. Keywords/negatives remain owner-reviewed; no campaign exists from this task.

Repeatability: the existing automated Google Ads tests remain useful but missed the GTM field-path contract. Next automation improvement is an integration check that resolves the exported GTM conversion transaction variable against real `gtag`/recovery message shapes.

Re-run after documenting this QA: Google Ads 25/25 passed; privacy 12/12 and PP 1.3 SR/EN passed; `meta:check` passed its source-presence check but explicitly reported Meta env unconfigured/runtime disabled. `git diff --check` passed. These checks do not clear the live Preview failures above. Only documentation was edited locally in this QA pass; no commit/push or code deployment was performed.
