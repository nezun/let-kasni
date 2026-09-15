"""Validate the full saved after-crawl against the intended SEO change boundaries."""
import csv
import json
from pathlib import Path
from urllib.parse import urlsplit

root = Path('seo-audit-output')


def read(folder):
    return {r['url']: r for r in csv.DictReader((root / folder / 'url-inventory.csv').open())}


before, after = read('before'), read('after')
docs = json.loads((root / 'after/documents.json').read_text())
old_docs = json.loads((root / 'before/documents.json').read_text())
failures = []


def check(condition, message):
    if not condition:
        failures.append(message)


submitted = {u for u, r in after.items() if r['sitemap_included'] == 'True'}
check(submitted == {u for u, r in before.items() if r['sitemap_included'] == 'True'}, 'Sitemap URL set changed')
check(len(submitted) == 294, 'Expected 294 sitemap URLs')
for url in submitted:
    row = after[url]
    check(row['http_status'] == '200', f'Non-200 sitemap URL: {url}')
    check(row['indexable'] == 'True', f'Accidental noindex: {url}')
    check(row['canonical_is_self'] == 'True', f'Non-self canonical: {url}')
    check(bool(row['title']) and bool(row['meta_description']) and bool(row['h1']), f'Missing title/description/H1: {url}')
    check(row['json_ld_valid'] == 'True', f'Invalid JSON-LD: {url}')
    check(int(row['internal_inlinks']) > 0, f'Orphan: {url}')
    check(docs[url]['text'] == old_docs[url]['text'], f'Visible content changed: {url}')

for url, doc in docs.items():
    for target in doc['links']:
        if target in after:
            check(after[target]['http_status'] == '200', f'Internal link to non-200: {url} -> {target}')
        elif not any(urlsplit(target).path.startswith(p) for p in ['/api', '/admin', '/design', '/auth']):
            check(False, f'Unverified internal target: {url} -> {target}')
    check(after[url]['json_ld_valid'] == 'True', f'Invalid JSON-LD: {url}')

for path in ['/email-offers', '/en/email-offers', '/marketing/confirm', '/en/marketing/confirm']:
    row = after['https://letkasni.rs' + path]
    check(row['http_status'] == '200' and row['indexable'] == 'False' and 'noindex' in row['robots'], f'Utility must remain available and noindex: {path}')

for path in ['/privacy', '/terms', '/en/privacy', '/en/terms']:
    url = 'https://letkasni.rs' + path
    check(after[url]['canonical_is_self'] == 'True', f'Legal canonical: {path}')
    check({'sr', 'en', 'x-default'} <= docs[url]['alternates'].keys(), f'Legal hreflang: {path}')

for url in ['https://letkasni.rs/', 'https://letkasni.rs/en']:
    graph = [item for schema in docs[url]['schemas'] for item in schema.get('@graph', [])]
    websites = [item for item in graph if item.get('@type') == 'WebSite']
    check(len(websites) == 1 and websites[0]['name'] == 'letkasni.rs' and websites[0]['url'] == 'https://letkasni.rs/', f'Homepage WebSite: {url}')
    check(any(item.get('@type') == 'Organization' and item.get('legalName') == 'VGA EU CONSULTING DOO NIŠ' for item in graph), f'Homepage operator: {url}')

robots = (root / 'after/robots.txt').read_text()
check('Sitemap: https://letkasni.rs/sitemap.xml' in robots and 'Disallow: /admin' in robots and 'Disallow: /design' in robots, 'robots.txt regression')
for url, row in before.items():
    if row['redirect_target']:
        check(url in after and row['http_status'] == after[url]['http_status'] and urlsplit(row['redirect_target']).path == urlsplit(after[url]['redirect_target']).path, f'Historical redirect changed: {url}')

result = {'passed': not failures, 'sitemap_urls': len(submitted), 'after_urls': len(after), 'failures': failures, 'checks': ['same sitemap set', '200/indexable/self-canonical', 'metadata/H1', 'JSON-LD', 'internal targets', 'unchanged visible content', 'utility noindex', 'legal locales', 'homepage entities', 'robots', 'historical redirects']}
(root / 'verification.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
raise SystemExit(0 if not failures else 1)
