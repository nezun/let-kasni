# Changelog

All notable changes to LetKasni are documented in this file.

## [0.2.0] - 2026-09-15

### Added

- LetKasni can now measure successful Google Ads leads with consent-aware GTM, Consent Mode v2 and a claim transaction ID that prevents duplicate conversions.
- Paid-click attribution can be retained for 90 days after advertising consent and attached to the claim audit snapshot without exposing contact or document data to Google.
- Serbian and English Privacy Policy 1.3 pages now explain Google Tag Manager, Google Ads measurement and the limited conversion payload.
- A repeatable launch and QA runbook documents the completed Google setup, production checks and blockers that must remain closed before paid traffic starts.

### Changed

- Optional GA4, Google Ads and Meta measurement now stays disabled on all admin routes, including client-side navigation into claim records.
- Revoking advertising consent clears Google/Meta cookies, stored attribution and conversion-deduplication state.
- An interrupted submission can recover its Ads conversion only when the server matches the same per-attempt UUID; historical duplicate claims remain excluded.

### Fixed

- Prevented duplicate journey events when analytics and advertising consent are both enabled.
- Hardened attribution against foreign origins, credential-bearing URLs, stale or future timestamps, control characters and oversized values.
- Preserved exact-once conversion behavior when browser session storage is unavailable and removed duplicate attribution data from normalized claim snapshots.
