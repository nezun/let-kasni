# LetKasni production measurement release — 2026-09-17

**RELEASE + PRODUCTION LEAD CANARY DONE_WITH_CONCERNS / NO_PAID_TRAFFIC**

## Done

- Owner-approved PR31 merged12:23:08UTC from exact1ccabac to main
  c37fdfd98b0f7704b679507d33b8f209e3f98ed4. Trees match exactly; application
  source unchanged from isolated Preview4b20548.
- Canonical Vercel let-kasni dpl_F4P36d2dinWNPgFTm7qgMgDEn32c Ready; public
  /api/health matches. SR/EN PP1.3 and consent-aware measurement deployed together.
- GTM-WT3B2L8P version2 Live, same five tested Ads-only draft items; version1
  Empty Container rollback retained. Production had no GTM before publication.
- Added ONLY production Config NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P, UI save/scope
  confirmed. Existing direct GA4 and Meta Pixel/CAPI/prod credentials preserved;
  never copied isolated QA Pixel/token/testcode/Resend override to production.
- Full clean-feature gate and clean-main production gate PASS. Main verify and
  both Vercel statuses SUCCESS. Google39/Meta11 plus existing workflow/privacy/
  email/SEO/content/locales/lint/TS/build195 checks PASS.
- Production read-only health/UI checks over approximately10minutes: SR/EN,
  both form-entry routes, all legal routes200; invalid submit400 creates no claim.
  PP1.3/Ads disclosure, sitemap158, mobile375px no overflow and no observed
  console errors. Settled load SR473ms/EN481ms. Not a claimed full per-minute
  continuous five-page monitor.
- Default consent all4Denied/optional resources0; grant actual GTM/GA4/AW/Meta
  SDK, all4Granted. Existing native Chrome Pixel2347588039400204 PageView
  transport confirmed. Headless same-document reset/reject all4Denied and
  attribution removed, Meta-after0; no positive loaded-cookie headless assertion.
- Admin/login denied-state tracking resources0; no login/CRM access. Granted
  private-route gate and loaded-cookie same-page revoke passed isolated Preview,
  not misreported as a separate positive granted-production gate.
- Fake production attribution preserved landing->focused form; invalid route/
  contact/privacy keeps buttons disabled and lead_submit0; EN navigation works.
- Canonical user logo/footer edits preserved and excluded; no live ad/budget/
  keywords/negatives, Enhanced Conversions PII, CRM/database change or SEO rewrite.

## Production successful Lead VERIFIED — explicit new owner approval

Owner explicitly answered "da" to the specific production TEST submission question,
acknowledging TEST claim, notification emails and Google/Meta effects. This resolved
the earlier Preview-only safety rejection; no action bypassed that restriction.
ONE normal native-Chrome form submission used obvious TEST data, existing controlled
kontakt address and blank phone. The single production allowance is now USED.

- Test URL: https://letkasni.rs/?gclid=TEST_GCLID_PROD_CANARY_20260917&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&utm_term=test-production-canary
- Backend acknowledgment 2026-09-17T12:51:51.960Z: HTTP200, oktrue, reusedfalse,
  privacytrue, calls1; claim UUID73ab9709-867a-4564-942a-a5c32133a558.
  Attempt584d8119-ff3d-443b-89ea-c24e5741216a. Fake gclid/UTMs survived normal
  landing-to-form navigation and are in the actual accepted backend payload.
- All four consent signals Granted at submission; pre-submit lead_submit0.
  Exactly ONE lead_submit with transaction_id equal to claim UUID.
- Exactly ONE actual www.googleadservices.com/pagead/conversion/18452620232/
  resource, label VnU-CKD6zfgcEMjH8t5E, oid equal to claim UUID.
- Actual production Pixel2347588039400204 Browser Lead exactly ONE;
  event ID43956832-de43-4cf2-aaaf-b2d0dda47322. Exact production deployment's
  /claim/submit runtime log confirms Meta Lead CAPI delivery senttrue, matching
  claim/event IDs. This is successful transport plus matching-ID evidence, not a
  newly inspected production-platform Deduplicated status. Preview platform proof
  below remains separate; production Meta test-code/credentials were not changed.
