"""Join saved crawl evidence and repository data; never infer removal from GSC alone."""
import csv
import json
import re
from urllib.parse import urlsplit
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path('seo-audit-output')
rows = list(csv.DictReader((ROOT / 'before/url-inventory.csv').open()))
sources = {s['url']: s for s in json.loads((ROOT / 'source-map.json').read_text())}
docs = json.loads((ROOT / 'before/documents.json').read_text())
enhancement_source = Path('src/lib/blog-content-enhancements.ts').read_text()
airlines = set(re.findall(r'"([\w-]+)"', enhancement_source.split('const airlineDelayArticleIds = new Set([')[1].split(']);')[0]))
source_texts = {s['content_source']: Path(s['content_source']).read_text() for s in sources.values()}
original_paragraph_frequency = Counter()
for source in sources.values():
    original_paragraph_frequency.update(set(p for section in source.get('original_sections', []) for p in section.get('body', [])))


def write(name, data, fields=None):
    with (ROOT / name).open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields or list(data[0]))
        writer.writeheader()
        writer.writerows(data)


def family(row, source):
    if source.get('template') == 'CornerstoneTypographyPreview':
        return 'core_guides'
    if source.get('id') in airlines or 'type AirlineTopic' in source_texts.get(source.get('content_source'), ''):
        return 'airline_articles'
    if source.get('generated') and re.match(r'(serbia-|belgrade-|nis-|eu-serbia)', source.get('id', '')):
        return 'regional_route_airport_articles'
    if source.get('generated'):
        return 'generated_scenario_articles'
    if source:
        return 'standalone_editorial_articles'
    return row['route_family']


actions = []
groups = defaultdict(list)
for row in rows:
    source = sources.get(row['url'], {})
    row['content_source'] = source.get('content_source', row['content_source'])
    row['template'] = source.get('template', row['template'])
    row['content_family'] = family(row, source)
    original = [p for section in source.get('original_sections', []) for p in section.get('body', [])]
    enhanced = [p for section in source.get('enhancement_sections', []) for p in section.get('body', [])]
    row['original_paragraphs'] = len(original)
    row['original_exact_unique_paragraphs'] = sum(original_paragraph_frequency[p] == 1 for p in original)
    row['appended_word_share'] = round(sum(len(p.split()) for p in enhanced) / max(1, sum(len(p.split()) for p in original + enhanced)), 4)
    if row['url'] == 'https://letkasni.rs/' and row['canonical'] == 'https://letkasni.rs':
        row['canonical_is_self'] = 'True'
    score = float(row['similarity'])
    technical = []
    if row['http_status'] == '200' and row['indexable'] == 'True' and not row['canonical']:
        technical.append('missing declared canonical')
    if row['sitemap_included'] == 'True' and row['http_status'] != '200':
        technical.append('non-200 sitemap URL')
    if row['sitemap_included'] == 'True' and row['indexable'] != 'True':
        technical.append('non-indexable sitemap URL')
    if row['json_ld_valid'] != 'True':
        technical.append('invalid JSON-LD')
    action, reason, confidence = 'KEEP', 'Current URL has coherent technical signals; retain distinct intent.', 'medium'
    content = ''
    template_fix = ''
    if row['sitemap_included'] == 'True':
        groups[row['content_family']].append(row)
    if source.get('enhancement_sections'):
        content = 'Shared runtime sections appended to original article; review overlap with original evidence/care sections.'
        template_fix = 'Review shared enhancements and retain only useful non-redundant content; enrich only with verified page-specific research.'
        if score >= 0.7:
            action, reason = 'HUMAN_REVIEW', 'High rendered similarity plus shared template; compare distinct intent and unique jurisdiction/carrier evidence before merger.'
        elif score >= 0.4 or row['gsc_state'] == 'CRAWLED_CURRENTLY_NOT_INDEXED':
            action, reason = 'IMPROVE', 'Shared template and/or GSC exclusion justify editorial review; exclusion alone does not justify removal.'
        competing_hub = next((s for s in sources.values() if s.get('template') == 'CornerstoneTypographyPreview' and s['locale'] == source['locale'] and s['id'] == source['id']), None)
        if competing_hub:
            action, reason = 'HUMAN_REVIEW', 'Article and core guide share the same primary topic ID; review search intent overlap and performance before choosing a destination.'
            content += ' Potential intent competitor: ' + competing_hub['url']
    if technical:
        action, reason, confidence = 'FIX_TECHNICAL', '; '.join(technical), 'high'
    if row['url'] in ['https://letkasni.rs/', 'https://letkasni.rs/en']:
        action, reason, confidence = 'IMPROVE', 'Add verified WebSite/operator entity graph to existing healthy homepage.', 'high'
    if row['redirect_target']:
        action, reason, confidence = 'KEEP', 'Permanent historical redirect already implemented; destination checked separately. Keep old URL out of sitemap.', 'high'
    if row['http_status'] == '404':
        action, reason, confidence = 'KEEP', 'Retired image endpoint; no incoming public links or sitemap inclusion found. Keep 404 rather than redirect an image to an HTML page.', 'high'
    if urlsplit(row['url']).path in ['/email-offers', '/en/email-offers', '/marketing/confirm', '/en/marketing/confirm']:
        action, reason, confidence = 'NOINDEX_KEEP_FOR_USERS', 'Token-based subscription preference/confirmation utility, not a search landing page. Preserve user access and followable links.', 'high'
    actions.append(dict(URL=row['url'], family=row['content_family'], GSC_state=row['gsc_state'], action=action, reason=reason, confidence=confidence, target='', technical_issue='; '.join(technical), content_issue=content, template_level_fix=template_fix, closest_page=row['nearest_url'], similarity=score, internal_inlinks=row['internal_inlinks'], canonical=row['canonical']))

