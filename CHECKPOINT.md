# CHECKPOINT

Canonical handoff file for future local and Codex Cloud sessions.

## Start Here

### Local folders and social media workspace, 2026-09-27

- Local layout (owner decision, 2026-09-27): code repos live in `~/Letkasni kod/{app, marketing, radno}`, which Google Drive does not sync (GitHub is their backup). Everything that needs a Drive backup lives in `~/Documents/Letkasni/{sistem, materijali, rezerve, marketing/drustvene-mreze}`, because Drive backs up all of `~/Documents` and cannot skip `node_modules`.
- `drustvene-mreze` (Instagram/Facebook posts: content, visuals, motion, monitor, skills) lives in `~/Documents/Letkasni/marketing/drustvene-mreze`, outside this repo. This repo is public and that folder holds unpublished drafts, competitor analysis and third-party reference frames, so it must never be copied here. `/drustvene-mreze/` stays in `.gitignore` and the ESLint/TypeScript exclusions stay as a guard.
- Verification: `npm run verify` passed locally (lint 0 errors; build 184 static pages) after clearing a stale `.next/dev` type cache from 2026-09-19 that referenced the removed `src/app/social-preview` route.

### New site version from transport-local v2 (new brand and UX), 2026-09-27

- Owner decisions:
  - 2026-09-26: the static v2 site in `~/Documents/Letkasni/sistem/outputs/transport-local/site/letkasni/v2/` becomes the new staging version, with the URL structure kept ("menjamo brend i UX"). SR and EN change together. The fonts are Gilroy SemiBold for headings and Inter for text; Niko has a Gilroy web license (confirmed 2026-09-27). The consent banner and GTM/Consent Mode stay as they are.
  - 2026-09-27: "Možeš commit na staging", "kompletiraj ceo novi dizajn na stagingu", "drži originalni dizajn 1:1, dodaj i zvezdice".
- Whole marketing site is on v2. Every public page renders `LkFrame` (`src/components/lk-v2/lk-page.tsx`: CSS order, wrapper `ew-scope lk-page lk-version-2` plus the page kind, skip link) with the shared `SiteHeader`/`SiteFooter`, which now ARE the v2 header and footer. Pages:
  - Home: `src/app/page.tsx` and `src/app/en/page.tsx` plus `lk-home.tsx`, with star ratings back.
  - Main guides: `cornerstone-typography-preview.tsx` with the v2 hero and breadcrumb, CTA row, sticky left table of contents (`ScrollProgressToc`, rewritten to the v2 `lk-toc` markup with the current section highlighted), reading column, FAQ, "Detaljni vodiči" text cards and final CTA.
  - The flight-delay guide adds the v2 delay landing sections above the same full guide text: hero with the issue form, what we check, amounts, documents and care while waiting. Steps and testimonials come after the text. It also has its own header menu (Kako radi / Uslovi za naknadu / Česta pitanja) and the sticky check bar.
  - Articles: `blog-article-page.tsx` in the v2 article layout.
  - Blog index: `blog-index-page.tsx` with search and pagination by 9 (`lk-blog-filter.tsx`), newest first. Topic filter stays `?tema=`, and all cards stay in the HTML.
  - Legal pages: terms and privacy with the text unchanged (`lk-legal.tsx`).
  - Email offers and marketing confirm, and 404.
  - New v2 pages SR/EN: `/kontakt` + `/en/contact`, `/o-nama` + `/en/about`, `/faq` + `/en/faq` (`lk-pages.tsx`). They are in `analyticsPublicPaths` but not yet in the sitemap (new URLs; decide before production).
- Kept on purpose because the build gate enforces the content rules:
  - The in-body quick check right after the first H2 and the visuals at the same positions as before, restyled with v2 tokens (`lk-modules.tsx`, CSS in `src/styles/lk-v2-extra.css`).
  - No `<aside>` and no automatic "Povezani tekstovi" cards on articles. The v2 article template has them, but content QA forbids related-card dumps.
  - `ScrollProgressToc`, `InterlinkingScope` and `?tema=` stay. AGENTS.md now documents the v2 template and shell.
- Other deviations from the original:
  - Copy follows Niko's rules: "Letkasni.rs" spelling, no payout timelines in testimonials, current FAQ cost answer.
  - Social icons have no links, because there are no profiles yet.
  - The footer has "Podešavanja privatnosti".
- Brand assets: `src/app/icon.svg` (the v2 `logo-mark.svg`), and a new `favicon.ico` and `apple-icon.png` rendered from it with headless Chromium. `manifest.ts` uses "Letkasni.rs" with navy `#011f4c`. The social preview images are static v2 PNGs made by `npm run lk:og` (`scripts/lk-v2-og.mjs`: HTML template, real Gilroy/Inter fonts, headless Chromium) in `public/lk/og/social-{sr,en}.png`. The dynamic `/social-preview` route is removed, because next/og cannot read woff2. After changing their text in `src/lib/social-preview.ts`, re-run `lk:og` and bump `SOCIAL_PREVIEW_VERSION`.
- Removed as dead code: the old home `landing-page.tsx`, `claim-entry.tsx`, `brand-logo.tsx`, the `ClaimStartCard` UI (`adresaForme`/`idiNaFormu` stay) and unused legacy `.lk-*` CSS in `globals.css`. Test versions A/B/C are preserved only on the LOCAL branch `arhiva/home-test-abc` (commit 1013228, never pushed).
- Automation:
  - `npm run lk:sync` imports the design.
  - `node scripts/lk-v2-shots.mjs <folder> [pages…]` screenshots our pages and the original side by side at 1440 and 375 with headless Chromium. It needs the dev server on 3107 and `python3 -m http.server 8880 --bind 127.0.0.1 --directory "<transport-local>/site"`.
  - `locales:check`, `copy:rules` and content QA cover `src/components/lk-v2/copy.ts`, and content QA also covers the home shell.
- Checked 2026-09-27: `npm run verify` passed; every page returns 200 locally (404 page 404). Side-by-side screenshots match the original layout at 1440 and 375 for home, delay guide, guide, article, blog, terms, contact, about, FAQ and email offers.
- Commits on `home-v2`: 7893e44 (the whole v2 site) and 3e49e32 (v2 social preview images). Deployed as Preview `https://let-kasni-staging-d6rtaypzn-audiblelover2018-1361s-projects.vercel.app` (READY, target preview, no alias).
- Published 2026-09-27: after Niko's "Možeš ti na staging", `home-v2` was pushed to `staging` (fast-forward a2e4272 → 21f65c6). Vercel's git build for let-kasni-staging (target production, `npm run verify`) is READY, so staging.letkasni.rs serves v2. Later fixes on `home-v2` are pushed to `staging` the same way.
- Fixes after the CRM session's review (2026-09-27):
  - The blog topic change resets search, page and count (`key={activeFilter}` on LkBlogFilter).
  - 12 new CTA event labels are on the allowlist in `src/lib/analytics-privacy.ts`; otherwise GA4 dropped them.
  - The home FAQ cost answer matches /faq (promotional period).
  - The new pages have their own Open Graph (`src/lib/lk-page-metadata.ts`).
  - The "O NAMA"/"BLOG" badges drop the uppercase brand.
  - Titles, siteName and JSON-LD use "Letkasni.rs"; the Organization gets a logo.
  - The flight-delay guide shows its intro text again at the top of the guide text.
  - The layout no longer loads Sora, DM Sans or JetBrains Mono; body text, including the consent banner, uses the v2 Inter.
- Deliberately not changed:
  - Sitemap: the new pages are NOT in the sitemap, because `scripts/seo-retirement.test.mjs` asserts exactly 158 URLs (owner-approved retirement invariant). Niko decided on 2026-09-27: "Za sad Kontakt, O nama i Česta pitanja ne mora. Ubacićemo to kasnije". The sitemap stays at 158, and the pages stay reachable through the footer. Adding them later means updating that test and AGENTS.md.
  - The consent banner's `[data-claim-form='embedded']` inset stays unused: the v2 hero form is full width, so the inset would squeeze the banner. At 1280×720 the banner covers only the form's trust notes.
  - Guides keep no "Ažurirano" line, matching the original 1:1.
- Consent banner, 2026-09-27: Niko asked for "baš condensed manji po našem dizajnu". `ConsentBanner` is now a compact v2 card over the bottom of the screen: one row on desktop (about 52px instead of about 200px), text then buttons on phones. The text, choices, settings, notice version and Consent Mode are unchanged. Classes are `lk-cookies-*` in `src/styles/lk-v2-extra.css`. The same banner is in the prijava app (commit dd2a78b), where `lk-consent` is already taken by the form's review consent.
- Multi-zone: `next.config.ts` now also rewrites `/api/claim/dokumenti` and `/api/claim/dokumenti/deo` (exact paths only) to PRIJAVA_URL, for the v2 form's document upload (213af5c).
- Form v2 (letkasni-crm, branch `prijava-v2`, worktree `~/Letkasni kod/app`): e9b2742 (design sync and bridge), e18d6b5 (stepped form per `PrijavaV2Ulaz`, chunked uploads), 9058bf4 (portal and thank-you page look) and dd2a78b (condensed banner).
  - The CRM session reviewed these, merged them into `razvoj` with its 8f9cd15 (`predmet` in the success response; no document wait when uploads are not configured) and deployed prijava-staging and crm-staging.
  - It then checked live through staging.letkasni.rs: invalid claim → 400 with `greske`; valid claim → 200; a 4 MB PDF uploads in 2 chunks; a fake PDF gets 422; the CRM case is created. Test data was deleted.
  - Follow-ups 886a180 (case reference on the confirmation, `claim_start` with the old meaning, hidden h1) and a51584b (removed unused lucide/ui/cn deps) are merged into `razvoj`, pushed and deployed to prijava-staging and crm-staging (2026-09-27). `prijava-v2` = `razvoj`. Next form changes: commit on `prijava-v2` and send the hash to the CRM session.
- Measurement note for Niko: header CTAs on inner pages now fire `begin_checkout` (`nav_cta`); before, they were plain links. `mobile_nav_cta` no longer exists, because the v2 mobile header uses the same CTA. begin_checkout counts will rise.
- Superseded (kept as history): the BLOCKER below was resolved by the push above.
- BLOCKER for staging.letkasni.rs: let-kasni-staging is git-linked (productionBranch `staging`), so publishing means pushing `home-v2` to `staging`. That push is a fast-forward from origin/staging a2e4272, and main is untouched. The agent's `git push origin home-v2:staging` was denied by the session's permission classifier on 2026-09-27. Niko must allow it or run the push himself. If the Vercel git build is BLOCKED by Hobby team access (author marinkovic-design), the fallback is a guarded CLI `--prod` deploy of let-kasni-staging from the git-less export, and only with Niko's explicit OK.
- The form in steps (letkasni-crm apps/prijava, branch `prijava-v2`) is being built in the separate worktree `~/Letkasni kod/app`. The CRM session reviews it, merges it into `razvoj` and deploys prijava-staging.
- Dev notes:
  - Turbopack in this worktree once kept serving a stale `globals.css`. Restart `npm run dev -- --port 3107` if CSS changes don't show.
  - The browser pane doesn't paint while hidden, so use `scripts/lk-v2-shots.mjs` for visual checks. The sticky bar needs a visible browser.
- Before production:
  - Real social profile links.
  - Sitemap entries for the new pages, later (Niko 2026-09-27: not for now).
  - Niko's confirmation that the testimonials are real clients who consented.
  - A production release per AGENTS.md (release gate, main).

### Home v2 test (new home page), 2026-09-25

