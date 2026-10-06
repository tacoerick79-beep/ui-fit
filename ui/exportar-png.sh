#!/usr/bin/env bash
# Exporta cada pantalla HTML de esta carpeta a png/<nombre>.png (390x844 @2x) con Edge en modo headless.
# Uso (Git Bash):  bash exportar-png.sh
set -e
cd "$(dirname "$0")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
DIR_WIN="$(pwd -W)"
mkdir -p png
for f in [0-9][0-9]-*.html; do
  name="${f%.html}"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --window-size=390,844 --virtual-time-budget=8000 \
    --screenshot="$DIR_WIN/png/$name.png" "file:///${DIR_WIN// /%20}/$f" 2>/dev/null
  echo "png/$name.png"
done
