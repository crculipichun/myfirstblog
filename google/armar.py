#!/usr/bin/env python3
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "google" / "fuente"

html = (RAIZ / "index.html").read_text(encoding="utf-8")
flota = json.loads(re.search(r'<script type="application/json" id="flota-inicial">(.*?)</script>', html, re.S).group(1))
historial = json.loads((FUENTE / "historial.json").read_text(encoding="utf-8"))
panel = (FUENTE / "panel.html").read_text(encoding="utf-8")


def lista(filas):
    return "[\n  " + ",\n  ".join(json.dumps(f, ensure_ascii=False, separators=(",", ":")) for f in filas) + "\n]"


codigo = (FUENTE / "Codigo.gs").read_text(encoding="utf-8")
for marca, valor in (("__FLOTA__", lista(flota)), ("__HISTORIAL__", lista(historial)), ("__PANEL__", json.dumps(panel, ensure_ascii=False))):
    assert codigo.count(marca) == 1, marca
    codigo = codigo.replace(marca, valor)
(RAIZ / "google" / "Codigo.gs").write_text(codigo.lstrip(), encoding="utf-8")
print(f"google/Codigo.gs listo: {len(flota)} camiones, {len(historial)} mantenciones históricas")
