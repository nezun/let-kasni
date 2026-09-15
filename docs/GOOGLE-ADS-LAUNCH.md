# Google Ads launch readiness

Status: code-ready on `codex/google-ads-measurement`; production remains disabled until the launch blockers below are cleared.

## Current state

| Component | Before | After | Status |
| --- | --- | --- | --- |
| GA4 | Direct `gtag.js`, consent-gated | Preserved; receives the new safe journey events | Local regression passed |
| GTM | Not present | Optional `NEXT_PUBLIC_GTM_ID`, loaded only after advertising consent | Preview configured; draft not published |
| Google Ads conversion | Not present | `lead_submit` data-layer contract with a claim transaction ID | Blocked on Ads billing setup |
| Consent Mode v2 | Not present | Denied-by-default signals for all four v2 consent types, updated from the existing consent cookie | Code-ready |
| Attribution | Not persisted | First paid touch stored for 90 days after advertising consent | Code-ready |
| Claim payload | No Google attribution | Allowlisted attribution stored in `original_input_snapshot.attribution` | Code-ready |
| Meta Pixel/CAPI | Existing browser/server `Lead` deduplication | Unchanged | Existing checks passed |
| SEO | Existing metadata, canonicals and routes | Unchanged | Existing checks and build passed |

## External configuration completed (2026-09-15)

- Created Google Tag Manager account `LetKasni` and Web container `GTM-WT3B2L8P` for `letkasni.rs`.
- Added `NEXT_PUBLIC_GTM_ID=GTM-WT3B2L8P` in Vercel only for Preview branch `codex/google-ads-measurement`.
- Created draft GTM items `DLV - transaction_id`, `CE - lead_submit` and `Conversion Linker - All Pages`. The container is intentionally unpublished.
- Created Google Ads account `460-732-8439` for LetKasni with billing country Serbia, Serbia Time and EUR. No campaign or spend was activated.
- Linked GA4 property `letkasni` (`534756949`) to Ads account `460-732-8439` with auto-tagging enabled.
- Linked the Search Console domain property `letkasni.rs` to the production GA4 web stream.
- Prepared bilingual Privacy Policy 1.3 and consent-detail wording that explicitly names Google Tag Manager / Google Ads, explains the limited conversion payload and forces a fresh choice through a new consent-notice version. This copy is not in production until the branch is approved and released.
- Ads onboarding now requires a payment profile and payment method before the account UI exposes conversion-action setup. No billing data was entered automatically.

## Actual tracking flow

```text
Google Ads click
-> gclid / gbraid / wbraid and UTM capture after advertising consent
-> first paid touch survives internal navigation
-> claim_start after the user enters the eligibility flow
-> successful POST /claim/submit response
-> lead_submit once, with claim UUID as transaction_id
-> GTM Google Ads Conversion Tracking tag
```

`lead_submit` is never emitted for a button click, validation error, failed request, reused claim or React rerender. A session-scoped key using the claim UUID prevents repeat delivery from the same browser flow.

## Event contract

| Event | Meaning | Google Ads role |
| --- | --- | --- |
| `lead_submit` | A new claim was accepted by the backend | Primary conversion |
| `claim_start` | Visitor meaningfully entered the claim flow | Secondary / observation |
| `phone_click` | Click on a `tel:` link | Secondary / observation |
| `whatsapp_click` | Click on a WhatsApp link | Secondary / observation |

Existing GA4 `begin_checkout` and `generate_lead` events remain in place for continuity. Do not import `generate_lead` as another primary Google Ads conversion.

No name, email, phone, PNR, passport data, document data or legal free text is sent through the new GA4/GTM events.

## Files changed

