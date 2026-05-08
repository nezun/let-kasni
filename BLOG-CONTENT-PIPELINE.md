# Blog Content Pipeline

## Current priority

Build authority around `naknada-za-kasnjenje-leta` first.

The main guide lives at:
- SR: `/naknada-za-kasnjenje-leta`
- EN: `/en/flight-delay-compensation`

Rules:
- One article has one primary parent.
- One article has one canonical URL.
- Related-topic use is handled with contextual links, not duplicate placement.
- Old `/blog/...` paths need redirects when a primary parent changes.

## Flight delay expansion backlog

Per-airline delay pages:
- `Kasnjenje Wizz Air letova - prava putnika`
- `Lufthansa kašnjenje leta - odšteta`
- `Air Serbia kašnjenje leta - prava putnika`
- `Austrian Airlines kašnjenje leta - odšteta`
- `Turkish Airlines kašnjenje leta - prava putnika`
- `Ryanair kašnjenje leta - odšteta`
- `easyJet kašnjenje leta - prava putnika`
- `KLM kašnjenje leta - odšteta`
- `Air France kašnjenje leta - prava putnika`
- `Swiss kašnjenje leta - odšteta`

Per-duration delay pages:
- `Kašnjenje leta 2 sata`
- `Kašnjenje leta 3 sata`
- `Kašnjenje leta 4 sata`
- `Kašnjenje leta preko noći`
- `Kašnjenje leta 5 sati i refundacija karte`

Airport-action split:
- Keep the existing generic airport action plan article.
- Add a delay-specific article under `/naknada-za-kasnjenje-leta`.
- Add a cancellation-specific article under `/naknada-za-otkazan-let`.

## Research standard

For each new or refreshed article:
- P1 hard gate: create an internal approved outline before writing. No rewrite starts from a blank page.
- Every H2 must have one of three reasons: direct search intent, a key legal/eligibility condition, or a user step that at least one reviewed competitor actually covers.
- Do not put H2s in the main article body that describe our site, our calculator, our internal links, detailed-guide navigation, SEO structure, or future article structure.
- Attempt the full competitor set when practical: AirHelp, Flightright, Skycop, AirAdvisor, ClaimCompass, SkyRefund, Compensair, FairPlane, EUclaim, and ClaimFlights. If a source is blocked, unavailable, acquired, or has no matching page, document that.
- Use the closest AirHelp topic-equivalent page as the primary length benchmark. Target roughly 10-20% more useful depth than that AirHelp page, unless local Serbia/ECAA context justifies more.
- Frame the content around Let Kasni's business: passengers can understand the right, but the claim itself should feel evidence-sensitive, paperwork-heavy, and better handled by professionals. Let Kasni actively takes over the hardest parts: eligibility review, evidence sorting, airline communication, procedural pressure, and responses to generic rejections. Do not write a pure DIY playbook; airlines often reject individuals first because they expect many passengers to give up, while a professionally prepared case changes the pressure, speed, and outcome.
- Each main/cornerstone guide should include 3-5 useful in-body visuals or interactive elements when the format supports it. Each standard article should include 2-4. Eligible elements include calculator, table, timeline, checklist module, comparison card, route map, process visual, quick-check CTA module, or relevant image. Hero images, sticky/sidebar forms, and "Detaljni vodiči" / "Detailed guides" navigation cards do not count toward this minimum. Standard blog articles use a wide reading layout, include the approved in-body quick-check CTA after the first 2-3 H2 sections, and include one strong context image from the article image pipeline. Visuals must be distributed through the article, roughly every 3-4 H2s depending on length, instead of clustered at the beginning or stacked one after another.
- All main/cornerstone guide pages use the approved wide typography template with sticky moving subheading navigation, no sidebar form, centered wide body copy, and distributed visuals. A new or generated main guide must not bypass this template.
- Verify legal basics against official EU sources where possible.
- Use the research to improve coverage, examples, FAQs, tables, and reader flow.
- Do not mention competitors, research process, or internal SEO mechanics in public copy.

## Publish gate

Before commit or deploy:
- `npm run content:qa`
- `npm run content:links`
- `npm run content:benchmark`
- `npm run lint`
- `npm run build`
- `npm run verify`

`npm run content:benchmark` is the independent benchmark reviewer. It checks every
SR/EN article and main guide against the P1 rules, including professional-service
framing and visual distribution, and fails if any record scores below 90. The
report is written to `reports/content-benchmark-review.json`; repair failed
records and rerun until it passes.

After deploy:
- Check the canonical page.
- Check redirects from old `/blog/...` paths.
- Check `/sitemap.xml`.
- Submit sitemap through the Search Console automation.
