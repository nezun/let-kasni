"""Offline validation of the decision artifacts; no production operations."""
import csv
import importlib.util
import json
from pathlib import Path

ROOT = Path('seo-audit-output')


def rows(name):
    with (ROOT / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def main():
    spec = importlib.util.spec_from_file_location('gsc_import', 'scripts/seo-performance-import.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    assert module.aggregate([]) == {'clicks':0,'impressions':0,'ctr':'','position':''}
    result = module.aggregate([{'clicks':1,'impressions':10,'position':20},{'clicks':2,'impressions':30,'position':40}])
    assert result == {'clicks':3,'impressions':40,'ctr':0.075,'position':35.0}
    assert module.brand_class('letkasni.rs') == 'brand'
    assert module.brand_class('sta kada let kasni') == 'ambiguous'
    assert module.brand_class('wizz air delay compensation') == 'nonbrand'
    p = {r['url']:r for r in rows('gsc-page-performance.csv')}
    d = {r['url']:r for r in rows('final-seo-consolidation-proposal.csv')}
    assert len(p)==len(d)==296 and set(p)==set(d)
    assert sum(r['sitemap_included']=='True' for r in d.values())==294
    history = rows('gsc-url-history-map.csv')
    assert len(history)==171 and all(r['canonical_url'] in p for r in history)
    assert sum(int(r['impressions_max']) for r in p.values())==sum(int(r['impressions']) for r in history)==1036
    assert sum(int(r['clicks_max']) for r in p.values())==16
    for r in p.values():
        assert int(r['impressions_28d']) <= int(r['impressions_90d']) <= int(r['impressions_max'])
        assert int(r['clicks_28d']) <= int(r['clicks_90d']) <= int(r['clicks_max'])
        if r['first_impression_date']:
            assert '2026-04-29' <= r['first_impression_date'] <= r['last_impression_date'] <= '2026-09-12'
            assert r['query_export_complete']=='True'
        assert r['backlinks']==r['referring_domains']=='UNKNOWN'
    allowed = {'KEEP_STRONG','KEEP_IMPROVE','MERGE_301','NOINDEX_KEEP','REMOVE_410','HUMAN_REVIEW'}
    merges = {r['source_url']:r for r in rows('merge-proposals-evidence.csv')}
    for u,r in d.items():
        assert r['proposed_action'] in allowed
        assert r['backlinks']==r['referring_domains']=='UNKNOWN'
        if r['proposed_action']=='MERGE_301':
            t=r['proposed_target']
            assert u in merges and t in d and u!=t
            assert t not in {'https://letkasni.rs/','https://letkasni.rs/en'}
            assert d[t]['proposed_action'] in {'KEEP_STRONG','KEEP_IMPROVE'}
            assert r['locale']==d[t]['locale']
            assert r['unique_content_to_preserve'] and r['approval_gate']=='HUMAN_APPROVAL_AND_TARGET_CONTENT_READY'
        else:
            assert not r['proposed_target']
    source = json.loads((ROOT/'source-map.json').read_text())
    article = {(s['id'],s['locale']):s['url'] for s in source if s['template']=='BlogArticlePageView'}
    for (ident,locale),u in article.items():
        other = article[(ident,'en' if locale=='sr' else 'sr')]
        assert d[u]['proposed_action']==d[other]['proposed_action'], (u,other)
    for s in source:
        if any(x in s['id'] for x in ['serbia-turkey','serbia-israel','serbia-united-kingdom','serbia-united-arab-emirates']):
            assert d[s['url']]['proposed_action']=='KEEP_IMPROVE'
    core=rows('core-urls-performance-priority.csv')
    assert len(core)==len({r['url'] for r in core})==25
    assert all(d[r['url']]['proposed_action'] in {'KEEP_STRONG','KEEP_IMPROVE'} for r in core)
    provenance=json.loads((ROOT/'gsc-performance-provenance.json').read_text())
    assert not provenance['unmapped'] and not provenance['filtered_chart_mismatches']
    missing=set(provenance['missing_page_exports'])
    assert all(int(r['impressions'])<5 and int(r['clicks'])==0 for r in history if r['reported_url'] in missing)
    for q in rows('query-cannibalization.csv'):
        metrics=json.loads(q['metrics_per_url'])
        assert sum(m['impressions']>=3 for m in metrics)>=2
        assert all(m['url'] in p for m in metrics)
    summary=json.loads((ROOT/'phase2-summary.json').read_text())
    assert sum(summary['actions_sitemap'].values())==294
    assert sum(summary['actions_all'].values())==296
    assert summary['projected_sitemap_after_approved_merges']==264
    result={'status':'PASS_WITH_DISCLOSED_SOURCE_LIMITATIONS','checks':['weighted metrics and CTR','brand ambiguity','296 canonical / 294 sitemap coverage','171 historical URL mappings reconcile','window monotonicity','date provenance','unknown backlinks','one action per URL','merge targets valid and no chains','preservation requirements','paired locales','distinct legal regimes retained','25 core URLs','meaningful overlap threshold'],'native_page_exports':provenance['exported_pages'],'missing_low_volume_exports':len(missing),'missing_exports_max_impressions':sum(int(r['impressions']) for r in history if r['reported_url'] in missing),'source_limit':'Google HTTP 429 stopped remaining low-volume exact-page exports; missing queries/dates are not inferred. Anonymized GSC queries unavailable in all exports.','site_changes_this_phase':'NONE; Phase 1 dirty source changes preserved','api_live_authentication_test':'NOT_RUN_NO_CONFIGURED_CREDENTIALS'}
    (ROOT/'phase2-verification.json').write_text(json.dumps(result,indent=2))
    print(json.dumps(result,indent=2))


if __name__=='__main__':
    main()