| File | Purpose |
| --- | --- |
| `.env.example` | Documents the optional GTM Web container variable. |
| `package.json` | Adds the Google Ads measurement check to the existing verification chain. |
| `src/app/layout.tsx` | Sets denied Consent Mode v2 defaults before tags and mounts the shared Google measurement component. |
| `src/app/claim/submit/route.ts` | Sanitizes attribution and accepts it only with server-verified advertising consent. |
| `src/components/google-measurement.tsx` | Updates Google consent, captures attribution, loads optional GTM and tracks contact clicks. |
| `src/components/claim-entry.tsx` | Carries allowlisted campaign parameters into the focused form. |
| `src/components/claim-flow.tsx` | Adds attribution to the primary submission and emits success-only journey events. |
| `src/components/claim-modal.tsx` | Applies the same attribution and success-only event contract to the modal form. |
| `src/components/claim-intake-form.tsx` | Applies the same contract to the legacy inline form. |
| `src/lib/attribution-core.ts` | Pure capture, allowlist, cleanup, first-paid-touch and navigation helpers. |
| `src/lib/attribution.ts` | Consent-gated 90-day first-party persistence in the browser. |
| `src/lib/google-tracking.ts` | Consent-gated event dispatch and claim-ID deduplication. |
| `src/lib/consent.ts` | Clears LetKasni and Google advertising storage when consent is denied or withdrawn. |
| `src/lib/env.ts` | Validates and exposes `NEXT_PUBLIC_GTM_ID` to the client bundle. |
| `src/lib/types.ts` | Adds optional attribution to the existing claim input without breaking callers. |
| `scripts/google-ads-measurement.test.mjs` | Covers capture, sanitization, persistence rules, consent wiring, PII exclusion and exact-once lead delivery. |
| `docs/GOOGLE-ADS-LAUNCH.md` | Launch configuration, blockers and repeatable QA runbook. |

## Attribution contract

The form payload can contain:

```json
{
  "attribution": {
    "gclid": "when-present",
    "gbraid": "when-present",
    "wbraid": "when-present",
    "utm_source": "when-present",
    "utm_medium": "when-present",
    "utm_campaign": "when-present",
    "utm_term": "when-present",
    "utm_content": "when-present",
    "initial_landing_page": "https://letkasni.rs/path-without-query",
    "referrer": "https://referrer.example/path-without-query",
    "captured_at": "ISO-8601 timestamp"
  }
}
```

The server accepts only these fields, caps values at 500 characters and stores them only when the authoritative `lk_consent` cookie grants advertising measurement. URL query strings are removed from landing/referrer values to avoid accidental PII persistence.

For Supabase claims the object is available at `original_input_snapshot.attribution`. For the local fallback it is also present on the claim record. CRM/offline use is intentionally deferred.

## Environment variable

```dotenv
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Use the real Web container ID. Do not put an Ads account ID, conversion label or secret in this variable. With no value or an invalid value, GTM remains disabled.

The existing `NEXT_PUBLIC_GA_MEASUREMENT_ID` remains the only GA4 configuration. Do not add the GA4 Google tag to GTM in this release because that would duplicate page views and events.

## Google Tag Manager setup

1. Create or select one Web container for `letkasni.rs`.
2. Put its exact `GTM-...` ID into `NEXT_PUBLIC_GTM_ID` in Vercel Preview first.
3. Create a Data Layer Variable:
   - Name: `DLV - transaction_id`
   - Data Layer Variable Name: `transaction_id`
   - Version: 2
4. Create a **Conversion Linker** tag:
   - Trigger: `All Pages`
   - Keep default cookie settings.
   - Keep its built-in consent checks; do not add a consent exception.
5. Create a Custom Event trigger:
   - Name: `CE - lead_submit`
   - Event name: `lead_submit`
6. After creating the Google Ads `Lead` conversion action, create a **Google Ads Conversion Tracking** tag:
   - Conversion ID: exact value supplied by Google Ads
   - Conversion Label: exact value supplied by Google Ads
   - Transaction ID: `{{DLV - transaction_id}}`
   - Trigger: `CE - lead_submit`
7. Do not create a GA4 Configuration/Google tag in GTM. GA4 is already loaded directly by the application.
8. Use Preview mode and Tag Assistant. Confirm the Conversion Linker fires on a consented landing page and the Ads conversion tag fires once only after a successful submission.
9. Publish the container only after Preview QA passes.

Google recommends setting consent defaults before measurement commands and updating them on the page where the choice occurs. It also recommends Conversion Linker on landing pages so ad click data survives until conversion. Sources: [Consent Mode setup](https://developers.google.com/tag-platform/security/guides/consent), [Conversion Linker](https://support.google.com/tagmanager/answer/7549390?hl=en).

## GA4 setup

1. Open the correct GA4 property.
2. Go to **Admin -> Product links -> Google Ads links -> Link**.
3. Select the correct Google Ads account and confirm.
4. Keep auto-tagging enabled. Decide separately whether personalized advertising is legally approved; it is not required for lead conversion tracking.
5. In **Admin -> Events**, verify receipt of:
   - `claim_start`
   - `lead_submit`
   - `phone_click`
   - `whatsapp_click`
6. Mark `lead_submit` as a GA4 key event for analytics reporting if desired.
7. Do **not** import that GA4 key event into Google Ads as a second primary conversion while the direct GTM conversion action is active.

The current Google flow requires Analytics Editor/Admin and Google Ads Admin permissions; linked data can take up to 48 hours to appear. Source: [Connect Google Ads to Google Analytics](https://support.google.com/analytics/answer/9379420?hl=en).

## Google Ads setup

1. Go to **Goals -> Summary -> + Create conversion action**.
2. Choose **Conversions on a website** and scan `https://letkasni.rs`.
3. Create a manual website conversion:
   - Name: `Lead - successful claim submit`
   - Category: `Submit lead form`
   - Action optimization: `Primary`
   - Value: `Do not use a value` initially
   - Count: `One`
   - Click-through window: `30 days`
   - Enhanced conversions: `Off` for this phase
