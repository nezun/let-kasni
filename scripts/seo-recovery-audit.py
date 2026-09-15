"""Read-only rendered SEO inventory. Standard library; never requests indexing."""
import argparse
import csv
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.title = []
        self.h1 = []
        self.body = []
        self.article = []
        self.links = set()
        self.meta = {}
        self.canonical = ''
        self.schemas = []
        self.schema_buffer = None
        self.alternates = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta':
            self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href', '')
        if tag == 'link' and a.get('hreflang'):
            self.alternates[a['hreflang']] = a.get('href', '')
        if tag == 'a' and a.get('href'):
            self.links.add(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.schema_buffer = []
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema_buffer is not None:
            raw = ''.join(self.schema_buffer)
            try:
                self.schemas.append(json.loads(raw))
            except ValueError:
                self.schemas.append({'parse_error': raw[:120]})
            self.schema_buffer = None
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack) - 1 - self.stack[::-1].index(tag)]

    def handle_data(self, text):
        if self.schema_buffer is not None:
            self.schema_buffer.append(text)
        if 'title' in self.stack:
            self.title.append(text)
        if 'h1' in self.stack:
            self.h1.append(text)
        if not any(t in self.stack for t in ('script', 'style', 'nav', 'header', 'footer')):
            if 'main' in self.stack:
                self.body.append(text)
            if 'article' in self.stack:
                self.article.append(text)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'LetKasni-SEO-Audit/1.0'})
            with urllib.request.build_opener(NoRedirect).open(req, timeout=40) as res:
                return res.status, dict(res.headers), res.read().decode('utf-8', errors='replace')
        except urllib.error.HTTPError as exc:
            return exc.code, dict(exc.headers), exc.read().decode('utf-8', errors='replace')
        except (OSError, TimeoutError) as exc:
            if attempt == 2:
                return 0, {}, str(exc)
            time.sleep(attempt + 1)


