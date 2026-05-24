# Daily flight-delay article research - 2026-05-23

Scope: six new bilingual airline-specific detailed articles under the flight-delay main guide.

Topics:
- `airbaltic-flight-delay-compensation` - airBaltic flight delay compensation
- `iberia-flight-delay-compensation` - Iberia flight delay compensation
- `luxair-flight-delay-compensation` - Luxair flight delay compensation
- `condor-flight-delay-compensation` - Condor flight delay compensation
- `freebird-flight-delay-compensation` - Freebird flight delay compensation
- `brussels-airlines-flight-delay-compensation` - Brussels Airlines flight delay compensation

Primary parent for all six:
- SR: `/naknada-za-kasnjenje-leta`
- EN: `/en/flight-delay-compensation`

Sources reviewed:
- Official Your Europe passenger-rights guidance: final-arrival delay of three hours or more, covered-route logic, right to care, refund/rerouting and missed-connection handling.
- Regulation 261/2004 framework as summarized by EU sources: 250/400/600 EUR bands, airline responsibility, assistance duties and extraordinary-circumstances exception.
- AirHelp flight-delay compensation page: topic-equivalent structure for threshold, amount bands, evidence and service-led claim handling.
- Skycop delayed-flight compensation and airline pages: cross-check for airline-specific page pattern, care rights, final-destination timing and distance-based amount presentation.
- EUclaim delayed-flight compensation page: cross-check for final-arrival threshold, amount bands, extraordinary-circumstances examples and care-rights framing.
- AirAdvisor flight-delay compensation page: cross-check for claim preparation, UK/EU framing, evidence packaging and passenger communication.
- Public airline/airport route context from Belgrade airport navigation and airline/destination references: topic selection for European carrier, hub, seasonal and charter scenarios relevant to Serbia travelers.

Internal outline decision:
- These are airline-specific support articles, not new main guides.
- All six map to exactly one primary parent: `flight-delay-compensation`.
- Public copy must not mention source names, competitor research, SEO mechanics or this outline.
- The reusable article frame is: operating carrier, covered route, one booking, final arrival, concrete delay reason, offered assistance, expenses, airline response and professional follow-up.

Coverage notes:
- EU-carrier topics should still avoid automatic-pay phrasing: airBaltic, Iberia, Luxair, Condor and Brussels Airlines require route, final arrival, delay reason and mitigation checks.
- Freebird/charter framing must avoid overclaiming by airline name alone; verify operating carrier, departure airport, travel direction and whether the flight sits inside a package.
- Hub pages should emphasize final destination under one booking: Riga, Madrid, Luxembourg and Brussels can be either destination or connection point.
- Leisure/seasonal pages should separate fixed compensation from hotel, transfer, package and other actual-cost evidence.
- All public articles keep Serbian and English as structural mirrors and link naturally back to the flight-delay main guide.

Internal-link plan:
- Every article links naturally to the flight-delay main guide in the first H2 section.
- The flight-delay main guide lists these articles as primary children through `src/lib/cornerstones.ts`.
- No duplicate parent, no legacy `/blog/...` canonical, and no link-dump paragraphs.

Visual plan:
- Each article has one article image plus distributed reusable in-body visual modules from the article enhancement pipeline.
- Airline-specific runtime enhancement adds a structured flight data/timeline section for repeatable case intake.

QA expectations:
- SR and EN structures are mirrored: same H2 order and same substance with natural language adjustments.
- Target length after runtime enhancements: standard daily range.
- Required checks: `npm run content:qa`, `npm run content:links`, `npm run content:benchmark`, `npm run verify`.
