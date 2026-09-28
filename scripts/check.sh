#!/usr/bin/env bash
# ------------------------------------------------------------------
# check.sh — THE source of truth for "is the code good?"
# Used by: you, the agent, the pre-commit hook AND GitHub CI.
# One command, everywhere the same → no "works on my machine".
#
# This project is a static site + offline image tools: there is no
# lint/type/test toolchain (see docs/decisions/0001-baseline.md).
# This check is deliberately syntax/JSON only and needs ZERO install.
# ------------------------------------------------------------------
set -uo pipefail
cd "$(dirname "$0")/.."          # run from the project root

fail=0
step() { echo; echo "▶ $1"; }
run()  { if ! "$@"; then echo "  ✗ FAIL: $*"; fail=1; fi; }

# ---------- Agent task list must stay valid JSON
step "features.json is valid JSON"
run python3 -c "import json; json.load(open('features.json'))"

# ---------- JS syntax (node --check, no imports executed)
if compgen -G "site/assets/js/*.js" >/dev/null; then
  step "JS · syntax (node --check)"
  for f in site/assets/js/*.js; do run node --check "$f"; done
fi

# ---------- Python tools syntax (py_compile does NOT import the deps)
if compgen -G "tools/*.py" >/dev/null; then
  step "Python · syntax (py_compile)"
  run python3 -m py_compile tools/*.py
fi

# ---------- Shell syntax
step "Shell · syntax (bash -n)"
for f in tools/*.sh scripts/*.sh .githooks/*; do
  [ -f "$f" ] && run bash -n "$f"
done

echo
if [ "$fail" -ne 0 ]; then
  echo "❌ CHECK FAILED — fix the errors above before committing."
  exit 1
fi
echo "✅ ALL CHECKS PASS"
