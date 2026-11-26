import os, re, json, collections
from urllib.parse import urlparse

DIST = "dist"
SITE = "https://eudppprovider.com"

pages = []
for root, dirs, files in os.walk(DIST):
    for f in files:
        if f.endswith(".html"):
            fp = os.path.join(root, f)
            rel = os.path.relpath(fp, DIST).replace("\\", "/")
            p = "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)
            pages.append((p, fp))

page_paths = {p for p, _ in pages}

re_canon = re.compile(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
re_alt = re.compile(r'<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*href="([^"]+)"')
re_alt2 = re.compile(r'<link[^>]+hreflang="([^"]+)"[^>]*rel="alternate"[^>]*href="([^"]+)"')
re_title = re.compile(r"<title>(.*?)</title>", re.S)
re_desc = re.compile(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
re_og = re.compile(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"')
re_href = re.compile(r'href="([^"]+)"')

def to_path(u):
    if u.startswith(SITE):
        u = u[len(SITE):]
    u = urlparse(u).path
    if not u.endswith("/"):
        u = u + "/"
    return u

canon_map = collections.defaultdict(list)
alt_sets = {}
titles = collections.defaultdict(list)
thin = []
title_long = []
desc_long = []
desc_short = []
alt_target_missing = []
no_xdefault = []
cluster_mismatch = []
trailing_slash_links = 0
internal_edges = 0

for p, fp in pages:
    raw = open(fp, encoding="utf-8", errors="ignore").read()
    cm = re_canon.search(raw)
    canon_map[to_path(cm.group(1)) if cm else "NONE"].append(p)

    alts = dict(re_alt.findall(raw)) or dict(re_alt2.findall(raw))
    alt_sets[p] = alts
    if alts:
        if "x-default" not in alts:
            no_xdefault.append(p)
        for lang, href in alts.items():
            tp = to_path(href)
            if tp not in page_paths:
                alt_target_missing.append((p, lang, tp))

    tm = re_title.search(raw)
    if tm:
        t = re.sub(r"\s+", " ", tm.group(1)).strip()
        titles[t].append(p)
        if len(t) > 60:
            title_long.append((p, len(t)))
    dm = re_desc.search(raw)
    if dm:
        d = dm.group(1).strip()
        if len(d) > 160:
            desc_long.append((p, len(d)))
        if len(d) < 70:
            desc_short.append((p, len(d)))

    # thin content: visible text word count
    body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", raw, flags=re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    body = re.sub(r"&[a-z]+;", " ", body)
    words = len(re.findall(r"[\w\u4e00-\u9fff]+", body))
    thin.append((words, p))

    for h in re_href.findall(raw):
        if not h.startswith("/") or h.startswith("//"):
            continue
        internal_edges += 1
        base = h.split("#")[0].split("?")[0]
        if base and not base.endswith("/") and "." not in os.path.basename(base):
            trailing_slash_links += 1

# hreflang cluster reciprocity: each target page's alt set must map back to source page
for p, alts in alt_sets.items():
    if not alts:
        continue
    for lang, href in alts.items():
        tp = to_path(href)
        if tp in alt_sets:
            back = alt_sets[tp]
            if p not in {to_path(x) for x in back.values()}:
                cluster_mismatch.append((p, lang, tp))

# sitemap
sm = os.path.join(DIST, "sitemap-0.xml")
sm_urls, lastmods = [], collections.Counter()
if os.path.exists(sm):
    txt = open(sm, encoding="utf-8").read()
    sm_urls = re.findall(r"<loc>(.*?)</loc>", txt)
    for lm in re.findall(r"<lastmod>(.*?)</lastmod>", txt):
        lastmods[lm[:10]] += 1
sm_missing = [u for u in sm_urls if to_path(u) not in page_paths]
sm_paths = {to_path(u) for u in sm_urls}
unlisted = sorted(p for p in page_paths if p not in sm_paths)

# llms coverage
llms = open(os.path.join(DIST, "llms.txt"), encoding="utf-8").read()
llms_full = open(os.path.join(DIST, "llms-full.txt"), encoding="utf-8").read()
key_paths = ["/", "/battery-passport/", "/solutions/ev-battery-passport/", "/solutions/lmt-battery-passport/",
             "/solutions/storage-battery-passport/", "/solutions/software-license/", "/solutions/managed-data-hosting/",
             "/pricing/", "/contact/", "/about/", "/downloads/", "/portal-simulator/",
             "/compliance/data-requirements/", "/compliance/en-standards-guide/", "/compliance/eu-battery-regulation-2023-1542/",
             "/compliance/eu-dpp-registry-guide/", "/pilot-program/", "/insights/", "/privacy/", "/terms/",
             "/impressum/", "/legal-notice/", "/security/"]
missing_llms = [k for k in key_paths if k not in llms]
missing_llms_full = [k for k in key_paths if k not in llms_full]

# static assets
def info(rel):
    fp = os.path.join(DIST, rel)
    if os.path.exists(fp):
        return os.path.getsize(fp)
    return None

assets = {a: info(a) for a in ["og-image.png", "favicon.ico", "favicon.svg", "manifest.json",
                               "robots.txt", "sitemap.xml", "sitemap-index.xml", "llms.txt", "llms-full.txt",
                               "security.txt", ".well-known/security.txt",
                               "images/hero-factory.webp", "images/hero-vault.webp",
                               "images/banner1.webp", "images/banner2.webp"]}

# big images anywhere
big_imgs = []
imgdir = os.path.join(DIST, "images")
if os.path.isdir(imgdir):
    for f in os.listdir(imgdir):
        fp = os.path.join(imgdir, f)
        if os.path.isfile(fp) and f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".svg")):
            big_imgs.append((os.path.getsize(fp), f))

out = []
A = out.append
A("PAGES: %d" % len(pages))
A("INTERNAL_LINK_EDGES: %d  TRAILING_SLASH_LINKS(307-risk): %d" % (internal_edges, trailing_slash_links))
A("")
A("SITEMAP: urls=%d missing_targets=%d unlisted=%d" % (len(sm_urls), len(sm_missing), len(unlisted)))
A("LASTMOD: %s" % dict(sorted(lastmods.items())))
for p in unlisted:
    A("  UNLISTED %s" % p)
A("")
A("CANONICAL_DUP_GROUPS: %d" % len([k for k, v in canon_map.items() if len(v) > 1]))
for k, v in canon_map.items():
    if len(v) > 1:
        A("  DUP canon->%s  pages=%s" % (k, v[:6]))
A("")
A("HREFLANG: pages_with_alts=%d no_xdefault=%d alt_target_missing=%d cluster_mismatch=%d"
  % (sum(1 for p in alt_sets if alt_sets[p]), len(no_xdefault), len(alt_target_missing), len(cluster_mismatch)))
for x in no_xdefault[:8]:
    A("  NO_XDEFAULT %s" % x)
for x in alt_target_missing[:8]:
    A("  ALT_TARGET_MISSING %s" % (x,))
for x in cluster_mismatch[:8]:
    A("  CLUSTER_MISMATCH %s" % (x,))
A("")
A("TITLES: unique=%d dup_groups=%d over60=%d" % (len(titles), len([1 for v in titles.values() if len(v) > 1]), len(title_long)))
for k, v in titles.items():
    if len(v) > 1:
        A("  DUP_TITLE pages=%s" % (v[:6],))
for p, l in sorted(title_long, key=lambda x: -x[1])[:8]:
    A("  TITLE_%d %s" % (l, p))
A("")
A("DESC: over160=%d under70=%d" % (len(desc_long), len(desc_short)))
for p, l in sorted(desc_long, key=lambda x: -x[1])[:8]:
    A("  DESC_%d %s" % (l, p))
A("")
thin.sort()
A("THIN_CONTENT(<300 words): %d" % sum(1 for w, _ in thin if w < 300))
for w, p in thin[:12]:
    A("  WORDS_%d %s" % (w, p))
A("")
A("ASSETS:")
for k, v in assets.items():
    A("  %s = %s" % (k, v if v is not None else "MISSING"))
A("BIG_IMAGES:")
for s, f in sorted(big_imgs, reverse=True)[:12]:
    A("  %7d  %s" % (s, f))
A("")
A("LLMS: missing_in_llms=%s" % missing_llms)
A("LLMS_FULL: missing_in_llms_full=%s" % missing_llms_full)
A("LLMS len=%d  LLMS_FULL len=%d" % (len(llms), len(llms_full)))

open("audit_deep_report.txt", "w", encoding="utf-8").write("\n".join(out))
print("\n".join(out))
