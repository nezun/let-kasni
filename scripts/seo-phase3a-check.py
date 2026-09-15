"""Repeatable, read-only Phase 3A scope, redirect and rendered SEO regression checks."""
import argparse
import csv
import hashlib
import json
import runpy
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit, parse_qs

parser = argparse.ArgumentParser()
parser.add_argument('--base', default='http://127.0.0.1:3003')
parser.add_argument('--prepare', action='store_true')
args = parser.parse_args()
root = Path('seo-audit-output')
out = root / 'phase3a'
origin = 'https://letkasni.rs'
plan = json.loads((out / 'approved-batch-review.json').read_text())
mapping = json.loads(Path('src/content/seo-consolidations.json').read_text())
redirects = []
for group in mapping:
    for locale in ['sr', 'en']:
        pair = group[locale]
        slug = pair['source'].rsplit('/', 1)[1]
        for source in [pair['source'], '/blog/' + slug, '/en/blog/' + slug]:
            redirects.append(dict(source=source, target=pair['target'], group=group['group'], locale=locale))
(out / 'redirect-urls.json').write_text(json.dumps([origin + r['source'] for r in redirects], indent=2))
if args.prepare:
    print(f'Prepared {len(redirects)} exact canonical and legacy paths for 12 approved source URLs.')
    raise SystemExit(0)

audit = runpy.run_path('scripts/seo-recovery-audit.py')
fetch, NoRedirect = audit['fetch'], audit['NoRedirect']
failures = []
def check(condition, message):
    if not condition:
        failures.append(message)

def inventory(folder):
    with (folder / 'url-inventory.csv').open(newline='') as f:
        return {r['url']: r for r in csv.DictReader(f)}

before, after = inventory(root / 'after'), inventory(out / 'after')
docs = json.loads((out / 'after/documents.json').read_text())
old_docs = json.loads((root / 'after/documents.json').read_text())
before_map = {r['url']: r for r in json.loads((out / 'source-map-before.json').read_text())}
after_map = {r['url']: r for r in json.loads((out / 'source-map-after.json').read_text())}
sources = {r['source_url'] for r in plan}
targets = {r['target_url'] for r in plan}
check(len(mapping) == 6 and len(sources) == 12, 'Approved batch size changed')
check(len({r['source'] for r in redirects}) == 36, 'Legacy redirect conflict')
check({origin + g[loc]['source']: origin + g[loc]['target'] for g in mapping for loc in ['sr', 'en']} ==
      {r['source_url']: r['target_url'] for r in plan}, 'Redirect map differs from approved pairs')
check(set(after_map) == set(before_map) - sources, 'Unexpected content URL addition/removal')
for url, row in after_map.items():
    if url not in targets:
        check(row == before_map[url], f'Unrelated editorial content changed: {url}')
for r in after_map.values():
    if r['url'] in targets and r['template'] == 'BlogArticlePageView':
        check(not r['enhancement_sections'], f'Generic appendix remains: {r["url"]}')

old_sitemap = {u for u, r in before.items() if r['sitemap_included'] == 'True'}
new_sitemap = {u for u, r in after.items() if r['sitemap_included'] == 'True'}
check(len(new_sitemap) == 282 and new_sitemap == old_sitemap - sources, 'Sitemap must remove exactly 12 approved URLs')
for url in new_sitemap:
    row = after[url]
    check(row['http_status'] == '200' and row['indexable'] == 'True', f'Sitemap target unavailable/noindex: {url}')
    check(row['canonical_is_self'] == 'True', f'Non-self canonical: {url}')
    check(all(row[key] for key in ['title', 'meta_description', 'h1']), f'Missing metadata: {url}')
    check(int(row['internal_inlinks']) > 0, f'Orphan: {url}')
    check(docs[url]['alternates'] == old_docs[url]['alternates'], f'Hreflang changed: {url}')

source_paths = {r['source'] for r in redirects}
broken = []
for url, doc in docs.items():
    check(after[url]['json_ld_valid'] == 'True', f'Invalid JSON-LD: {url}')
    for target in doc['links']:
        check(urlsplit(target).path not in source_paths, f'Internal link through consolidation redirect: {url} -> {target}')
        if target in after:
            if after[target]['http_status'] != '200':
                broken.append([url, target, after[target]['http_status']])
        elif not any(urlsplit(target).path.startswith(p) for p in ['/api', '/admin', '/design', '/auth']):
            broken.append([url, target, 'unverified'])
