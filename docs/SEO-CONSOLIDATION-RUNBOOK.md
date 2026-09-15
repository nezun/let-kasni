# Controlled SEO consolidation

Phase 3A is a local, approved six-group pilot, not permission to execute the
remaining Phase 2 recommendations. Preserve Phase 1 and all raw GSC exports.
Do not request indexing, submit sitemaps or deploy as part of this audit.

## Evidence and boundaries

- `seo-audit-output/phase3a/approved-batch-review.json`: original source/target
  material, exact pairs and frozen GSC page evidence.
- `docs/content-research/seo-phase3a-controlled-consolidation.md`: editorial
  preservation decisions and primary-source limitations.
- `src/content/seo-consolidations.json`: only the six approved source article
  IDs and their two localized final destinations. The runtime excludes these
  articles from active lists/static routes/sitemap, without deleting their raw
  historical content. Next redirects run before page routing.
- `src/content/seo-focused-targets.json`: only the five reviewed target articles
  that do not need generic appended sections. The main guide is not an article.
- `scripts/seo-focused-content-policy.mjs`: topic/evidence/scope/parity checks
  replace word-count and repeated-heading requirements only for those articles.
  They are regression checks, not independent legal certification.

## Repeat the checks

From the canonical checkout, with the existing Node/Python dependencies:

```sh
NEXT_PUBLIC_SITE_URL=https://letkasni.rs npm run verify
npx tsc --noEmit
node scripts/seo-source-map.mjs --output=seo-audit-output/phase3a/source-map-after.json
python3 scripts/seo-phase3a-check.py --prepare
NEXT_PUBLIC_SITE_URL=https://letkasni.rs npm run start -- --hostname 127.0.0.1 --port 3003
```

In another terminal, with the local production server running:

```sh
python3 scripts/seo-recovery-audit.py --base http://127.0.0.1:3003 --output seo-audit-output/phase3a/after --sources seo-audit-output/phase3a/source-map-after.json --extra-urls seo-audit-output/phase3a/redirect-urls.json
node scripts/seo-phase3a-browser.mjs
python3 scripts/seo-phase3a-check.py --base http://127.0.0.1:3003
python3 scripts/seo-phase3a-report.py
```

The browser runner uses installed gstack, not a new dependency. Override
`GSTACK_BROWSE_BIN` when installed elsewhere and `SEO_AUDIT_BASE` for another
local port. Each check gets a separate temporary browser state. Optional
tracking is rejected. The form test uses invented flight details, stops at
the contact step and never sends a claim, email or personal data.

Do not omit `NEXT_PUBLIC_SITE_URL`: the existing development fallback is
`http://127.0.0.1:3011`, which is not a valid production-canonical audit setup.
The build fetches existing Google Fonts and needs network access. Do not
replace fonts or disable checks just to obtain a passing build.

## What the gate proves

Exactly 12 canonical source removals; 282 sitemap URLs; 200/indexable/self-
canonical targets; unchanged hreflang pairs; no source/legacy internal links;
36 exact canonical/legacy paths checked with query strings and www host;
preserved homepage/legal/utility/schema work; unchanged unrelated content;
24 desktop/mobile target checks and 4 non-submitting form checks.

Incoming-link counts are unique source-document -> target-URL edges, not raw
anchor counts. Similarity is nearest-neighbour five-word Jaccard within the
same locale/route family, not a Google metric. GSC numbers are the saved
Phase 2 maximum-available period, not a post-change performance measurement.

## Human decisions and release

Editorial/legal approval remains necessary for any new merge, particularly
ground handling or country-law distinctions. Backlinks remain UNKNOWN.
Do not generalize the six-group permission, remove Tier 3 airline pages, add
noindex/410 or automatically convert remaining recommendations into redirects.
Changing the mapping requires an explicit new approved batch and new baseline.

After explicit release authorization, use the canonical release gate and
GitHub main workflow. Repeat live redirect/canonical checks after deployment;
only then compare GSC performance after a sufficient observation period.
No scheduled automation is created by this runbook.

## Authorized release and monitoring

The owner authorized deployment and post-release monitoring on 2026-09-15.
Only the existing Phase 1 technical fixes and Phase 3A six-group batch are in
scope. This does not authorize the remaining consolidation proposals.

Raw GSC data and detailed audit evidence remain in the ignored local
`seo-audit-output/` directory because the repository is public. Preserve that
directory; cloning this repository alone does not reproduce the private baseline.

After the normal release gate and GitHub main deployment:

```sh
python3 scripts/test-seo-release-monitor.py
python3 scripts/seo-release-monitor.py
SEO_AUDIT_BASE=https://letkasni.rs SEO_BROWSER_OUTPUT=seo-audit-output/release/browser node scripts/seo-phase3a-browser.mjs
```

The lightweight monitor checks real www/non-www redirects, query preservation,
target status/canonical/hreflang/JSON-LD and source/target sitemap membership.
It records sitemap size without assuming it must remain 282 forever. It never
changes content or submits GSC requests. Run a full link audit on a regression.

Monitor daily for technical changes. Compare GSC at 7, 14 and 28 days after the
actual release, using completed data only and equal-length pre/post windows.
Aggregate each source and its target together so URL migration is not mistaken
for lost traffic. Report clicks, impressions, CTR, position and index/canonical
state separately; no reported page row is not proof of zero demand or deindexing.
Use the preserved pre-release exports. Do not overwrite them or attribute
historical GSC data to the new release. Login/API limitations must be reported,
not replaced with a technical crawl presented as Google index status.
