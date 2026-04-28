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

This repository includes an isolated Python utility for validating Aviation Edge historical schedule data for Belgrade Airport (`BEG`) for January, February, and March 2026. This is only a data validation workflow. It is not final legal eligibility analysis for passenger claims.

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

### Download the artifact

After the workflow run finishes:

1. Open the completed workflow run.
2. Scroll to `Artifacts`.
3. Download `aviation-edge-beg-results`.

The artifact contains:

- `data/raw/` - raw Aviation Edge JSON responses, including monthly attempts and any daily fallback responses.
- `data/processed/beg_flights_normalized.csv` - normalized flight rows with cancellation, arrival delay, manual review, and deduplication helper columns.
- `reports/monthly_summary.csv` - raw and deduped counts by month and direction.
- `reports/airline_breakdown.csv` - raw and deduped counts by airline.
- `reports/route_breakdown.csv` - raw and deduped counts by route.
- `reports/top_candidate_events.csv` - conservative candidate rows for cancelled, 3h+ arrival delay, or manual review cases.

### Known limitations

- Aviation Edge data quality and field availability can vary by date, airline, and flight.
- The script first tries monthly requests, then falls back to daily requests if the monthly response fails, is empty, or looks suspiciously small.
- Codeshare handling is conservative: raw rows are preserved, and likely duplicate rows are marked with `dedup_group_id` and `is_dedup_primary`.
- `needs_manual_review` means the row lacks enough normalized evidence for confident automated interpretation.
- The reports are intended for data validation and triage only, not as final EC261/legal eligibility decisions.
