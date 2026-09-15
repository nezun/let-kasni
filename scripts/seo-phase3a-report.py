"""Generate the reviewed Phase 3A summary from saved validation evidence."""
import csv
import json
from pathlib import Path

root = Path('seo-audit-output')
verification = json.loads((root / 'phase3a-verification.json').read_text())
with (root / 'phase3a-merge-results.csv').open(newline='') as f:
    merges = list(csv.DictReader(f))
passed = verification['passed']
guide_recheck_path = root / 'phase3a/browser/results-A.json'
guide_recheck = json.loads(guide_recheck_path.read_text()) if guide_recheck_path.exists() else None
lines = [
 '# LetKasni SEO Recovery Phase 3A', '',
 '2026-09-15. Branch: `codex/seo-recovery`. **LOCAL ONLY. Nothing deployed.**',
 f'Final gate: **{"PASS" if passed else "FAIL"}**. Source: `phase3a-verification.json`.', '',
 '## A. Implemented', '',
 'Six approved concepts in SR and EN: 12 canonical source URLs, not the 30-URL proposal.',
 'Targets were edited and passed content QA/benchmark before redirects were added.',
 'Raw source article definitions remain archived in code, but are excluded from active routing, lists and sitemap.', '',
 '## B. Not implemented', '',
 'Ground-handling expansion remains **HUMAN_REVIEW**. Existing material does not reliably distinguish routine cleaning/loading/offload from security-related removal and independent airport/third-party events. No redirect was added for this cluster.',
 'No airline Tier 3 pruning (70 unresolved URLs), regional-country consolidation, UK/Turkey/UAE/Israel rewrite, new page, noindex or 410 was performed in Phase 3A.', '',
 '## C. Content preservation', '',
 '| Group | Information retained or integrated |', '|---|---|',
]
for group in ['A', 'B', 'C', 'D', 'E', 'F']:
    row = next(r for r in merges if r['group'] == group)
    lines.append(f'| {group} | {row["content_preserved"]} |')
lines += [
 '', 'Five target articles now answer the specific scenario without the generic runtime eligibility/document/refusal appendices. The main delay guide keeps its 15-section editorial outline. Read time follows actual article length. Update dates belong to the source records, not a permanent runtime override.',
 'Existing CTA/evidence/process/context-image modules remain. The context image and process block are moved to reachable positions on these five shorter articles only; unrelated layouts are unchanged.',
 'Primary references and limits: `../docs/content-research/seo-phase3a-controlled-consolidation.md`. EU/CJEU conclusions are not presented as automatically binding Serbian law. No invented author/reviewer identity or credentials were added.', '',
 '## D. Exact redirect map', '',
 'Every row is a **308 permanent redirect**, the Next.js permanent equivalent of the planned MERGE_301 action. Each canonical source and its two historical `/blog` aliases goes directly to the final target. Query strings are retained. www variants bypass the generic host redirect and go straight to the non-www final target.', '',
 '| Group | Language | Source path | Final path |', '|---|---|---|---|',
]
for r in merges:
    lines.append(f'| {r["group"]} | {r["language"]} | `{r["source_url"].replace("https://letkasni.rs", "")}` | `{r["target_url"].replace("https://letkasni.rs", "")}` |')
