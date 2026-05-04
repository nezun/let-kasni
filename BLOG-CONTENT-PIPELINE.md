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
- Review at least three relevant sources from AirHelp, Flightright, Skycop, AirAdvisor, ClaimCompass, SkyRefund, Compensair, FairPlane, EUclaim, and ClaimFlights when available.
- Verify legal basics against official EU sources where possible.
- Use the research to improve coverage, examples, FAQs, tables, and reader flow.
- Do not mention competitors, research process, or internal SEO mechanics in public copy.

## Publish gate

Before commit or deploy:
- `npm run content:qa`
- `npm run lint`
- `npm run build`
- `npm run verify`

After deploy:
- Check the canonical page.
- Check redirects from old `/blog/...` paths.
- Check `/sitemap.xml`.
- Submit sitemap through the Search Console automation.
