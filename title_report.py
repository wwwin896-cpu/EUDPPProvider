import os, re

DIST = "dist"
tr = re.compile(r"<title>(.*?)</title>", re.S)

def url_path(fp):
    rel = os.path.relpath(fp, DIST).replace("\\", "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel

rows = []
for root, d, fs in os.walk(DIST):
    for f in fs:
        if not f.endswith(".html"):
            continue
        fp = os.path.join(root, f)
        raw = open(fp, encoding="utf-8", errors="ignore").read()
        m = tr.search(raw)
        if not m:
            continue
        t = re.sub(r"\s+", " ", m.group(1)).strip()
        rows.append((len(t), url_path(fp), t))

rows.sort(reverse=True)
print("total", len(rows), "over70", sum(1 for r in rows if r[0] > 70), "over60", sum(1 for r in rows if r[0] > 60))
for n, p, t in rows[:45]:
    print(f"{n:3d} {p}  ::  {t}")