check(not broken, f'Broken/redirected internal links: {len(broken)}')

query = '?seo_phase3a=one%20two&repeat=1&repeat=2'
live_redirects = []
for pair in redirects:
    status, headers, _ = fetch(args.base + pair['source'] + query)
    location = headers.get('Location', headers.get('location', ''))
    parsed = urlsplit(location)
    check(status == 308, f'Expected 308: {pair["source"]} got {status}')
    check(parsed.path == pair['target'], f'Wrong final destination: {pair["source"]} -> {location}')
    check(parse_qs(parsed.query) == parse_qs(query[1:]), f'Query lost: {pair["source"]}')
    final_status, _, _ = fetch(args.base + pair['target'] + query)
    check(final_status == 200, f'Redirect chain/unavailable final: {pair["source"]}')
    request = urllib.request.Request(args.base + pair['source'] + query, headers={'Host': 'www.letkasni.rs'})
    try:
        response = urllib.request.build_opener(NoRedirect).open(request, timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        www_status, www_location = response.code, response.headers.get('Location', '')
    check(www_status == 308 and www_location == origin + pair['target'] + query, f'WWW redirect chain/query loss: {pair["source"]}')
    live_redirects.append({**pair, 'status': status, 'location': location, 'final_status': final_status, 'www_status': www_status, 'www_location': www_location})
(out / 'redirect-http-checks.json').write_text(json.dumps(live_redirects, indent=2))

for path in ['/email-offers', '/en/email-offers', '/marketing/confirm', '/en/marketing/confirm']:
    r = after[origin + path]
    check(r['http_status'] == '200' and r['indexable'] == 'False', f'Phase 1 utility noindex lost: {path}')
for path in ['/privacy', '/en/privacy', '/terms', '/en/terms']:
    check(after[origin + path]['canonical_is_self'] == 'True', f'Legal canonical lost: {path}')
    check(docs[origin + path]['alternates'] == old_docs[origin + path]['alternates'], f'Legal hreflang lost: {path}')
for url in [origin + '/', origin + '/en']:
    check(docs[url]['schemas'] == old_docs[url]['schemas'], f'Phase 1 homepage identity changed: {url}')
check((out / 'after/robots.txt').read_text() == (root / 'after/robots.txt').read_text(), 'robots.txt changed')
for path in ['/phase3a-no-such-page', '/blog/phase3a-no-such-page', '/en/blog/phase3a-no-such-page']:
    check(fetch(args.base + path)[0] == 404, f'Unrelated URL redirected: {path}')
for url, row in before.items():
    if row['redirect_target']:
        old_target = urlsplit(row['redirect_target']).path
        replacement = next((r['target'] for r in redirects if r['source'] == old_target), old_target)
        check(url in after and urlsplit(after[url]['redirect_target']).path == replacement,
              f'Historical redirect changed unexpectedly: {url}')

inherited = json.loads((out / 'inherited-files.json').read_text())
phase1_files = ['src/components/site-identity-schema.tsx', 'src/lib/legal-metadata.ts'] + [
    'src/app' + path + '/page.tsx' for path in ['', '/en', '/privacy', '/terms', '/en/privacy', '/en/terms', '/email-offers', '/en/email-offers', '/marketing/confirm', '/en/marketing/confirm']]
for filename in phase1_files:
    check(hashlib.sha256(Path(filename).read_bytes()).hexdigest() == inherited[filename], f'Phase 1 file changed: {filename}')
component = Path('src/components/blog-article-page.tsx').read_text()
old_component = (out / 'inherited-blog-article-page.ts.txt').read_text()
check(component.split('const jsonLd = {')[1].split('<article')[0] == old_component.split('const jsonLd = {')[1].split('<article')[0],
      'Phase 1 article JSON-LD/schema escaping changed')
check('Math.min(7, localized.sections.length - 2)' in component and 'index === contextImageIndex' in component,
      'Shortened article context image is unreachable')
changed_application_files = [str(p) for p in sorted([*Path('src').rglob('*'), Path('next.config.ts')]) if p.is_file() and
                             inherited.get(str(p)) != hashlib.sha256(p.read_bytes()).hexdigest()]
browser_path = out / 'browser/results.json'
browser = json.loads(browser_path.read_text()) if browser_path.exists() else {}
check(browser.get('passed') is True and len(browser.get('checks', [])) == 28,
      'Complete desktop/mobile target and non-submitting form QA is required (28 checks)')

preserved = {
 'A': 'Retained amount/route/operator/care coverage; integrated delayed replacement timeline, original schedule comparison, EU vs Serbia/ECAA scope.',
 'B': 'Duty expiry vs mandatory rest, operational cause and replacement measures, timeline evidence, overnight care, narrow C-156/22 authority.',
 'C': 'Separate contracts, PNR caveat, self-transfer and baggage/recheck risk, first-leg rights, agency/insurance conditions.',
 'D': 'Booking unity, final destination, each operating carrier, initial vs independent disruption, gate/door/replacement evidence and full-booking reply.',
 'E': 'Touchdown vs stand vs door opening with exit permission, 2h50+15m threshold example, source/time-zone evidence and separate care question.',
 'F': 'Necessary hotel, airport transfers both ways, receipts and reasonableness, unanswered/written care request, shuttle/room evidence, family needs and journey-home distinction.',
}
rows = []
for p in sorted(plan, key=lambda r: (r['group'], r['locale'])):
    source, target = p['source_url'], p['target_url']
    rows.append(dict(source_url=source, target_url=target, language=p['locale'], group=p['group'],
      source_gsc_impressions=p['source_impressions'], source_gsc_clicks=p['source_clicks'],
      target_gsc_impressions=p['target_impressions'], target_gsc_clicks=p['target_clicks'],
      content_preserved=preserved[p['group']],
      content_removed_as_redundant='Duplicate broad eligibility/amount/route/evidence/CTA introductions; five article targets no longer append generic runtime sections.',
      redirect_status=after[source]['http_status'], source_in_sitemap_before=source in old_sitemap, source_in_sitemap_after=source in new_sitemap,
      internal_links_to_source_before=before[source]['internal_inlinks'], internal_links_to_source_after=after[source]['internal_inlinks'],
      target_self_canonical=after[target]['canonical_is_self'], qa_status='PASS' if not failures else 'FAIL: see phase3a-verification.json'))
with (root / 'phase3a-merge-results.csv').open('w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0])); writer.writeheader(); writer.writerows(rows)
similarity = [dict(url=u, before=float(before[u]['similarity']), after=float(after[u]['similarity']),
                  before_neighbor=before[u]['nearest_url'], after_neighbor=after[u]['nearest_url']) for u in sorted(targets)]
indexable = [r for r in after.values() if r['indexable'] == 'True' and r['canonical_is_self'] == 'True']
result = dict(passed=not failures, failures=failures, scope='local only; no deploy or indexing requests', sitemap_before=len(old_sitemap),
 sitemap_after=len(new_sitemap), canonical_indexable_urls=len(indexable), inspected_urls=len(after),
 total_redirect_urls=sum(r['http_status'] in ['301','308'] for r in after.values()), approved_canonical_redirects=12,
 legacy_aliases=24, exact_paths_tested_with_query_and_www=len(live_redirects), broken_internal_links=broken,
 incoming_source_document_edges_before=sum(int(r['internal_links_to_source_before']) for r in rows),
 incoming_source_document_edges_after=sum(int(r['internal_links_to_source_after']) for r in rows),
 phase1_files_preserved=len(phase1_files), unrelated_content_records_unchanged=len(after_map)-len(targets),
 browser_checks_passed=sum(c.get('passed') is True for c in browser.get('checks', [])),
 changed_application_files=changed_application_files, target_similarity=similarity)
(root / 'phase3a-verification.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
print(json.dumps({k:v for k,v in result.items() if k not in ['target_similarity','changed_application_files']}, indent=2))
raise SystemExit(0 if not failures else 1)
