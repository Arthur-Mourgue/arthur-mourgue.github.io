# PROGRESS — session log (the agent appends one entry at the end of each session)

## 2026-09-28 — agent harness setup
- Done: git re-rooted at the project root (`site/.git` → repo root, `site/` now a
  subfolder); installed the adapted harness (`scripts/check.sh`, `.githooks/`,
  `.github/workflows/`, `AGENTS.md`, `docs/architecture.md`, `features.json`).
- Decisions: no lint/type/test toolchain (see `docs/decisions/0001-baseline.md`);
  `check.sh` is syntax/JSON only; GitHub Pages must switch to Actions (site/ is no
  longer the deploy root).
- To watch: the live site will 404 until Settings → Pages → Source = "GitHub Actions".
  `cv.pdf` and `assets/video/lepotager.mp4` are still missing content TODOs.

## 2026-09-28 — static site generator (0002)
- Done: added `tools/build_site.py` + `site-src/` (layout, partials, pages.json,
  page bodies); regenerated `site/*.html`; added `tools/test_site.py` (stdlib
  unittest) and two check.sh steps (generated-site freshness + tests).
- Decisions: zero-dependency generator, generated HTML stays committed
  (see `docs/decisions/0002-site-generator.md`). Project pages gained a
  meta description and Open Graph tags.
- Verified: `index.html` reproduced byte-for-byte; project pages gained exactly
  3 metadata lines each. `./scripts/check.sh` green.
- To watch: never hand-edit `site/*.html`; edit `site-src/` then rebuild.

## AAAA-MM-JJ — F001
- Fait : ...
- Décisions prises : ...
- Problèmes / à surveiller : ...
