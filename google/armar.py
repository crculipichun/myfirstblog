#!/usr/bin/env python3
"""Arma google/Codigo.gs (el archivo que se pega en Apps Script) desde google/fuente/.

Junta la plantilla Codigo.gs con la flota de index.html, el historial de mantenciones
y el panel web. Ejecutar después de cambiar cualquiera de esos archivos:  python3 google/armar.py
"""
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "google" / "fuente"

html = (RAIZ / "index.html").read_text(encoding="utf-8")
flota = json.loads(re.search(r"/\*FLOTA_INICIAL\*/(.*?)/\*FIN_FLOTA\*/", html, re.S).group(1))
historial = json.loads((FUENTE / "historial.json").read_text(encoding="utf-8"))
panel = (FUENTE / "panel.html").read_text(encoding="utf-8")


def lista(filas):
    return "[\n  " + ",\n  ".join(json.dumps(f, ensure_ascii=False, separators=(",", ":")) for f in filas) + "\n]"


codigo = (FUENTE / "Codigo.gs").read_text(encoding="utf-8")
for marca, valor in (("__FLOTA__", lista(flota)), ("__HISTORIAL__", lista(historial)), ("__PANEL__", json.dumps(panel, ensure_ascii=False))):
    assert codigo.count(marca) == 1, marca
    codigo = codigo.replace(marca, valor)
aviso = "// ARCHIVO GENERADO por google/armar.py desde google/fuente/: no lo edites a mano.\n"
(RAIZ / "google" / "Codigo.gs").write_text(aviso + codigo, encoding="utf-8")
print(f"google/Codigo.gs listo: {len(flota)} camiones, {len(historial)} mantenciones históricas")
