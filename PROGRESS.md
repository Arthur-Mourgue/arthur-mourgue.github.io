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

## 2026-09-28 — contenu du portfolio (site-content.md)
- Fait : home réécrite selon le spec (Hero, Now, Selected work, Earlier work,
  Papers, Contact) ; les 4 pages projet réécrites depuis Part 3 et renommées en
  `capra.body.html` / `dagobert.body.html` (ex-`cart-docking` / `english-to-arm`,
  supprimées) ; `pages.json` mis à jour (descriptions, `css_version` 13) ;
  CSS minimal ajouté (`.entries`, `.entry`, `.prose`) sans toucher l'art direction.
- Décisions : valeurs connues remplies (email, github, linkedin, cv.pdf) ; les
  autres `{{...}}` restent visibles pour l'owner. `tools/test_site.py` ignore
  désormais les hrefs contenant `{{` (placeholder de contenu, même rôle que
  `KNOWN_MISSING`), sur accord explicite de l'owner.
- Vérifié : `./scripts/check.sh` vert (5 pages générées, 4 tests OK).
- À surveiller : placeholders à remplir (`{{LAMAIN_GITHUB_URL}}`,
  `{{LEPOTAGER_VIDEO_URL}}`, `{{LEPOTAGER_CODE_URL}}`, `{{ETTC_PAPER_TITLE}}`,
  `{{ETTC_PAPER_URL}}`, `{{INSA_PAPER_TITLE}}`, `{{INSA_PAPER_URL}}`,
  `{{UPDATED_DATE}}`) ; slots média encore en boîtes pointillées.

## AAAA-MM-JJ — F001
- Fait : ...
- Décisions prises : ...
- Problèmes / à surveiller : ...
