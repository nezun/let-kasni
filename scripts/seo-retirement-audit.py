"""Read-only retirement inventory and HTTP validation. Private evidence stays ignored."""
import argparse
import csv
import importlib.util
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

spec = importlib.util.spec_from_file_location('seo_audit', Path(__file__).with_name('seo-recovery-audit.py'))
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


def inventory(manifest):
    rows = []
    for article in manifest['articles']:
        for locale in ('sr', 'en'):
            canonical = article[locale]
            slug = canonical.rsplit('/', 1)[-1]
            for kind, path in [('canonical', canonical), ('legacy', '/blog/' + slug), ('legacy', '/en/blog/' + slug)]:
                rows.append(dict(id=article['id'], locale=locale, kind=kind,
                                 family=article.get('family', 'airline_specific'),
                                 previously_redirected=article.get('previouslyRedirected', False),
                                 url='https://letkasni.rs' + path, expected_status=manifest['status'],
                                 redirect_target='', reason=manifest['reason']))
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', help='Optional running candidate/production URL. Makes GET requests only.')
    parser.add_argument('--output', default='seo-audit-output/retirement-final')
    args = parser.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    manifests = [json.loads(Path('src/content', name).read_text()) for name in
                 ('seo-retired-airlines.json', 'seo-retired-programmatic.json')]
    manifest = {'status': 404, 'articles': [a for m in manifests for a in m['articles']]}
    rows = [row for m in manifests for row in inventory(m)]
    assert len({r['url'] for r in rows}) == len(rows), 'Duplicate retirement URLs'
    audit.write_csv(out / 'all-retired-urls.csv', rows)
    before_file = Path('seo-audit-output/retirement/source-map-before.json')
    after_file = out / 'source-map-after.json'
    sources = {r['url']: r for r in json.loads(before_file.read_text())} if before_file.exists() else {}
    metrics = {}
    for name in ('airline-page-decisions.csv', 'regional-page-decisions.csv', 'scenario-page-decisions.csv'):
        metrics_file = Path('seo-audit-output') / name
        if metrics_file.exists():
            with metrics_file.open() as stream:
                metrics.update({r['url']: r for r in csv.DictReader(stream)})
    earlier_file = Path('seo-audit-output/retirement/source-map-before.json')
    if earlier_file.exists():
        sources = {**{r['url']: r for r in json.loads(earlier_file.read_text())}, **sources}
    canonical_rows = []
    for row in rows:
        if row['kind'] != 'canonical':
            continue
        source = sources.get(row['url'], {})
        performance = metrics.get(row['url'], {})
        canonical_rows.append(dict(**row, title=source.get('title', ''), content_source=source.get('content_source', ''),
                                   clicks_max=performance.get('clicks_max', ''), impressions_max=performance.get('impressions_max', ''),
                                   clicks_90d=performance.get('clicks_90d', ''), impressions_90d=performance.get('impressions_90d', ''),
                                   top_query=performance.get('top_query', ''), backlinks='UNKNOWN',
                                   performance_source='Preserved GSC export, not a live indexing check' if performance else 'UNKNOWN'))
    audit.write_csv(out / 'canonical-pages-with-evidence.csv', canonical_rows)
    audit.write_csv(out / 'additional-programmatic-pages.csv', [r for r in canonical_rows
                    if r['family'] != 'airline_specific' and not r['previously_redirected']])
    source_check = None
    if before_file.exists() and after_file.exists():
        before = json.loads(before_file.read_text())
        after = json.loads(after_file.read_text())
        retired_ids = {a['id'] for a in manifest['articles']}
        kept = {r['url']: r for r in before if r['id'] not in retired_ids}
        retired_paths = {urlparse(r['url']).path for r in rows}
        def clean(value):
            if isinstance(value, dict):
                return {k: clean(v) for k, v in value.items()}
            if isinstance(value, list):
                return [clean(v) for v in value]
            if not isinstance(value, str):
                return value
            def unlink(match):
                target = urlparse(match[2])
                return match[1] if target.netloc in ('', 'letkasni.rs', 'www.letkasni.rs') and target.path in retired_paths else match[0]
            value = re.sub(r'\[([^\[\]\n]+)\]\(([^)]+)\)', unlink, value)
            return value
        actual = {r['url']: r for r in after}
        source_check = {'expected_retained': len(kept), 'actual_retained': len(after),
                        'unchanged_records': sum(kept.get(url) == record for url, record in actual.items()),
                        'only_approved_link_cleanup': clean(kept) == actual}

    if not args.base:
        print(json.dumps({'inventory_urls': len(rows), 'source_check': source_check}, indent=2))
        return

    base = args.base.rstrip('/')
    retired_paths = {urlparse(r['url']).path for r in rows}
    results = []

    def check_retired(row):
        path = urlparse(row['url']).path
        # Both ordinary and campaign-query requests must be real 404s, not redirects or soft 404s.
        for query in ('', '?utm_source=retirement-check'):
            status, headers, body = audit.fetch(base + path + query)
            doc = audit.Document()
            doc.feed(body)
            canonical = row['kind'] == 'canonical'
            passed = status == manifest['status'] and not any(k.lower() == 'location' for k in headers)
            if canonical:
                # Next emits the error UI through RSC; browser QA separately checks its header/footer.
                passed = passed and 'noindex' in doc.meta.get('robots', '') and not doc.canonical
            results.append(dict(url=path + query, kind=row['kind'], status=status, passed=passed))

    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(check_retired, rows))

    status, _, xml = audit.fetch(base + '/sitemap.xml')
    if status != 200:
        raise RuntimeError(f'Sitemap fetch returned {status}')
    (out / 'sitemap-local.xml').write_text(xml)
    urls = [e.text for e in ET.fromstring(xml).iter() if e.tag.endswith('}loc')]
    paths = {urlparse(url).path for url in urls}
    results.append(dict(url='/sitemap.xml', kind='sitemap', status=status,
                        passed=len(paths) == len(urls) and not paths.intersection(retired_paths)))
    linked_paths = set()
    content_records = json.loads(after_file.read_text()) if after_file.exists() else []
    content_by_url = {record['url']: record for record in content_records}
    localized = {(r['id'], r['template'], r['locale']): r['url'] for r in content_records}

    def check_live(url):
        path = urlparse(url).path
        status, _, body = audit.fetch(base + path)
        doc = audit.Document()
        doc.feed(body)
        links = {urlparse(link).path for link in doc.links
                 if link.startswith('/') or urlparse(link).hostname in ('letkasni.rs', 'www.letkasni.rs')}
        links.discard('')
        linked_paths.update(links)
        schema_valid = all(not isinstance(s, dict) or 'parse_error' not in s for s in doc.schemas)
        alternates_valid = True
        record = content_by_url.get(url)
        if record:
            alternates_valid = all(doc.alternates.get(locale) == localized[(record['id'], record['template'], locale)] for locale in ('sr', 'en'))
            if record['template'] == 'BlogArticlePageView':
                schema_valid = schema_valid and bool(doc.schemas)
        canonical_valid = doc.canonical == url or (path == '/' and doc.canonical == url.rstrip('/'))
        passed = status == 200 and canonical_valid and 'noindex' not in doc.meta.get('robots', '') and not links.intersection(retired_paths) and schema_valid and alternates_valid
        results.append(dict(url=path, kind='retained', status=status, passed=passed,
                            canonical=doc.canonical, alternates_valid=alternates_valid, retired_links=sorted(links.intersection(retired_paths))))

    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(check_live, urls))

    def check_link(path):
        status, _, _ = audit.fetch(base + path)
        results.append(dict(url=path, kind='extra_internal_link', status=status, passed=status in (200, 301, 302, 307, 308)))

    extra = linked_paths - paths
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(check_link, sorted(extra)))
    report = {'base': base, 'canonical_removed': sum(r['kind'] == 'canonical' for r in rows),
              'legacy_removed': sum(r['kind'] == 'legacy' for r in rows), 'sitemap_urls': len(urls),
              'source_check': source_check, 'checks': sorted(results, key=lambda r: (r['kind'], r['url']))}
    report['passed'] = all(r['passed'] for r in results) and (source_check is None or source_check['only_approved_link_cleanup'])
    (out / 'http-verification.json').write_text(json.dumps(report, indent=2))
    print(json.dumps({k: v for k, v in report.items() if k != 'checks'}, indent=2))
    print(f"Checks: {len(results)}; failures: {sum(not r['passed'] for r in results)}")
    for failure in [r for r in results if not r['passed']][:20]:
        print(json.dumps(failure))
    raise SystemExit(0 if report['passed'] else 1)


if __name__ == '__main__':
    main()
