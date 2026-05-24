# Daily delay articles P1 research - 2026-05-24

Scope: six bilingual airline-specific detailed articles under the flight-delay main guide.

Articles:

- `egyptair-flight-delay-compensation`
- `etihad-airways-flight-delay-compensation`
- `sas-flight-delay-compensation`
- `smartwings-flight-delay-compensation`
- `corendon-airlines-flight-delay-compensation`
- `tunisair-flight-delay-compensation`

Primary parent for all six:

- SR: `/naknada-za-kasnjenje-leta`
- EN: `/en/flight-delay-compensation`

Research basis:

- European Commission / Your Europe passenger-rights guidance for EC261 route coverage, final-arrival delay, care, overnight accommodation and refund framing.
- EUR-Lex Regulation (EC) No 261/2004 for the base assistance, care and refund provisions in long-delay cases.
- AirHelp flight-delay guidance for topic-equivalent user questions around 3+ hour final arrival, extraordinary circumstances, care and claim-service framing.
- Flightright flight-delay and extraordinary-circumstances guidance for responsibility analysis, final-arrival framing and common delay-reason categories.
- Skycop delayed-flight guidance and airline coverage pages for practical airline-specific page patterns, distance-band framing and one-booking connection emphasis.

Editorial decisions:

- Keep all six as child pages of the flight-delay compensation guide.
- Focus this batch on airline-specific searches that remain useful for Serbia travelers without duplicating route or duration pages already published.
- Public copy must not mention research process, competitor names, SEO mechanics or internal production terms.
- Frame each article as professional case review: final arrival, route, operating carrier, one booking, reason evidence, care costs and follow-up after generic rejection.
- Include the automation angle only as practical passenger-file structure and repeatable evidence handling, not as internal production language.

Internal-link plan:

- Every article links naturally to the flight-delay main guide in the first H2 section.
- Each article has exactly one primary parent in `src/lib/cornerstones.ts`.
- Article-to-parent links stay contextual; no link dumps or duplicate same-target links inside a single article.

Visual plan:

- Each article uses one context image.
- Runtime article enhancements add standard visual/checklist distribution without adding duplicate reusable modules on the same page.

QA expectations:

- SR and EN structures are mirrored: same H2 order and same practical substance with natural language adjustments.
- Target length after runtime enhancements: standard daily range.
- Required checks: `npm run content:qa`, `npm run content:links`, `npm run content:benchmark`, `npm run verify`.
