#!/bin/sh
# Inicia el servidor de Bitácora de Flota en macOS o Linux.
cd "$(dirname "$0")"
python3 -c "import openpyxl, pyngrok" 2>/dev/null || python3 -m pip install --user openpyxl pyngrok
exec python3 servidor.py "$@"
