#!/usr/bin/env bash
# Uruchamiaj na serwerze po: git pull
# Wymaga: Node 20, npm; opcjonalnie systemd service psc-cms (dopasuj nazwę).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> root: npm ci && npm run build"
npm ci
npm run build

echo "==> cms: npm ci && npm run build"
(cd cms && npm ci && npm run build)

if command -v systemctl >/dev/null 2>&1 && systemctl is-active --quiet psc-cms 2>/dev/null; then
  echo "==> systemctl restart psc-cms"
  sudo systemctl restart psc-cms
elif command -v pm2 >/dev/null 2>&1; then
  echo "==> pm2 restart (jeśli masz proces cms — dostosuj nazwę)"
  pm2 restart psc-cms || true
else
  echo "==> Zrestartuj CMS ręcznie (np. next start lub systemd)."
fi

echo "Done."
