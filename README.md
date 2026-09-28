# arthur-mourgue.github.io

Portfolio statique : page d'accueil et une page détaillée par projet
(LaMain, LePotager, cart docking, DagoBERT). HTML/CSS/JS, aucune dépendance
d'exécution.

## Structure

- `site-src/` — sources du site : `layout.html`, `partials/`, `pages.json`,
  `pages/*.body.html`
- `site/` — site généré, publié tel quel (`assets/` inclus). Ne pas éditer à la main.
- `tools/` — générateur du site et outillage d'images (`opencv`/`numpy`/`scipy`, `ffmpeg`)
- `docs/` — notes de travail

## Générer et servir en local

```bash
python3 tools/build_site.py          # régénère site/ depuis site-src/
cd site && python3 -m http.server 8000
```

Le dessin de la main utilise un masque CSS : il faut passer par un serveur
(`file://` ne fonctionne pas).

## Édition

Modifier `site-src/`, puis relancer `python3 tools/build_site.py`.
`site/*.html` est généré ; `./scripts/check.sh` échoue si la sortie n'est plus
à jour.

## Déploiement

GitHub Pages via GitHub Actions : `.github/workflows/pages.yml` publie `site/`.
