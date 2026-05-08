# P1 research note: flight delay compensation main guide

Date: 2026-05-08
Page: `/naknada-za-kasnjenje-leta`
Status: local rewrite for review

## Scope

This note records the required P1 research before rewriting the flight-delay main guide.
The page should educate the passenger, but the commercial framing must point toward
professional claim handling by Let Kasni. It must not become a pure DIY manual.

## Competitor pass

| Source | URL | Access | Useful patterns observed |
| --- | --- | --- | --- |
| AirHelp | https://www.airhelp.com/en/flight-delay-compensation/ | 200, about 4662 extracted words | Calculator, key points, 3-hour rule, covered routes, amount table, right to care, missed connections, arrival-time definition, documents, and explicit service framing around avoiding paperwork. |
| AirHelp EU | https://www.airhelp.com/en/eu-flight-delay-compensation/ | 200, about 2486 extracted words | Topic-closer EU reference for this guide: eligibility, non-eligible cases, amounts, EC261 coverage, time limits, filing through AirHelp, why use AirHelp. |
| Flightright | https://www.flightright.de/ihre-rechte/flugverspaetung-entschaedigung | 403 direct fetch; search snippets usable | Emphasizes airline responsibility, compensation up to 600 EUR, and professional support for compensation and reimbursement. |
| Skycop | https://www.skycop.com/delayed-flight-compensation/ | 200, about 3671 extracted words | Regulations, how delay is calculated, 2-hour and 3-hour thresholds, right to care, claim steps, time limits, extraordinary circumstances, FAQ. |
| AirAdvisor | https://airadvisor.com/en-us/flight-compensation-calculator | 403 direct fetch; search result usable | Calculator-led experience, instant eligibility framing, distance, delay length, airline responsibility, and service taking over after flight details are entered. |
| ClaimCompass | No stable live page found; brand appears absorbed/redirected in current search results | unavailable | No direct page used for outline. |
| SkyRefund | https://skyrefund.com/en-us | 200, about 491 extracted words | Strong service framing: passenger gives flight details, service builds case, enforces rights, may file complaints/court case, no win no fee. |
| Compensair | https://www.compensair.com/en/ | 200, about 496 extracted words | Software checks entitlement, service prepares documents, handles negotiation, "we do all the work" framing. |
| FairPlane | https://www.fairplane.de/flugverspaetung/ | 200, about 3686 extracted words | 3-hour destination-arrival threshold, departure-airport coverage, care from 2 hours, extraordinary circumstances, retroactive claims, lawyers take over enforcement. |
| EUclaim | https://www.euclaim.de/flugverspaetung | 200, about 1037 extracted words | Conditions, no-claim cases, 2-hour care rights, 250/400/600 table, connecting flights, documents, recent delayed flights, FAQ. |
| ClaimFlights | https://claimflights.com/ | 403 direct fetch; search result usable | Flight data and cross-border legal network framing, EU261 compensation separate from expenses/refund. |
| Official EU | https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm | 200, about 7372 extracted words | Official coverage rules, delay-at-arrival compensation table, 250/400/600 EUR, connecting-flight logic, complaint path. |

## AirHelp benchmark choice

Closest topic match: AirHelp EU flight-delay page, about 2486 extracted words.
The broader AirHelp global page is about 4662 extracted words, but it includes US/DOT,
Montreal Convention, Brazil, and broader international coverage that is not the main
scope of the Serbian EC261/ECAA guide.

Local target for this guide: 3000-3800 rendered words while the Serbia/ECAA and one-booking
specificity remains useful. This is above the AirHelp EU page and avoids padding with
US-only content.

## Approved outline for local test

Each H2 below has one of the P1 reasons: direct search intent, legal/eligibility condition,
or competitor-covered user step.

1. Kada kašnjenje leta daje pravo na naknadu
   - Reason: direct search intent and legal eligibility.
   - Supported by: AirHelp, Skycop, FairPlane, EUclaim, Your Europe.

2. Koliko može iznositi naknada
   - Reason: legal amount condition.
   - Supported by: AirHelp, Skycop, EUclaim, Your Europe.

3. Vanredne okolnosti i najčešći razlozi odbijanja
   - Reason: legal defence and competitor-covered claim issue.
   - Supported by: AirHelp, Skycop, FairPlane, EUclaim.

4. Šta sačuvati dok ste još na aerodromu
   - Reason: competitor-covered user step, but framed as evidence preservation, not DIY litigation.
   - Supported by: AirHelp, Skycop, FairPlane, EUclaim.

5. Zašto zahtev nije samo formular aviokompaniji
   - Reason: service framing and competitor-covered professional handling.
   - Supported by: AirHelp, SkyRefund, Compensair, FairPlane.

6. Ruta, Srbija, EU i ECAA okvir
   - Reason: local legal/eligibility condition.
   - Supported by: Your Europe, AirHelp, EUclaim, AirHelp EU.

7. Dolazak tri sata kasnije i stvarno vreme dolaska
   - Reason: legal threshold and arrival-time condition.
   - Supported by: AirHelp, FairPlane, EUclaim, Your Europe.

8. Iznos po dužini rute i kada se može smanjiti
   - Reason: legal amount condition and visual table placement.
   - Supported by: AirHelp, EUclaim, Your Europe.

9. Tehnički kvar, rotacija aviona i posada
   - Reason: common airline-responsibility scenarios.
   - Supported by: AirHelp, Skycop, FairPlane.

10. Loše vreme, slotovi kontrole letenja i bezbednosni događaji
    - Reason: common extraordinary-circumstance scenarios.
    - Supported by: AirHelp, Skycop, FairPlane, EUclaim.

11. Pravo na brigu: hrana, hotel, transfer i refundacija troškova
    - Reason: legal care rights and competitor-covered visual/checklist pattern.
    - Supported by: AirHelp, Skycop, FairPlane, EUclaim, Your Europe.

12. Dokumenta, rokovi i profesionalna obrada zahteva
    - Reason: user step plus commercial framing.
    - Supported by: AirHelp, Skycop, EUclaim, SkyRefund, Compensair.

13. Šta ako aviokompanija odbije zahtev
    - Reason: direct user problem and service need.
    - Supported by: AirHelp, FairPlane, SkyRefund, Compensair.

14. Kada profesionalna provera posebno menja ishod
    - Reason: service framing, evidence-sensitive edge cases.
    - Supported by: AirHelp, SkyRefund, Compensair, ClaimFlights search result.

15. Najčešće greške koje umanjuju naknadu
    - Reason: competitor-covered user guidance, framed as risk reduction.
    - Supported by: AirHelp, Skycop, FairPlane, EUclaim.

## Visuals and interactive elements

The local page includes:
- hero image;
- compensation amount table inside the amount section;
- professional claim-handling process visual inside the form/procedure section;
- 3-hour arrival threshold timeline inside the actual-arrival section;
- quick compensation estimate calculator inside the documents/professional-handling section.

Under the updated P1 rule, the hero image and detailed-guide navigation cards do not
count toward the minimum. This local version now has 4 qualifying in-body elements:
amount table, professional process visual, arrival timeline, and calculator. They are
distributed through the guide instead of clustered at the beginning.
