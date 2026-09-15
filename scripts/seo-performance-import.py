"""Import real native GSC exports; preserve raw observations and alias lineage."""
import csv
import hashlib
import io
import json
import re
import zipfile
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path('seo-audit-output')
RAW = ROOT / 'performance-raw'


def read(path):
    with path.open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def write(path, rows, fields=None):
    with path.open('w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fields or list(rows[0]))
        w.writeheader()
        w.writerows(rows)


def norm(url):
    p = urlsplit(url)
    return urlunsplit((p.scheme, p.netloc, p.path or '/', p.query, ''))


def numeric(row):
    return {'clicks': int(row['Clicks']), 'impressions': int(row['Impressions']), 'ctr': float(row['CTR'].rstrip('%') or 0) / 100, 'position': float(row['Position'] or 0)}


def aggregate(records):
    impressions = sum(r['impressions'] for r in records)
    clicks = sum(r['clicks'] for r in records)
    return {'clicks': clicks, 'impressions': impressions, 'ctr': round(clicks / impressions, 6) if impressions else '', 'position': round(sum(r['position'] * r['impressions'] for r in records) / impressions, 4) if impressions else ''}


def brand_class(query):
    if re.search(r'\bletkasni(?:\.rs)?\b', query, re.I):
        return 'brand'
    if re.search(r'\blet\s+kasni\b', query, re.I):
        return 'ambiguous'
    return 'nonbrand'


def main():
    inventory = read(ROOT / 'url-inventory.csv')
    sources = json.loads((ROOT / 'source-map.json').read_text())
    canonical = {norm(r['url']) for r in inventory if r['http_status'] == '200' and (r['canonical_is_self'] == 'True' or r['sitemap_included'] == 'True') and r['indexable'] == 'True'}
    canonical |= {'https://letkasni.rs/en/privacy', 'https://letkasni.rs/en/terms'}
    by_slug = defaultdict(set)
    for source in sources:
        by_slug[urlsplit(source['url']).path.split('/')[-1]].add(source['url'])
    redirects = {r['url']: r['redirect_target'] for r in inventory if r['redirect_target']}

    def resolve(url):
        url = norm(url)
        if url in canonical:
            return url, 'current canonical'
        if url in redirects and redirects[url] in canonical:
            return redirects[url], 'verified baseline permanent redirect'
        if re.match(r'^/(en/)?blog/[^/]+$', urlsplit(url).path):
            candidates = by_slug[urlsplit(url).path.split('/')[-1]]
            if len(candidates) == 1:
                return next(iter(candidates)), 'legacy blog route handler + unique existing article slug'
        return '', 'UNRESOLVED; not assigned by similarity'

    page_tables = {window: read(RAW / window / 'Pages.csv') for window in ['28d', '90d', '6m', 'max']}
    max_pages = {r['Top pages']: r for r in page_tables['max']}
    manifest_path = RAW / 'page-export-manifest.json'
    saved = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    page_exports = {}
    for page, export in saved.items():
        directory = Path(export['directory'])
        if page in max_pages and all((directory / n).exists() for n in ['Filters.csv', 'Queries.csv', 'Chart.csv']):
            filters = {r['Filter']: r['Value'] for r in read(directory / 'Filters.csv')}
            if filters.get('Page') == page and filters.get('Date') == 'Last 16 months' and filters.get('Search type') == 'Web':
                page_exports[page] = export
    page_dir = RAW / 'pages'
    page_dir.mkdir(exist_ok=True)
    # Only accept this task's property/date/native exports with an exact Page filter.
    for archive in sorted(Path.home().joinpath('Downloads').glob('letkasni.rs-Performance-on-Search-2026-09-15*.zip'), key=lambda p: p.stat().st_mtime):
        with zipfile.ZipFile(archive) as z:
            if 'Filters.csv' not in z.namelist():
                continue
            filters = {r['Filter']: r['Value'] for r in csv.DictReader(io.StringIO(z.read('Filters.csv').decode('utf-8-sig')))}
            page = filters.get('Page')
            if page not in max_pages or filters.get('Date') != 'Last 16 months' or filters.get('Search type') != 'Web':
                continue
            key = hashlib.sha256(page.encode()).hexdigest()[:16]
            destination = page_dir / key
            destination.mkdir(exist_ok=True)
            for name in ['Filters.csv', 'Queries.csv', 'Pages.csv', 'Chart.csv']:
                if name in z.namelist():
                    (destination / name).write_bytes(z.read(name))
            page_exports[page] = {'directory': str(destination), 'download': str(archive), 'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}
    (RAW / 'page-export-manifest.json').write_text(json.dumps(page_exports, indent=2))

    grouped = {w: defaultdict(list) for w in page_tables}
    aliases = defaultdict(set)
    alias_report = []
    for w, rows in page_tables.items():
        for row in rows:
            original = row['Top pages']
            target, evidence = resolve(original)
            if w == 'max':
                alias_report.append({'reported_url': original, 'canonical_url': target, 'mapping_evidence': evidence, **numeric(row)})
            if target:
                grouped[w][target].append(numeric(row))
                aliases[target].add(original)
    write(ROOT / 'gsc-url-history-map.csv', alias_report)

    raw_pairs = []
    canonical_pairs = defaultdict(list)
    dates = defaultdict(list)
    data_errors = []
    for page, export in page_exports.items():
        target, _ = resolve(page)
        directory = Path(export['directory'])
        daily = read(directory / 'Chart.csv')
        total = {k: sum(int(r[k]) for r in daily) for k in ['Clicks', 'Impressions']}
        expected = {k: int(max_pages[page][k]) for k in total}
        if total != expected:
            data_errors.append({'page': page, 'expected_page_table': expected, 'filtered_chart': total})
        if target:
            dates[target] += [r['Date'] for r in daily if int(r['Impressions']) > 0]
        for row in read(directory / 'Queries.csv'):
            pair = {'reported_url': page, 'url': target, 'query': row['Top queries'], **numeric(row)}
            raw_pairs.append(pair)
            if target:
                canonical_pairs[(target, pair['query'])].append(pair)
    write(ROOT / 'gsc-page-query-raw.csv', raw_pairs, ['reported_url', 'url', 'query', 'clicks', 'impressions', 'ctr', 'position'])
    query_rows = [{'url': url, 'query': query, **aggregate(records)} for (url, query), records in sorted(canonical_pairs.items())]
    write(ROOT / 'gsc-page-query-performance.csv', query_rows, ['url', 'query', 'clicks', 'impressions', 'ctr', 'position'])
    query_by_page = defaultdict(list)
    for row in query_rows:
        query_by_page[row['url']].append(row)
    results = []
    for url in sorted(canonical):
        queries = sorted(query_by_page[url], key=lambda r: (-r['impressions'], -r['clicks'], r['query']))
        result = {'url': url}
        for window in page_tables:
            total = aggregate(grouped[window][url])
            result.update({f'clicks_{window}': total['clicks'], f'impressions_{window}': total['impressions'], f'ctr_{window}': total['ctr'], f'avg_position_{window}': total['position']})
        observed = sum(q['impressions'] for q in queries)
        branded = sum(q['impressions'] for q in queries if brand_class(q['query']) == 'brand')
        ambiguous = sum(q['impressions'] for q in queries if brand_class(q['query']) == 'ambiguous')
        complete = all(a in page_exports for a in aliases[url])
        result.update(first_impression_date=min(dates[url]) if dates[url] and complete else '', last_impression_date=max(dates[url]) if dates[url] and complete else '', top_query=queries[0]['query'] if queries else '', top_query_impressions=queries[0]['impressions'] if queries else '', top_5_queries=json.dumps([q['query'] for q in queries[:5]], ensure_ascii=False), query_count=len(queries), observed_query_impressions=observed, query_coverage=round(observed/result['impressions_max'], 4) if result['impressions_max'] else '', branded_share_observed=round(branded/observed, 4) if observed else '', nonbranded_share_observed=round((observed-branded)/observed, 4) if observed else '', query_export_complete=complete, performance_status='REPORTED' if result['impressions_max'] else 'NO_REPORTED_ROW', date_status='OBSERVED_WITHIN_AVAILABLE_WINDOW' if dates[url] and complete else 'NO_REPORTED_IMPRESSIONS' if not aliases[url] else 'PAGE_EXPORT_PENDING', historical_aliases=';'.join(sorted(aliases[url] - {url})), backlinks='UNKNOWN', referring_domains='UNKNOWN')
        result['nonbranded_share_observed'] = round((observed-branded-ambiguous)/observed, 4) if observed else ''
        result['ambiguous_brand_share_observed'] = round(ambiguous/observed, 4) if observed else ''
        results.append(result)
    write(ROOT / 'gsc-page-performance.csv', results)
    windows = {}
    for window in page_tables:
        chart = read(RAW / window / 'Chart.csv')
        windows[window] = {'start': chart[0]['Date'], 'end': chart[-1]['Date'], 'days': len(chart), 'property_clicks': sum(int(r['Clicks']) for r in chart), 'property_impressions': sum(int(r['Impressions']) for r in chart), 'page_rows': len(page_tables[window]), 'page_clicks': sum(int(r['Clicks']) for r in page_tables[window]), 'page_impressions': sum(int(r['Impressions']) for r in page_tables[window])}
    summary = {'source': 'native GSC UI CSV; exact Page filters for page x query and daily history', 'property': 'sc-domain:letkasni.rs', 'search_type': 'Web', 'windows': windows, 'raw_pages': len(max_pages), 'exported_pages': len(page_exports), 'missing_page_exports': sorted(set(max_pages)-set(page_exports)), 'canonical_pages': len(results), 'unmapped': [r for r in alias_report if not r['canonical_url']], 'raw_page_query_rows': len(raw_pairs), 'canonical_page_query_rows': len(query_rows), 'filtered_chart_mismatches': data_errors}
    (ROOT / 'gsc-performance-provenance.json').write_text(json.dumps(summary, indent=2))
    print(json.dumps({k:v for k,v in summary.items() if k != 'missing_page_exports'}, indent=2))


if __name__ == '__main__':
    main()
