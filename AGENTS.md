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

## Autonomous Handoff

- `CHECKPOINT.md` is the canonical handoff file for future local and Codex Cloud sessions.
- At the start of a resumed task, read `AGENTS.md`, read `CHECKPOINT.md`, inspect `git status --short`, and run `npm run checkpoint`.
- Before ending substantial work, run `npm run checkpoint` and update the manual sections of `CHECKPOINT.md`: current state, next work, locked decisions, manual work, and verification log.
- If the task cannot finish without user input, record the blocker and the safest next autonomous step in `CHECKPOINT.md` instead of relying on chat memory.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploy

- Recommended deploy target for this app: `Vercel`
- Health check endpoint: `/api/health`
- Production URL: `https://letkasni.rs`
- Default execution rule: deploy completed changes immediately unless the user explicitly says to keep the work local first.
- App is allowed to ship before live flight-provider wiring is connected, as long as:
  - claim intake works
  - admin login works
  - admin queue works
  - claims safely fall back to manual review instead of overclaiming automation

## Blog localization

- Blog articles must be bilingual mirrors: Serbian and English versions should keep the same structure, section order, and substance.
- Small wording changes are allowed only when the target language requires it, but the two language versions should remain about 95% equivalent in meaning and coverage.

## Blog and Content QA