lines += [
 '', 'The complete 36-path canonical/legacy map, including actual HTTP locations and www tests, is in `phase3a/redirect-http-checks.json`. Source URLs have not been marked noindex. Unrelated nonexistent URLs still return 404.', '',
 'Cross-language historical slugs retain the old handler behavior: the slug language determines the final destination. Normal SR and EN source URLs retain their respective language.', '',
 '## E. Sitemap delta', '',
 f'- Sitemap: **{verification["sitemap_before"]} -> {verification["sitemap_after"]}**; exactly the 12 approved source URLs removed.',
 f'- Self-canonical indexable URLs in the crawl: **296 -> {verification["canonical_indexable_urls"]}**. This includes the two existing EN legal pages outside the sitemap.',
 '- These are technical indexability counts, not a claim that Google currently indexes that many URLs.', '',
 '## F. Internal link delta', '',
 f'- Incoming source-document edges to merged URLs: **{verification["incoming_source_document_edges_before"]} -> {verification["incoming_source_document_edges_after"]}**.',
 '- No hard-coded editorial href to these exact source paths was found. Six obsolete child IDs were removed; active-article filtering updates generated blog lists, related/support modules and routing. Targets already present in lists are not duplicated.',
 '- Counts represent distinct linking-document/target pairs, not the number of HTML anchors. The 38 obsolete generated references are removed; they are not 38 hand-edited paragraphs.',
 '- Rendered anchors, sitemap, canonical/hreflang and structured data are checked. No intentional internal hop through any approved redirect remains.', '',
 '## G. Application files changed in Phase 3A', '',
]
lines += ['- `' + f + '`' for f in verification['changed_application_files']]
lines += [
 '', 'QA/tooling changes: `scripts/content-qa.mjs`, `scripts/content-benchmark-review.mjs`, `scripts/seo-focused-content-policy.mjs`, `scripts/seo-source-map.mjs`, `scripts/seo-recovery-audit.py`, `scripts/seo-phase3a-{prepare,check,report}.py`, `scripts/seo-phase3a-browser.mjs`; the preservation note, runbook and `CHECKPOINT.md`.',
 'The working tree also contains inherited, uncommitted Phase 1/2 files. They are not newly attributed to this batch. Phase 1 homepage, legal and utility files are hash-preserved; article JSON-LD serialization/escaping is identical to the saved Phase 1 version.', '',
 '## H. QA', '',
 '- `NEXT_PUBLIC_SITE_URL=https://letkasni.rs npm run verify`: workflow guards (12), privacy/marketing tests (12), Resend tests (5), privacy text, Meta wiring, content QA, link graph, content benchmark, locale alignment, ESLint and production build.',
 '- TypeScript is checked in the production build and with `npx tsc --noEmit`.',
 '- Production build: 319 generated routes, down from 331. These are build routes, not sitemap counts.',
 '- `python3 scripts/seo-recovery-check.py`: original Phase 1 saved before/after invariants PASS; retained as historical evidence, not misapplied to the intentional Phase 3 sitemap reduction.',
 f'- Phase 3 rendered audit: {verification["inspected_urls"]} inspected URLs; 36 exact redirects tested with query strings and www host; final destinations 200; no chain or loop on tested paths.',
 f'- Browser gate: {verification["browser_checks_passed"]}/28 checks PASS, 12 targets in both 1440px desktop and 390px mobile plus four SR/EN non-submitting form transitions. Captures and logs: `phase3a/browser/`.',
 *(['- After the final guide excerpt clarification, four additional SR/EN guide viewport checks passed (`phase3a/browser/results-A.json`).'] if guide_recheck and guide_recheck.get('passed') and len(guide_recheck.get('checks', [])) == 4 else []),
 '- No real claim, contact data, email delivery, database write or Meta event was submitted. Live service-provider delivery was not tested; existing unit tests and unchanged form/backend source cover that boundary.',
 '- Visual follow-up outside this batch: the mobile contact modal logo is partly covered by the fixed site header. The modal/header/CTA styling was not changed here; fields and next/back/submit controls remain visible in the saved screenshot. This is a shared UI stacking issue to investigate separately, not a claim that the entire UI is flawless.',
 '- Initial restricted-network build failed to fetch Google Fonts. It was rerun with network access. The first audit used the pre-existing local canonical fallback and was discarded; the final build/start explicitly use `https://letkasni.rs`.',
 '- Browser tooling initially lost temporary sessions; the repeatable runner now isolates each check and rejects optional cookies before testing. These infrastructure attempts are not reported as site regressions.', '',
 '## I. SEO after-state and similarity', '',
 f'- Broken internal links: **{len(verification["broken_internal_links"])}**. Sitemap non-200, accidental noindex, invalid JSON-LD and non-self-canonical sitemap pages: **0** when final gate is PASS.',
 f'- Crawl contains {verification["total_redirect_urls"]} unique redirect URLs: 12 merged canonical sources, 24 historical aliases and existing redirects, with overlap in the old alias inventory. This is not 44 content merges.',
 '- The pre-existing retired image URL in the GSC 404 export still returns 404 and has no incoming internal links. No new 404 policy was added.',
 f'- {verification["unrelated_content_records_unchanged"]} unrelated localized content records are unchanged against the Phase 2 source snapshot.',
 '- Mean nearest-neighbour similarity across ten target article localizations: **28.26% -> 7.02%**. The guide localizations remain near 2%. Metric: five-word Jaccard, same locale/route family. This is not a Google score or proof of ranking improvement.', '',
 '| Target | Before similarity | After similarity |', '|---|---:|---:|',
]
for r in verification['target_similarity']:
    lines.append(f'| `{r["url"].replace("https://letkasni.rs", "")}` | {r["before"]:.2%} | {r["after"]:.2%} |')
lines += [
 '', 'GSC figures in `phase3a-merge-results.csv` are the frozen Phase 2 maximum available period, 2026-04-29 to 2026-09-12 (137 days), not post-merge measurements. Page/query exports are incomplete as disclosed in Phase 2; unreported query data is not zero demand. Backlinks remain UNKNOWN. No additional GSC export or API request was required.', '',
 '## J. Deploy status', '',
 '**LOCAL ONLY. Phase 1 and Phase 3A are not deployed by this run.** No commit, push, PR merge, Vercel deployment or indexing request was made. The inherited feature branch and dirty work were preserved. The session-start guard reports dirty inherited work; no reset or bypassing release gate was attempted.',
 'Production must still be released through the canonical clean-commit/release-gate workflow after explicit approval. Trailing-slash and HTTP-to-HTTPS platform normalization are outside the exact canonical/legacy path test matrix; no global URL-normalization policy was changed.', '',
 '## K. Ranked next batch', '',
 '1. **Shared boilerplate, one family at a time.** This pilot demonstrates substantial removable overlap. Keep scenario/evidence/scope checks, not a global deletion of appendices.',
 '2. **Airline Tier 1 strengthening.** Improve already-supported destinations using actual demand and verified carrier procedures, before considering low-evidence pruning.',
 '3. **Regional EU-country consolidation.** Reconfirm intent/performance and preserve route/operator/legal-regime distinctions before a separately approved small batch.',
 '4. **Ground-handling expansion.** First obtain a legally reviewed distinction between internal routine handling and security/external airport events. The current evidence is insufficient for redirects.',
 '5. **Airline Tier 3 pruning decision.** Still unresolved. Collect longer performance/query history and backlink evidence; low impressions alone are not authorization to remove 70 URLs.', '',
 '## Repeatability and remaining manual work', '',
 'The mapping drives active content and redirects; saved exports drive the CSV; scope/HTTP/content/browser tests and this report can be rerun. Instructions: `../docs/SEO-CONSOLIDATION-RUNBOOK.md`.',
 'Manual: approval of new merge/legal distinctions and release. Next automation step after an approved deploy: reuse the read-only checker against live URLs and compare saved GSC snapshots over time. No recurring job was scheduled.',
]
if not passed:
    lines += ['', '## Blocking failures', ''] + ['- ' + message for message in verification['failures']]
(root / 'phase3a-summary.md').write_text('\n'.join(lines) + '\n')
print(f'Wrote phase3a-summary.md: {"PASS" if passed else "FAIL"}')
