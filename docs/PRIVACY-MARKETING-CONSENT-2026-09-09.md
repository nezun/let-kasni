# Privacy Policy 1.2 and email-offer consent

## Version history

- Privacy Policy 1.1, effective 08.09.2026, remains preserved in Git at production commit `13d64ce652a4b1dcbc559c1a7759676e81a4aeab` (`src/app/privacy/page.tsx` and `src/app/en/privacy/page.tsx`).
- Privacy Policy 1.2 has the static publication date 10.09.2026.
- Privacy Policy versions and marketing-consent text versions are independent. The first email-consent text is version `1.0`, scope `vga_passenger_consumer_rights_v1`, purpose `direct_marketing_email`, controller MB `21873446`.

## Consent and unsubscribe model

- The optional block appears only after a claim has succeeded and only when both public and server feature flags are enabled. It displays and edits a separate subscription email, starts unchecked, and requires an adult self-declaration plus a separate button.
- The claim submit route does not read or write marketing-subscription state. Subscription or email-delivery failure cannot invalidate a claim or block service email.
- A new request is `pending`. A neutral Resend message contains a random 256-bit token. Only a POST from the confirmation page can set `granted`; GET never grants. The database stores an HMAC, not the raw token.
- Unsubscribe is a separate POST, requires no login, sets `withdrawn`, and creates a separate suppression record. A prior confirmation token cannot reactivate a withdrawn record. Re-enrolment creates a new request and confirmation.
- Marketing messages, if approved in a later release, pass through one server function that rechecks eligibility immediately before delivery, adds a visible management link and sends standard one-click unsubscribe headers. Resend is used as a direct delivery API and no provider-side audience/list exists to synchronise; the local suppression record therefore remains authoritative.
- A protected admin action records requests received through the existing mailbox. No public list or status lookup exists.
- The central eligibility function requires the exact controller, purpose, email channel, accepted scope, separately approved product, `granted` status, proof of contact, a live expiry and no suppression. The approved-product registry is intentionally empty, so this change cannot send a sales campaign.

## Retention

- Active consent expires two years after the last explicit confirmation; delivery and opens do not extend it. Eligibility is checked against `expires_at` on every export.
- Evidence and suppression are separate tables. Suppression has an annual review date. Legal-hold fields are available for a specific dispute.
- `expireMarketingRecords()` is idempotent: it expires active records, clears confirmation tokens after 24 hours, removes unconfirmed requests after 30 days, deletes withdrawn/expired consent evidence after five years unless a legal hold applies, and reports suppression records due for annual necessity review. It does not automatically remove a suppression record. There is no existing cloud scheduler in this repository, so no schedule was invented; connect this function only after durable production storage is enabled.
- Existing claim, incomplete-intake and log deletion could not be safely automated from the present data model because the production database is not configured and there is no reliable closed-case/legal-hold classifier. No historical claim or contract data was deleted.

## Service and transfer register

The versioned public registry is `src/lib/privacy-service-registry.ts`, verified against code and provider publications on 09.09.2026.

| Legal entity / service | Purpose and data | Country / remote access | Role | Documented basis and evidence | Checked |
| --- | --- | --- | --- | --- | --- |
| Vercel Inc. | Production hosting, security and delivery; request, response and basic technical data handled by the deployed application | United States and published subprocessor locations; remote access may occur | Processor for hosted application data | Provider DPA and security terms reviewed; production deployment confirmed. Plan-specific DPA applicability and accepted VGA account terms still need owner evidence. | 09.09.2026 |
| Plus Five Five, Inc. / Resend | Transactional delivery and proposed consent/management messages; recipient address, locale, message content and delivery metadata | Primary operations in the United States and published subprocessor locations | Processor for message delivery | Provider DPA, EU SCC provisions and security terms reviewed; transactional sender confirmed. Current DPA acceptance and subprocessor review still need owner evidence before marketing use. | 09.09.2026 |
| Applicable Google contracting entity / Google Analytics | Optional site measurement; consented browser, device, page and event data after payload minimisation | Google and published subprocessor locations; remote access may occur | Processor or service provider according to the applicable account terms, pending account confirmation | Google Ads Data Processing Terms and security/transfer provisions reviewed; consent-gated code confirmed. Contracting entity and terms accepted by the VGA account still need owner evidence. | 09.09.2026 |
| Meta Platforms entity / Meta Pixel and CAPI | Optional advertising measurement; minimised event and browser identifiers after an advertising choice | Not confirmed for this production account | Not declared as active | Code exists, but production credentials and account transfer evidence are absent. Keep disabled. Adult/minor contact ownership cannot be established, so claim-contact hashes were removed from the server event. | 09.09.2026 |
| Supabase entity for the future project | Proposed durable storage of subscription contact, consent evidence, token hashes, status and suppression records | Project region and remote-access locations are not configured or confirmed | Proposed processor | Code adapter and additive migration exist, but no production project or account evidence is configured. It is not declared as an active public recipient and is required before subscriptions can run. | 09.09.2026 |

The application requires `MARKETING_TRANSFER_REVIEW_VERSION=2026-09-09` in addition to all technical feature settings. This value must be set only after account-level contract, recipient, location and transfer-basis evidence is accepted. A provider's public list of possible mechanisms is not treated as proof of the account's actual arrangement.

Actual targeting or monitoring of people in the EEA/EU requires a separate territorial-scope assessment, including whether GDPR Article 27 applies. A Serbian domain, nationality or the carrier's registered office does not decide that question.

## Migration, enablement and rollback

- Additive migration: `supabase/migrations/202609091200_marketing_email_consent.sql`.
- It creates service-role-only subscription, event and suppression tables with RLS and no anon/authenticated grants. It does not alter claims, assignments or historic consent.
- Enable only after the migration, durable Supabase configuration, current Resend sender, transfer review and secret are present. Required flags: `NEXT_PUBLIC_MARKETING_SUBSCRIPTIONS_ENABLED=1`, `MARKETING_SUBSCRIPTIONS_ENABLED=1`, `MARKETING_CONSENT_TOKEN_SECRET`, and `MARKETING_TRANSFER_REVIEW_VERSION=2026-09-09`.
- Rollback: set both feature flags to `0` or remove them. The UI disappears and the API fails closed while claim and service-email flows continue. Because the migration is additive, leave tables in place during rollback to preserve withdrawal evidence.

## Verification and publication blockers

- Automated checks cover exact send eligibility, expiration, suppression, scope/controller/channel mismatch, confirmation-after-withdrawal denial, token GET non-mutation, source-path scrubbing, current cookie-notice gating, claim/marketing isolation and CAPI URL/contact minimisation.
- The current flow only produces a preliminary verdict and places cases into operator review; no code path was found that finally rejects a legal claim with binding effect without operator review.
- Publication is blocked until durable Supabase production configuration and the migration are verified, account-level transfer evidence is accepted, and a local end-to-end double-opt-in/unsubscribe test passes with a test address. Until then the flags must remain off.
- Because Policy 1.2 states that email subscription is currently offered, Policy 1.2 and the disabled feature must ship together only after those blockers are cleared. Do not deploy the Policy text alone while the subscription UI is disabled.
