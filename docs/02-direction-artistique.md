# 02 — Direction artistique

## L'idée en une phrase

**Le site est un jeu de plans.** Chaque projet est une feuille, la page d'accueil en est la nomenclature, et LaMain est la feuille 01. Le bleu veut toujours dire la même chose : la main, le toucher, ce qui est cliquable.

Esprit : understatement. Un texte brut façon Wikipédia, une seule image forte, un seul détail qui bouge. Rien ne force.

## Couleurs

| Rôle | Clair | Sombre |
|---|---|---|
| Papier (fond) | `#F4F2ED` | `#12131A` |
| Encre (texte) | `#111111` | `#E9E7E1` |
| Texte secondaire | `#5F5E5A` | `#A09E97` |
| Bleu (dessins, liens, labels) | `#1A0DAB` | `#8FA2FF` |
| Filets de tableau | `rgba(26,13,171,.35)` | `rgba(143,162,255,.35)` |
| Croix du fond | `#CFCBC3` | `#2C2E3A` |

Règle : **une seule couleur d'accent**, le bleu. Pas d'arc-en-ciel, pas de dégradés.

## Typographie

- **Texte** : Times New Roman / Times / Georgia, 20 px, interligne 1.5 (19 px dans les feuilles). C'est volontairement "par défaut" : c'est ce qui donne le côté brut, encyclopédie.
- **Titres** : même serif, gras, 34 px.
- **Noms de projets** : serif italique, **en contour** bleu (`color: transparent; -webkit-text-stroke: 1.2px`). 60 px dans le hero, 40 px dans les feuilles. C'est le même trait que le dessin de la main.
- **Étiquettes** : monospace 11 px, majuscules, espacées, en bleu ("Sheet 02", "Drawing list"…).
- **Specs** : monospace 12 px, gris.

Option plus tard : remplacer Times par une serif web plus soignée (auto-hébergée, pas de Google Fonts pour la vitesse), en gardant le même caractère.

## Mise en page

- Largeur de conception 1440 px, marge gauche 110 px (`--pad`).
- Feuilles : colonne texte 520 px, 110 px d'écart, figure à droite.
- Sections espacées de 140 px.
- Fond : petite croix (+) tous les 28 px, comme un tapis de découpe ou une feuille de dessin.
- **Le texte sur les croix** : chaque bloc de texte a la classe `.paper` (fond papier + halo flou de la même couleur), pour que les croix s'effacent doucement derrière sans cadre visible.
- Mobile : une colonne, 24 px de marge, annotations de la main masquées.

## Composants

| Composant | Contenu |
|---|---|
| Hero | Intro à gauche · dessin de LaMain à droite · légende : "● Current project", nom en contour, "prototype v1", ligne de specs |
| Nomenclature ("Drawing list") | Tableau No. / Title / Year / Status, filets bleus en haut et en bas, lignes cliquables |
| Feuille (accueil) | "Sheet 0X" · titre · 2–3 paragraphes · liens · figure 3:2 · légende (nom en contour + specs) |
| Journal de construction | Tableau date / étape ; l'objectif en bleu |
| Page projet | Cartouche (titre + 4 cases) · Problème · Contraintes · Système + "Detail A" · Ce qui a cassé · Résultats (tableau) · Suite · navigation précédente / suivante |

## Animations

Une seule chose bouge : la main. Tout le reste est immobile.

- **Surbrillance** : une copie plus lumineuse du dessin n'apparaît que dans une bande qui descend du haut vers le bas en 6 s, avec une pause. La main reste toujours visible.
- **Annotations** : "linked flexion", "abduction servo", "thumb · 2 servos" s'affichent une par une (cycle de 9 s, décalage de 3 s).
- **Mouvement réduit** : si le visiteur a coupé les animations, la bande disparaît et seule la première annotation reste affichée.

Pistes pour plus tard (quand tu auras la CAO pièce par pièce) :
- animer les doigts qui se referment, directement en SVG ;
- faire réagir le dessin au curseur.

## À faire / à ne pas faire

- ✅ Des vraies images de tes projets, teintées en bleu (voir `04-medias.md`).
- ✅ Des chiffres seulement quand ils sont vrais et mesurés.
- ✅ Des phrases courtes, à la première personne.
- ❌ Ajouter des effets (fondus au scroll, cartes, ombres, dégradés).
- ❌ Une deuxième couleur d'accent.
- ❌ Des photos en couleurs brutes posées telles quelles : elles cassent l'unité.