- Direct GA4 G-RVJ906DKVF observed lead_submit1 and existing generate_lead1;
  no obvious TEST contact markers/contact keys in inspected resource URLs.
  One batched collector resource has no en URL field; page_view body/count was not
  inspected. Two GA4 config entries were observed, so no blanket single-loader or
  complete page-view duplication/PII-body assertion. GTM still has no GA4 tag.
- Refresh: new document claim requests0 / lead_submit0 / AdsLead0 / MetaLead0.
  Back: homepage requests0/Lead0. Forward: focused form requests0/Lead0/AdsLead0/
  MetaLead0. Session UUID guard stayed "1" throughout. No second submission.
- Runtime confirms admin/user TEST emails accepted by Resend, skippedfalse,
  attempts1 each; this does not prove inbox delivery. IDs
  01a0af6c-659d-70c8-83d3-5c2ef3357e59 / 01a0af6c-65a1-76e9-9e3d-45d70436e617.
- Final native same-document privacy reset/reject: all four Denied,
  attributionRemovedtrue, allowlisted optional cookie names[], current Lead0.
  Prepared flow abandoned normally; actual TEST claim retained, not deleted.

Actual earlier isolated Preview claim977a3a9d-8f16-4c9a-8fc7-5bff95fca1be passed
HTTP200/reusedfalse/AdsSucceededFired1/no-refresh-back-forward-replay; sameMetaID
0fd4b85a-22e5-453c-8dab-1cb794414449 BrowserProcessed/ServerDeduplicated and
runtimeCAPIsenttrue (Graph2xx). That is Preview proof, NOT production proof.
Fake gclid proves runtime wiring, not attribution to a real paid click.

## IDs/configuration

| Asset | Public ID |
| --- | --- |
| Google Ads LetKasni | 460-732-8439 |
| Native Primary Lead action | 7769128224 |
| Conversion ID / Label | 18452620232 / VnU-CKD6zfgcEMjH8t5E |
| GA4 letkasni property / stream | 534756949 / 14595479044 |
| Direct GA4 Measurement ID | G-RVJ906DKVF |
| GTM account / Web container | 6376980479 / 264196113 |
| GTM public container / Live version | GTM-WT3B2L8P / 2 |
| Production public env added | NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P |

Auto-taggingON, GA4-Ads link and Primary/One/no-value/data-driven30day action
were previously UI-verified, not changed or newly account-UI-retested in release.
Enhanced Conversions remainOFF; directGA4 not duplicated as a GTM configuration.
Two debugGA4 loader/config entries noted in Preview; observed events not
duplicated. No blanket single-loader or fully inspected network-body claim.

## Other real blockers

- **Paid-launch hard gate:** production health supabaseConfiguredfalse. Ephemeral
  /tmp claims cannot guarantee durable atomic UUID/idempotency. REQUIRE_SUPABASE=1
  gate cannot pass. No DB/CRM/credentials architecture work in this task.
- **Separate pre-existing GSC automation:** Sitemap Submit run35220907307 fails
  Google OAuth refresh400 invalid_grant. Failed on previous e7dc38c too; public
  sitemap200/158 remains healthy. Needs owner reauthentication, not SEO rewrite.
- Keywords/negative keywords remain owner-reviewed future work. No campaign
  build/activation authorized here. Measurement canary is complete; paid readiness
  remains NEED_CODE_FIX for durable atomic storage, outside this task's authority.

## Repeatable gates and rollback

CI automatically runs Google39/Meta11 with existing full verify. GTM read-only
export checker enforces3Ads-onlytags/1trigger/1DLV and frozen export hash
f776ac715d9a71ec070aaf6a4dc3912faed052ca5a9bda6ef201b1ad38504e1d.
Production gate pins live GitHub SHA and both locales/validation. Next automation
improvement is an isolated synthetic canary plus durable persistence, not spend.
Manual boundaries: DB approval/credentials,
GSC reauthentication and later keyword/negative review.

No rollback needed. If a demonstrated critical regression appears, prefer GitHub
revertc37fdfd and normal main/Vercel deploy; production GTM key and GTM version1
rollback are separate. Preserve Meta credentials/GA4 safe settings/SEO/claims.