write('url-inventory.csv', rows)
write('url-actions.csv', actions)
write('crawled-currently-not-indexed.csv', [a for a in actions if a['GSC_state'] == 'CRAWLED_CURRENTLY_NOT_INDEXED'])
clusters = []
for name, group in groups.items():
    scores = [float(r['similarity']) for r in group]
    clusters.append(dict(route_family=name, number_of_pages=len(group), template=';'.join(sorted(set(r['template'] for r in group))), content_sources=';'.join(sorted(set(r['content_source'] for r in group))), similarity_level=round(sum(scores)/len(scores), 4), max_similarity=max(scores), high_similarity_pages=sum(s >= 0.7 for s in scores), unique_data_available='Existing localized source sections and scenario/carrier/route fields; no verified new external dataset' if name.endswith('articles') else 'Existing guide, brand or legal content', quality_risk='high' if max(scores) >= 0.7 else 'moderate' if max(scores) >= 0.4 else 'low', recommended_template_action='Review repeated original and appended sections; retain material intent differences; research before consolidation' if max(scores) >= 0.4 else 'Retain; maintain metadata and contextual hub linking'))
write('url-family-report.csv', clusters)

# Quantify exact shared paragraphs in original source, separately from rendered shingles.
paragraphs = defaultdict(set)
for url, source in sources.items():
    for section in source.get('original_sections', source.get('sections', [])):
        for paragraph in section.get('body', []):
            normalized = re.sub(r'\s+', ' ', paragraph).strip()
            if len(normalized.split()) >= 20:
                paragraphs[normalized].add(url)
repeated = sorted(({'paragraph': p, 'pages': len(urls), 'urls': ';'.join(sorted(urls))} for p, urls in paragraphs.items() if len(urls) >= 3), key=lambda p: -p['pages'])
write('repeated-source-paragraphs.csv', repeated)

lookup = {r['url']: r for r in rows}
canonical = []
not_found = []
for row in rows:
    if row['gsc_state'] not in {'GOOGLE_SELECTED_DIFFERENT_CANONICAL', 'NOT_FOUND_404'}:
        continue
    target = lookup.get(row['redirect_target'], {})
    result = dict(URL=row['url'], gsc_last_crawl=row['gsc_last_crawl'], current_status=row['http_status'], declared_canonical=row['canonical'], current_redirect=row['redirect_target'], target_status=target.get('http_status', ''), target_canonical=target.get('canonical', ''), target_in_sitemap=target.get('sitemap_included', ''), current_internal_inlinks=row['internal_inlinks'], google_selected_canonical='Not present in exported CSV; current redirect target is not proof of historical Google choice', recommendation='Existing redirect to the same article under its primary guide; no additional consolidation warranted' if target else 'Retired image URL: no inlinks/sitemap; retain 404', evidence='Current HTTP crawl plus route handlers/next.config.ts; old rendered content is unavailable')
    (canonical if row['gsc_state'] == 'GOOGLE_SELECTED_DIFFERENT_CANONICAL' else not_found).append(result)
write('canonical-report.csv', canonical)
write('404-report.csv', not_found)
write('redirect-map.csv', [], ['old_URL', 'new_URL', 'reason'])
core = [{'URL': 'https://letkasni.rs/', 'role': 'Primary brand and claim entry'}, {'URL': 'https://letkasni.rs/en', 'role': 'English brand and claim entry'}]
core += [{'URL': s['url'], 'role': 'Primary guide: ' + s['title']} for s in sources.values() if s['template'] == 'CornerstoneTypographyPreview']
core += [{'URL': s['url'], 'role': 'Priority airline editorial review; not a traffic-based ranking'} for s in sources.values() if s['id'] == 'air-serbia-flight-delay-compensation' and s['locale'] == 'sr']
write('core-urls.csv', core)
print(json.dumps({'actions': dict(Counter(a['action'] for a in actions)), 'families': clusters, 'canonical_reports': len(canonical), '404_reports': len(not_found), 'core_urls': len(core), 'shared_source_paragraphs': len(repeated)}, indent=2))
