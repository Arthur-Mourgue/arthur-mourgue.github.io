# Guide d'utilisation (pour toute l'équipe, même sans savoir coder)

## Installation (une fois)
1. Copier tous ces fichiers à la racine du projet.
2. `./scripts/setup.sh`  → active les hooks git.
3. Remplir les TODO de AGENTS.md et adapter docs/architecture.md.
4. Sur GitHub : Settings → Branches → protéger la branche par défaut (`master` ou `main`)
   → exiger que la CI passe. Settings → Pages → Source = « GitHub Actions ».

## Le cycle de travail
1. `/plan-feature <ton idée>`  → l'agent Plan découpe en petites features.
   Tu relis, tu corriges, tu colles le JSON dans features.json.
2. `/next`  → l'agent prend la feature suivante, code, se fait relire, commit.
3. Tu regardes : check ✅ ? commit propre ? Si oui, on relance `/next`.
4. Un bug ? `/fix <description du bug>`.
5. Envie d'un 2e avis ? `/review`.

## Spécificité de ce projet
Il n'y a ni lint, ni typage, ni tests : `./scripts/check.sh` ne vérifie que la
syntaxe (JS/Python/Shell) et la validité de `features.json`. C'est volontaire
et documenté dans `docs/decisions/0001-baseline.md`. Ne pas ajouter d'outil
sans en parler : cela installeraient des dépendances.

## Les 3 règles pour les non-codeurs
- Si check.sh est rouge, ce n'est PAS fini, quoi que dise l'agent.
- Ne jamais accepter qu'il modifie scripts/, .githooks/ ou la CI « pour que ça passe ».
- Une session = une feature. Nouvelle feature → nouvelle session.