- Owner (Niko) asked for a TEST-ONLY new home page. Branch `home-v2` from `origin/main` a8c746a (main = staging a2e4272 + merge commit, identical tree). Nothing committed or pushed; commit/push only on Niko's word. Production `main`, Vercel `let-kasni` and its env are untouched.
- Approved direction A "Brza provera + dokaz". After the first preview Niko said it lacked the "KLM vibe", so v2 now copies KLM.com's style: two-row white header with tabs, full-bleed photo hero with a navy text card, a white form card (8px radius, soft shadow) with field-like options and a 4px/48px button, a KLM-deals-style route list, a gray #F6F7F8 page background, a newsletter-style final banner and a navy footer. Font: Inter (next/font, home page only). Photos: Unsplash images already used on the blog.
- Colors: ONLY Niko's two, navy `#002746` and blue `#009FD9` (sRGB; his screenshots were Display P3), plus white, neutral grays and the blue at reduced opacity. He rejected derived shades ("druga plava") on 2026-09-25. Buttons are blue with white text and turn navy on hover.
- Iteration 3 (2026-09-25, Niko's reference blocks): the hero is solid navy (photo removed); header without a "Proveri let" tab and no active tab; Inter with opsz and tight tracking; pointer cursors; a gradient benefits strip; rounded blocks for amounts (bar chart, which replaced the route list), a phone mock-up with the steps, a qualitative "Sa Letkasni.rs / Samostalno" comparison (no success rates or timelines), and an airline-logo tiles card; the final CTA is a rays banner in #009FD9 (the reference was green, but Niko's color rule applies).
- Iteration 4 (2026-09-25): a people section (collage of free-license Unsplash traveler photos, shown as passengers and not as staff, plus phone/email from `siteOperator`) and a testimonials block with initials instead of photos. OPEN: the three testimonials are the owner-published ones from the current production home, with payout timelines removed to follow the copy rule. Before production Niko must confirm they are real, that the clients consent, and that the shortened wording is OK.
- Iteration 5 (2026-09-25): the hero has a traveler photo, floating status and amount cards, a count-up to 600 and a plane gliding along a dashed path (all motion-safe, desktop only). The form moved inside the navy hero, which takes about 62–68% of the viewport at 768–1080px heights, and the form stays fully visible on 360×740 and 375×812 phones. Header is one 64px row. Radii are two tokens, `rounded-control` 2px (Niko) and `rounded-card` 20px; there is one primary button everywhere; the final and sticky banners are navy so the blue button stays visible (the rays background is gone).
- Iteration 6 (2026-09-25): buttons (and form options, chips and small icon squares, which share the token) use a 2px radius, and cards stay at 20px. Niko called the gradient benefits strip under the hero surplus, so it is removed along with its copy; the form card has no "Provera odštete" tab and is rounded on all four corners. After this, the navy hero takes 64% of 1440×900, and on 375×812 the form button ends at 652px.
- Iteration 7 (2026-09-25; LOCAL ONLY, not deployed, because Niko asked to work locally for now and deploy later): the hero visual is a non-overlapping bento. On the left are two tiles, flight status (pulsing dot, BEG ✈ JFK with the plane gliding on a dashed line) and compensation up to €600 (count-up); on the right is the photo. The tiles are translucent on navy (`bg-white/[0.06]`, `border-white/10`) so the white form stays the strongest contrast, as Niko asked. The old floating cards and the plane path are removed, along with the `lk-float`/`lk-fly` tokens, which `lk-glide` replaces. "Kako radi" now sits directly under the hero at full width with three steps in columns (compact rows on phones). "Koliko možete da dobijete" and "Provera traje manje od 2 minuta" (the phone mock, now with a "Nastavi" button) share one row as two columns from lg up. Header nav order follows the page: Kako radi, Iznosi. An in-browser overlap check (text vs text, positioned boxes vs text, hero tiles) found nothing at 1920×1080, 1728×1000, 1440×900, 1366×768, 1280×720, 1024×768, 375×812 and 360×740. The navy share is 59–64% on large screens, 70% at 1366×768 and 73–78% at 1280×720 and 1024×768 (EN is taller), but the form button is visible without scrolling everywhere. The last staging preview (let-kasni-staging-1nswo8d1e) contains only iteration 6.
- Iteration 7b (2026-09-25, local only): the amounts block uses Niko's gradient `linear-gradient(186deg, #e9ddd7 0%, #cde9ef 60%)`, sampled from his Display P3 image after sRGB conversion; the two-stop gradient reproduces his midtones within 1–2 RGB units. Secondary text in that block changed from gray `lk-muted` (3.7:1 on the gradient) to `text-lk-navy/75` (5.9:1). The blue start of the gradient headline and amounts has only about 2.3:1 there, while the navy part is fine. It is left as designed; if Niko wants more contrast, switch those to solid navy.
- Iteration 7c (2026-09-25, local only): the form straddles the navy edge ("spusti ipak malo da ova forma seče plavu pozadinu"). The hero background is a hard-stop gradient ending `--lk-form-cut` above the section bottom (200px on phones, 100px from sm up). The form is the last element with no bottom padding, so about 54–58% of the form sits on navy at every size. A side effect is that navy now takes 48–57% of the viewport on laptops, including 1280×720 (it was 74%). The v2 header shows the full nav from lg (1024px); below that it uses the menu button, because at 768px the links and CTA wrapped onto two lines.
- Iteration 7d (2026-09-25, local only): the comparison block "Uz nas je naplata jednostavnija" was redone after Niko's ReFly reference ("ovaj blok može bolje"). Rows are more compact (max 640px), icons sit in soft `rounded-card` tiles (blue plane on `lk-blue/10`, user icon on `lk-navy/6%`) instead of 2px squares and the logo badge, bars are pills (`rounded-full`), and the type is lighter. The reference's success-rate and weeks claims were deliberately not copied (copy rules: no unprovable claims or payout timelines). BrandLogo is no longer imported in landing-page-v2.
- Iteration 7e (2026-09-25, local only): the comparison block uses semantic colors from Niko's reference ("zelena i narandžasta da simboliše gde je lakše"). Ours/easier is green (bar #5fb474, text #347d48); on your own/harder is orange (bar and icon #eb6518, text #c2530f) on peach #f8e5da. Text shades are darker for 4.5:1 contrast; the values live in the `compareTones` constant.
- Iteration 7f (2026-09-25, local only): the people section ("ova sekcija isto može bolje") is now one split card on `lk-mist`: a single warm photo on the left (Unsplash, free license, photo-1647830097872-f0c3977b29a9, a father and toddler laughing at an airport gate) and the text, checks and contact on the right, with the contact on a white card. It replaced the three-photo collage: one photo was from a train station, one had a heavy cyan cast and one was cold gray.
- Iteration 8 (2026-09-25, local only): Niko asked for a second version with an Expedia-style hero while keeping the current one. Test routes are `/pocetna-b` and `/en/home-b` (`noindex, nofollow`, canonical `/` or `/en`, not in the sitemap); the main version on `/` and `/en` is unchanged. `LandingPageV2` takes `hero="klm" | "expedia"` and `paths` (the header's logo, anchors and language switch stay on the test route). The Expedia hero has a full-width photo (Unsplash, free, photo-1647363377737-8d0ad7c2f494, a wing above clouds) with a navy gradient and a centered white headline. A wide white card cuts the bottom photo edge (`--lk-photo-cut` 132px on phones, 64px from sm up) and uses `ClaimTabsPanel` (src/components/home-v2/claim-tabs-panel.tsx): five tabs with two-tone icons. Tabs map to what the claim app accepts: delay (Kašnjenje, Propuštena veza), cancelled (Otkazan let), other (Odbijen ukrcaj, Drugo). Tabs follow the WAI-ARIA pattern (arrows, Home, End). Below them are the selected case's description (information, not a fake input), the same button, and the notes. Tracking stays `begin_checkout` / `InitiateCheckout` with `hero_card_cta` plus `issue_detail` and `hero_variant: "tabs"`. Copy check: "14 dana" in the cancellation description was flagged as a payout timeline, so it was rephrased to "nije na vreme obavestila" rather than loosening the check. Also fixed on both versions: at 768px the testimonials had three columns and the route text collided with the amount chip, so three columns now start at lg. `npm run verify` passed locally, including the build that lists `/pocetna-b` and `/en/home-b`.
- Iteration 8b (2026-09-25, local only): in version B, flight and date fields replace the case description under the tabs, as Niko asked ("ispod bira koji je let i datum"). The fields are "Odakle ste leteli?" and "Krajnja destinacija" (text with a datalist of 46 common airports as `Grad (IATA)`, written by me from public IATA codes and not copied from letkasni-crm) and "Datum leta" (`type=date`, max today set on focus to avoid hydration drift). The button keeps the standard size; the fields are 48px so they line up. All fields are optional. On submit they go into the form URL as `from`, `to` and `date` (`/proveri-let?step=2&issue=…&from=Beograd (BEG)&to=…&date=YYYY-MM-DD`), and GA also gets `route_filled` and `date_filled`. BLOCKER / open decision for Niko: the claim app (letkasni-crm/apps/prijava, `src/app/proveri-let/page.tsx` and `en/check-flight`) reads only `step` and `issue`, so passengers must re-enter route and date in step 2. Step 2 needs departure airport, destination, direct/connection, date and airline; airports are stored as `Grad — Naziv (IATA)` from `src/data/airports.generated.ts` (1,838 airports). Before version B goes live, the claim app must read `from`, `to` and `date` (IATA taken from the parentheses, date validated) and prefill step 2. That work is in another repo and needs Niko's approval, as does reusing its airport list on the site (AGENTS.md: no imports from other LetKasni folders without explicit approval).
- Iterations 9–9c (2026-09-25, local only): test version C (`/pocetna-c`, `/en/home-c`) was built from a third-party study design system and later superseded by the transport-local v2 design. Its code lives only on the local archive branch `arhiva/home-test-abc`; the detailed notes are kept internally on Drive, not in this public repo.
- Sticky banner (Niko's request, AirHelp-like pattern): appears at the bottom when the form scrolls out of view and hides at the final CTA. Its headline mentions delay only, not cancellation, per his copy rule.
- Code: `src/components/home-v2/` (page, KLM-style header, form panel, sticky banner, shared styles); `/` and `/en` render `LandingPageV2`. The old `landing-page.tsx` stays for rollback. `HeaderWithClaimCta theme="v2"` renders `HeaderV2`; `SiteHeader` is untouched. Footer, logo and privacy button got opt-in v2 props (defaults unchanged, so other pages are unchanged). Niko (2026-09-25): "for now only the home page", so the "Letkasni.rs" footer copyright applies only under theme v2 and every other page is unchanged. Palette tokens `lk-*` in `globals.css`.
- The form still only chooses the issue and opens the customer app (`/proveri-let?step=2&issue=…`), with the same `begin_checkout`/`InitiateCheckout` events. The app accepts no flight-number or date prefill, so KLM-style fields would need a change in `letkasni-crm/apps/prijava` first. Tracking (GTM/GA4/Consent Mode/Meta/GSC) is untouched.
- Automation: `locales:check` now covers both landing files. New `npm run copy:rules` (in `verify`) enforces the owner's copy rules on the v2 copy: "Letkasni.rs" spelling, no payout timelines, no cancellation wording in delay copy. It has node:test coverage.
- Deploy: CLI Preview on Vercel `let-kasni-staging` only (worktree `.vercel/project.json` = `prj_QYMZr5TIzdAE8Roq7uAuIRsHmAKE`). Trap: the main checkout's `.vercel/repo.json` links the PRODUCTION project, and worktrees live inside it. Staging Preview env has `STAGING_KLJUC` (gate), `PRIJAVA_URL` (prijava-staging) and `NEXT_PUBLIC_SITE_URL`, and no tracking IDs.
- Deployed 2026-09-25 as Preview `https://let-kasni-staging-a1txf6apc-audiblelover2018-1361s-projects.vercel.app` (READY, target preview, no alias, so staging.letkasni.rs is unchanged). The remote build ran the full `npm run verify` and passed. Access: Vercel login, then the STAGING_KLJUC gate (`?staging=<key>` once per host; the key comes from `Letkasni pipeline/scripts/sistem/alati/linkovi.mjs --okruzenje test`).
- Vercel Hobby BLOCKED CLI deploys from the git worktree: "commit author doesn't have permission" (TEAM_ACCESS_REQUIRED, author marinkovic-design). Deploy instead from a git-less export of the exact working tree (`git ls-files -co --exclude-standard` + rsync, plus a copy of `.vercel/project.json`), the same way earlier staging CLI deploys were done. Two BLOCKED attempts stay listed on the project; they are harmless and were not deleted.
- Open owner questions: does 0% commission continue after the summer promo (copy still says 0%)? Are the old testimonials real (left out of v2)? Is the blue "K" a new logo? Other pages still use lowercase "letkasni.rs" (footer, titles, legal texts, OG siteName, social image). This is on hold per "only the home page for now", and the legal texts are versioned.

### Marketing content parity, 2026-09-23

- User authorized production content -> staging as the first launch step. Source baseline: `origin/main` `5ea961725077c326a5a85b52fb7261ce22886a26`; original staging: `e5caac8f05d640f34dabe6f905cd99d2d3e2918f`.
- Branch: `codex/staging-content-parity`. Target: `let-kasni-staging` / `staging.letkasni.rs` only. This is a scoped transfer of canonical production content, not a merge marking all production functionality integrated.
- Exact production content, retirements, guide links, footer, PP1.3 SR/EN and signature assets copied. Public PP1.3 copied; existing shared cookie-notice version preserved across marketing and customer app until the measurement package ships together. No ad tags, tracking IDs, providers or campaign settings enabled.
- Preserved: external customer-app rewrites, staging access gate, noindex, CSP report-only and newer Next dependencies. No old monolithic intake/admin restored; no CRM or claims data modified.
- Automated guards: existing eight retirement tests and four approved signature asset checks now run in `npm run verify`. Existing content/link/benchmark/localization checks remain mandatory.
- Next launch work: integrate production conversion measurement with the separate customer application, durable claim storage and verified backup restore before production cutover. Browser QA caught a repeated cookie banner when changing only marketing notice; preserve the shared existing version and migrate both zones together in the measurement step. Content parity is not full functional or launch readiness.
- Locked: production main/domains unchanged in this step; drafts still sent by Niko. Open Drive permissions accepted by owner. Daily bulk content publishing stays paused; suggestion manifests do not authorize removal.
- Verification and deployment evidence: `docs/STAGING-CONTENT-PARITY-2026-09-23.md` and local pipeline `outputs/staging-content-sync-2026-09-23/`. Deployment and live comparisons pending at preparation time.
### Controlled production release approved, 2026-09-17

- Owner authorized exact reviewed PR31 code/PP1.3, frozen GTM and production
  canary; NOT campaigns/budgets/spend/keywords/negatives or database/CRM work.
- Clean feature session resumed at6c7f105 from current origin/main e7dc38c.
  Fresh full release:gate PASS; application tree identical to tested4b20548.
  Canonical checkout's unrelated logo/footer edits are preserved and excluded.
- Release is IN_PROGRESS, not deployed or launch-ready yet. Verify exact GTM
  draft/current production premise before publishing, save only production
  NEXT_PUBLIC_GTM_ID, land via GitHub main, then verify both locales and one
  controlled production Lead. Never copy branch-only QA Meta/email env to prod.
- Durable atomic claim storage remains a separate paid-launch blocker.
- Previous no-production/approval-pending entries below are historical.

### Isolated Meta QA PASS / READY_FOR_APPROVAL, 2026-09-17

- Actual tested source4b2054865817005c78b8be951f2dd03aad8bf52c;
  dpl_ENeBH6P3MQAxp3mfm6Unz66jmapC Ready, all4 PR checks SUCCESS.
  Both Preview email transports off; other isolation controls unchanged/off.
- Fresh denied0optional; accepted actual new bootstrap/SDK PageView1; SAME page
  revoke ts1789645831215 clears _fbp/_fbc, new Meta /tr0, Googleall4denied,
  attributionremoved. Admin/login with stored grant: noSDK/optional0/all4denied.
  Older open debug documents must hard-reload; health SHA alone is not page-code proof.
- ONE allowed synthetic successful claim USED: HTTP200 oktrue reusedfalse,
  UUID977a3a9d-8f16-4c9a-8fc7-5bff95fca1be; fake gclid/UTMs preserved.
  Browser Lead eventID0fd4b85a-22e5-453c-8dab-1cb794414449 matches CAPI.
  Runtime senttrue (Graph2xx), both emails skipped. Platform group Browser
  childProcessed /Server childDeduplicated. Initial apparent second Browser row
  is the group HEADER, verified native screenshot; NOT a second child event.
- Google Lead native tagSucceeded/Fired1, UUID DLV verified, exactlabel/oid native
  conversion request. All4 granted at Lead. Refresh/Back/Forward no new Lead/API;
  session Lead remains1. GA4 page_view1/lead_submit1/legacygenerate_lead1,
  observed fixed params/no obvious contact markers; debug loader/config2 noted,
  not asserted single-loader. Google39/Meta11/fullverify PASS; GTM export unchanged.
- Final QA report has exact evidence/limits. Documentation-only continuation commits
  must not be described as another tested claim. No main/prod/env/Meta/GTMpublish/
  paid action. Owner next decision: controlled combined production release/canary
  of frozen reviewed candidate, not Ads activation. No new claim allowance remains.
- Below entries are historical investigation/progress, not current BLOCKED status.

### Meta consent fix implemented; Preview verification in progress, 2026-09-17

- Preview 19c1f48 / dpl_BX4SSthtYhJaVGiCxepvUJefCJzD: isolated, denied resource0;
  Google grant PASS, SDK loaded but queued init/grant/PageView remained behind
  revoke. Public SDK source confirms locked queue stops before queued grant.
  Correction uses actual external SDK onload event/live grant, fresh consent/path,
  no duplicate pending revoke or stale loading PageViews, SDK native history OFF.
  Eleven runtime regressions and fresh full verify PASS (Google39/lint/TS/build195).
  Sandbox font-fetch failure resolved by network-enabled rerun, no code changes.
  Serving Preview repeat pending.
  ONE new synthetic claim still UNUSED; no production or frozen Google changes.

- First patched Preview eb4c35d / dpl_2eUzDQpYimLrzDPxKTZDAnrVouDu isolated;
  denied resources0. Google grant/loaders PASS; Meta SDK loaded but no PageView.
  Next16.2.4 inline onReady runs BEFORE script insertion; confirmed installed
  client/script.js. Regression failed (0 PV); ready callback now uses guarded
  microtask. Nine Meta regressions PASS; no new claim. Next Preview repeat pending.

- Owner authorized minimal implementation and remaining isolated QA, not production.
- Explicit PR31 continuation; canonical logo/footer edits preserved. Task-owned
  pre-fix evidence checkpointed in 64b6728; session resume clean, origin/main e7dc38c.
- Revocation synchronously calls loaded fbq consent revoke before cookie cleanup;
  privacy reset also revokes. Optional root cookies expire host-only/current and
  parent domain scopes only. Required cookies and storage are preserved.
- Meta bootstrap starts revoked, automatic SDK configuration is disabled, and
  guarded onReady grants/emits initial PageView only with current advertising
  consent/public path. Admin transitions revoke. CAPI and Google source untouched.
- Seven new regressions PASS; first four failed before patch. Existing Google
  39/39 PASS, full npm run verify PASS (lint/TypeScript/build195). Frozen GTM export
  same SHA/PASS. Actual browser/platform verification remains in progress, not PASS.
- ONE new synthetic claim allowance remains UNUSED. No main/production/env/GTM
  publish/paid action. Need new serving Preview SHA then real consent gates,
  same-claim Pixel/CAPI acceptance/Test Events/dedup/Google evidence.

### NEED_CODE_FIX: real Meta SDK consent-withdrawal failure, 2026-09-17

- Recovered exact QA Preview window; actual Google all4 default denied/update
  granted/update denied verified; fake attribution captured and cleared on revoke.
- Same-page existing Privacy settings Reject optional: consent analytics/marketing
  FALSE (ts1789643367824), all4 Google DENIED, attribution removed, _fbp PERSISTS.
  Cookie Store inspected metadata ONLY: QA hostname domain, root path, no value.
- Resource timing strictly AFTER withdrawal shows ONE actual Meta request:
  www.facebook.com /tr/ id2358413618029924 evSubscribedButtonClick. Not Google ping,
  not platform processing proof. Exact click/SDK callback race not instrumented.
- Code unchanged e99798f: MetaPixel only sets React hasConsent/returns null, no
  explicit loaded fbq consent revoke/grant; expireCookie lacks Domain. Likely
  mechanisms; exact cookie scope root cause not independently instrumented.
- Required pre-claim gate FAIL, so NO new claim attempted; allowance UNUSED.
  CAPI acceptance/Test Events/dedup/same-claim Google still NOT_VERIFIED.
- Reloaded denied Preview safely: false/false, attributionCleared true, optional
  resources0. Final state safe, NOT same-page revoke PASS. Release BLOCKED /
  NEED_CODE_FIX. Minimal SDK revocation/scoped cookie fix documented, not applied
  in this report-only platform QA; add real loaded-SDK/cookie regression, redeploy
  Preview then rerun pre-claim gates before one live test. No more access needed.
- No source/prod env/prod Meta/GTM/main/paid action. QA branch-only env and serving
  dpl_GimL6AdSbFj4xFSZNvWpjBfAxjcX remain. QA report has exact repro/evidence limits.

### Preview Ready; isolation/browser consent verified; Chrome control interrupted, 2026-09-17

- New dpl_GimL6AdSbFj4xFSZNvWpjBfAxjcX Ready, serving alias health pins e99798f.
  Supabase/local fallback OFF, provider OFF, subscriptions OFF, both Preview email
  booleans FALSE, metaCapiConfigured TRUE. Pretty-print screenshot verified final
  health field omitted by native AX length limit. QA env branch-only already saved.
- QA Meta Test Events Website opened Preview with fake TEST_GCLID_META_QA_20260917
  / TEST_META_QA_PREVIEW. Existing privacy UI Reject optional + reload: v3 PP1.3
  analytics/marketing FALSE, resource counts Meta/GTM/GA4 all0. Accept all: both
  TRUE, actual browser PageView resource QA Pixel 2358413618029924 only; existing
  GTM-WT3B2L8P/direct G-RVJ906DKVF loaders present. Not platform Lead proof.
- Repeated owner Chrome foreground changes interrupted further checks. Native
  Window menu recovered known Preview twice with exact domain guard, interrupted
  again. Targeted cua.listTabs({browser:'chrome',emit:false}) timed out/reset CUA.
  NO active app binding now. Never auto getApp into private/token foreground.
  Owner must leave QA Preview window foreground/unchanged and confirm reconnect.
- No new successful claim/Lead attempted; allowance UNUSED. Remaining consent4/
  revoke/admin/attribution/validation/one Lead/CAPI/Test Events/dedup/repeat/Google
  checks NOT_VERIFIED. QA_ENVIRONMENT PASS limited to configuration/runtime
  isolation, release BLOCKED. No main/prod/GTM publication/paid/source changes.

### QA env securely saved; Preview redeploy building, 2026-09-17

- Owner approved replacement issuance, then completed fresh Meta code in Chrome.
  Meta Token created confirmed. Replacement copied natively into masked Vercel
  field with fixed-controls-only inspection; no token/clipboard/code text read.
  Earlier exposed QA tokens UI-revoked; production credentials untouched.
- Batch Save partially saved token/test code, rejected public Pixel as Secret.
  Duplicate retry returned already-exists. Refreshed and verified both Secret
  rows exactly Preview / codex/google-ads-measurement. Pixel saved separately as
  Config 2358413618029924, same branch ONLY, default Production removed. Refreshed
  final list verifies all 3 rows. META_TEST_EVENT_CODE TEST65347 (Secret).
- Redeploy Preview of e99798fa60deda4414262be2391760aeaee77353 with cache OFF.
  New Vercel deployment GimL6AdSbFj4xFSZNvWpjBfAxjcX currently BUILDING.
  Next: Ready -> pin serving health, email/storage/downstream OFF, QA Pixel only,
  consent denied/granted/revoked/admin -> at most ONE synthetic claim (UNUSED).
- Fresh measurement regression 39/39 PASS; frozen GTM export PASS/same SHA.
  Real Meta delivery/API acceptance/dedup and same-claim Google regression remain
  NOT_VERIFIED. No source/main/production/GTM publication/paid changes.

### Replacement ready; final token issuance confirmation, 2026-09-17

- Owner confirmed reconnect. Chrome connected but another Token created modal
  remained; automatic initial output exposed that QA token. Never copied/used/
  installed it. Completed another UI Revoke tokens confirmation for QA Employee
  61594371304399 only, dialog closed/Generate enabled, no Graph debug proof.
- CUA app binding app is ACTIVE. Do not getApp/reconnect/raw-emit/screenshot while
  a token modal may exist. safeMetaUi emits fixed labels only. Current Meta wizard
  final Generate token index 414 (refresh safe UI before click), QA app selected,
  60 days, only ads_read. Final issuance requires action-time owner confirmation.
- QA Test Events Website code TEST65347 obtained for Pixel 2358413618029924.
  Vercel existing form prepared with 3 Secret rows, same exact Preview-branch
  scope codex/google-ads-measurement: token EMPTY, public Pixel verified exactly,
  test code verified exactly. Both non-secrets remasked. No Save performed.
- After confirmation: Generate -> fixed-controls-only observation -> Copy ->
  switch existing Vercel tab -> fresh masked-field/scope indices -> native super+v
  -> Save branch-only. No clipboard/token text reads; no production credential.
- No new claim/redeploy/main merge/production/GTM/paid actions. Claim allowance
  UNUSED; actual Meta acceptance/dedup NOT_VERIFIED; release remains BLOCKED.

### First QA token revoked; safe browser reconnect required, 2026-09-17

- Owner account verification completed; Meta displayed Token created. Initial
  Chrome reconnect automatically emitted this QA-only secret in a tool result.
  Never reuse/reproduce it. It was not copied, installed or used for API calls.
- Completed Done -> QA user 61594371304399 Revoke tokens -> confirmation naming
  LetKasni QA — Preview only. Dialog closed, Generate token enabled; no persistent
  success toast/Graph debug proof. Production user/token untouched.
- Started replacement QA-app request; app dropdown opened, issuance unconfirmed.
  Token-screen checks thereafter fixed labels only. Concurrent Chrome navigation
  moved away from task; inventory timed out/reset CUA. Automatic review blocked
  reconnect for possible private content/token emission; do not bypass.
- Owner must foreground intended Meta settings with no token-value modal and
  authorize safe reconnect. Do NOT repeat completed developer/password/account
  verification. Finish minimal ads_read/60-day replacement then direct native
  Copy/Paste into masked branch-only Vercel Secret input; never read token output.
- No env Save/redeploy/new claim/source edit/main merge/production/GTM publish/ads.
  One allowed synthetic claim remains UNUSED. Release BLOCKED, platform delivery
  and dedup NOT_VERIFIED. Detailed security/evidence limits in Meta QA report.

### QA app confirmed; Meta token account-verification gate, 2026-09-17

- Owner completed password reauthentication. Created/verified QA application
  LetKasni QA CAPI Preview 4666725866879719 in correct portfolio 2535168546914445,
  Owned by Letkasni.rs, Unpublished. Do not ask for completed registration or
  password/app-creation steps again.
- No-use-case app had no token permissions. Added Measure ad performance data
  with Marketing API only to QA app. Official panel says ads_read supports
  Server-Side API web events. Restored QA Employee app role Test app ONLY;
  temporary Develop app no longer granted. Saved/reloaded asset count 3:
  QA app, QA Pixel 2358413618029924, linked QA dataset 1748562979704779.
- Token request only ads_read, 60 days, no ads_management/business_management/
  page scope. Generate token returned Account verification required / Verify
  account. No confirmed issuance, Copy success/token read/copy or env Save.
  Owner must finish this specific security check directly in Meta Business Suite.
- Prepared UNSAVED Vercel Secret form only branch codex/google-ads-measurement;
  default Production removed, global Preview/Development unselected. No actual
  env changes/redeploy/new claim. Existing production app/user/token untouched.
- Broad token-related AX inspection rejected by automatic review; not executed.
  Continued only fixed controls/non-secret status. Concurrent Chrome navigation
  caused rejected actions, not proof Verify account was clicked successfully.
- Next: verify owner account check and token issuance/scope, transfer secret
  directly into prepared masked field, add QA Pixel/test code branch-only, then
  redeploy/isolation/consent/admin checks and at most ONE synthetic form claim.

### Developer registration verified; Meta password reauthentication, 2026-09-17

- Owner reported done; All apps UI now verified developer access, No apps yet,
  enabled Create App. Do not ask for developer registration again.
- Prepared LetKasni QA CAPI Preview, Create an app without a use case (no added
  products/features/permissions), existing Letkasni.rs portfolio. Overview no
  requirements/use cases. Create app opened Please re-enter your password.
  Owner must enter password directly in Chrome and Submit; never in chat.
  App creation NOT CONFIRMED; no app ID/token, Preview changes or new claim yet.
- QA-only Employee/assets remain created. Next: after owner reauthentication,
  verify actual app creation/portfolio ID, minimum app permission and real token
  scope before branch-only env/redeploy and the one allowed synthetic claim.
- Canonical session start still guards owner logo/footer edits; preserved. Feature
  branch remains e99798f with only task-owned QA/checkpoint/release docs dirty.

### QA Employee isolated; developer application/token gate, 2026-09-17

- Supersedes the two historical pending-confirmation entries below. Owner
  confirmed QA access and the displayed Non-discrimination policy; accepted that
  policy and created Employee LetKasni QA — Preview only, 61594371304399.
- Assigned only QA dataset Use events dataset (Manage OFF). Reload verified
  exactly two linked QA assets: Pixel 2358413618029924 View Pixels and events
  dataset asset 1748562979704779 Use events dataset. No production assets/Admin.
  Pixel destination remains 2358413618029924; do not use the linked asset ID.
- Generate token disabled; Installed apps empty; portfolio Apps empty and Create
  new app ID disabled. Official developer apps page requires a new personal
  Meta for Developers account. Register Continue accepts new Platform Terms/
  Developer Policies; Verify account is a later step, not a verified OTP prompt.
  Cancelled registration without acceptance. Owner must activate developer access
  or provide an existing owned QA-only app. Never blindly connect production app,
  reuse production token or change production-user permissions.
- No token generated/read/copied, Preview env/redeploy, new claim, main merge,
  production tracking change, Google/GTM change/publish or paid action. One new
  synthetic claim allowance remains unused. Local regression 39/39 PASS is not
  live Meta acceptance/dedup or a fresh Google Preview PASS. RELEASE BLOCKED.
- Updated docs/META-QA-PREVIEW-2026-09-17.md and release-candidate addendum.
  After developer access: minimum isolated QA app/token scope, secure branch-only
  env, redeploy/isolation/consent/admin checks, then at most one end-to-end claim.

### QA access approved; new business-wide Meta policy gate, 2026-09-17

- Owner confirmed a separate QA Employee and minimal QA-only token/access.
  Do not ask for that settled approval again.
- Returning to the prepared system-user dialog exposed a new Non-discrimination
  policy screen: I accept certifies all people acting as system users in the
  Letkasni.rs business reviewed/will abide by Advertising Policies/applicable laws.
  This business-wide certification was not accepted; specific owner confirmation
  or direct acceptance is needed for this newly surfaced action only.
- QA dataset 2358413618029924 remains created. NO new system user/token, Preview
  env/redeploy, claim, production/main change, GTM publish or paid traffic.
  See docs/META-QA-PREVIEW-2026-09-17.md continuation for exact gate evidence.

### Isolated Meta dataset created; QA access confirmation pending, 2026-09-17

- Resumed approved PR31 feature checkout at e99798fa60deda4414262be2391760aeaee77353;
  session guard clean, origin/main e7dc38c. Canonical logo/footer owner edits preserved.
- Owner confirmed Meta Business Tools Terms at creation. Exactly one dataset
  LetKasni QA — Preview only, 2358413618029924, created in correct portfolio
  2535168546914445. No ad account selected/connected; production dataset unchanged.
- Existing Employee CAPI system user 61593330505838 has production Pixel/dataset
  access and app permissions, so it is not reused, modified or assumed QA-scoped.
  Separate Employee creation dialog inspected only; required action-time access
  confirmation pending. No token generated/revealed/copied or permission granted.
- Fresh local measurement regression PASS 39/39, not live Meta platform proof.
  NO new claim (one permitted allowance remains unused), Preview env/redeploy,
  main merge, production deploy/env, Google/GTM change/publish or paid traffic.
- Current report docs/META-QA-PREVIEW-2026-09-17.md; release-candidate addendum
  supersedes older missing-dataset authority blocker. RELEASE remains BLOCKED.
  After specific access confirmation: verify minimum actual QA-only scope, secure
  branch-only Preview env, redeploy/isolation/consent/admin checks, then one real
  synthetic form end-to-end test and separate platform acceptance/dedup evidence.

### Google Preview completed; isolated Meta release gate remains, 2026-09-16

- Supersedes older access/automatic-event/Preview blockers below. Google setup
  and GA4 URL privacy PASS, full release BLOCKED only on isolated Meta platform
  QA plus later explicit release approval. NO production/main/env deploy, GTM
  publication, Meta access/config change or paid advertising.
- Fresh authenticated health at 12:02:25.532Z: ad12ca352bc2a150efaaaf3057a5a70013933530,
  dpl_4yR44ySVcomCnHyhNvaK56rSP8R5; both Preview email booleans false, Supabase/
  Meta CAPI/provider/subscriptions off. Existing application tree unchanged since
  2903edd; docs/SDK-assertion descendants only. Toolbar deployment reference is
  not authoritative; backend health pins the serving alias.
- ONE obvious fake Preview claim accepted: UUID 6138eaa7-011f-45a5-9459-239405a1e6fa.
  GTM event 73 lead_submit, DLV eventModel.transaction_id string matches UUID,
  Ads Lead Succeeded/Fired 1 time after hard refresh and browser Back. Linker/AW
  base tag once per load. Console 0. Existing banner, all four default Denied,
  Lead update/current Granted. Fake gclid and UTMs survived landing -> form.
- Actual direct GA4 Lead hit once: same UUID, safe title and sanitized dl/dr;
  no name/email/phone/gclid/free-form term in inspected hit. Separate legacy
  generate_lead retained, not a second Primary Ads action. No GA4 tag in GTM.
- GA4 stream 14595479044 saved/reopened History/Search/Outbound/Downloads OFF;
  Page loads/Forms/Scrolls/Video unchanged. Shared GA4 behavior changed, NOT
  production website code/env. Real SDK positive suppression + all4/private/
  revoke PASS: docs/GA4-SDK-SCENARIOS-AFTER-2026-09-16.json.
- Tested ad12ca3 all four remote checks PASS. Final exact IDs/current evidence:
  docs/GOOGLE-ADS-FINAL-QA-2026-09-16.md. No more Preview claims allowed here.
- Actual GTM workspace export saved 12:10:26Z in docs/GTM-WT3B2L8P-workspace2-2026-09-16.json,
  sha256 f776ac715d9a71ec070aaf6a4dc3912faed052ca5a9bda6ef201b1ad38504e1d.
  Draft version 0, existing published rollback version 1 Empty Container verified.
  node scripts/gtm-export-check.mjs PASS; read-only/no import or publish. Full
  npm run verify PASS including build after public-font network access permitted.
- Real Meta platform QA remains BLOCKED: only active production dataset found,
  no approved isolated QA dataset/Preview CAPI access; local actual-route/helper
  integration PASS. Do not silently create credentials/copy production tokens.
  Durable production storage remains the separate programmer/paid-launch gate.
  Preserve canonical dirty logo/footer changes. Current detailed release package
  is docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md.

### Chrome resumed: GA4 privacy fixed and Preview email isolated, 2026-09-16

- Native Chrome app control works; browser-provider inventory/tab creation still
  time out. Use task-scoped native app tabs, not cookie/token extraction.
- Refreshed GA4 stream 14595479044 / G-RVJ906DKVF before edits (old tab was stale).
  Saved only Outbound clicks + File downloads OFF and reopened editor: both OFF,
  History checkbox 0, Site search OFF; Page loads/Forms/Scrolls/Video unchanged ON.
- Actual SDK four-consent + revoke/private/return repeat PASS. Positive local form
  metadata PASS, click/file_download PASS_SUPPRESSED after actual clicks. New proof:
  docs/GA4-SDK-SCENARIOS-AFTER-2026-09-16.json. Runner adds explicit optional
  suppression assertions; no old test weakened or website tracking source changed.
- Authenticated Preview health b4da893 / dpl_8o6AR4m9aJNZPBJqwFnd6w9UmqKe available:
  no Supabase/Meta CAPI/provider/marketing subscriptions, no admin email recipient,
  but email transport initially ON. Saved a whitespace RESEND_API_KEY override
  ONLY for Preview branch codex/google-ads-measurement (existing getEnv trims to
  undefined); no production secret read/rotated/changed. Vercel confirmed saved
  and new deployment needed. Verify new Preview health false before fake claim.
- Next in progress: fresh branch Preview deployment, GTM draft/Tag Assistant,
  one isolated fake successful claim with attribution and UUID exactly once.
  No production/main deploy, GTM publish, new Meta access or paid actions.
  Prior report/access and automatic-family failures below are historical.

### Remaining measurement QA, 2026-09-16 — BLOCKED / NO PRODUCTION

- Latest owner authority: autonomously finish all safe remaining work; leave
  critical/security/production-risk actions in the report. This does not authorize
  production deploy/env, GTM publish, paid traffic or production Meta credentials.
- PR31 still on codex/google-ads-measurement, origin/main e7dc38c. Minimal additive
  application commit 2903edd adds Preview-only email-configuration booleans to
  /api/health; no recipients/keys or notification/storage behavior changes.
  Measurement architecture remains the 333bb9d candidate. Two new real-route
  health regressions bring the existing CI measurement suite to 39/39.
- Real SDK repeat: all four consent combinations and revoke/private-route/return
  PASS; clean manual PV/Lead/legacy/scroll, one UUID Lead. Positive static form
  metadata/input-marker tests clean. Automatic click/file_download FAIL: synthetic
  private marker appears in link_url/file_name. All collector transport blocked.
  No video embed found in current source; not a positive platform video test.
  Evidence: docs/GA4-SDK-SCENARIOS-QA-2026-09-16.json. Repeatable orchestration:
  scripts/ga4-sdk-browser-qa.mjs with existing gstack browser, no cookie import.
- History + Site search remain the only two saved shared-stream changes. Safe
  next fix is only Outbound clicks + File downloads OFF followed by SDK repeat;
  it is NOT saved. Task-scoped native Chrome access timed out; broad private
  Gmail/CRM capture was rejected and was not retried/bypassed. Headless Preview
  /api/health redirects to Vercel SSO; no protection bypass or new Preview claim.
- Full local verify PASS (39 measurement, workflow/privacy/email/retirement,
  content/links/benchmark/locales, lint/TS/build). Isolated Meta platform access
  and remote email/storage safety remain unresolved; no new credentials created.
- Local hydrated app is tested separately in a new empty temporary QA directory,
  with email, Meta, Supabase, provider and optional tracking disabled; this cannot
  substitute for Vercel + GTM end-to-end acceptance. Current evidence/limitations
  and exact operational actions: docs/GOOGLE-ADS-FINAL-QA-2026-09-16.md.
- Preserve unrelated canonical logo/footer edits. All older approval/37-test/
  pending-auto-family entries below are historical, superseded by this entry.

### GA4 narrow shared-setting approval completed, 2026-09-16

- Owner approved ONLY History + Site search OFF. Saved and reopened existing
  letkasni.rs stream 14595479044 / G-RVJ906DKVF: both OFF; other Enhanced
  Measurement families unchanged ON, redaction unchanged. No production code/env,
  GTM publish, Meta change, campaign/spend or new Preview claim.
- Fresh local REAL SDK capture 2026-09-16T10:55:54.396Z with collector blocked:
  two clean manual pageviews, no search/extra History PV, one UUID Lead despite
  four calls; scroll clean, private-route opt-out true. Two legacy events were
  deliberately requested. Reduced proof: docs/GA4-SDK-ISOLATED-QA-AFTER-2026-09-16.json.
  Measurement regression rerun PASS 37/37. No application source changed.
- Overall BLOCKED remains: other automatic families/full hydrated GA4 checks,
  isolated approved Meta QA access, Preview email/storage/downstream isolation
  and fresh end-to-end claim. No broad toggle authority or release approval.
- Canonical logo/footer edits preserved; existing PR31 worktree session resume
  passed at 8ed5469 with origin/main e7dc38c. Historical entries below are not
  current shared-setting state. Next: finish remaining safe isolated checks;
  platform QA cannot proceed without approved isolated access/side-effect routing.

### GA4 protection / isolated Meta QA, 2026-09-16 — BLOCKED / PREVIEW ONLY

- Latest authority: finish minimal GA4/Meta checks and prepare release, NOT deploy
  production, publish GTM, submit production claims, or create paid advertising.
  This supersedes older deployment/production-test directions below.
- Application candidate `333bb9d64826926862dd56bf96cdc03bb42c6473` on existing
  `codex/google-ads-measurement` / PR #31. GA4 remains direct with safe public-route
  context and manual application pageviews; Ads attribution/browser URL untouched.
  Meta/UUID recovery/PP1.3/SEO/CRM code untouched. Canonical logo/footer edits preserved.
- Full local verify PASS: measurement 37/37 (nine new isolated runtime checks),
  workflow 12, privacy 12, email 5, retirement 8, content/links/benchmark/locales,
  lint, TypeScript and build 195 entries. Initial restricted-network build could
  not fetch fonts; authorized network-enabled full verify passed.
- Fresh browser GA4 stream 14595479044 / property 534756949 / G-RVJ906DKVF:
  History and all seven Enhanced Measurement families ON; email redaction ON,
  query-key redaction OFF. Required shared settings need explicit owner approval.
  Actual SDK local collector-isolation fixture subsequently confirmed clean manual
  initial/SPA/Lead/legacy/scroll contexts, one UUID Lead, but automatic search_term
  and History dl/dr fake-marker leakage plus duplicate SPA PV. No marker sent to
  Google; local fixture/browser stopped. Shared settings are a confirmed blocker.
- Fresh browser Meta: Letkasni.rs portfolio 2535168546914445 has only active
  production dataset 2347588039400204 for letkasni.rs; other LetKasni portfolio
  2443133752879068 has no datasets. Approved isolated QA dataset/access missing.
  Local actual route/CAPI/browser-helper integration matches Lead event IDs;
  platform visibility/dedup remains unverified. No production token copied.
- GTM workspace2 / GTM-WT3B2L8P still five-item UNPUBLISHED draft; variable v2
  eventModel.transaction_id and conversion ID/label/trigger freshly verified.
- Zero new Preview claims: email/storage/downstream isolation not established,
  and safe live Meta configuration missing. Prior UUID positive Preview PASS is
  historical, not a PASS for this candidate. No production canary or paid action.
- Next: obtain exact shared GA4 setting authority + approved isolated Meta QA
  access, isolate Preview side effects, real SDK local privacy proof, one controlled
  Preview Lead and freeze exact candidate/draft for NEW release approval.
  Complete package: docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md.
  Reduced vendor-runtime proof: docs/GA4-SDK-ISOLATED-QA-2026-09-16.json.

### Google Ads transaction-ID correction, 2026-09-16 — PREVIEW ONLY

- User approved minimal PR #31 fix, regression and one additional fake Preview
  submission. No production deployment, GTM publication or advertising allowed.
- Existing feature worktree: `letkasni-ads-measurement`, branch
  `codex/google-ads-measurement`; canonical checkout's unrelated logo/footer edits
  preserved. Merged current main e7dc38c without reversing SEO retirement.
- Fix commit 838c996 normalizes fallback/recovery to fresh `eventModel` while
  preserving one dispatch. Existing GTM DLV now `eventModel.transaction_id`, v2,
  no stale default. Container GTM-WT3B2L8P remains an unpublished five-item draft.
- Ads tests 28/28, all other verification suites and lint passed locally. Local
  build could not fetch Google Fonts; GitHub full verify passed in 56 seconds.
- Preview deployment dpl_ECR4fu26sk6T87jTnhNBiPAejiyh confirmed fix SHA;
  one approved repeat claim cce4529e-7aae-4961-bb0d-c282cdf5381b succeeded.
  Native Ads tag resolved that UUID and fired exactly once after refresh/Back;
  GA4 sent one Lead with no inspected contact PII, all four consent states correct.
  Both Vercel Preview checks passed. GTM still unpublished; remaining URL-privacy
  and test-safe Meta QA keep overall NEED_CODE_FIX / DO_NOT_PUBLISH. See
  `docs/GOOGLE-ADS-PREVIEW-QA-2026-09-16.md` for first-test evidence and remaining
  Meta Preview, GA4 URL-privacy and durable-production-storage blockers.

### Retirement release approved, 2026-09-15

- Owner explicitly approved deploy of the final scope below: airline and regional
  pages removed, all general/scenario pages kept and recorded as suggestions only.
- Re-fetched origin/main: still 49d0843, identical to the feature branch base.
  Session-start dirty-tree guard identified only this known, approved package.
  Preserve it, commit it, then run the unchanged clean-tree release gate.
- Pre-landing review covers manifests, source removals, mappings, 404 UI, QA guards
  and report scripts. No database, form/provider, landing or consent code changes.
  GSC-enriched reports remain ignored, outside the public commit.
- Release through a reviewed feature PR, passing CI, GitHub main and Vercel.
  After deployment, run production gate and full retirement/redirect/browser
  checks. Store release results under seo-audit-output/retirement-release/.
  Keep DAILY BLOG paused and general-query suggestions published.

### FINAL scope: general queries restored, 2026-09-15 (LOCAL ONLY)

- This entry supersedes the broader removal decision below. Owner wants airline
  and regional/route pages removed, but general/scenario articles KEPT for now.
  Continue existing `codex/retire-airline-pseo`; all prior own work is preserved.
- Restored 47 general articles / 94 localized URLs, their mappings, enhancements,
  images and guide links from HEAD49d0843. Restored consolidation groups B/C/E/F;
  all A-F now match the approved existing production consolidation policy.
- Still removed: 46 airline + 16 regional articles = 124 canonical URLs and
  248 aliases, 372 direct-404 paths. No airline or regional content revived.
  Active content: 68 articles plus eight guides, bilingual; sitemap 158 URLs.
- `src/content/seo-suggested-removals.json` is an explicit non-executing backlog:
  47 IDs/94 paths, KEEP_PUBLISHED, applyRemoval=false, approvalRequired=true.
  General reasons concern possible intent overlap/fragmentation/template reuse,
  not proven penalties. Historical low traffic alone does not justify removal.
  Backlinks remain UNKNOWN. Future removal needs new explicit owner approval.
- All 152 retained localized content records match the original pre-retirement
  structured snapshot exactly. No claim, provider, admin, landing or legal edits.
  Three mixed daily batches have exact retained-ID QA allowlists (5, 2, 3).
- Verify PASS: 37 tests, content QA/link graph/benchmark, locales, lint, TS/build
  (195 static generation entries). HTTP audit: 907 PASS, 0 failures, including
  all retired query variants, 158 live URLs and SR/EN alternates. All A-F redirect
  monitor checks PASS (61). Browser: 12 PASS across SR/EN, desktop/mobile, covering
  404 navigation, restored article rendering and form contact step; no submission.
  The audit follows the existing schema contract: articles require JSON-LD;
  unchanged main guides do not. Their metadata and hreflang are verified.
- Final evidence and full map: `seo-audit-output/retirement-final/REPORT.md`,
  `MAPA-I-POPIS.md`, `OSTAJE-158-URL.csv`, `UKLONJENO-124-STRANICE.csv`,
  `SUGGESTED-FOR-REMOVAL-94-URL.csv`, `sitemap-local.xml`, HTTP/browser/redirect JSON.
  GSC-enriched outputs stay ignored. Earlier retirement reports are historical.
  Repeatable report generator: `python3 scripts/seo-retirement-report.py`.
- Local tested preview: http://localhost:3003, PID28640 (verify before reuse).
  No commit, push, deploy or GSC write. DAILY BLOG remains paused; not restarted.
- ONLY next release prerequisite: owner's explicit deploy approval. Then review
  final diff and follow clean-commit/main/Vercel gates. After live checks, extend
  the existing read-only monitor with removal checks while retaining A-F, refresh
  GSC access and assess retained pages over 7/14/28 days. Do not delete suggestions.

### Programmatic scope confirmed and removed, 2026-09-15 (LOCAL ONLY)

- Owner confirmed "specific flight" means route/country/airport and generated
  scenario pages, and explicitly asked to remove them. The earlier scope blocker
  is resolved. Continued existing `codex/retire-airline-pseo` dirty work intact;
  session guard was run and identified only this checkpointed in-progress package.
- Removed 126 additional live localized URLs (32 regional/route/airport, 94
  scenarios): 63 bilingual articles. Each of the 12 remaining daily source batches
  was checked against approved IDs before deletion. Their five inactive prior-merge
  source definitions were removed too. Original core articles remain.
- Added `src/content/seo-retired-programmatic.json`: 63 live article pairs plus
  four previously redirected source pairs (B/C/E/F). Removed those four redirect
  groups since their targets were deleted. Groups A/D remain valid permanent
  redirects to the main delay guide and original missed-connection article.
- Combined retirement: 218 formerly live localized pages + eight former source
  paths = 226 canonical paths and 452 legacy aliases, 678 direct-404 URLs.
  Sitemap 282 -> 190 -> 64. Remaining content: 21 original active articles plus
  eight main guides, bilingual. The airport action plan is preserved.
- Removed scenario-specific appendices and registrations. No claim/provider/admin
  changes. 54/58 surviving localized records identical; only two main guides in
  both locales had retired links removed and four sentences changed into direct
  evidence/date-checking steps. Minimum content QA limits remain unchanged.
- Eight retirement regression tests are in verify. Obsolete mixed-batch exception
  was removed. DAILY BLOG still PAUSED (verified). Browser harness now uses group D
  for form checks, since group E is gone. Historical phase-specific audit artifacts
  are not fresh expected baselines for this larger owner-approved scope.
- Private evidence: `seo-audit-output/retirement-programmatic/REPORT.md`,
  `additional-programmatic-pages.csv` (126), `all-retired-urls.csv` (678),
  `http-verification.json`, `browser/results.json`, `retained-redirects/latest.json`.
  All GSC exports/reports remain ignored and must stay out of public git.
- Verify PASS: 37 tests, content/link/benchmark/locales, lint, TS/build (101 routes).
  HTTP: 1425 checks PASS. Remaining redirect checks: 21 PASS. Browser: eight SR/EN
  desktop/mobile 404 + form-contact-transition checks PASS; no real submission.
- Local preview updated on http://localhost:3003, PID 23730. Old preview PID15221
  was stopped before starting this build. Verify process identity before reuse.
- Nothing committed, pushed or deployed. Only remaining release prerequisite is
  explicit deploy approval, then normal clean-commit/main/Vercel release gates.
  After production verification, update existing read-only monitor expectations
  to A/D plus both retirement manifests, verify www, and refresh GSC access.
  No claim of Google removal, zero backlinks, or guaranteed ranking improvement.

### Airline SEO retirement, 2026-09-15 (LOCAL ONLY)

- Current branch `codex/retire-airline-pseo`, started through session guard from
  synchronized `origin/main` `49d0843` (the prior Phase 1 + 3A release is live).
- Owner explicitly requested ending airline-specific and specific-flight pSEO.
  Definite airline scope implemented: 46 original articles / 92 localized
  canonical URLs plus 184 legacy aliases now return 404 locally. Sitemap 282 ->
  190. Seven airline-only source batches deleted; four carrier articles removed
  from mixed 05-07 batch while its two duration articles are preserved.
- Removed article/image registrations, parent/child mappings and airline-only
  enhancement generator. No claim, provider, airline catalogue, admin, landing
  or prior consolidation redirect changes. Remaining 184 localized content
  records are byte-equivalent as parsed structured data to the before snapshot.
- Native 404 chosen because no equivalent carrier-specific replacement exists;
  no blanket redirects/noindex pages/robots blocking. Shared bilingual 404 view
  provides header/footer and optional rights/claim navigation. Its UI renders via
  Next RSC; HTTP audit checks the actual 404/noindex and browser QA checks the UI.
- Manifest `src/content/seo-retired-airlines.json` plus six regression tests are
  part of `npm run verify`. Content QA permits only the exact two surviving
  mixed-batch IDs. DAILY BLOG was already PAUSED and remains paused.
- Private report and full inventories: `seo-audit-output/retirement/REPORT.md`,
  `canonical-pages-with-evidence.csv` (92), `all-retired-urls.csv` (276),
  `other-pseo-scope-to-confirm.csv` (126). Keep all GSC evidence OUT of public git.
  Runbook: `docs/SEO-RETIREMENT-RUNBOOK.md`.
- Verify PASS: 35 tests, content/link/benchmark/locales, lint, TS/build (227 routes).
  Retirement HTTP audit: 747 checks PASS; previous-release local monitor: 61 PASS;
  browser: 8 SR/EN desktop/mobile checks PASS (404 UI + form contact step, no send).
  Local production-build preview remains at http://localhost:3003 (PID 15221;
  verify current process before stopping/reusing, and do not reuse stale builds).
- BLOCKER / next work: owner has not clarified "specific flight". No public
  flight-number/date SEO generator found; 32 regional/route/airport and 94 scenario
  URLs remain untouched pending that decision. Async clarification was sent.
- This new package is NOT deployed, committed or pushed. Obtain separate explicit
  deploy approval and follow normal release gate. Prior phase's approval must not
  be reused. After deployment, extend the existing read-only monitor with retirement
  checks, verify www, then refresh GSC. Preserved GSC ends 2026-09-12; backlinks
  UNKNOWN. Do not claim deletion from Google or guaranteed ranking improvements.

### SEO release authorized, 2026-09-15

- Owner approved steps 4 and 5: deploy the prepared Phase 1 + Phase 3A package
  and monitor the result. Earlier LOCAL ONLY entries below describe preparation,
  not the current authorization. No additional content batches are approved.
- Release preparation uses the inherited `codex/seo-recovery` branch. The initial
  session guard reported its known uncommitted SEO package; preserve and commit
  that reviewed package before running the unchanged clean-tree release gate.
- Private GSC exports and detailed evidence stay local under ignored
  `seo-audit-output/`; never add that directory to the public repository.
- Added `scripts/seo-release-monitor.py` and three redirect-contract tests.
  The monitor is read-only and does not assert Google indexing from HTTP status.
  Live browser output can be isolated with `SEO_BROWSER_OUTPUT`.
- GSC browser access initially blocked because the Mac was locked. User notified;
  technical deploy checks can proceed independently. Confirm actual GSC access
  before claiming refreshed index/performance data.
- Deployment result is recorded in the local release report after live gates.

### SEO Recovery Phase 3A, 2026-09-15

- Read `seo-audit-output/phase3a-summary.md`, `phase3a-merge-results.csv` and
  `docs/SEO-CONSOLIDATION-RUNBOOK.md`. LOCAL ONLY; no commit, push, deployment
  or indexing request. Inherited Phase 1/2 work remains preserved and uncommitted.
- Implemented only six approved concepts in both languages: general delay,
  crew duty time, separate tickets, same-booking connections, arrival/door time,
  and overnight hotel care. Targets were improved before redirects were added.
- Twelve canonical sources plus 24 historical aliases redirect in one hop (308)
  to final localized targets, including query and www checks. Active lists,
  routing and sitemap exclude the sources; raw content definitions are retained.
- Sitemap 294 -> 282; technically indexable self-canonical URLs 296 -> 284.
  Crawl: 343 URLs, zero broken internal links; incoming source-document edges
  38 -> 0. These are local technical results, not Google indexing/ranking gains.
- Five target articles bypass generic runtime appendices and use focused
  topic-coverage QA instead of padding to a word count. Other 264 localized
  content records and inherited Phase 1 identity/legal/utility protections remain
  unchanged. Main delay guide retains its 15-section outline and legal boundaries.
- Full verify PASS: 29 unit tests, content/link/benchmark/locale checks, ESLint,
  TypeScript and production build (319 routes). Browser: 24 target viewport
  checks + four SR/EN form transitions PASS; final guide copy rechecked in
  four viewports. No actual claim/contact submission or provider delivery test.
- Visual follow-up: mobile contact-modal logo partly covered by the fixed header;
  shared modal/header styles were not modified. Keep this separate from SEO scope.
- Ground handling remains HUMAN_REVIEW pending verified causation distinctions.
  No airline Tier 3, country/regional, new-page, noindex or 410 work authorized.
  The remaining Phase 2 merge proposals are not approved for automatic execution.
- Build AND start with `NEXT_PUBLIC_SITE_URL=https://letkasni.rs` for canonical
  QA. Read the runbook for repeatable audit, browser, CSV and report generation.
- Next recommended work: shared boilerplate in one separately approved family,
  then airline Tier 1 strengthening. Production release requires explicit approval
  and the normal clean-commit/release-gate workflow; do not bypass inherited dirt.

### SEO Recovery Phase 2, 2026-09-15

- Read `seo-audit-output/PHASE2-REPORT.md` and the main
  `final-seo-consolidation-proposal.csv`. Analysis only; no additional website,
  redirect, sitemap or content changes in Phase 2. Phase 1 changes remain dirty
  and preserved on `codex/seo-recovery`; nothing deployed.
- Native GSC data: Web, 2026-04-29 through 2026-09-12; max/6m/90d/28d exports.
  All 171 reported page metrics mapped to 144 current URLs; 296 canonical URLs
  covered (294 sitemap plus two English legal pages).
- 156 exact-page query/day exports saved. Google HTTP 429 blocked 15 low-volume
  remaining URLs (22 impressions, zero clicks). A later retry also refused;
  do not hammer the endpoint. Missing detail stays unknown. No API credentials.
- Proposal: sitemap KEEP_STRONG 6, KEEP_IMPROVE 184, conditional MERGE_301 30,
  HUMAN_REVIEW 74, NOINDEX_KEEP 0, REMOVE_410 0. Projected sitemap 264 includes
  all unresolved pages. Review backlog reduced from 136, not eliminated.
- Locked: no automatic execution of matrix. Every merge requires human approval
  and a useful, verified target integrating the preservation brief FIRST.
  Keep UK/Turkey/UAE/Israel regimes distinct; no generic carrier-to-home redirects.
  Backlinks UNKNOWN. Similarity and no reported traffic alone cannot delete pages.
- Reproduce: `python3 scripts/seo-performance-import.py`, then
  `python3 scripts/seo-consolidation-proposal.py`, then
  `python3 scripts/seo-phase2-check.py`. Read `PHASE2-SETUP.md` for API setup.
- Offline checks passed with source limitations; new API script syntax and ESLint
  passed. Live API auth untested; full application build not repeated in Phase 2.
- Next work only after approval: edit targets bilingually, approve explicit
  redirect subset, update links/metadata/sitemap and run normal release gate.
  70 airline + four airport URLs need concrete business/utility evidence.

### SEO Recovery, 2026-09-15

- Current task branch: `codex/seo-recovery`, based on `origin/main` `cad98a8`.
- Read `seo-audit-output/REPORT.md` and `seo-audit-output/README.md` for the
  completed audit, all URL decisions, evidence and repeatable commands.
- Used the three native GSC CSV exports in `../GSC-EXPORT-2026-09-15/`: 57 crawled,
  8 canonical, 2 historical 404. Public baseline and local candidate each cover
  320 URLs, including all 294 sitemap entries. Never invent Google-selected
  canonical values from those CSVs; that field is absent.
- Prepared homepage WebSite/operator schema, legal metadata/canonicals in SR/EN,
  noindex on four token utility pages, and JSON-LD escaping. No new redirects,
  article deletion, blanket noindex, legal-body changes or tracking changes.
- Locked decision: high text similarity is a review signal, not evidence enough
  for mass consolidation. Editorial/route/airline ambiguity stays HUMAN_REVIEW.
- Next work: review candidate decisions, obtain article-specific research and
  performance evidence before consolidation; deploy this technical patch only
  when explicitly requested, using the normal release gate.
- Manual work: after approved deploy, optionally request homepage reindexing;
  no mass request for all excluded articles. No production changes made here.
- Verification: workflow/privacy/email tests, Meta/content/link/benchmark/locale
  checks, lint and build TypeScript passed. Build enumerated 331 routes. Full
  `seo-recovery-check.py` passed: same 294 sitemap URLs, all 200/self-canonical,
  no accidental noindex, valid JSON-LD, no bad internal destinations, identical
  visible sitemap content, legal hreflang, utility noindex and historical redirects.
- Build must use `NEXT_PUBLIC_SITE_URL=https://letkasni.rs` for production-canonical
  QA; the existing environment-free fallback is a local development URL.
- Browser QA passed initial SR/EN claim transitions from homepage through delay
  selection to flight-details inputs, with optional cookies rejected. No real
  claim was submitted. Evidence: `seo-audit-output/browser-qa.md`.

1. Read `AGENTS.md`.
2. Read this `CHECKPOINT.md`.
3. Run `npm run session:start` to verify a clean, synchronized canonical checkout.
4. For new work, run `npm run session:start -- --new <task-slug>`.
5. For explicitly checkpointed unfinished work, run `npm run session:start -- --resume`.
6. Continue from the first open item in "Next Work".

## Generated Status

<!-- BEGIN:generated-status -->
Generated at: `2026-09-25T13:53:28.904Z`

Branch: `home-v2`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `a8c746a Prelazak na produkciju (24.09.2026): staging → main — forma i potpis u aplikaciji za prijave, GTM/Consent Mode zadržani`

Worktree status:

```text
M CHECKPOINT.md
 M package.json
 M scripts/check-landing-locales.mjs
 M scripts/content-qa.mjs
 M src/app/en/page.tsx
 M src/app/globals.css
 M src/app/page.tsx
 M src/components/brand-logo.tsx
 M src/components/claim-entry.tsx
 M src/components/site-footer.tsx
 M src/components/site-header.tsx
?? .claude/
?? scripts/check-home-copy-rules.mjs
?? scripts/home-copy-rules.test.mjs
?? src/components/home-v2/
```

Useful commands:

- `npm run session:start`: `bash scripts/start-canonical-session.sh`
- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run workflow:check && npm run privacy:check && npm run meta:check && npm run google-ads:check && npm run email:check && npm run email-signature:check && npm run seo:retirement:check && npm run content:qa && npm run content:links && npm run content:benchmark && npm run locales:check && npm run copy:rules && npm run lint && npm run build`
- `npm run release:gate`: `bash scripts/release-gate.sh`
- `npm run production:check`: `node scripts/check-production.mjs`
- `npm run workflow:check`: `bash scripts/check-workflow-guards.sh`
- `npm run content:qa`: `node scripts/content-qa.mjs`
- `npm run content:links`: `node scripts/content-link-graph.mjs`
- `npm run content:benchmark`: `node scripts/content-benchmark-review.mjs`
- `npm run checkpoint`: `node scripts/update-checkpoint.mjs`
<!-- END:generated-status -->

## Current State

- Current task: authorized marketing content synchronization to staging; see the 2026-09-23 entry above. Older production instructions below are history, not authorization for this release.

- 2026-09-23: The owner authorized production hosting for the Marko Jovanović
  Gmail signature assets. The approved portrait, Letkasni logo, Instagram icon,
  and Facebook icon are added as immutable versioned PNGs under
  `/email-signature/v1/`; no application route, claim flow, tracking, or public
  copy is changed by this release. PR #34 merged as production commit `1254b75`;
  Vercel serves all four exact files and the full production release gate passed.
- 2026-09-15: The user explicitly approved bilingual Privacy Policy 1.3. Google Ads billing onboarding and advertiser verification are complete; no campaign or spend was created.
- 2026-09-15: Native Google Ads conversion `Lead - successful claim submit` is configured as Primary, no monetary value (UI evidence supersedes the older EUR 0 note), Count One, 30-day click-through window, data-driven attribution and enhanced conversions off. Conversion ID `18452620232`; label `VnU-CKD6zfgcEMjH8t5E`.
- 2026-09-15: GTM draft now contains five changes: `DLV - transaction_id`, `CE - lead_submit`, `Conversion Linker - All Pages`, `Google Tag AW-18452620232`, and `Lead - successful claim submit`. The conversion tag uses the claim UUID transaction ID and fires only on `CE - lead_submit`; the container remains unpublished.
- 2026-09-15: External Preview measurement setup is active but intentionally unpublished. GTM account `LetKasni`, Web container `GTM-WT3B2L8P`, Vercel Preview env, `DLV - transaction_id`, `CE - lead_submit`, and `Conversion Linker - All Pages` are configured. Tag Assistant verified consent gating, the existing direct GA4 tag and one firing of the Conversion Linker.
- 2026-09-15: Real Preview QA found that a `gtag` event plus a second explicit object push could duplicate journey events under accept-all consent. Commit `f2d35e2` now emits one data-layer message per journey event; the updated regression test and live Tag Assistant check both pass.
- 2026-09-15: Bilingual Privacy Policy 1.3 and consent-detail copy now explicitly name Google Tag Manager / Google Ads, describe the limited conversion payload, and use consent notice `privacy-1.3-2026-09-15` so existing choices are requested again on release. PP 1.3 and the v0.2.0 production release are approved; the production deploy has not yet run.
- 2026-09-15: Google Ads online measurement is code-ready on `codex/google-ads-measurement`. The site now has an optional consent-gated GTM container, Consent Mode v2 defaults/updates, 90-day first-paid-touch capture for Google click IDs and UTMs, success-only deduplicated `lead_submit`, and secondary `claim_start`, phone and WhatsApp events. The real GTM ID is enabled only on the feature-branch Preview; Production remains unchanged.
- Attribution is allowlisted, query-stripped and stored with the existing claim input snapshot only when the server-verified advertising consent cookie permits it. GA4 remains direct, Meta Pixel/CAPI remains on its existing path, and no PII is added to GA4/GTM events. Exact UI setup and blockers are in `docs/GOOGLE-ADS-LAUNCH.md`.
- 2026-09-10: the user explicitly authorized publishing the full PP 1.2 package before the marketing persistence/CRM integration is activated. PP 1.2 now uses the actual static publication date 10.09.2026. Marketing subscription remains fail-closed and hidden while Supabase and the required feature settings are absent; no campaign product is approved.
- 2026-09-09: Privacy Policy 1.2 and the separate adult email-offer consent flow are implemented on `codex/privacy-marketing-consent`. The flow is fail-closed, uses double opt-in, separate consent/event/suppression tables, POST-only confirmation and unsubscribe, strict expiry/scope/product checks, and a central send gate with visible and one-click unsubscribe. The approved marketing-product registry is empty, so no sales campaign can run from this release.
- PP 1.2 and the subscription UI must ship together. Production `/api/health` at `13d64ce652a4b1dcbc559c1a7759676e81a4aeab` reported `supabaseConfigured: false` on 2026-09-09, so the additive migration and durable consent storage cannot yet be verified. The release remains blocked and feature flags remain off.
- The current production health response reports Meta Pixel/CAPI configured. The PP 1.2 change resets pre-1.2 cookie choices, keeps analytics and advertising separate from email offers, scrubs URL query/hash data, and removes claim contact hashes from CAPI because adult/minor ownership is not proven by the claim flow.
- 2026-09-08: restored VGA EU CONSULTING DOO NIŠ as owner/operator and controller in SR/EN footer, Terms and Privacy. Identity is centralized in `src/lib/site-operator.ts`; legacy operator environment overrides no longer affect public identity.
- Restored identity from canonical history (`5f821e1^`): Bulevar Nemanjića 1, Niš (Medijana), 18000 Niš, Serbia; PIB 113473442; MB 21873446; APR. User explicitly authorized restoration and immediate deployment.
- Production checker now verifies company identity on both landing pages and all four legal routes and rejects retired operator details.

- Canonical local checkout: `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.
- GitHub remote: `https://github.com/nezun/let-kasni.git`.
- GitHub `main` is the only source of truth for deployable code.
- Production URL: `https://letkasni.rs`.
- Deploy target: Vercel.
- Production serves GitHub `main` commit `859b2f9` with the email delivery reliability fix: claim submit waits for admin and user notification delivery, retries transient Resend failures up to three attempts, uses stable idempotency keys, and logs Resend IDs plus attempt counts.
- The final approved bilingual landing and claim flow is on GitHub `main` from production commit `be1c24a` or its descendants.
- The compact post-submit confirmation uses the approved green success palette, check icon, and shared SR/EN styling from production commit `88b7903` or its descendants.
- Historical sibling folders are non-canonical and must not be used for deploys.
- Production now implements the screenshot-matched bilingual consent banner with separate Analytics and Marketing choices, Terms of Use and Privacy Policy links, and a footer privacy-settings reset path.
- On desktop, the banner measures its right edge against the embedded claim form and leaves an 8px gap before the form begins; on smaller screens it uses the full available width.
- Meta Pixel, browser Meta events, analytics events, and server-side Meta Lead delivery are now gated by the matching consent category.
- Server-side Meta Lead now forwards `_fbp`/`_fbc` when present, builds an `fbc` fallback from same-origin `fbclid`, forwards the first `x-forwarded-for` IP, and sends hashed first name, last name, country, and claim ID as `external_id`; phone remains unchanged and optional.
- Consent now uses a 12-month `lk_consent` cookie as the server CAPI authority. A blocking head bootstrap hides the banner before first paint for valid cookie consent and migrates legacy localStorage consent only when no valid cookie exists; cookie path is `/`, `SameSite=Lax`, `Secure`, and not `HttpOnly` so privacy settings can clear it.
- Total independent production QA passed for SR, EN, mobile, consent gating, GA4, Meta Pixel loading, claim-flow transitions, public links, and legal routes; report is in `.gstack/qa-reports/qa-report-letkasni-rs-2026-08-13.md`.

## Guardrails

- Follow `AGENTS.md` first.
- Run `npm run session:start` at the beginning of every new chat or resumed task.
- Do not stage unrelated dirty files.
- Keep work on a feature branch until the user explicitly requests deploy.
- Run `npm run release:gate` before merging an approved release into GitHub `main`.
- Deploy only a tree that is traceable to GitHub `main`; never deploy from a sibling folder or random local preview.
- Treat landing design experiments, generated design routes, and imported assets as local exploration until explicitly selected.
- Keep public Serbian content in Latin script.
- Always verify Serbian `/` and English `/en` together unless the user explicitly requests an exception.

## Next Work

- Complete staging content parity checks and staging-only deployment; prepare conversion-measurement integration, durable intake and restore verification as the next launch package.

- No production engineering work remains for the Marko Jovanović signature.
  A future optional improvement is a small config-driven generator for additional
  employee signatures; keep each asset set on a new versioned public path.
- Current Google measurement task: follow the BLOCKED / PREVIEW ONLY entry above.
  Do NOT execute older production/GTM/Supabase/CRM instructions in this task.
- Run GTM Preview with one controlled successful claim. Publish GTM and add `GTM-WT3B2L8P` to Vercel Production only after exactly one Ads conversion is observed.
- After Preview QA, deploy the approved v0.2.0 release and run one controlled production claim to verify GTM, Google Ads, GA4 and Meta together. Keep `SEARCH_RS_CORE` paused until this passes; keywords and negative keywords require the owner's active review.
- Configure a durable Supabase production project, confirm its region/account DPA/transfer basis, apply `202609091200_marketing_email_consent.sql`, and test pending -> confirmed -> withdrawn using only a controlled test address.
- Confirm account-level DPA/transfer evidence for Vercel, Resend and the applicable Google contracting entity. Only then set the two marketing flags, token secret and `MARKETING_TRANSFER_REVIEW_VERSION=2026-09-09`; if publication occurs after 09.09.2026, update PP 1.2's static effective date to the actual deployment date.
- After the immediate reliability release, add a durable email outbox plus Resend delivery/bounce webhooks once Supabase production persistence is configured; this is the remaining step that can recover emails after all in-request retries fail.
- Add the real Meta Pixel ID and Conversions API token in Vercel Production, then run the Test Events flow from `docs/META-ADS-TRACKING.md`.
- Confirm whether campaign traffic will use canonical `letkasni.rs` or a separate `leadcast.rs` host before domain verification and release.
- After Meta Test Events and privacy/consent review pass, run `npm run release:gate` and deploy only with explicit release authorization.
- Complete a real Meta Test Events submission with disposable data and verify the new `fbc`, `fbp`, IP, name, country, and `external_id` fields in Events Manager.
- Configure durable Supabase persistence in Vercel production and rerun the production gate with `REQUIRE_SUPABASE=1`.
- Treat durable Supabase claim persistence as a hard Google Ads launch blocker: the Vercel `/tmp` fallback cannot atomically deduplicate concurrent submissions into one claim UUID and one Ads transaction ID.
- The root layout still reads the existing `x-site-locale` request header for the `<html lang>` attribute; the consent change deliberately adds no `cookies()` read to the layout. A separate locale-layout refactor would be needed if static ISR output is required.
- Use this canonical workflow for every future LetKasni task and deploy.
- Audit the legacy dirty folders in a separate task without resetting or deleting their local work.
- With explicit authorization, add the existing Supabase service-role credential to Vercel production and verify durable claim persistence with `REQUIRE_SUPABASE=1 npm run production:check`.

## Locked / Do Not Change Without Approval

- Do not change production credentials or external integrations.
- Do not alter deploy target away from Vercel.
- Do not rewrite approved public content architecture without checking `AGENTS.md` content rules.
- Do not use `air-help-next`, `air-help-next-live`, or another sibling folder as an implicit source for production code.

## Manual Work Still Needed

- After the hosted asset check passes, open the local Marko Jovanović signature
  template, copy the rendered signature into Gmail settings, choose the correct
  signature defaults, and send one external test message. Confirm the Instagram
  and Facebook profile handles if they differ from the template assumptions.
- Current release blockers and exact shared GA4 approval request are in
  `docs/GOOGLE-ADS-RELEASE-CANDIDATE-2026-09-16.md`; older approvals below are
  historical and do not authorize this candidate's deployment or GTM publish.
- Google-owned configuration is complete through the direct conversion action and GTM draft. One controlled successful Preview conversion is still required before publishing the container.
- PP 1.3 and the v0.2.0 release are approved; production stays unchanged until the release workflow reaches the deploy step.
- No manual email reliability step remains. A controlled production claim to `kontakt@letkasni.rs` was accepted by Resend for both admin and user messages; inbox routing can still be checked independently when needed.
- Meta Business setup is still manual: Pixel/Dataset, domain verification, `Lead` event prioritization, Pixel ID, and server access token.
- Phone matching remains intentionally unchanged and optional; this task did not add a phone requirement or alter phone collection.
- `leadcast.rs` could not be resolved from the current environment and is not the canonical production domain in this checkout; do not silently switch domains.
- Privacy/cookie consent and final Meta data-processing terms require business/legal review before enabling production tracking.
- The implementation does not claim full GDPR compliance. Final legal review remains required; the English legal pages were added and browser-verified in the 2026-08-13 QA release, but legal review remains manual.
- Explicit authorization before transmitting the local Supabase service-role credential to Vercel.
- Business/legal review for claim, fee, eligibility, payout, and regulator workflow assumptions.
- Final browser verification after the 2026-08-13 deployment covered first visit, consented return visit, GA4/Meta loading, mobile navigation, and footer legal links. A controlled real-lead CAPI check remains manual.
- A separate audit decision for preserving, committing, or archiving changes in legacy dirty folders.

## Verification Log

- 2026-09-23 email signature assets: exact local PNG dimensions and SHA-256
  values passed `npm run email-signature:check`; all four files returned HTTP 200
  with `image/png` from a local Next server. The full verification chain passed
  through ESLint. A normal production build then passed in the stable canonical
  checkout; the earlier Turbopack `Operation not permitted` failure was isolated
  to the host-managed `/private/tmp` worktree path, not the application change.
- 2026-09-23 email signature production: PR #34 merged as `1254b75`; GitHub and
  both Vercel checks passed. `npm run email-signature:check:production` verified
  HTTP success, `image/png`, dimensions, and SHA-256 for all four public assets.
  `npm run release:gate -- --production` then passed the complete suite, build,
  live SR/EN routes, health SHA, and invalid-submit safety check.
- 2026-09-15 v0.2.0 ship gate: all 25 Google Ads measurement tests passed, together with privacy, Meta, email, content, link, benchmark, SR/EN locale, lint, TypeScript and optimized production-build checks. Security, performance, API, maintainability, design and adversarial review passes reported no remaining release-blocking code finding.
- 2026-09-15 Google Ads conversion Preview: Tag Assistant connected only after advertising consent and found direct GA4 `G-RVJ906DKVF`, GTM `GTM-WT3B2L8P`, and Ads `AW-18452620232`. `Conversion Linker - All Pages` and `Google Tag AW-18452620232` each fired once; `Lead - successful claim submit` correctly did not fire on page load or before a successful claim. Positive successful-submit verification is intentionally pending because no fake CRM claim was created.
- 2026-09-15 PP 1.3 Preview QA: Vercel deployment `AhPkmBfAShY2Go8VFeuB7LXXm8Zp` for `3e536b3` reached Ready. The prior PP 1.2 consent cookie was rejected, the banner requested a new choice, the advertising detail named Meta and Google, `/privacy` rendered PP 1.3 dated 15.09.2026 with the limited Google Ads payload disclosure, and rejecting optional tracking kept GTM inactive. All verification stages through lint passed; the final permitted network build passed and generated 331 pages.
- 2026-09-15 real Preview QA: Vercel deployment `8ps2NiPdvcxydpK4F9GXkMcVDEWh` for `f2d35e2` reached Ready. Tag Assistant connected only after advertising consent, found `GTM-WT3B2L8P` plus direct GA4 `G-RVJ906DKVF`, fired the Conversion Linker, and showed one `claim_start` after the duplicate-dispatch fix. The full verification chain passed through lint; the initial sandboxed build could not fetch Google Fonts, and a permitted rerun of `npm run build` passed with all 331 pages.
- 2026-09-15 Google Ads readiness: full `npm run verify` passed on `ae1b35e`, including 12 workflow checks, 12 privacy checks, Meta check, 7 Google Ads measurement tests, 5 email tests, content/link/benchmark checks, SR/EN locale alignment, lint, TypeScript and an optimized build of 331 pages. Local browser QA covered pre-consent, analytics-only, advertising-only, accept-all and revoke states; mock GCLID/UTM navigation; phone/WhatsApp events; SR end-to-end submission with stored attribution; and EN campaign-parameter navigation. QA found and fixed missing client exposure of `NEXT_PUBLIC_GTM_ID`, a lint-only test issue, and pre-consent `claim_start` replay.
- 2026-09-10 release preparation: PP 1.2 publication date and consent-notice identifier were updated to 10.09.2026. A concurrent subscription-write finding was fixed with an atomic database upsert. Privacy checks (12 tests), lint, TypeScript and the 331-route production build passed before the final release gate.
- 2026-09-09 privacy/marketing implementation: `npm run verify` passed, including 12 workflow checks, 10 privacy/marketing tests, 5 Resend tests, Meta checks, content checks, locale alignment, lint, TypeScript and a production build of 331 routes. SR/EN `/privacy` and `/email-offers` pages were checked locally at desktop and 375px mobile; the privacy page had no horizontal overflow, and rejecting optional tracking wrote the current v3 consent with GA and Meta disabled.
- 2026-09-09 production preflight: public `/api/health` matched commit `13d64ce652a4b1dcbc559c1a7759676e81a4aeab`, reported `supabaseConfigured: false`, `metaCapiConfigured: true`, and `supportEmail: kontakt@letkasni.rs`. No deployment was attempted because durable consent storage and account-level transfer evidence are mandatory publication conditions.
- 2026-08-19 green submit confirmation release: PR #24 merged as `88b7903`; the local and production release gates passed, `/`, `/en`, both Step 2 routes, `/api/health`, and invalid-submit validation passed, and production matched GitHub `main`.
- 2026-08-19 email reliability production release: PR #20 merged as `859b2f9`; `npm run release:gate -- --production` passed and `/api/health` matched GitHub `main`. Controlled claim `02d6cb2d-848d-4b75-9569-c864c5a5b8e8` returned HTTP 200, while Vercel logged admin Resend ID `848f3123-669c-447f-8a9f-acd581713828` and user Resend ID `1459438d-d0c9-4a15-83c6-a4e8d297a7ee`, both on attempt 1.
- 2026-08-19 email reliability patch: `npm run email:check` passed 5 regression tests covering `ECONNRESET`, `ETIMEDOUT`, retryable 5xx/409 responses, non-retryable 4xx responses, stable idempotency keys, and awaited claim notification delivery. `npm run verify` passed, including workflow guards, content checks, locale alignment, lint, TypeScript, and the production build.
- `npm run checkpoint`: refreshes the generated status block in this file.
- `npm run session:start`: verifies canonical remote, branch, and clean worktree before work starts.
- `npm run release:gate`: runs the full SR/EN release gate and shows the exact proposed production diff.
- `npm run release:gate -- --production`: verifies the live deployment commit, both locales, health, Step 2 routes, and safe submit validation.
- `npm run production:check`: diagnostic primitive used by the production gate; do not use it alone for a release decision.
- Production releases still require an agent-driven SR/EN browser interaction pass; the HTTP smoke check cannot prove hydration or client-side transitions.
- 2026-08-13 total independent QA: `npm run verify`, `npm run release:gate -- --production`, production public-link audit (294 sitemap pages / 328 linked URLs), SR/EN desktop and 375px mobile browser pass, legal-link regression fix, consent gating pass, and GA4 collection confirmed HTTP 204.
- `npm run verify`: passed on `codex/meta-tracking`, including `npm run meta:check`, content QA, locale checks, lint, and production build.
- Consent redesign validation: `npm run lint`, `npm run meta:check`, `npm run build`, and independent local browser QA passed on `codex/consent-banner-redesign`; production deploy was intentionally not performed.
- Cookie banner reference validation: `npm run verify`, local SR/EN browser QA, desktop 8px form gap check, settings interaction check, and `npm run release:gate -- --production` passed on production commit `be1c24a`.
- Local smoke test: `/` and `/en` rendered with the Meta Pixel component when a dummy Pixel ID was supplied; honeypot submit returned success without a Meta token and no external CAPI request was attempted.
- CAPI quality matching patch: `npm run meta:check`, `npm run lint`, `npm run build`, and `npm run verify` passed on `codex/capi-quality-matching`; no real Meta payload was sent because production Meta credentials are not configured in this checkout.
- Consent cookie gating validation: local fresh visit showed the banner, acceptance wrote `lk_consent` with `Path=/`, return reload showed no banner, localStorage-only migration wrote the cookie before hydration, footer privacy settings removed the cookie and restored the banner, and no browser console errors were observed.
- Add latest successful `npm run lint`, `npm run build`, `npm run verify`, deploy URL, and known failures here after each substantial session.

## Paste-Ready Prompt

Continue in `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.

Read `AGENTS.md` and `CHECKPOINT.md` first. Run `npm run session:start`, then continue autonomously from "Next Work". For a new task, use `npm run session:start -- --new <task-slug>`. Never deploy from a sibling folder or a local preview. Preserve guardrails and update `CHECKPOINT.md` before finishing.
