import os, re, collections, json

DIST = 'dist'
re_t = re.compile(r'<title>(.*?)</title>', re.S)
re_d = re.compile(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
re_c = re.compile(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
re_alt = re.compile(r'<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"')


def up(fp):
    r = os.path.relpath(fp, DIST).replace('\\', '/')
    return '/' + (r[:-len('index.html')] if r.endswith('index.html') else r)


titles = collections.defaultdict(list)
descs = collections.defaultdict(list)
bad_canon = []
alt_count = collections.Counter()
pages = 0

for root, _, fs in os.walk(DIST):
    for f in fs:
        if not f.endswith('.html'):
            continue
        fp = os.path.join(root, f)
        raw = open(fp, encoding='utf-8', errors='ignore').read()
        p = up(fp)
        pages += 1
        m = re_t.search(raw)
        d = re_d.search(raw)
        c = re_c.search(raw)
        if m:
            titles[m.group(1).strip()].append(p)
        if d:
            descs[d.group(1).strip()].append(p)
        if c:
            exp = 'https://eudppprovider.com' + p
            if c.group(1).rstrip('/') != exp.rstrip('/'):
                bad_canon.append((p, c.group(1)))
        for lang, href in re_alt.findall(raw):
            alt_count[p] += 1

dup_t = {k: v for k, v in titles.items() if len(v) > 1}
dup_d = {k: v for k, v in descs.items() if len(v) > 1}

print('pages:', pages)
print('unique_titles:', len(titles), 'dup_title_groups:', len(dup_t))
for k, v in list(dup_t.items())[:6]:
    print('  T:', k[:80], '->', v[:5])
print('unique_descs:', len(descs), 'dup_desc_groups:', len(dup_d))
for k, v in list(dup_d.items())[:6]:
    print('  D:', k[:80], '->', v[:5])
print('canonical_mismatch:', len(bad_canon))
for x in bad_canon[:6]:
    print('  C:', x)
print('pages_with_0_hreflang:', sum(1 for p in [up(os.path.join(r, f)) for r, _, fs in os.walk(DIST) for f in fs if f.endswith('.html')] if alt_count[p] == 0))
