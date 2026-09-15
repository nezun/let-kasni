"""Generate the local kept/removed/review backlog from verified inventories, never publish it."""
import argparse
import csv
import json
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='seo-audit-output/retirement-final')
    out = Path(parser.parse_args().output)
    content = json.loads((out / 'source-map-after.json').read_text())
    source = {r['url']: r for r in content}
    urls = [e.text for e in ET.parse(out / 'sitemap-local.xml').findall('{*}url/{*}loc')]
    policy = json.loads(Path('src/content/seo-suggested-removals.json').read_text())
    assert policy['applyRemoval'] is False and policy['approvalRequired'] is True
    suggestions = {a['id'] for a in policy['articles']}
    with (out / 'canonical-pages-with-evidence.csv').open() as stream:
        removed = list(csv.DictReader(stream))
    metrics = {}
    metrics_file = Path('seo-audit-output/scenario-page-decisions.csv')
    if metrics_file.exists():
        with metrics_file.open() as stream:
            metrics = {r['url']: r for r in csv.DictReader(stream)}
    assert len(urls) == len(set(urls)) == 158
    assert len(content) == 152 and len(removed) == 124
    assert not set(urls).intersection(r['url'] for r in removed)
    titles = {'/': 'Pocetna', '/en': 'Homepage', '/blog': 'Blog', '/en/blog': 'Blog',
              '/privacy': 'Politika privatnosti', '/terms': 'Uslovi koriscenja'}
    kept, backlog = [], []
    for url in urls:
        record = source.get(url, {})
        row = dict(status='KEEP_PUBLISHED', id=record.get('id', ''),
                   title=record.get('title', titles.get(urlparse(url).path, '')),
                   locale=record.get('locale', 'en' if urlparse(url).path.startswith('/en') else 'sr'),
                   url=url, suggested_for_removal=record.get('id') in suggestions)
        kept.append(row)
        if row['suggested_for_removal']:
            perf = metrics.get(url, {})
            backlog.append(dict(**row, decision='SUGGESTED_FOR_REMOVAL_NOT_APPROVED',
                                reason=policy['reason'], clicks_max=perf.get('clicks_max', ''),
                                impressions_max=perf.get('impressions_max', ''),
                                clicks_90d=perf.get('clicks_90d', ''), impressions_90d=perf.get('impressions_90d', ''),
                                top_query=perf.get('top_query', ''), backlinks='UNKNOWN',
                                evidence='Historical GSC export; not a current index or ranking check',
                                required_review='Unique intent, overlap, current GSC and backlinks; explicit owner approval'))
    assert len(backlog) == 94
    for name, rows in [('OSTAJE-158-URL.csv', kept), ('UKLONJENO-124-STRANICE.csv', removed),
                       ('SUGGESTED-FOR-REMOVAL-94-URL.csv', backlog)]:
        with (out / name).open('w', encoding='utf-8-sig', newline='') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)

    def link(url):
        return f'[{urlparse(url).path}]({url})'

    def table(rows):
        return ['| Naslov | Jezik | URL |', '|---|---|---|'] + [
            f"| {r['title'].replace('|', '/')} | {r['locale']} | {link(r['url'])} |" for r in rows]

    lines = ['# Konacna lokalna mapa i popis', '',
             '**NIJE DEPLOYOVANO. Ceka odobrenje vlasnika.**', '',
             'URL-ovi sa domenom letkasni.rs oznacavaju produkcione adrese, ne dokaz objave ovih izmena.', '',
             '- Ostaje 158 sitemap URL-ova: 68 clanaka x 2 jezika, 8 vodica x 2 jezika i 6 osnovnih stranica.',
             '- Vraceno je 47 general/scenario clanaka, odnosno 94 SR/EN URL-a.',
             '- Uklonjeno ostaje 46 airline clanaka (92 URL-a) i 16 regional/route clanaka (32 URL-a).',
             '- Ukupno 124 kanonske adrese i 248 starih aliasa vracaju 404: 372 adrese.',
             '- Svih sest prethodno odobrenih konsolidacija A-F ostaje; izvorne duplikate ne objavljujemo ponovo.', '',
             '## Suggested for removal: nije odobreno, ostaje objavljeno', '',
             'Ovo je lista za buducu urednicku procenu, a NE nalog za brisanje. Razlozi za pregled su moguce preklapanje namere pretrage, rascepkanost iste teme na vise tekstova i ponavljanje sablonskih objasnjenja. To nisu dokazi da je svaka od ovih stranica losa ili da postoji Google kazna.', '',
             'Slab istorijski promet sam po sebi nije razlog za uklanjanje. Za svaku stranicu treba proveriti jedinstvenu vrednost, aktuelne GSC podatke i backlinkove (trenutno UNKNOWN), pa odluciti: ostaviti, unaprediti, smisleno spojiti ili ukloniti. Nista se ne uklanja bez novog odobrenja.', '',
             'Storage: trajni javni manifest je src/content/seo-suggested-removals.json; obogaceni GSC CSV je ovde lokalno i git-ignored. Sadrzaj ostaje u aktivnim izvornim fajlovima, a polazna verzija u Git istoriji. Ovo nije optimizacija disk prostora.', '',
             '[CSV backlog sa 94 URL-a](SUGGESTED-FOR-REMOVAL-94-URL.csv)', '']
    lines += table(backlog)
    lines += ['', '## Ostaje: potpuna mapa', '', '[XML sitemap](sitemap-local.xml)', '']
    for parent in sorted({urlparse(r['url']).path.rsplit('/', 1)[0] or '/' for r in kept}):
        rows = [r for r in kept if (urlparse(r['url']).path.rsplit('/', 1)[0] or '/') == parent]
        lines += ['### ' + parent, ''] + table(rows) + ['']
    lines += ['## Uklonjeno: samo airline i regional/route', ''] + table(removed)
    lines += ['', '## Van sitemap-a, nije uklanjano', '',
              'EN pravne stranice, SR/EN formulari, administracija, claim obrada i servisni API-jevi ostaju. Nisu SEO clanci.', '',
              '## Verifikacija', '']
    for file in ['http-verification.json', 'retained-redirects/latest.json', 'browser/results.json']:
        if (out / file).exists():
            report = json.loads((out / file).read_text())
            lines.append(f'- [{file}]({file}): pogledati masinski proverene rezultate.')
    lines += ['', 'Pokrenuti npm run verify, HTTP audit, redirect monitor i browser harness prema docs/SEO-RETIREMENT-RUNBOOK.md. Nakon zasebnog odobrenja deploy-a ponoviti na produkciji; tek potom proveriti Google indeksiranje. Automatsko generisanje novih clanaka ostaje pauzirano.', '']
    (out / 'MAPA-I-POPIS.md').write_text('\n'.join(lines))
    print(json.dumps({'sitemap': len(kept), 'removed': len(removed), 'suggested_but_kept': len(backlog),
                      'report': str(out / 'MAPA-I-POPIS.md')}, indent=2))


if __name__ == '__main__':
    main()
