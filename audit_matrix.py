import os, re, json, collections
from urllib.parse import urlparse

DIST = "dist"
SITE = "https://eudppprovider.com"

re_canon = re.compile(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
re_alt = re.compile(r'<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*href="([^"]+)"')
re_alt2 = re.compile(r'<link[^>]+hreflang="([^"]+)"[^>]*rel="alternate"[^>]*href="([^"]+)"')
re_title = re.compile(r"<title>(.*?)</title>", re.S)
re_desc = re.compile(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
re_robots = re.compile(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"')
re_href = re.compile(r'href="([^"]+)"')
re_ld = re.compile(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', re.S)
re_img = re.compile(r"<img\b[^>]*>", re.I)


def path_of(fp):
    rel = os.path.relpath(fp, DIST).replace("\\", "/")
    return "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)


def to_path(u):
    if u.startswith(SITE):
        u = u[len(SITE):]
    p = urlparse(u).path
    if not p.endswith("/"):
        p += "/"
    return p


pages = {}
for root, _, fs in os.walk(DIST):
    for f in fs:
        if f.endswith(".html"):
            fp = os.path.join(root, f)
            pages[path_of(fp)] = open(fp, encoding="utf-8", errors="ignore").read()

canon = {}
noindex = set()
titles = collections.defaultdict(list)
descs = collections.defaultdict(list)
alts = {}
edges = collections.defaultdict(set)
ld_types = collections.Counter()
art_missing = []
org_missing = []
svc_missing = []
bc_single = []
meta_long = []
desc_long = []
desc_short = []
img_no_wh = 0
img_no_alt = 0
img_total = 0
hero_srcset = collections.Counter()

for p, raw in pages.items():
    m = re_canon.search(raw)
    canon[p] = to_path(m.group(1)) if m else None
    rb = re_robots.search(raw)
    if rb and "noindex" in rb.group(1).lower():
        noindex.add(p)

    t = re_title.search(raw)
    if t:
        tt = re.sub(r"\s+", " ", t.group(1)).strip()
        titles[tt].append(p)
        if len(tt) > 60:
            meta_long.append((len(tt), p))
    d = re_desc.search(raw)
    if d:
        dd = d.group(1).strip()
        descs[dd].append(p)
        if len(dd) > 160:
            desc_long.append((len(dd), p))
        elif len(dd) < 70:
            desc_short.append((len(dd), p))

    a = dict(re_alt.findall(raw)) or dict(re_alt2.findall(raw))
    alts[p] = a

    for h in re_href.findall(raw):
        if not h.startswith("/") or h.startswith("//"):
            continue
        tgt = h.split("#")[0].split("?")[0]
        if "." in os.path.basename(tgt.rstrip("/")):
            continue
        edges[p].add(to_path(tgt) if tgt else "/")

    for blk in re_ld.findall(raw):
        try:
            data = json.loads(blk)
        except Exception:
            ld_types["__INVALID__"] += 1
            continue

        def walk(o):
            if isinstance(o, dict):
                ty = o.get("@type")
                tys = ty if isinstance(ty, list) else ([ty] if ty else [])
                for x in tys:
                    ld_types[x] += 1
                if "Article" in tys:
                    miss = [k for k in ("headline", "author", "datePublished", "publisher", "image", "mainEntityOfPage") if k not in o]
                    if miss:
                        art_missing.append((p, miss))
                if "Organization" in tys:
                    miss = [k for k in ("name", "url", "logo", "legalName", "taxID") if k not in o]
                    if miss:
                        org_missing.append((p, miss))
                if "Service" in tys:
                    miss = [k for k in ("name", "provider") if k not in o]
                    if miss:
                        svc_missing.append((p, miss))
                if "BreadcrumbList" in tys:
                    it = o.get("itemListElement") or []
                    if len(it) < 2:
                        bc_single.append(p)
                for v in o.values():
                    walk(v)
            elif isinstance(o, list):
                for v in o:
                    walk(v)

        walk(data)

    for tag in re_img.findall(raw):
        img_total += 1
        if not re.search(r'\bwidth="\d+"', tag) or not re.search(r'\bheight="\d+"', tag):
            img_no_wh += 1
        if 'alt="' not in tag:
            img_no_alt += 1
        if "srcset=" in tag:
            hero_srcset[p] += 1

# sitemap
sm_txt = open(os.path.join(DIST, "sitemap-0.xml"), encoding="utf-8").read()
sm_urls = re.findall(r"<loc>(.*?)</loc>", sm_txt)
lastmods = collections.Counter(x[:10] for x in re.findall(r"<lastmod>(.*?)</lastmod>", sm_txt))
sm_paths = {to_path(u) for u in sm_urls}
sm_missing = [u for u in sm_urls if to_path(u) not in pages]
sm_noindex = sorted(sm_paths & noindex)
unlisted = sorted(set(pages) - sm_paths)

# canonical integrity
canon_mismatch = [(p, c) for p, c in canon.items() if c and c != p and p != "/404.html"]
canon_dups = collections.defaultdict(list)
for p, c in canon.items():
    if c:
        canon_dups[c].append(p)

# hreflang
alt_missing_target = []
alt_not_in_sitemap = []
cluster_bad = []
no_xdef = []
for p, a in alts.items():
    if not a:
        continue
    if "x-default" not in a:
        no_xdef.append(p)
    for lang, href in a.items():
        tp = to_path(href)
        if tp not in pages:
            alt_missing_target.append((p, lang, tp))
        elif tp not in sm_paths and tp not in noindex:
            alt_not_in_sitemap.append((p, lang, tp))
        if tp in alts and p not in {to_path(x) for x in alts[tp].values()}:
            cluster_bad.append((p, lang, tp))

# orphans + depth (inbound counted among indexable pages)
inbound = collections.Counter()
for src, tgts in edges.items():
    for t in tgts:
        if t != src:
            inbound[t] += 1
orphans = sorted(p for p in pages if inbound[p] == 0 and p not in noindex and p != "/404.html")

depth = {"/": 0}
queue = collections.deque(["/"])
while queue:
    cur = queue.popleft()
    for t in edges.get(cur, ()):
        if t in pages and t not in depth:
            depth[t] = depth[cur] + 1
            queue.append(t)
unreachable = sorted(p for p in pages if p not in depth and p not in noindex and p != "/404.html")
max_depth = max(depth.values()) if depth else 0

# llms corpus URL validation
corpus = {}
for name in ("llms.txt", "llms-full.txt"):
    raw = open(os.path.join(DIST, name), encoding="utf-8").read()
    urls = sorted(set(re.findall(r"https://eudppprovider\.com[^\s\)\]\"'<>]*", raw)))
    bad = []
    for u in urls:
        tp = to_path(u)
        if tp not in pages and not os.path.exists(os.path.join(DIST, u.replace(SITE + "/", "").split("?")[0])):
            if not u.rstrip("/").endswith((".txt", ".xml")):
                bad.append((u, "not_found"))
                continue
        if tp in noindex:
            bad.append((u, "points_to_noindex"))
    corpus[name] = (len(raw), len(urls), bad)

# banned / risky phrasing
phrases = ["100% receipt", "official EU Registry certification", "Conformity Granted",
           "customs clearance certificate", "Single Window", "guarantee", "zero-leak",
           "tamper-proof", "Aug 2025", "most secure", "fully compliant", "official certification"]
phrase_hits = collections.Counter()
for p, raw in pages.items():
    low = raw.lower()
    for ph in phrases:
        n = low.count(ph.lower())
        if n:
            phrase_hits[ph] += n
for name in ("llms.txt", "llms-full.txt"):
    low = open(os.path.join(DIST, name), encoding="utf-8").read().lower()
    for ph in phrases:
        n = low.count(ph.lower())
        if n:
            phrase_hits[ph + " [llms]"] += n

out = []
A = out.append
A("PAGES=%d  INDEXABLE=%d  NOINDEX=%d" % (len(pages), len(pages) - len(noindex), len(noindex)))
A("SITEMAP urls=%d missing=%d noindex_listed=%d unlisted=%d lastmod=%s"
  % (len(sm_urls), len(sm_missing), len(sm_noindex), len(unlisted), dict(sorted(lastmods.items()))))
for u in sm_missing[:5]:
    A("  SM_MISSING %s" % u)
for p in sm_noindex[:8]:
    A("  SM_NOINDEX %s" % p)
for p in unlisted[:8]:
    A("  UNLISTED %s" % p)
A("")
A("CANON mismatch=%d dup_groups=%d" % (len(canon_mismatch), len([1 for v in canon_dups.values() if len(v) > 1])))
for x in canon_mismatch[:6]:
    A("  CANON %s -> %s" % x)
A("")
A("HREFLANG pages=%d target_missing=%d not_in_sitemap=%d cluster_bad=%d no_xdefault=%d"
  % (sum(1 for a in alts.values() if a), len(alt_missing_target), len(alt_not_in_sitemap), len(cluster_bad), len(no_xdef)))
for x in alt_not_in_sitemap[:6]:
    A("  ALT_NOT_IN_SM %s" % (x,))
A("")
A("LINKS edges=%d orphans=%d unreachable=%d max_depth=%d"
  % (sum(len(v) for v in edges.values()), len(orphans), len(unreachable), max_depth))
for p in orphans[:8]:
    A("  ORPHAN %s" % p)
A("")
A("LD types=%s" % dict(ld_types.most_common(12)))
A("LD Article_missing=%d Org_missing=%d Service_missing=%d Breadcrumb_single=%d"
  % (len(art_missing), len(org_missing), len(svc_missing), len(bc_single)))
for x in art_missing[:5]:
    A("  ARTICLE %s missing=%s" % x)
for x in svc_missing[:5]:
    A("  SERVICE %s missing=%s" % x)
A("")
A("META dup_title=%d dup_desc=%d title_long=%d desc_long=%d desc_short=%d"
  % (len([1 for v in titles.values() if len(v) > 1]), len([1 for v in descs.values() if len(v) > 1]),
     len(meta_long), len(desc_long), len(desc_short)))
for l, p in sorted(meta_long, key=lambda x: -x[0])[:5]:
    A("  TITLE_%d %s" % (l, p))
for l, p in sorted(desc_long, key=lambda x: -x[0])[:5]:
    A("  DESC_%d %s" % (l, p))
A("")
A("IMG total=%d no_width_height=%d no_alt=%d pages_with_srcset=%d"
  % (img_total, img_no_wh, img_no_alt, len(hero_srcset)))
A("")
for name, (ln, un, bad) in corpus.items():
    A("CORPUS %s len=%d urls=%d problems=%d" % (name, ln, un, len(bad)))
    for u, why in bad[:8]:
        A("  %s %s" % (why, u))
A("")
A("PHRASES %s" % dict(phrase_hits))

txt = "\n".join(out)
open("audit_matrix_report.txt", "w", encoding="utf-8").write(txt)
print(txt)
