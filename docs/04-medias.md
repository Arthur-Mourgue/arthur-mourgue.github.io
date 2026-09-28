# 04 — Les médias

C'est ce qui fera passer le site de "étudiant" à "crack". Un site sobre avec de très bonnes images vaut plus qu'un site chargé avec des images moyennes.

## 1. Le dessin de LaMain (hero)

Le dessin actuel vient d'une photo d'écran : il reste du bruit (moiré, reflets).

**À demander à ton associé :**
- idéal : un **export SVG des arêtes** depuis le logiciel de CAO (vue de dessin technique, vue 3/4, traits visibles uniquement). Le dessin sera net à toutes les tailles, et on pourra animer les pièces une par une ;
- sinon : un **PNG haute résolution** (≥ 2000 px), fond blanc uni, vue 3/4, sans ombres ni reflets.

**Avec un PNG** :
```bash
cd tools
pip install -r requirements.txt
python make_lineart.py export-cao.png ../site/assets/img/lamain-lines.png --height 1240
```
Le script affiche le ratio largeur / hauteur : reporte-le dans `style.css` (`.hand { aspect-ratio: … }`) s'il change.

**Les annotations** : leurs points sont en coordonnées 588 × 580 dans `index.html` (`<svg class="hand__notes">`). Déplace les `circle cx/cy` (et le début des `path`) sur les bonnes pièces.

## 2. Les vidéos de projets

**Tournage :**
- 30 à 60 s par projet, un seul geste clair (LePotager : saisir → presser → trier).
- Téléphone sur trépied, lumière du jour indirecte, fond neutre et rangé.
- Des plans serrés sur la main et les doigts, plus un plan large.
- Pas de son (les vidéos sont muettes sur le site).
- Montage serré : pas d'intro, on voit l'action tout de suite, boucle propre (la fin ressemble au début).

**Teinte bleue + export web :**
```bash
cd tools
./duotone.sh ma-video.mov ../site/assets/video/lepotager
# → lepotager.mp4, lepotager.webm, lepotager.jpg (image d'attente)
```

**Intégration** : dans `index.html`, remplace le texte du bloc `.media` par :
```html
<video autoplay muted loop playsinline poster="assets/video/lepotager.jpg">
  <source src="assets/video/lepotager.webm" type="video/webm">
  <source src="assets/video/lepotager.mp4" type="video/mp4">
</video>
```
Garde chaque vidéo sous ~3 Mo.

## 3. Les photos

- LaMain en vrai sur l'établi, **sous le même angle que la CAO**, fond neutre.
- Teinte bleue : `./duotone.sh photo.jpg ../site/assets/img/lamain-photo`.
- Puis dans le bloc `.media` : `<img src="assets/img/lamain-photo.jpg" alt="LaMain on the bench">`.

## 4. Les schémas (Capra, Safran)

Tout ce qui est confidentiel se montre en **schéma redessiné**, en traits bleus, sans rien d'interne :
- boîtes et flèches simples (Figma, Excalidraw ou directement en SVG) ;
- couleur `#1A0DAB`, trait fin, texte en Times italique ;
- **demande l'accord** de Capra / Safran avant de publier quoi que ce soit.

## 5. L'image de partage

Pour que le lien soit beau sur LinkedIn / Slack : une capture 1200 × 630 du hero, enregistrée dans `site/assets/img/og.png`.
