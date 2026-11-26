import os, re

pats = ["搂", "锟", "â€", "Ã", "Â", "ï¿½", "�"]
hits = []
for root, _, fs in os.walk("."):
    if any(s in root for s in ["node_modules", ".git", "dist", "temp", "screenshots"]):
        continue
    for f in fs:
        if not f.endswith((".txt", ".astro", ".ts", ".md", ".xml", ".json")):
            continue
        fp = os.path.join(root, f)
        try:
            raw = open(fp, encoding="utf-8").read()
        except Exception:
            continue
        for p in pats:
            for m in re.finditer(re.escape(p), raw):
                line = raw[: m.start()].count("\n") + 1
                ctx = raw[max(0, m.start() - 40): m.start() + 40].replace("\n", " ")
                hits.append((fp, line, p, ctx))

print("mojibake_hits:", len(hits))
seen = set()
for fp, line, p, ctx in hits[:30]:
    key = (fp, line)
    if key in seen:
        continue
    seen.add(key)
    print("  %s:%d [%s] %s" % (fp, line, p, ctx.encode("ascii", "replace").decode("ascii")))
