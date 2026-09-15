# Content Retirement: Final Local Scope

## Owner Decision

This supersedes the previous broader local retirement proposal. The owner approved
deployment of this final scope on 2026-09-15. Approval is not proof of deployment;
use the production release gate and its recorded commit verification as evidence.

- KEEP REMOVED: 46 airline articles / 92 localized canonical URLs, plus 16
  regional, route, country and airport articles / 32 canonical URLs.
- KEEP PUBLISHED: 47 general/scenario articles / 94 localized URLs, restored
  from the approved pre-retirement source. They are suggestions for future
  review, not approved removals.
- Remaining content: 68 articles and eight main guides, each in SR and EN.
  Sitemap: 158 URLs (152 content records plus six base pages).
- All six previous consolidation groups A-F remain. Their 12 source URLs and
  24 aliases retain permanent redirects; do not republish consolidated duplicates.
- No claim-intake, flight-provider, airline-catalogue, admin, legal, homepage,
  or consent-flow changes. The airport action plan remains.
- DAILY BLOG remains paused. Restoring existing articles does not authorize new
  generation or restarting that automation.

## Storage and Review Backlog

Approved removal inventories are `src/content/seo-retired-airlines.json` and
`src/content/seo-retired-programmatic.json`. They cover 124 canonical URLs and
248 legacy aliases, totaling 372 actual 404 responses, including query variants.
No unrelated homepage redirects or robots.txt blocking are introduced.

The durable `src/content/seo-suggested-removals.json` contains all 47 general
article IDs and both language URLs. Its status is
`SUGGESTED_FOR_REMOVAL_NOT_APPROVED`, with `applyRemoval: false` and
`currentAction: KEEP_PUBLISHED`. It is not imported by production routing.
Release tests require those exact articles to remain published and in the sitemap.

General reasons to review these pages: potential overlap between search intents,
fragmentation of one topic across multiple pages, and repeated scenario templates.
These are review hypotheses, not proof of a Google penalty or of poor quality on
every page. Low historical traffic alone is not sufficient grounds for removal.
Backlinks are UNKNOWN, not zero. Review current GSC, unique passenger value,
competing pages and backlinks before deciding to improve, merge or remove.
Any future removal requires explicit owner approval and a relevant URL-by-URL plan.

Public manifests store only public URLs and policy. Historical GSC data and the
enriched CSV stay in ignored `seo-audit-output/retirement-final/`. The articles
remain in their active source files; Git history preserves the earlier baseline.
Storage savings are not the reason for this SEO decision.

## Repeatable Local Checks

Keep historical evidence under `retirement/` and `retirement-programmatic/`.
Those folders describe earlier scopes and must not be treated as current policy.
The original 276-record baseline at `retirement/source-map-before.json` remains
the comparison source. All 152 retained records must match it unchanged.

```sh
node scripts/seo-source-map.mjs --output=seo-audit-output/retirement-final/source-map-after.json
NEXT_PUBLIC_SITE_URL=https://letkasni.rs npm run verify
NEXT_PUBLIC_SITE_URL=https://letkasni.rs npm run start -- --port 3003
```

With the candidate build running locally:

```sh
python3 scripts/seo-retirement-audit.py --base http://127.0.0.1:3003
python3 scripts/seo-release-monitor.py --base http://127.0.0.1:3003 --skip-www --output seo-audit-output/retirement-final/retained-redirects
node scripts/seo-retirement-browser.mjs
python3 scripts/seo-retirement-report.py
```

The HTTP audit checks every retired path with and without query strings, all
sitemap pages, canonical/hreflang/robots metadata, schema parsing and internal
links. The redirect monitor protects all six consolidation groups. Browser QA
covers SR/EN at desktop/mobile sizes: 404 navigation/footer, restored article
rendering/images, and the claim flow through its contact step, without submission.
The three partially retained daily batches have exact-ID allowlists in content
QA; ordinary six-article requirements and content standards are unchanged.

The report generator writes:
- `MAPA-I-POPIS.md`: full current map, removed URLs and suggested list/reasons.
- `OSTAJE-158-URL.csv`: current sitemap inventory, including suggestions kept live.
- `UKLONJENO-124-STRANICE.csv`: approved canonical removals.
- `SUGGESTED-FOR-REMOVAL-94-URL.csv`: retained review backlog with historical
  performance where available and explicit unknown backlinks.
- `all-retired-urls.csv`: complete 372-path canonical/alias inventory.
- `sitemap-local.xml`: XML fetched from the tested candidate.

## Release Approval and Monitoring

Only after the owner approves deployment: review the final diff, commit a clean
feature branch, run the canonical release gate, merge to main and wait for Vercel.
Repeat production checks including www normalization. Local tests do not establish
that Google has removed or indexed anything, and removal does not guarantee ranks.

After production verification, extend the existing read-only SEO monitor to
include the retirement manifests while preserving A-F redirect checks. Do not
create a duplicate monitor or restart publishing. Refresh GSC access for actual
index/performance checks and compare retained pages after 7/14/28 days.
This owner decision and Google recrawling are the remaining human/external gates.

Background references, not evidence that any specific page is low quality:
- [Google: helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: crawling errors and removed pages](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)
- [Google: relevant URL mapping](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
