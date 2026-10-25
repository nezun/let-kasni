# Changelog

All notable changes to LetKasni are documented in this file.

## [0.2.2] - 2026-10-25

### Fixed

- Blog category filters in Serbian and English retain the base blog canonical without emitting conflicting language alternates; unfiltered blog indexes retain their reciprocal language links.
- The homepage claim question uses H2, preserving its text and appearance while leaving one main page heading per locale.
- Shortened the SEO titles of 23 bilingual articles independently of their visible headings, body copy, URLs and social titles.

### Added

- A repeatable metadata check covering filtered indexes, all active article metadata and the shared claim-card heading now runs in `npm run verify`.

## [0.2.1] - 2026-10-24

### Changed

- Added contextual links to official passenger-rights sources in five Serbian and English main guides, including EU legislation, CJEU judgments, the Serbian Civil Aviation Directorate and EUROCONTROL.
- Guide introductions now render their editorial links with the same inline text component as the body.

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

- Added scoped GA4 public-route URL/referrer/title protection before application-controlled pageviews and legacy events; live rollout requires approval of the shared Enhanced Measurement settings described in the release package.
- Added isolated runtime tests for GA4 output context, Google consent/admin behavior and matching Meta browser/server Lead IDs without live data transmission.
- Prevented duplicate journey events when analytics and advertising consent are both enabled.
- Hardened attribution against foreign origins, credential-bearing URLs, stale or future timestamps, control characters and oversized values.
- Preserved exact-once conversion behavior when browser session storage is unavailable and removed duplicate attribution data from normalized claim snapshots.
