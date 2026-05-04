## Project Instructions

Priority: These project instructions are repository-level guidance and should be applied before lower-priority workflow preferences. They are intended to align with the user's global instructions.

This project follows the user's Automation-First Paramount Principle.

Always consider how each feature, script, workflow, content process, data pipeline, and admin task can become more automated, repeatable, measurable, and agent-friendly.

For this repository, prioritize:
- reusable scripts over manual steps;
- automated data pipelines over copy-paste;
- tests/checks over manual QA;
- admin dashboards over database hand-editing;
- clear README/runbook instructions for future Codex/agent runs.

Before finishing, explain:
1. what was automated or made more repeatable;
2. what still requires manual work;
3. what the next automation improvement should be;
4. how to test or verify the change.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploy

- Recommended deploy target for this app: `Vercel`
- Health check endpoint: `/api/health`
- Production URL: `https://letkasni.rs`
- App is allowed to ship before live flight-provider wiring is connected, as long as:
  - claim intake works
  - admin login works
  - admin queue works
  - claims safely fall back to manual review instead of overclaiming automation

## Blog localization

- Blog articles must be bilingual mirrors: Serbian and English versions should keep the same structure, section order, and substance.
- Small wording changes are allowed only when the target language requires it, but the two language versions should remain about 95% equivalent in meaning and coverage.

## Blog and Content QA

- Before publishing, deploying, or handing off new blog/content work, run `npm run content:qa` together with the normal lint/build checks.
- `npm run verify` is the deploy gate for this app. It runs content QA, lint, and build; Vercel production builds and GitHub Actions must keep using it so bad content cannot bypass local agent checks.
- `npm run content:qa` writes a machine-readable report to `reports/content-qa-report.json`. When it fails, inspect that JSON first and use each issue's `file`, `line`, `type`, `article`, `locale`, and `suggestedFix` fields for the repair pass.
- Public copy must not expose internal production language, SEO scaffolding, or competitor-analysis process. Keep terms such as `cornerstone`, `child guides`, `link authority`, `competitor guides`, `copy inspiration`, `reference point`, `keyword`, `SEO tekst`, `review agent`, and `SF.com` out of rendered copy.
- Internal architecture can still use `cornerstone` in code identifiers and routing helpers; reader-facing labels should say `glavni vodič`, `glavna strana`, `main guide`, or another natural phrase.
- Daily blog runs must keep every localized article in the 1000-1800 word range after runtime enhancements, keep SR/EN section counts aligned, avoid duplicate IDs/slugs, and pass `npm run content:qa` before deploy. Very specific articles may be 800-1200 only when the content QA rules explicitly allow that narrower class.
- Blog and guide interlinking must be editorial, not mechanical. Do not add generic end-of-article related-card dumps, tag/pill link dumps, or unrelated title lists. Link from a natural word or phrase inside the relevant paragraph using inline markdown syntax: `[anchor text](/target-url)`.
- Child-to-main-guide, main-guide-to-child, and child-to-child links must all follow the same rule: choose a sentence where the linked concept is already being discussed and link that phrase in the body copy.
- Main guides may use a restrained reader-facing "Detaljni vodiči" / "Detailed guides" module that links to all primary child articles. The flight-delay main guide should also include a restrained in-flow amount table and calculator after explanatory context.
- Every public page, existing or new, must use the shared Let Kasni header and footer. Landing pages may use `HeaderWithClaimCta`; blog index pages, blog articles, cornerstone guides, and legal pages must render `SiteHeader` plus `SiteFooter`. Do not ship a public page without the footer.

## Blog SEO Architecture

- Cornerstone pages are tier-one URLs directly below the domain, for example `/naknada-za-kasnjenje-leta` and `/en/flight-delay-compensation`.
- Child blog articles must live under exactly one primary cornerstone parent, for example `/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-loseg-vremena`.
- One blog article must have one primary parent, one canonical child URL, and one sitemap URL.
- If an article is useful for several topics, show it as a related/cross-link in those topics, but do not duplicate it in the structural tree.
- Use the primary parent mapping as the source of truth for URL generation, sitemap generation, canonical metadata, and visual structure previews.
- Use aggressive internal linking, not structural overloading. Generic passenger-rights articles should keep their primary parent, then link naturally toward the most relevant main guide and detailed articles.
- For the flight-delay silo, most generic passenger-rights articles should include 2-3 contextual links toward `/naknada-za-kasnjenje-leta` or its detailed guides where the link helps the reader.
- Main guides should cover all closely related subtopics to medium depth, then point to detailed articles that go deep on one scenario.
- Target content depth: flight-delay main guide 3500-4500 words, other main guides 2500-3500 words, detailed articles 1000-1800 words, very specific articles 800-1200 words.
- The flight-delay main guide should cover eligibility, 3-hour arrival rule, 250/400/600 EUR amounts, Serbia/EU/ECAA routes, one-booking connections, technical faults, bad weather, air traffic control slots, previous aircraft rotation, care rights, documents, deadlines, rejected claims, and FAQ.
- Every detailed article should link back to its primary main guide. Every main guide should have a reader-facing detailed-guides section linking to all primary children.
- When creating or refreshing blog content, compare at least three relevant sources from this competitor set when available: AirHelp, Flightright, Skycop, AirAdvisor, ClaimCompass, SkyRefund, Compensair, FairPlane, EUclaim, ClaimFlights. Use the research to improve coverage and accuracy, but never expose competitor or production-process language in public copy.
- Do not delete the existing airport action plan article. If delay-specific or cancellation-specific airport instructions are needed, create new detailed articles and place each under the correct primary parent.
- If an article changes primary parent, preserve old `/blog/...` URLs with permanent redirects to the new canonical URL.