def write_csv(path, rows):
    if not rows:
        return
    with path.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def schema_types(value):
    if isinstance(value, dict):
        own = value.get('@type', [])
        return ([own] if isinstance(own, str) else own) + [t for v in value.values() for t in schema_types(v)]
    if isinstance(value, list):
        return [t for v in value for t in schema_types(v)]
    return []


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='https://letkasni.rs')
    parser.add_argument('--input', default='../GSC-EXPORT-2026-09-15')
    parser.add_argument('--output', default='seo-audit-output/before')
    parser.add_argument('--sources', default='seo-audit-output/source-map.json')
    parser.add_argument('--extra-urls', help='JSON list of URLs to inspect even when absent from sitemap')
    args = parser.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    status, _, sitemap = fetch(args.base + '/sitemap.xml')
    if status != 200:
        raise RuntimeError(f'Sitemap failed: {status} {sitemap[:200]}')
    (out / 'sitemap.xml').write_text(sitemap)
    robots_status, _, robots_text = fetch(args.base + '/robots.txt')
    if robots_status != 200:
        raise RuntimeError(f'robots.txt failed: {robots_status}')
    (out / 'robots.txt').write_text(robots_text)
    root = ET.fromstring(sitemap)
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    submitted = {u.findtext('s:loc', namespaces=ns): u.findtext('s:lastmod', default='', namespaces=ns) for u in root.findall('s:url', ns)}
    gsc = {}
    for filename, state in [('01-crawled-currently-not-indexed-57.csv', 'CRAWLED_CURRENTLY_NOT_INDEXED'), ('02-google-chose-different-canonical-8.csv', 'GOOGLE_SELECTED_DIFFERENT_CANONICAL'), ('03-not-found-404-2.csv', 'NOT_FOUND_404')]:
        with (Path(args.input) / filename).open(encoding='utf-8-sig') as f:
            for row in csv.DictReader(f):
                gsc[row['URL']] = {'state': state, 'last_crawled': row['Last crawled']}
    rows = {}
    documents = {}
    source_path = Path(args.sources)
    sources = {r['url']: r for r in json.loads(source_path.read_text())} if source_path.exists() else {}

    def inspect(url):
        parsed = urllib.parse.urlsplit(url)
        request_url = args.base.rstrip('/') + parsed.path + ('?' + parsed.query if parsed.query else '')
        status, headers, html = fetch(request_url)
        doc = Document()
        doc.feed(html)
        path = parsed.path
        parts = path.strip('/').split('/')
        locale = 'en' if parts[0] == 'en' else 'sr'
        local = parts[1:] if locale == 'en' else parts
        family = 'home' if not local or not local[0] else local[0]
        text = ' '.join(' '.join(doc.article or doc.body).split())
        links = set()
        for href in doc.links:
            target = urllib.parse.urljoin(url, href)
            p = urllib.parse.urlsplit(target)
            if p.hostname in {'letkasni.rs', urllib.parse.urlsplit(args.base).hostname}:
                links.add('https://letkasni.rs' + p.path + ('?' + p.query if p.query else ''))
        robots = doc.meta.get('robots', '') + ' ' + next((v for k, v in headers.items() if k.lower() == 'x-robots-tag'), '')
        record = dict(url=url, route_family=family, locale=locale, template='BlogArticlePageView' if len(local) > 1 and family != 'blog' else 'hub_or_static', http_status=status, indexable=status == 200 and 'noindex' not in robots.lower(), robots=robots.strip(), canonical=doc.canonical, canonical_is_self=doc.canonical == url, title=' '.join(doc.title), meta_description=doc.meta.get('description', ''), h1=' '.join(doc.h1), word_count=len(text.split()), structured_data_types=';'.join(sorted(set(schema_types(doc.schemas)))), json_ld_valid=all('parse_error' not in s for s in doc.schemas if isinstance(s, dict)), internal_inlinks=0, internal_outlinks=len(links), sitemap_included=url in submitted, redirect_target=next((urllib.parse.urljoin(url, v) for k, v in headers.items() if k.lower() == 'location'), ''), content_source='repository mapping pending', last_modified=submitted.get(url, ''), gsc_state=gsc.get(url, {}).get('state', ''), gsc_last_crawl=gsc.get(url, {}).get('last_crawled', ''), nearest_url='', similarity=0)
        source = sources.get(url, {})
        record['content_source'] = source.get('content_source', f"src/app{path.rstrip('/')}/page.tsx")
        record['template'] = source.get('template', record['template'])
        # An empty path and '/' represent the same origin URL.
        canonical_parts = urllib.parse.urlsplit(doc.canonical)
        record['canonical_is_self'] = bool(doc.canonical) and canonical_parts._replace(path=canonical_parts.path or '/') == parsed._replace(path=parsed.path or '/')
        return record, dict(text=text, links=sorted(links), schemas=doc.schemas, alternates=doc.alternates, meta=doc.meta)

    utility = {'https://letkasni.rs' + p for p in ['/email-offers', '/en/email-offers', '/marketing/confirm', '/en/marketing/confirm']}
    pending = set(submitted) | set(gsc) | utility
    if args.extra_urls:
        pending.update(json.loads(Path(args.extra_urls).read_text()))
    # Include one-hop public destinations so broken links and old redirects are measured.
    for depth in range(2):
        with ThreadPoolExecutor(max_workers=4) as pool:
            for record, document in pool.map(inspect, sorted(pending)):
                rows[record['url']] = record
                documents[record['url']] = document
                if len(rows) % 25 == 0:
                    print(f'Inspected {len(rows)} URLs', flush=True)
        pending = {link for d in documents.values() for link in d['links'] if link not in rows and not re.search(r'/(api|admin|design|auth)(/|$)', urllib.parse.urlsplit(link).path)}
    for document in documents.values():
        for target in document['links']:
            if target in rows:
                rows[target]['internal_inlinks'] += 1
    shingles = {}
    for url, d in documents.items():
        words = re.findall(r'\w+', d['text'].lower())
        shingles[url] = {tuple(words[i:i+5]) for i in range(max(0, len(words)-4))}
    for url, row in rows.items():
        if not row['sitemap_included'] or not shingles[url]:
            continue
        for other, candidate in rows.items():
            if url >= other or not candidate['sitemap_included'] or (row['locale'], row['route_family']) != (candidate['locale'], candidate['route_family']):
                continue
            a, b = shingles[url], shingles[other]
            score = len(a & b) / len(a | b) if a | b else 0
            for source, neighbor in [(url, other), (other, url)]:
                if score > rows[source]['similarity']:
                    rows[source]['similarity'] = round(score, 4)
                    rows[source]['nearest_url'] = neighbor
    write_csv(out / 'url-inventory.csv', list(rows.values()))
    write_csv(out / 'gsc-problems.csv', [r for r in rows.values() if r['gsc_state']])
    (out / 'documents.json').write_text(json.dumps(documents, ensure_ascii=False, indent=2))
    (out / 'summary.json').write_text(json.dumps(dict(base=args.base, sitemap_urls=len(submitted), inspected=len(rows), gsc_urls=len(gsc), statuses={str(s): sum(r['http_status'] == s for r in rows.values()) for s in set(r['http_status'] for r in rows.values())}), indent=2))
    print((out / 'summary.json').read_text())


if __name__ == '__main__':
    main()
