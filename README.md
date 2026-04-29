# letkasni.rs — Phase 1 Next.js Foundation

Ovaj app prati zaključani pravac iz `PLAN.autoplan.md`:

- Next.js App Router foundation
- native claim intake
- conservative triage
- Supabase-ready claim persistence
- minimal admin auth + internal queue

## Trenutni status

- `/` — public claims landing + native intake
- `/claim/submit` — route handler za intake
- `/admin/login` — minimal admin login
- `/admin/claims` — protected internal queue
- `/admin/claims/[id]` — detail view + operator workflow
- `/blog` — editorial shell za kasniji content/SEO sloj
- `/privacy` i `/terms` — minimalni legal/trust layer
- `robots.txt` i `sitemap.xml` — SEO foundation
- `opengraph-image` / `twitter-image` / `manifest.webmanifest` — share + install metadata

## Setup

1. Kopiraj `.env.example` u `.env.local`
2. Za lokalni admin fallback podesi:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
3. Za Supabase mode podesi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Za live AeroDataBox lookup podesi:
   - `FLIGHT_PROVIDER_MODE=rapidapi`
   - `AERODATABOX_API_KEY`
   - opciono `AERODATABOX_API_HOST`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

- Preporučeni platform choice za ovaj app: `Vercel`
- Minimalni health endpoint za deploy proveru: `/api/health`
- Basic production security headers su uključeni:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- App može biti pušten live i bez live flight provider integracije:
  - public intake radi
  - admin queue radi
  - claimovi bez provider-a idu na konzervativni manual review flow

### Production env minimum

- `NEXT_PUBLIC_SITE_URL=https://letkasni.rs`
- `NEXT_PUBLIC_SUPPORT_EMAIL=podrska@letkasni.rs`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

### Production env optional

- Operator podaci su već podrazumevano podešeni na `VGA EU CONSULTING DOO NIŠ`, ali se po potrebi mogu override-ovati kroz:
  - `NEXT_PUBLIC_OPERATOR_NAME`
  - `NEXT_PUBLIC_OPERATOR_ADDRESS`
  - `NEXT_PUBLIC_OPERATOR_REGISTRY`
  - `NEXT_PUBLIC_OPERATOR_PIB`
  - `NEXT_PUBLIC_OPERATOR_MB`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` kada bude spreman GA4
- flight provider env kada budemo uvodili live lookup

## Persistence modes

- Bez Supabase env-a: claims idu u lokalni `.data/claims.json`
- Sa Supabase env-om: claims idu u `public.claims`

## Phase 1 guardrails

- Honeypot polje blokira najosnovniji bot spam bez dodatnog servisa
- Basic rate limit štiti submit endpoint od kratkih burst pokušaja
- Provider odgovor razlikuje `live_match`, `no_match`, `timeout` i `unconfigured`
- Queue sada ima osnovne filtere po statusu, provider ishodu i verdict-u
- `normalized_input_snapshot` sada stvarno koristi provider normalizaciju kada postoji

## Optional production wiring

- Analytics je spreman za env-based uključivanje:
  - `ANALYTICS_MODE=plausible` + `PLAUSIBLE_DOMAIN`
  - ili `ANALYTICS_MODE=ga4` + `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Kontakt email ide kroz `NEXT_PUBLIC_SUPPORT_EMAIL`

## Auth policy

