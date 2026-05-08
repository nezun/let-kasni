# P1 research note: full-site blog and guide corpus

Date: 2026-05-08
Scope: all existing Let Kasni main guides and blog articles.

## Pages covered

Main guides:
- `air-passenger-rights`
- `flight-delay-compensation`
- `flight-cancellation-compensation`
- `missed-connection-compensation`
- `overbooking-compensation`
- `denied-boarding-compensation`
- `delayed-baggage-compensation`
- `airline-strike-compensation`

Articles:
- `flight-diverted-rights`
- `airline-strike-compensation`
- `flight-moved-earlier-rights`
- `downgraded-seat-compensation`
- `delayed-baggage-after-flight`
- `children-infant-flight-compensation`
- `flight-delay-compensation`
- `cancelled-flight-rights`
- `missed-connection`
- `denied-boarding-overbooking`
- `extraordinary-circumstances`
- `eu261-ecaa-serbia`
- `documents-for-claim`
- `refund-vs-compensation`
- `claim-deadlines`
- `airport-action-plan`
- `how-to-file-airline-claim`
- `airline-rejected-claim`
- `voucher-or-cash-compensation`
- `airline-response-no-answer`
- `use-claim-service-or-diy`
- `claim-template-email`
- `four-hour-flight-delay-rights`
- `five-hour-flight-delay-refund`
- `delayed-flight-airport-action-plan`
- `flight-delay-reason-evidence`
- `meal-voucher-flight-delay`
- `flight-delay-final-arrival-time`
- `easyjet-flight-delay-compensation`
- `klm-flight-delay-compensation`
- `air-france-flight-delay-compensation`
- `swiss-flight-delay-compensation`
- `two-hour-flight-delay-rights`
- `three-hour-flight-delay-compensation`
- `wizz-air-flight-delay-compensation`
- `air-serbia-flight-delay-compensation`
- `lufthansa-flight-delay-compensation`
- `austrian-airlines-flight-delay-compensation`
- `turkish-airlines-flight-delay-compensation`
- `ryanair-flight-delay-compensation`
- `bird-strike-flight-delay`
- `lightning-strike-aircraft-delay`
- `medical-emergency-flight-delay`
- `crew-shortage-flight-delay`
- `night-flight-ban-curfew`
- `airline-bankruptcy-passenger-rights`
- `airport-strike-flight-rights`
- `air-traffic-control-slot-delay`
- `missed-flight-security-queue`
- `separate-tickets-missed-connection`
- `cancellation-under-14-days`
- `voluntary-denied-boarding-voucher`
- `bad-weather-flight-delay`
- `technical-fault-flight-compensation`
- `previous-flight-rotation-delay`
- `overnight-delay-hotel-rights`
- `self-rerouting-new-ticket`
- `serbia-eu-transit-routes`

## Benchmark sources used as the standing corpus baseline

The whole existing content set is benchmarked against recurring patterns observed in:
- AirHelp passenger-rights and compensation guides;
- Flightright flight delay, cancellation, denied boarding, and strike guidance;
- Skycop passenger-rights and compensation articles;
- AirAdvisor flight compensation and airline-specific pages;
- SkyRefund and Compensair claim-service positioning;
- FairPlane passenger-rights and lawyer/service enforcement pages;
- EUclaim delay/cancellation/connection/baggage guidance;
- ClaimFlights public claim and legal-network framing;
- Official EU passenger-rights guidance from Your Europe.

## Applied content principles

Across the existing corpus, every guide/article must now pass the same automated
benchmark gate:
- benchmark-led depth;
- SR/EN structure parity;
- no meta SEO/process H2s in public copy;
- no public competitor or internal-production language;
- at least one editorial inline internal link without duplicate target/anchor use;
- professional Let Kasni framing rather than a pure DIY manual;
- useful in-body visual modules, with hero images, the mandatory quick-check CTA,
  and guide cards excluded;
- documented research source coverage.

The article renderer now supplies three qualifying standard in-body visuals to
every blog article: an evidence-file module, a professional-review module and a
context image. A separate quick-check CTA is mandatory immediately after the first
H2 section body, opens the claim flow directly, and is intentionally excluded from
the visual minimum. The main-guide renderer supplies distributed
professional/evidence visuals for guide pages that do not have topic-specific
components. This makes the rule repeatable for future posts instead of relying on
one-off manual visual placement.
