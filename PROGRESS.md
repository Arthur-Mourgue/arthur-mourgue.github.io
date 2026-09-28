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

## 2026-09-28 — home v2 (spec complète)
- Fait : home reconstruite selon la spec v2. Hero plein écran (nav Work/Research/
  Background/CV en haut à droite, « Selected work ↓ » en bas, nom + h1 fluides),
  Selected work (table drawing list + 4 sheets avec grande image), Research and
  papers (2 colonnes), Other projects (grille de 4 cartes), Background (2 tables
  Experience/Education), Contact. Ancienne section « Now » et ancienne table
  « Other sheets » supprimées. Ordre des pages projet passé à LaMain, Capra,
  LePotager, DagoBERT (pagers mis à jour). Paragraphe ajouté à Capra « Building
  the dataset ». CSS réécrit (tokens fluides --h1/--lead/--body/--section, hero
  100svh, plus de fade-in au scroll), art direction conservée. `css_version` 14.
- Décisions : la spec v2 dit de garder les `{{...}}` ; tous les placeholders sont
  donc laissés visibles (y compris email/github/linkedin/cv). Les pages projet
  gardent la mise en page actuelle (titleblock, prose + slots image, pager) ; pas
  de table de résultats, la v2 ne fournit pas de contenu pour elle. `site-content.md`
  (v1) n'a pas été touché, la v2 le remplace.
- Vérifié : `./scripts/check.sh` vert (5 pages, 4 tests OK) ; aucun « : », tiret
  cadratin ou demi-cadratin dans le texte visible ; les 12 placeholders présents.
- À surveiller : `site-content.md` est encore la v1, à remplacer ou supprimer.

## 2026-09-28 — hero proportions
- Fait : le hero était trop grand (titre et dessin massifs, liens sous la ligne
  de flottaison). Réduction de `--h1` (34-60px), `--lead` (16-20px), `--pad`
  (max 96px), du padding vertical du hero et de la largeur du dessin
  (`min(36vw, 56svh)`). `css_version` 15.
- Vérifié : screenshots Chrome 1280x720, 1920x1080 et 390x844, rendu équilibré
  et hero complet sur un écran. `./scripts/check.sh` vert.

## AAAA-MM-JJ — F001
- Fait : ...
- Décisions prises : ...
- Problèmes / à surveiller : ...
