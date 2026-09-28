# Portfolio: dossier complet

Tout ce qu'il faut pour construire et mettre en ligne ton portfolio : le site prêt à modifier, la direction artistique, la stratégie, le guide des contenus, et les outils pour préparer les images et les vidéos.

Maquette de référence (toutes les pistes explorées + la version finale) :
https://claude.ai/artifact/EbhAwMJFSNtseux5gL3WXC

## Ce qu'il y a dans le dossier

```
portfolio-lamain/
├── README.md                  ← tu es ici
├── docs/
│   ├── 01-strategie.md        positionnement, cibles, messages, candidatures
│   ├── 02-direction-artistique.md   la DA : couleurs, typo, mise en page, animations
│   ├── 03-contenus.md         quoi écrire, projet par projet, et comment
│   ├── 04-medias.md           CAO, photos, vidéos : comment les produire
│   └── 05-checklist.md        tout ce qu'il reste à faire, dans l'ordre
├── site-src/                  sources du site (c'est ICI qu'on édite)
│   ├── layout.html            gabarit commun (head, bouton thème, script)
│   ├── partials/              morceaux réutilisables (bouton thème…)
│   ├── pages.json             titres, méta descriptions, versions d'assets
│   └── pages/                 contenu de chaque page (*.body.html)
├── site/                      le site GÉNÉRÉ (ne pas éditer à la main)
│   ├── index.html             page d'accueil (hero + nomenclature + 4 feuilles + contact)
│   ├── projects/              une page détaillée par projet
│   │   ├── lamain.html
│   │   ├── lepotager.html
│   │   ├── cart-docking.html
│   │   └── english-to-arm.html
│   └── assets/
│       ├── css/style.css      toute la DA est là (variables en haut du fichier)
│       ├── img/               dessin de la main, fond à croix, favicon
│       └── video/             tes vidéos iront ici
└── tools/
    ├── make_lineart.py        image CAO → dessin au trait bleu du hero
    ├── duotone.sh             vidéo / photo → version bleue prête pour le web
    ├── requirements.txt
    └── lamain-cad-capture.png ta capture d'origine
```

## Voir le site en local

Le dessin de la main utilise un masque CSS, que les navigateurs bloquent si tu ouvres le fichier directement (`file://`). Lance un petit serveur :

```bash
# 1. régénérer le site après avoir modifié site-src/
python3 tools/build_site.py

# 2. le servir
cd site
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Éditer le site

Ne modifie **pas** `site/*.html` : ces fichiers sont générés. Édite les sources
dans `site-src/` puis relance `python3 tools/build_site.py`. `./scripts/check.sh`
échoue si le site généré n'est plus à jour.

## Comment le site fonctionne

- **Accueil** (`index.html`) : tout se lit en défilant. Les liens de l'intro et les lignes de la nomenclature font défiler jusqu'à la bonne feuille.
- **Pages projet** (`projects/*.html`) : le lien "full sheet" de chaque feuille ouvre sa page détaillée. En bas de chaque page, on passe à la feuille précédente ou suivante.
- **Mode sombre** : automatique, selon le réglage du système du visiteur.
- **Animations** : coupées automatiquement si le visiteur a désactivé les animations dans son système.
- **Mobile** : une seule colonne, les annotations de la main sont masquées.

## Ce que tu dois remplacer

Tout ce qui est entre crochets : `[Your name]`, `[YOUR_EMAIL]`, `[GITHUB_URL]`, `[associate]`, `[date]`…
Les passages surlignés en beige (`<mark class="todo">`) sont les textes à écrire avec tes mots. Voir `docs/03-contenus.md`.

Pour tout retrouver d'un coup :

```bash
grep -rn "\[" site-src/pages/
```

## Mettre en ligne (gratuit)

Le plus simple, **GitHub Pages** :
1. Crée un dépôt, mets-y le contenu du dossier `site/` à la racine.
2. Settings → Pages → Source : branche `main`, dossier `/ (root)`.
3. Le site est en ligne sur `https://<ton-pseudo>.github.io/<depot>/`.

Alternatives : Netlify ou Vercel (glisser-déposer du dossier `site/`). Un nom de domaine à ton nom (~10 €/an) fait plus pro : `prenomnom.com`.

## Ordre conseillé

1. Remplacer les placeholders simples (nom, liens, CV) et mettre en ligne une V1. **Cette semaine.**
2. Écrire les textes avec tes mots (`docs/03-contenus.md`).
3. Récupérer un export propre de la CAO et refaire le dessin (`tools/make_lineart.py`).
4. Filmer et intégrer les vidéos (`docs/04-medias.md`).
5. Mettre à jour la feuille LaMain à chaque étape, jusqu'au premier grasp fin novembre.