4. Choose the Google Tag Manager installation method and copy the exact Conversion ID and Conversion Label into the GTM tag.
5. Go to **Admin -> Account settings -> Auto-tagging** and enable **Tag the URL that people click through from my ad**.
6. Do not use a URL/thank-you-page conversion. The application uses an inline success state, so only the confirmed `lead_submit` event is authoritative.
7. After Tag Assistant QA, confirm the conversion status changes from unverified/inactive to receiving data.

Google's current setup distinguishes manual code/event conversions from URL page-load conversions and recommends transaction IDs for dynamic event tracking. Auto-tagging supplies GCLID and is required for reliable Ads attribution. Sources: [Website conversions](https://support.google.com/google-ads/answer/16560108?hl=en), [Auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en).

## Campaign configuration sheet

| Setting | Value |
| --- | --- |
| Campaign | `SEARCH_RS_CORE` |
| Type | Search |
| Network | Google Search only |
| Search Partners | Off |
| Display | Off |
| Geography | Serbia |
| Location option | Presence: people in or regularly in Serbia |
| Languages | All languages |
| Initial bidding | Manual CPC / controlled bidding |
| Daily cap | EUR 10-15/day |
| Match types | Exact + Phrase only |
| Ad groups | Generic compensation; Air Serbia; Wizz/other airlines |
| Status | Paused until tracking QA passes |

## Launch blockers

Do not start paid traffic until all are cleared:

1. Business/legal review approves the prepared bilingual Privacy Policy 1.3 and advertising-choice wording. The current production wording names Meta but not Google Ads.
2. Finish the Google Ads payment profile. The account is configured in EUR but conversion-action setup remains inaccessible until billing onboarding is submitted.
3. Create the direct Google Ads `Lead` conversion action and configure its GTM tag with the real Conversion ID/Label.
4. Publish GTM only after the Ads tag passes Preview QA, then add the existing GTM ID to Vercel Production.
5. A controlled production submission confirms exactly one Ads conversion and no GA4/Meta regression.
6. The Search campaign remains paused until items 1-5 pass.

## Nice to have

- Add an automated production canary for the data-layer contract after deployment.
- Add consented enhanced conversions after a separate legal/technical review.
- Connect stored attribution to the CRM and downstream revenue in a later phase.

## QA procedure

### A. Organic/direct

Open `/` with no campaign parameters. Confirm the landing page, consent banner and claim flow work unchanged.

### B. Mock Google Ads click

Open:

```text
/?gclid=TEST_GCLID_123&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&utm_term=naknada-test
```

Grant advertising consent, enter the focused flow and confirm:

