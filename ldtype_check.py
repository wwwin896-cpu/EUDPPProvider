import os, re, json, collections

DIST = 'dist'
re_ld = re.compile(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', re.S)
types = collections.Counter()
bad = []
total = 0

for root, _, fs in os.walk(DIST):
    for f in fs:
        if not f.endswith('.html'):
            continue
        fp = os.path.join(root, f)
        raw = open(fp, encoding='utf-8', errors='ignore').read()
        for block in re_ld.findall(raw):
            total += 1
            try:
                data = json.loads(block.strip())
            except Exception as e:
                bad.append((fp, str(e)[:60]))
                continue
            if isinstance(data, dict) and isinstance(data.get('@graph'), list):
                items = data['@graph']
            elif isinstance(data, list):
                items = data
            else:
                items = [data]
            for it in items:
                if isinstance(it, dict):
                    t = it.get('@type')
                    if isinstance(t, list):
                        for x in t:
                            types[x] += 1
                    elif t:
                        types[t] += 1

print('ld+json blocks:', total, 'invalid:', len(bad))
for b in bad[:5]:
    print('  BAD', b)
print('types:')
for k, v in types.most_common():
    print(f'  {k}: {v}')
