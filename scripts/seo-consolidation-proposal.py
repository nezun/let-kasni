"""Generate a review-only proposal from audit evidence and native GSC exports.

No HTTP calls, source changes or executable redirect configuration.
Curated intent decisions below are deliberately separate from performance joins.
"""
import csv
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path('seo-audit-output')


def read(name):
    with (ROOT / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def write(name, rows, fields=None):
    with (ROOT / name).open('w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fields or list(rows[0]))
        w.writeheader()
        w.writerows(rows)


def text_parts(source):
    sections = source.get('original_sections', source.get('sections', []))
    return [str(p) for s in sections for k in ('body', 'bullets') for p in s.get(k, [])]


def normalized(text):
    return ' '.join(''.join(c for c in unicodedata.normalize('NFKD', text.casefold()) if not unicodedata.combining(c)).split())


def similarity(a, b):
    def shingles(source):
        words = re.findall(r'\w+', normalized(' '.join(text_parts(source))))
        return {tuple(words[i:i+5]) for i in range(max(0, len(words)-4))}
    x, y = shingles(a), shingles(b)
    return round(len(x & y) / len(x | y), 4) if x | y else 0


# Each entry is an editorial assessment, not a rule based on zero traffic.
# Target readiness and preserving these distinctions are mandatory approval gates.
MERGES = {
    'aircraft-cleaning-flight-delay': ('ground-handling-flight-delay', 'Cleaning is explicitly within the existing ground-handling scope.', 'Routine turnaround vs exceptional cleaning; time of notice, actual departure and cause evidence.'),
    'baggage-loading-flight-delay': ('ground-handling-flight-delay', 'Loading is explicitly within the existing ground-handling scope.', 'Loading coordination, not lost-baggage rights; distinguish normal loading from security orders and record timing.'),
    'crew-duty-time-flight-delay': ('crew-shortage-flight-delay', 'Crew guide already explains expired duty time and root cause; actual English queries explicitly ask about crew timing out.', 'Initial external event vs later crew planning; replacement crew, duty-time notices and overnight care.'),
    'separate-tickets-after-delay': ('separate-tickets-missed-connection', 'Same self-transfer problem; target has actual disclosed demand and substantially more specific booking/agency/insurance guidance.', 'First-flight compensation separate from onward-ticket loss; proof of separate purchases and care receipts.'),
    'overnight-flight-delay-hotel-transfer-proof': ('overnight-delay-hotel-rights', 'Same overnight accommodation and reimbursement journey; combine evidence checklist with rights instead of two competing answers.', 'Written request before booking, available hotel/shuttle evidence, children or health needs, hotel/transfer timeline and separate return-home costs.'),
    'connecting-flight-delay-one-booking': ('missed-connection', 'Both answer missed onward flight on one booking; retain the existing dedicated missed-connection article.', 'First-leg causal chain, doors-open time, replacement itinerary, final arrival and request for an airline answer on the full booking.'),
    'tarmac-delay-door-open-time': ('flight-delay-final-arrival-time', 'Subset of the arrival-time calculation; do not fold it into a generic delay-cause page.', 'Landing vs doors-open timeline, 2h50 plus 15-minute example, remote stand, care while onboard and supporting evidence.'),
    'delayed-flight-airport-action-plan': ('airport-action-plan', 'Same immediate airport action checklist; broader existing article covers delay and cancellation.', 'First 15 minutes, assistance request, single booking, overnight proof and refund separated from compensation.'),
}
for country, preserve in {
    'germany': 'Frankfurt/Munich/Berlin connection examples; first-leg vs final-arrival evidence.',
    'austria': 'Vienna as destination vs hub; final destination and one-booking evidence.',
    'france': 'Paris hub vs Nice destination; directions of travel and transfer/connection evidence.',
    'italy': 'Rome/Milan/seasonal-route examples; changed gates, late rotation and onward-travel receipts.',
    'netherlands': 'Amsterdam connection example; scheduled/actual connection, new-flight messages and receipts.',
}.items():
    MERGES[f'serbia-{country}-flight-delay-compensation'] = (
        'eu261-ecaa-serbia',
        'Country template repeats the EU-direction/carrier/booking answer; existing EU261/ECAA article is the regime-level destination, with broader coverage and more internal inlinks.',
        preserve + ' Preserve route direction and operating-carrier conditions; no country-specific legal conclusion is inferred from template similarity.')

TIER1 = {'air-serbia', 'wizz-air', 'lufthansa', 'austrian-airlines', 'turkish-airlines', 'ryanair'}
TEMPLATE_FIX = {
    'airline_articles': 'Replace shared prose with verified carrier identity/operating-carrier distinctions, dated official claim channel, required evidence and one relevant route example. No invented procedures or routes.',
    'regional_route_airport_articles': 'One sourced regime/route decision table; preserve direction and carrier conditions. Add airport-specific facts only after verification, not place-name substitution.',
    'generated_scenario_articles': 'One factual decision branch, evidence checklist and worked case timeline; link to care/compensation guides instead of repeating them.',
    'standalone_editorial_articles': 'Keep the specific answer and useful examples; replace generic runtime appendices with short contextual links and dated sources.',
    'core_guides': 'Replace generic repeated appendices with topic-specific thresholds, exclusions, evidence and links to distinct child intents.',
}


def main():
    inv = {r['url']: r for r in read('url-inventory.csv')}
    perf = {r['url']: r for r in read('gsc-page-performance.csv')}
    sources = json.loads((ROOT / 'source-map.json').read_text())
    src = {s['url']: s for s in sources}
    article = {(s['id'], s['locale']): s['url'] for s in sources if s['template'] == 'BlogArticlePageView'}
    guide = {(s['id'], s['locale']): s['url'] for s in sources if s['template'] != 'BlogArticlePageView'}
    queries = defaultdict(list)
    for q in read('gsc-page-query-performance.csv'):
        queries[q['url']].append(q)
    provenance = json.loads((ROOT / 'gsc-performance-provenance.json').read_text())
    assert not provenance['unmapped'] and not provenance['filtered_chart_mismatches']
    missing = set(provenance['missing_page_exports'])
    history = read('gsc-url-history-map.csv')
    assert all(int(r['impressions']) < 5 and int(r['clicks']) == 0 for r in history if r['reported_url'] in missing), 'Missing a priority raw-page export.'

    # Equivalent here means only case/diacritic/whitespace variants, not guessed intent.
    clusters = defaultdict(lambda: defaultdict(list))
    for url, rows in queries.items():
        for q in rows:
            clusters[normalized(q['query'])][url].append(q)
    overlap, meaningful = [], []
    for query, pages in sorted(clusters.items()):
        if len(pages) < 2:
            continue
        metrics = []
        for url, rows in pages.items():
            imps = sum(int(q['impressions']) for q in rows)
            metrics.append({'url': url, 'clicks': sum(int(q['clicks']) for q in rows), 'impressions': imps, 'position': round(sum(float(q['position'])*int(q['impressions']) for q in rows)/imps, 4)})
        metrics.sort(key=lambda r: (-r['clicks'], -r['impressions'], -int(inv[r['url']]['internal_inlinks'])))
        substantial = sum(r['impressions'] >= 3 for r in metrics) >= 2
        urls = {r['url'] for r in metrics}
        exact_core_pair = {article[('flight-delay-compensation','sr')], guide[('flight-delay-compensation','sr')]} <= urls
        pair_meaningful = exact_core_pair and all(next(r['impressions'] for r in metrics if r['url']==u) >= 3 for u in [article[('flight-delay-compensation','sr')], guide[('flight-delay-compensation','sr')]])
        recommendation = 'Same general-delay article/guide intent: proposed merge article into guide; keep carrier and distance-specific destinations.' if pair_meaningful else 'Related broad query across distinct contexts: differentiate links/answers; no merge justified by this query alone.'
        row = {'query': query, 'observed_variants': json.dumps(sorted({q['query'] for qs in pages.values() for q in qs}), ensure_ascii=False), 'competing_urls': ';'.join(r['url'] for r in metrics), 'metrics_per_url': json.dumps(metrics), 'likely_strongest_destination': guide[('flight-delay-compensation','sr')] if pair_meaningful else metrics[0]['url'], 'classification': 'MEANINGFUL_SAME_INTENT_OVERLAP' if pair_meaningful else 'BROAD_QUERY_DISTINCT_INTENTS' if substantial else 'LOW_VOLUME_NOT_CANNIBALIZATION', 'recommendation': recommendation, 'limitation': 'Long-window co-occurrence, not proof of simultaneous competition or lost clicks; anonymized queries unavailable.'}
        overlap.append(row)
        if substantial:
            meaningful.append(row)
    fields = ['query','observed_variants','competing_urls','metrics_per_url','likely_strongest_destination','classification','recommendation','limitation']
    write('query-overlap-all.csv', overlap, fields)
    write('query-cannibalization.csv', meaningful, fields)

    carriers = defaultdict(list)
    for url in perf:
        if inv[url]['content_family'] == 'airline_articles':
            carriers[src[url]['id'].removesuffix('-flight-delay-compensation')].append(url)
    tiers = {}
    for carrier, urls in carriers.items():
        impressions = sum(int(perf[u]['impressions_max']) for u in urls)
        clicks = sum(int(perf[u]['clicks_max']) for u in urls)
        disclosed = sum(int(perf[u]['query_count']) for u in urls)
        # A tiny observed signal buys editorial validation, not KEEP_STRONG status.
        tiers[carrier] = 'TIER_1' if carrier in TIER1 else 'TIER_2' if clicks or impressions >= 5 or disclosed else 'TIER_3'

    decisions, merge_evidence, preserve_full = [], [], []
    for url, p in sorted(perf.items()):
        audit = inv[url]
        family = audit['content_family']
        source = src.get(url, {})
        ident, locale = source.get('id'), audit['locale']
        action, target, confidence, priority = 'KEEP_IMPROVE', '', 'MEDIUM', 'P2'
        preserve = ''
        reason = 'Distinct article question and existing source-specific answer; no reviewed same-intent stronger destination. Improve the original answer and remove repeated appendices; no claim of proven search demand.'
        fix = TEMPLATE_FIX.get(family, 'Keep metadata, navigation and visible user purpose consistent; no programmatic expansion.')
        if family == 'home':
            action, confidence, priority = 'KEEP_STRONG', 'HIGH', 'P0'
            reason = 'Primary conversion/brand destination with observed clicks; no consolidation needed. This is an architectural/value judgment, not a guarantee of rankings.'
        elif family == 'blog':
            action, confidence, priority = 'KEEP_STRONG', 'HIGH', 'P2'
            reason = 'Canonical editorial navigation has a distinct browsing function. Keep category parameter variants canonicalized rather than expanding indexable filters.'
        elif family in {'privacy', 'terms'}:
            action, confidence, priority = 'KEEP_STRONG', 'HIGH', 'P3'
            reason = 'Distinct trust/policy destination; retain existing canonical identity. No performance-driven deletion of policy content.'
        elif family == 'core_guides':
            priority = 'P0' if locale == 'sr' else 'P1'
            reason = 'Established architecture destination with 156 internal inlinks and a distinct main rights topic. Needs topic-specific substance, not more runtime filler; low English demand does not justify duplicate sibling guides.'
        elif family == 'airline_articles':
            carrier = ident.removesuffix('-flight-delay-compensation')
            tier = tiers[carrier]
            priority = 'P1' if tier == 'TIER_1' else 'P2' if tier == 'TIER_2' else 'P3'
            if tier == 'TIER_3':
                action = 'HUMAN_REVIEW'
                confidence = 'LOW'
                reason = 'TIER_3: negligible reported footprint, no disclosed query justification across SR/EN and largely substitutable carrier template. Missing verified Serbia-facing business relevance and useful carrier-specific procedure. No relevant stronger carrier target or user utility for automatic noindex is established. Owner must supply a verified route/case need and official claim channel, or approve a removal/noindex strategy after link review.'
            else:
                reason = f'{tier}: ' + ('User-prioritized Serbian-market carrier, ' if tier == 'TIER_1' else 'Observed carrier portfolio clicks/impressions or disclosed query footprint, ') + 'plus a distinct carrier-specific claim intent. Retain only with material verified carrier detail; existing template is not a sufficient finished page. No claim of current route frequency or verified carrier-specific claim procedure.'
        elif family == 'regional_route_airport_articles':
            if any(x in (ident or '') for x in ['united-kingdom','united-arab-emirates','israel','turkey']):
                reason = 'Distinct jurisdiction/route coverage question in existing content; do not merge into an EU answer. Verify sources and exceptions before editorial improvement; no observed demand is claimed.'
            elif ident in {'belgrade-flight-delay-compensation','nis-flight-delay-compensation'}:
                action, confidence = 'HUMAN_REVIEW', 'LOW'
                reason = 'Airport-local intent can differ from a legal-regime hub, but current template lacks verified desk/assistance/local evidence details. Owner decision needs actual airport-specific utility or case evidence; no generic homepage/EU redirect is justified.'
            else:
                reason = 'Directional/operating-carrier/connection scope is explicit in original content. Retain as a precise answer for now; improve scope table and link to EU261/ECAA. Country-name duplication is reviewed separately.'

        merge = MERGES.get(ident) if source.get('template') == 'BlogArticlePageView' else None
        if merge:
            target_id, why, preserve = merge
            target = article[(target_id, locale)]
            action, confidence, reason = 'MERGE_301', 'MEDIUM', why
        if ident in {'flight-delay-compensation','airline-strike-compensation'} and source.get('template') == 'BlogArticlePageView':
            action, target, confidence = 'MERGE_301', guide[(ident, locale)], 'MEDIUM'
            reason = 'Same main question as core guide; use established hub identity and 156 inlinks. SR delay has disclosed shared query and stronger hub impressions. Other locale/strike choices are architecture-led, not a claim of a GSC/content winner; transfer the better article sections before redirect.'
            preserve = 'All topic-specific original examples, eligibility/exclusions, strike actor and advance-notice distinctions where applicable; replace generic guide appendices with the stronger article answer.'
        evidence = f"Reported max: {p['clicks_max']} clicks / {p['impressions_max']} impressions; 90d: {p['clicks_90d']} / {p['impressions_90d']}; disclosed queries: {p['query_count']}."
        row = {'url': url, 'family': family, 'current_GSC_index_state': audit['gsc_state'] or 'UNKNOWN_NOT_URL_INSPECTED', 'clicks_max': p['clicks_max'], 'impressions_max': p['impressions_max'], 'clicks_90d': p['clicks_90d'], 'impressions_90d': p['impressions_90d'], 'top_query': p['top_query'], 'top_query_impressions': p['top_query_impressions'], 'query_count': p['query_count'], 'similarity': audit['similarity'], 'internal_inlinks': audit['internal_inlinks'], 'business_priority': priority, 'proposed_action': action, 'proposed_target': target, 'confidence': confidence, 'reason': reason + ' ' + evidence, 'unique_content_to_preserve': preserve, 'template_level_fix': fix, 'locale': locale, 'sitemap_included': audit['sitemap_included'], 'nearest_similar_url': audit['nearest_url'], 'original_exact_unique_paragraphs': audit['original_exact_unique_paragraphs'], 'appended_word_share': audit['appended_word_share'], 'performance_status': p['performance_status'], 'historical_aliases': p['historical_aliases'], 'backlinks': 'UNKNOWN', 'referring_domains': 'UNKNOWN', 'index_state_provenance': 'Baseline GSC exclusion CSV, not fresh URL Inspection; search impressions are historical, not current index proof.', 'approval_gate': 'HUMAN_APPROVAL_AND_TARGET_CONTENT_READY' if action == 'MERGE_301' else 'HUMAN_DECISION_REQUIRED' if action == 'HUMAN_REVIEW' else 'PROPOSAL_ONLY'}
        row['content_source'] = audit['content_source']
        row['original_headings'] = json.dumps([s['heading'] for s in source.get('original_sections', source.get('sections', []))][:4], ensure_ascii=False)
        row['original_scope_excerpt'] = text_parts(source)[0] if text_parts(source) else ''
        row['query_evidence_note'] = 'Disclosed queries: ' + p['top_5_queries'] if int(p['query_count']) else 'No disclosed queries; omitted/anonymized demand remains unknown.'
        row['query_export_complete'] = p['query_export_complete']
        if p['query_export_complete'] != 'True':
            row['query_evidence_note'] += ' At least one low-volume alias export unavailable after Google HTTP 429; never interpret missing rows as zero queries.'
        row['recent_impressions_per_day'] = round(int(p['impressions_28d'])/28,4)
        row['preceding_62d_impressions_per_day'] = round((int(p['impressions_90d'])-int(p['impressions_28d']))/62,4)
        decisions.append(row)
        if target:
            tp = perf[target]
            source_queries = {normalized(q['query']) for q in queries[url]}
            target_queries = {normalized(q['query']) for q in queries[target]}
            original_not_exact_in_target = [t for t in text_parts(source) if normalized(t) not in {normalized(t) for t in text_parts(src[target])}]
            preserve_full.append({'source_url':url,'target_url':target,'preserve_brief':preserve,'original_source_sections':source.get('original_sections',source['sections']),'not_exactly_present_in_target':original_not_exact_in_target,'note':'Text difference is a preservation queue, not proof that every paragraph is useful or legally verified.'})
            merge_evidence.append({'source_url':url,'target_url':target,'source_clicks':p['clicks_max'],'source_impressions':p['impressions_max'],'target_clicks':tp['clicks_max'],'target_impressions':tp['impressions_max'],'source_queries':p['top_5_queries'],'target_queries':tp['top_5_queries'],'shared_queries':json.dumps(sorted(source_queries & target_queries),ensure_ascii=False),'similarity_original_pair_jaccard5':similarity(source,src[target]),'source_nearest_similarity_baseline':audit['similarity'],'target_internal_inlinks':inv[target]['internal_inlinks'],'unique_information_to_preserve':preserve,'target_reason':reason,'confidence':confidence,'prerequisite':'Approve source/target; editorially integrate and verify preserved information FIRST; then deploy redirect. No execution in Phase 2.','unknowns':'Backlinks UNKNOWN; disclosed queries incomplete; absence of query is not absence of demand.'})
    write('final-seo-consolidation-proposal.csv', decisions)
    write('merge-proposals-evidence.csv', merge_evidence)
    (ROOT / 'merge-content-preservation.json').write_text(json.dumps(preserve_full, ensure_ascii=False, indent=2))
    by_url = {d['url']:d for d in decisions}
    assert all(not d['proposed_target'] or by_url[d['proposed_target']]['proposed_action'] in {'KEEP_STRONG','KEEP_IMPROVE'} for d in decisions), 'No redirect chains or targets awaiting review'
    for family, filename in [('airline_articles','airline-page-decisions.csv'),('regional_route_airport_articles','regional-page-decisions.csv'),('generated_scenario_articles','scenario-page-decisions.csv')]:
        write(filename, [r for r in decisions if r['family']==family])
    carrier_rows = []
    for carrier, urls in sorted(carriers.items()):
        carrier_rows.append({'carrier':carrier,'tier':tiers[carrier],'urls':';'.join(urls),'clicks_max':sum(int(perf[u]['clicks_max']) for u in urls),'impressions_max':sum(int(perf[u]['impressions_max']) for u in urls),'impressions_90d':sum(int(perf[u]['impressions_90d']) for u in urls),'actual_queries':json.dumps(sorted({q['query'] for u in urls for q in queries[u]}),ensure_ascii=False),'actions':';'.join(sorted({by_url[u]['proposed_action'] for u in urls})),'max_nearest_similarity':max(float(inv[u]['similarity']) for u in urls),'index_states':';'.join(sorted({by_url[u]['current_GSC_index_state'] for u in urls})),'business_relevance':'User priority list' if carrier in TIER1 else 'Observed search signal; present route operation NOT verified' if tiers[carrier]=='TIER_2' else 'UNVERIFIED; obtain actual case/route usefulness before investment','unique_procedure_evidence':'No verified carrier-specific claim channel/procedure established by this audit; original route/operator notes are not a unique procedure.','required_next_step':by_url[urls[0]]['template_level_fix'] if tiers[carrier]!='TIER_3' else 'Owner: supply verified Serbia-facing case/route and claim-channel evidence; otherwise assess useful reference/noindex or retirement, with link check.'})
    write('airline-portfolio-tiers.csv',carrier_rows)

    # 25 priorities, deliberately SR-led with two English pages that have evidence.
    core_urls = ['https://letkasni.rs/'] + [u for (ident,loc),u in guide.items() if loc=='sr']
    core_urls += [article[(c+'-flight-delay-compensation','sr')] for c in sorted(TIER1)]
    core_urls += [article[(ident,'sr')] for ident in ['eu261-ecaa-serbia','extraordinary-circumstances','how-to-file-airline-claim','documents-for-claim','claim-template-email','technical-fault-flight-compensation','overnight-delay-hotel-rights','cancelled-flight-rights']]
    core_urls += [article[('claim-template-email','en')],article[('separate-tickets-missed-connection','en')]]
    assert len(core_urls)==25 and len(set(core_urls))==25
    core = []
    for rank,u in enumerate(core_urls,1):
        d,p = by_url[u],perf[u]
        core.append({'url':u,'priority':rank,'business_importance':d['business_priority'],'clicks_max':p['clicks_max'],'impressions_max':p['impressions_max'],'clicks_90d':p['clicks_90d'],'impressions_90d':p['impressions_90d'],'top_queries':p['top_5_queries'],'recommended_improvement':d['template_level_fix'],'reason':d['reason'],'proposed_action':d['proposed_action']})
    write('core-urls-performance-priority.csv',core)
    sitemap = [d for d in decisions if d['sitemap_included']=='True']
    actions = ['KEEP_STRONG','KEEP_IMPROVE','MERGE_301','NOINDEX_KEEP','REMOVE_410','HUMAN_REVIEW']
    summary = {'mode':'PROPOSAL_ONLY_NO_SITE_CHANGES','canonical_indexable_inventory':len(decisions),'sitemap_before':len(sitemap),'actions_all':{a:sum(d['proposed_action']==a for d in decisions) for a in actions},'actions_sitemap':{a:sum(d['proposed_action']==a for d in sitemap) for a in actions},'projected_sitemap_after_approved_merges':sum(d['proposed_action'] not in {'MERGE_301','NOINDEX_KEEP','REMOVE_410'} for d in sitemap),'projected_all_after_approved_merges':sum(d['proposed_action'] not in {'MERGE_301','NOINDEX_KEEP','REMOVE_410'} for d in decisions),'human_review_retained_in_projection':True,'prior_human_review_canonical':sum(r['action']=='HUMAN_REVIEW' for r in read('url-actions.csv') if r['URL'] in perf),'core_urls':len(core),'carrier_tiers':dict(Counter(tiers.values())),'query_overlap_clusters':len(overlap),'meaningful_overlap_clusters':len(meaningful),'reported_canonical_pages':sum(int(p['impressions_max'])>0 for p in perf.values()),'canonical_pages_with_disclosed_queries':sum(int(p['query_count'])>0 for p in perf.values()),'canonical_query_impressions':sum(int(p['observed_query_impressions']) for p in perf.values()),'canonical_query_rows':sum(len(q) for q in queries.values()),'backlinks':'UNKNOWN','windows':provenance['windows']}
    (ROOT / 'phase2-summary.json').write_text(json.dumps(summary,indent=2))
    print(json.dumps(summary,indent=2))


if __name__ == '__main__':
    main()