- Before publishing, deploying, or handing off new blog/content work, run `npm run content:qa`, `npm run content:links`, and `npm run content:benchmark` together with the normal lint/build checks.
- `npm run verify` is the deploy gate for this app. It runs content QA, link graph checks, benchmark review, lint, and build; Vercel production builds and GitHub Actions must keep using it so bad content cannot bypass local agent checks.
- `npm run content:qa` writes a machine-readable report to `reports/content-qa-report.json`. When it fails, inspect that JSON first and use each issue's `file`, `line`, `type`, `article`, `locale`, and `suggestedFix` fields for the repair pass.
- `npm run content:benchmark` is the independent benchmark reviewer for all blog articles and main guides. It writes `reports/content-benchmark-review.json`, scores every SR/EN page against the P1 rules, checks professional-service framing and visual distribution, and must be at least 90 for every record. If any record is below 90, repair the content and rerun the command until it passes.
- P1 content gate: no cornerstone/main guide rewrite may start until there is an internal approved outline note. Every H2 must have one of three reasons: direct search intent, a key legal/eligibility condition, or a user step that at least one listed competitor actually covers. H2s about our site, our calculator, our internal linking, detailed-guide navigation, SEO structure, or future article structure are not allowed in the main body.
- Main guide H2s must never describe content taxonomy or site architecture. Ban reader-facing headings such as "Kako povezati ovu temu sa drugim pravima putnika" / "How this topic connects..." and body copy that mentions `interni linkovi`, `internal links`, or `struktura sajta`; replace them with the actual passenger-rights issue, for example replacement flight timing, refund vs rerouting, care expenses, or evidence review.
- P1 research evidence: before writing or refreshing any public blog/guide, document the competitor review internally. Attempt the full competitor set when practical: AirHelp, Flightright, Skycop, AirAdvisor, ClaimCompass, SkyRefund, Compensair, FairPlane, EUclaim, ClaimFlights. If a source is unavailable, blocked, acquired, or has no matching page, note that. Do not invent headings or paragraph substance without a traceable competitor or official-source basis.
- P1 length rule: use the closest AirHelp topic-equivalent page as the primary length benchmark, then target roughly 10-20% more depth when the extra content is useful. If AirHelp has a broader page and a more specific legal/regional page, choose the closest topic match and document that choice. Local Serbia/ECAA specificity can justify exceeding the 20% band, but it must be useful to the reader, not filler.
- P1 conversion framing: Let Kasni sells professional claim handling and actively takes over the hardest parts of the case: eligibility review, evidence sorting, airline communication, procedural pressure, and responses to generic rejections. Public copy may explain what evidence is needed and that direct filing is possible, but it must not read like a DIY manual that encourages the reader to fight the airline alone. Frame airline claims as paperwork-heavy, evidence-sensitive, and materially faster/stronger when handled by people who know the rules and procedures. It is valid to state that airlines often reject individuals in the first phase because they expect many passengers to give up; do this professionally, without fearmongering.
- P1 visuals rule: every new or refreshed main/cornerstone guide needs 3-5 useful in-body visual or interactive elements where the format supports it. Every standard article needs 2-4. Eligible elements include calculator, table, timeline, checklist module, comparison card, route map, process visual, or a relevant generated/selected image. Hero images, sticky/sidebar forms, the mandatory quick-check CTA module, and "Detaljni vodiči" / "Detailed guides" navigation cards do not count toward this minimum. Standard blog articles and all main/cornerstone guides must use a wide reading layout, must not render the old sticky sidebar form, and must include the approved in-body quick-check CTA immediately after the first H2 section body. That CTA must open the claim flow directly, not link back to the landing-page form. Standard articles must also include one strong context image from the article image pipeline. Visuals should come from competitor-observed patterns where possible and must be distributed through the article, roughly every 3-4 H2s depending on length, instead of clustered at the beginning or stacked one after another.
- Never render the same reusable in-body visual module twice on one public article or guide page. Repeated generic visuals are a P1 defect: use section-specific variants such as cancellation decision, airline-response audit, delay timeline, evidence checklist, or amount table instead.
- All main/cornerstone guide pages must use the approved wide typography template with sticky moving subheading navigation (`ScrollProgressToc`), no sidebar form, wide centered body copy, and distributed in-body visuals. Do not allow one cornerstone page to use a separate legacy layout while another uses the current approved typography system.
- Public copy must not expose internal production language, SEO scaffolding, or competitor-analysis process. Keep terms such as `cornerstone`, `child guides`, `link authority`, `competitor guides`, `copy inspiration`, `reference point`, `keyword`, `SEO tekst`, `review agent`, and `SF.com` out of rendered copy.
- Internal architecture can still use `cornerstone` in code identifiers and routing helpers; reader-facing labels should say `glavni vodič`, `glavna strana`, `main guide`, or another natural phrase.
- Serbian public blog/guide copy must stay in Latin script only. Do not use locale/browser date formatting that can output Cyrillic month names; use the shared Latin formatter and make `npm run content:qa` fail on any Cyrillic characters in Serbian public content or rendered Serbian dates.
- Daily blog runs must keep every localized article in the 1000-1800 word range after runtime enhancements, keep SR/EN section counts aligned, avoid duplicate IDs/slugs, and pass `npm run content:qa` before deploy. Very specific articles may be 800-1200 only when the content QA rules explicitly allow that narrower class.
- Blog and guide interlinking must be editorial, not mechanical. Do not add generic end-of-article related-card dumps, tag/pill link dumps, or unrelated title lists. Link from a natural word or phrase inside the relevant paragraph using inline markdown syntax: `[anchor text](/target-url)`.
- Interlinking density rule: within one rendered article or guide body, link to the same target URL at most once, and use the same anchor word or anchor phrase as a link at most once. If the same word appears again, leave it as plain text. Never create repeated links such as several linked `slot`, `dokaz`, `dokaze`, `delay`, or similar terms in the same text.
- Never create link-dump paragraphs. A public paragraph may contain at most two inline links, and those links must be naturally integrated into the sentence. Do not list several full article titles as comma-separated links; distribute useful links into the relevant H2 sections or leave the complete set for the approved detailed-guides module.
- Inline links must be explicit editorial markdown links in the content source. Do not rely on runtime auto-linking or render-time mutation to create links; benchmark and QA scripts enforce the density rule.
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
- Target content depth is benchmark-led, not a fixed word-count race. Use the P1 AirHelp reference rule above first. Until each page has a documented benchmark, keep the broad guardrails as: flight-delay main guide 3000-4500 words, other main guides 2500-3800 words, detailed articles 1000-1800 words, very specific articles 800-1200 words.
- The flight-delay main guide should cover eligibility, 3-hour arrival rule, 250/400/600 EUR amounts, Serbia/EU/ECAA routes, one-booking connections, technical faults, bad weather, air traffic control slots, previous aircraft rotation, care rights, documents, deadlines, rejected claims, and FAQ.
- Every detailed article should link back to its primary main guide. Every main guide should have a reader-facing detailed-guides section linking to all primary children.
- When creating or refreshing blog content, compare at least three relevant sources from this competitor set when available: AirHelp, Flightright, Skycop, AirAdvisor, ClaimCompass, SkyRefund, Compensair, FairPlane, EUclaim, ClaimFlights. Use the research to improve coverage and accuracy, but never expose competitor or production-process language in public copy.
- Do not delete the existing airport action plan article. If delay-specific or cancellation-specific airport instructions are needed, create new detailed articles and place each under the correct primary parent.
- If an article changes primary parent, preserve old `/blog/...` URLs with permanent redirects to the new canonical URL.