- `letkasni-attribution-v1` contains the allowlisted values;
- internal navigation preserves the original paid touch;
- the submitted request contains the attribution object;
- rejecting/revoking advertising clears LetKasni and `_gcl*` advertising storage.

### C. Events

In Tag Assistant/Data Layer verify:

- `claim_start` once on meaningful flow entry;
- no `lead_submit` on click, invalid form or failed request;
- `lead_submit` once after HTTP success and never for a reused claim;
- `transaction_id` equals the returned claim UUID;
- phone and WhatsApp links emit their secondary events.

### D. Consent

- Before a choice: all four Google consent types are `denied`; GA4, GTM and Meta are not loaded.
- Analytics only: GA4 loads; GTM and Meta remain blocked.
- Advertising only: GTM and Meta load; GA4 remains blocked.
- Accept all: GA4, GTM and Meta load.
- Revoke: future events are denied and optional first-party tracking storage is cleared.

### E. Regression

- GA4 has one page-view path, not a direct-plus-GTM duplicate.
- Meta browser/server Lead events still share their existing Meta event ID.
- No contact or claim details appear in GA4/GTM event payloads.
- SR and EN claim flows both submit successfully.
- Existing SEO metadata, sitemap and routes remain unchanged.

## QA results (2026-09-15)

Passed locally on `codex/google-ads-measurement`:

- Organic homepage and focused claim flow load with no browser console errors.
- Before consent, all four Google consent signals are denied, no GA4/GTM/Meta script loads and no attribution is stored.
- Analytics-only keeps GTM, Meta and attribution blocked; advertising-only loads GTM and Meta while GA4 stays blocked; accept-all loads all three.
- Revoking optional consent removes the LetKasni attribution object and `_gcl*` storage.
- A mock Google click preserved `gclid` and UTM values through `/proveri-let`; the original paid landing remained the first paid touch.
- `claim_start`, `phone_click` and `whatsapp_click` were observed in the data layer with no contact data.
- A real local claim submission reached the success state and stored the allowlisted attribution alongside claim UUID `265aeb88-f215-43da-8170-18a72e679b2f`.
- The runtime regression test calls the same successful claim ID twice and proves exactly one `lead_submit` reaches GA4 and exactly one reaches the GTM data layer.
- The Serbian form completed end to end; the English landing preserved campaign parameters into `/en/check-flight`.
- Existing workflow, privacy, Meta, email, content, locale, lint and TypeScript checks passed.
- The optimized Next.js production build passed and generated all 331 static pages.

Passed against the real Vercel Preview and GTM draft on `f2d35e2`:

- The branch deployment completed successfully with `GTM-WT3B2L8P` scoped only to that Preview branch.
- Tag Assistant stayed disconnected before advertising consent and connected immediately after accept-all.
- Tag Assistant found the existing direct GA4 tag `G-RVJ906DKVF` and the new GTM container, with no second GA4 configuration tag added through GTM.
- `Conversion Linker - All Pages` fired on the consented preview.
- Live Preview exposed a duplicate journey-event dispatch when both consent categories were granted. Commit `f2d35e2` removed the second push, the regression test now models the real `gtag` data-layer behavior, and Tag Assistant then showed one `claim_start` event on flow entry.
- The mock GCLID/UTM URL loaded successfully and remained attached through the English focused-flow navigation.
- Follow-up deployment `3e536b3` rendered PP 1.3 in Serbian and English, showed “Meta i Google oglasa” in the advertising choice, invalidated the earlier PP 1.2 consent cookie and kept GTM blocked after optional tracking was rejected.

Not yet testable until Google Ads billing onboarding and the release blockers are cleared:

- receipt of the direct Google Ads conversion using its real Conversion ID and Label;
- GA4 DebugView and Google Ads diagnostics after the GA4/Ads account link;
- one controlled production submission after deployment.

## Deferred work

Not implemented in this phase:

- Notion/CRM integration;
- Google Ads offline conversion imports;
- qualified-lead, signed-contract or paid-case feedback;
- enhanced conversions/contact hashing;
- backend/database redesign;
- campaign creation or activation.
