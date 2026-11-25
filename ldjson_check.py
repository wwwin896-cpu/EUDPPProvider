import os, re, json

DIST = "dist"

def url_path(fp):
    rel = os.path.relpath(fp, DIST).replace("\\", "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel

ld = re.compile(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', re.S)
desc = re.compile(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
types = {}
pages = 0
withld = 0

for root, d, fs in os.walk(DIST):
    for f in fs:
        if not f.endswith(".html"):
            continue
        fp = os.path.join(root, f)
        raw = open(fp, encoding="utf-8", errors="ignore").read()
        p = url_path(fp)
        pages += 1
        blocks = ld.findall(raw)
        if blocks:
            withld += 1
        dm = desc.search(raw)
        if not dm or len(dm.group(1).strip()) < 40:
            print("THIN_DESC", p, (dm.group(1)[:70] if dm else "MISSING"))
        for b in blocks:
            try:
                data = json.loads(b)
            except Exception:
                print("BAD_JSON", p)
                continue

            def walk(o):
                if isinstance(o, dict):
                    t = o.get("@type")
                    if isinstance(t, str):
                        types[t] = types.get(t, 0) + 1
                    elif isinstance(t, list):
                        for x in t:
                            types[x] = types.get(x, 0) + 1
                    for v in o.values():
                        walk(v)
                elif isinstance(o, list):
                    for v in o:
                        walk(v)

            walk(data)

print("pages", pages, "with_ld", withld)
for k, v in sorted(types.items(), key=lambda x: -x[1]):
    print(f"  {k}: {v}")
