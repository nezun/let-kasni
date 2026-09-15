"""Freeze the inherited worktree and resolve only the approved six merge groups."""
import csv
import hashlib
import json
from pathlib import Path

root = Path('seo-audit-output/phase3a')
root.mkdir(exist_ok=True)
baseline = root / 'inherited-files.json'
if not baseline.exists():
    files = list(Path('src').rglob('*')) + list(Path('scripts').glob('*')) + [Path('next.config.ts'),Path('package.json')]
    baseline.write_text(json.dumps({str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in files if p.is_file()},indent=2))
groups = {'flight-delay-compensation':'A','crew-duty-time-flight-delay':'B','separate-tickets-after-delay':'C','connecting-flight-delay-one-booking':'D','tarmac-delay-door-open-time':'E','overnight-flight-delay-hotel-transfer-proof':'F'}
sources = json.loads(Path('seo-audit-output/source-map.json').read_text())
by_url = {r['url']:r for r in sources}
preservation = json.loads(Path('seo-audit-output/merge-content-preservation.json').read_text())
with Path('seo-audit-output/merge-proposals-evidence.csv').open(newline='') as f:
    evidence = list(csv.DictReader(f))
plan = []
for r in evidence:
    source = by_url[r['source_url']]
    if source['id'] not in groups:
        continue
    target = by_url[r['target_url']]
    plan.append({**r,'group':groups[source['id']],'source_id':source['id'],'target_id':target['id'],'locale':source['locale'],'source_file':source['content_source'],'target_file':target['content_source'],'source_sections':source.get('original_sections',source['sections']),'target_sections':target.get('original_sections',target['sections']),'preservation':next(x for x in preservation if x['source_url']==r['source_url'])['preserve_brief']})
assert len(plan)==12
(root/'approved-batch-review.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2))
print(f'Frozen inherited files; resolved {len(plan)} source/target pairs. No site changes.')
