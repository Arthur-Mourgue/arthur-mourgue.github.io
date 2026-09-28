#!/usr/bin/env bash
# À lancer UNE fois après avoir cloné le projet.
set -euo pipefail
cd "$(dirname "$0")/.."
git config core.hooksPath .githooks     # active nos hooks versionnés
chmod +x .githooks/* scripts/*.sh
echo "✅ Hooks git activés (pre-commit + commit-msg)."
