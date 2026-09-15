"""Read-only checks for the approved consolidation; no GSC credentials or writes."""
import argparse
import json
import runpy
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlsplit, parse_qs

ROOT = Path(__file__).resolve().parent.parent
audit = runpy.run_path(str(ROOT / 'scripts/seo-recovery-audit.py'))


def redirect_matches(status, location, source_url, target_url):
    actual, expected = urlsplit(urljoin(source_url, location)), urlsplit(target_url)
    return (status in (301, 308) and bool(location)
            and (actual.scheme, actual.netloc, actual.path) == (expected.scheme, expected.netloc, expected.path)
            and parse_qs(actual.query) == parse_qs(expected.query))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='https://letkasni.rs')
    parser.add_argument('--output', default='seo-audit-output/monitor')
    parser.add_argument('--skip-www', action='store_true', help='Local preview only')
    args = parser.parse_args()
    base = args.base.rstrip('/')
    origin = 'https://letkasni.rs'
    fetch, Document = audit['fetch'], audit['Document']
    mapping = json.loads((ROOT / 'src/content/seo-consolidations.json').read_text())
    checks = []

    def record(name, passed, **details):
        checks.append(dict(name=name, passed=bool(passed), **details))

    status, _, xml = fetch(base + '/sitemap.xml')
    try:
        sitemap = {e.text for e in ET.fromstring(xml).findall('{*}url/{*}loc')}
    except ET.ParseError:
        sitemap = set()
    record('sitemap', status == 200 and bool(sitemap), status=status, count=len(sitemap))
    query = '?seo_monitor=one%20two&repeat=1&repeat=2'
    for group in mapping:
        for locale in ('sr', 'en'):
            pair = group[locale]
            source, target = pair['source'], pair['target']
            slug = source.rsplit('/', 1)[1]
            record('sitemap-membership:' + source,
                   origin + source not in sitemap and origin + target in sitemap)
            status, headers, html = fetch(base + target)
            doc = Document()
            doc.feed(html)
            robots = doc.meta.get('robots', '') + ' ' + next((v for k, v in headers.items() if k.lower() == 'x-robots-tag'), '')
            record('target:' + target, status == 200 and doc.canonical == origin + target
                   and 'noindex' not in robots.lower() and bool(doc.h1)
                   and all(doc.alternates.get(loc) == origin + group[loc]['target'] for loc in ('sr', 'en'))
                   and bool(doc.schemas) and all('parse_error' not in s for s in doc.schemas if isinstance(s, dict)),
                   status=status, canonical=doc.canonical, robots=robots.strip())
            for path in (source, '/blog/' + slug, '/en/blog/' + slug):
                hosts = [base]
                if not args.skip_www:
                    hosts.append('https://www.letkasni.rs')
                for host in hosts:
                    url = host + path + query
                    code, headers, _ = fetch(url)
                    location = next((v for k, v in headers.items() if k.lower() == 'location'), '')
                    record('redirect:' + host + path,
                           redirect_matches(code, location, url, base + target + query),
                           status=code, location=location)
    stamp = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H-%M-%SZ')
    result = dict(checked_at_utc=stamp, base=base, passed=all(c['passed'] for c in checks),
                  sitemap_count=len(sitemap), checks=checks,
                  note='Technical indexability only; Google index state and performance require GSC.')
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    (out / (stamp + '.json')).write_text(json.dumps(result, indent=2))
    (out / 'latest.json').write_text(json.dumps(result, indent=2))
    print(json.dumps({k: v for k, v in result.items() if k != 'checks'}, indent=2))
    for check in checks:
        if not check['passed']:
            print('FAIL', check['name'])
    raise SystemExit(0 if result['passed'] else 1)


if __name__ == '__main__':
    main()
