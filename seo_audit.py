import os, re, json, sys
from html.parser import HTMLParser
from urllib.parse import urlparse

DIST = "dist"
SITE = "https://eudppprovider.com"

html_files = []
for root, dirs, files in os.walk(DIST):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

def url_path(fp):
    rel = os.path.relpath(fp, DIST).replace("\\", "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel

paths = {url_path(f) for f in html_files}

link_re = re.compile(r'href="([^"#?]+)(?:[?#][^"]*)?"')
issues = []
jsonld_pages = {}
ldjson_re = re.compile(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', re.S)
canon_re = re.compile(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
alt_re = re.compile(r'<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*>')
title_re = re.compile(r"<title>(.*?)</title>", re.S)
desc_re = re.compile(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
robots_re = re.compile(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"')

counts = {"pages": len(html_files), "ldjson_total": 0, "ldjson_bad": 0,
          "no_canonical": 0, "no_hreflang": 0, "no_desc": 0,
          "title_long": 0, "title_short": 0, "desc_long": 0, "noindex": 0}

types = {}
internal_targets = set()

for fp in html_files:
    raw = open(fp, encoding="utf-8", errors="ignore").read()
    p = url_path(fp)

    for m in link_re.finditer(raw):
        href = m.group(1)
        if href.startswith(("mailto:", "tel:", "javascript:", "data:")):
            continue
        if href.startswith(SITE):
            href = href[len(SITE):] or "/"
        if not href.startswith("/"):
            continue
        internal_targets.add((p, href))

    blocks = ldjson_re.findall(raw)
    if blocks:
        jsonld_pages[p] = len(blocks)
        for b in blocks:
            counts["ldjson_total"] += 1
            try:
                data = json.loads(b.strip())
            except Exception:
                counts["ldjson_bad"] += 1
                issues.append(("JSONLD_INVALID", p))
                continue
            items = data if isinstance(data, list) else [data]
            for it in items:
                if isinstance(it, dict):
                    t = it.get("@type")
                    if isinstance(t, list):
                        for tt in t:
                            types[tt] = types.get(tt, 0) + 1
                    elif t:
                        types[t] = types.get(t, 0) + 1

    if not canon_re.search(raw):
        counts["no_canonical"] += 1
        issues.append(("NO_CANONICAL", p))
    if len(alt_re.findall(raw)) < 4:
        counts["no_hreflang"] += 1
        issues.append(("HREFLANG_INCOMPLETE", p))
    dm = desc_re.search(raw)
    if not dm or len(dm.group(1).strip()) < 40:
        counts["no_desc"] += 1
        issues.append(("DESC_THIN", p))
    else:
        if len(dm.group(1)) > 320:
            counts["desc_long"] += 1
            issues.append(("DESC_TOO_LONG", p))
    tm = title_re.search(raw)
    if tm:
        tl = len(re.sub(r"\s+", " ", tm.group(1)).strip())
        if tl > 70:
            counts["title_long"] += 1
            issues.append(("TITLE_TOO_LONG", p, tl))
        elif tl < 20:
            counts["title_short"] += 1
            issues.append(("TITLE_SHORT", p, tl))
    rm = robots_re.search(raw)
    if rm and "noindex" in rm.group(1).lower():
        counts["noindex"] += 1

broken = []
for src, href in sorted(internal_targets):
    target = href.split("#")[0]
    if target in ("", "/"):
        continue
    cands = [target, target.rstrip("/") + "/", target.rstrip("/") + "/index.html"]
    if target.endswith(".html") or target.endswith(".txt") or target.endswith(".xml") or "." in os.path.basename(target.rstrip("/")):
        cands.append(target)
        ok = os.path.exists(os.path.join(DIST, target.lstrip("/")))
    else:
        ok = any(pth in paths for pth in cands)
        if not ok:
            ok = os.path.exists(os.path.join(DIST, (target.rstrip("/") + "/index.html").lstrip("/")))
    if not ok:
        broken.append((src, href))

sm = os.path.join(DIST, "sitemap-0.xml")
sm_urls = []
if os.path.exists(sm):
    txt = open(sm, encoding="utf-8").read()
    sm_urls = re.findall(r"<loc>(.*?)</loc>", txt)
sm_missing = [u for u in sm_urls if urlparse(u).path not in paths]
not_in_sm = sorted(p for p in paths if p not in {urlparse(u).path for u in sm_urls})

print("=== BUILD ===")
print("html_pages:", counts["pages"])
print("dist_index_dirs:", len(paths))
print()
print("=== SITEMAP ===")
print("sitemap_urls:", len(sm_urls))
print("sitemap_missing_targets:", len(sm_missing))
for u in sm_missing[:10]:
    print("  MISSING", u)
print("pages_not_in_sitemap:", len(not_in_sm))
for p in not_in_sm[:12]:
    print("  NOTLISTED", p)
print()
print("=== JSON-LD ===")
print("pages_with_ldjson:", len(jsonld_pages), "/", counts["pages"])
print("ldjson_blocks:", counts["ldjson_total"], "invalid:", counts["ldjson_bad"])
print("types:", dict(sorted(types.items(), key=lambda x: -x[1])))
print()
print("=== META ===")
for k in ("no_canonical", "no_hreflang", "no_desc", "desc_long", "title_long", "title_short", "noindex"):
    print(f"{k}: {counts[k]}")
print()
print("=== LINKS ===")
print("internal_link_edges:", len(internal_targets))
print("broken_links:", len(broken))
seen = set()
for s, h in broken:
    if h in seen:
        continue
    seen.add(h)
    print("  BROKEN", h, "<-", s)
print()
print("=== ISSUES SAMPLE ===")
for i in issues[:25]:
    print(" ", i)