- Preporučeno: `Supabase Auth` za produkciju
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` local fallback ostaje koristan za development i emergency pristup
- Nakon Supabase URL konfiguracije, admin login ekran sada eksplicitno upućuje na recovery/link troubleshooting smer

## Database

SQL migration za `claims` tabelu je u:

- `supabase/migrations/202604181905_phase1_claims.sql`

## Aviation Edge BEG history validation

This repository includes an isolated Python utility for validating Aviation Edge historical schedule data for Belgrade Airport (`BEG`) for the last 12 full calendar months: `2025-04-01` through `2026-03-31`.

The business question is whether BEG-only has enough EU261-relevant disruption volume to support `letkasni.rs` as a standalone flight compensation claim acquisition business. This workflow separates operational disruption volume from likely EU261-relevant volume. It is not final legal eligibility analysis.

### Add the GitHub secret

1. Open the GitHub repository.
2. Go to `Settings` -> `Secrets and variables` -> `Actions`.
3. Click `New repository secret`.
4. Set the name to `AVIATION_EDGE_API_KEY`.
5. Paste the Aviation Edge API key as the value and save it.

Do not commit API keys, `.env` files, or downloaded Aviation Edge data to the repository.

### Run the workflow manually

1. Open the repository on GitHub.
2. Go to `Actions`.
3. Select `Fetch Aviation Edge BEG History`.
4. Click `Run workflow`.
5. Choose the branch and confirm `Run workflow`.

The workflow installs Python dependencies from `requirements.txt`, runs `scripts/fetch_beg_history.py`, and uploads the results as a workflow artifact. It does not commit fetched JSON or CSV files back to the repository.

If Aviation Edge rejects part of the requested 12-month period, the workflow records that data-access issue and continues with any months that are available. Set `AVIATION_EDGE_STRICT_FETCH=1` only if you want the script to fail immediately on the first Aviation Edge fetch error.

### Download the artifact

After the workflow run finishes:

1. Open the completed workflow run.
2. Scroll to `Artifacts`.
3. Download `aviation-edge-beg-results`.

The artifact contains:

- `data/raw/` - monthly raw Aviation Edge JSON responses, including `YYYY-MM-arrivals.json`, `YYYY-MM-departures.json`, and destination-arrival lookup evidence where needed.
- `data/raw/fetch_issues.json` and `reports/fetch_issues.csv` - Aviation Edge data-access or fetch issues recorded during the run.
- `data/processed/beg_flights_normalized.csv` - normalized flight rows with disruption, carrier, enrichment, EU261 precheck, manual-review, and deduplication helper columns.
- `reports/analysis_summary.csv` - top-level business summary and warning that legal precheck is not final eligibility analysis.
- `reports/12m_monthly_eu261_precheck_summary.csv` - most important monthly business view for likely in-scope vs operator-sensitive vs likely out-of-scope candidate volume.
- `reports/12m_confirmed_operational_candidates.csv` - deduped cancelled or reliable 3h+ arrival-delay operational candidates.
- `reports/fr24_validation_sample.csv` - top 30 events for manual FR24/FlightAware validation.
- `reports/12m_manual_review_events.csv` - rows that still need manual review. This can overlap with confirmed operational candidates when operator, scope, codeshare, or arrival evidence remains uncertain.
- `reports/12m_route_breakdown.csv` and `reports/12m_airline_breakdown.csv` - candidate distribution by route and likely operating carrier.
- `reports/12m_data_quality_summary.csv` - data completeness, destination-arrival enrichment, and remaining evidence gaps.
- `reports/12m_seasonality_summary.csv` - monthly seasonality view for whether Q1 is representative.

The non-`12m_` report files are aliases of the main 12-month reports for convenience.

### How to read the output

- Operational disruption event: a flight with cancellation or arrival-delay evidence in Aviation Edge data.
- Confirmed operational candidate: a deduped flight where `is_cancelled = true` or reliable `is_arrival_delay_3h_plus = true`.
- Likely EU261-relevant event: a confirmed operational candidate whose route/operator precheck is `likely_in_scope`.
- Operator-sensitive event: a confirmed operational candidate where the route may matter for EU261, but operating carrier status needs manual validation.
- Likely out-of-scope event: a confirmed operational candidate that appears outside EU261 scope, for example non-EU airport pairs such as BEG-DXB/DOH/TLV/JFK unless another legal basis exists.
- Manual review event: a row with weak final-arrival evidence, unclear status/operator/scope, low-confidence destination match, or conflicting data. Manual review is not mutually exclusive with confirmed operational candidate status.

### Known limitations

- Aviation Edge data quality and field availability can vary by date, airline, and flight.
- Aviation Edge documents a 30-day maximum date range, so the script keeps monthly reporting but fetches each month in 30-day-or-smaller chunks.
- BEG departure rows with weak final-arrival evidence are enriched from destination-side arrival lookups when a match can be found.
- Destination-arrival enrichment increases runtime and API usage because it may query destination airports for weak BEG departure evidence. Optional destination lookups use shorter timeouts, a per-month safety budget, and a timeout breaker so provider errors cannot keep the workflow running for hours.
- Codeshare handling is conservative: raw rows are preserved, duplicate groups are marked with `dedup_group_id`, marketing carriers are preserved, and likely operating carrier is inferred from the non-codeshare row when present.
- `needs_manual_review` means the row lacks enough normalized evidence for confident automated interpretation and is intentionally separated from confirmed operational candidates.
- `likely_eu261_scope` is an informational triage label only. It does not remove candidates and is not a legal eligibility decision.
- The reports are intended for data validation and triage only, not as final EC261/legal eligibility decisions.
