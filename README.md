# SFS FR — site statique

Site de la communauté Discord francophone **SFS FR**, dédiée au jeu
Spaceflight Simulator. Construit avec [Eleventy](https://www.11ty.dev/)
(Nunjucks + Markdown), CSS vanilla, sans framework JS.

## Structure du projet

```
sfsfr/
├── .eleventy.js          # Configuration Eleventy (collections, filtres)
├── package.json
├── src/
│   ├── _data/
│   │   ├── site.json     # Titre, description, lien Discord, url du site
│   │   ├── faq.yaml       # Contenu de la FAQ (facile à éditer)
│   │   └── year.js        # Année courante pour le footer
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk   # Layout HTML principal (head, header, footer)
│   │   │   └── tuto.njk   # Layout des pages de tuto individuelles
│   │   └── partials/
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── js/main.js     # Menu mobile, accordéon FAQ, filtre de tutos
│   │   └── images/        # Logo, favicons, og:image (générés depuis le logo)
│   ├── tutos/
│   │   ├── tutos.json     # Layout par défaut des tutos
│   │   ├── index.njk      # Page de listing /tutos/
│   │   └── *.md           # Un fichier Markdown par tuto
│   ├── faq/index.njk       # Page /faq/
│   ├── a-propos/index.njk  # Page /a-propos/
│   ├── index.njk           # Page d'accueil
│   ├── robots.txt
│   └── sitemap.xml.njk
└── _site/                 # Généré par la commande build (ignoré par git)
```

## Installation et développement local

```bash
npm install
npm run serve   # lance un serveur local avec rechargement automatique
```

## Build de production

```bash
npm run build   # génère le site dans _site/
```

## Déploiement sur Cloudflare Pages

Dans les paramètres du projet Cloudflare Pages :

- **Build command** : `npx eleventy`
- **Build output directory** : `_site`
- **Root directory** : `/` (racine du dépôt, ou le dossier contenant ce projet)

Le site est prévu pour être servi depuis `sfsfr.pages.dev` (voir `src/_data/site.json`
si l'URL finale change, notamment pour le sitemap et les balises Open Graph).

## Ajouter un tuto

Crée un nouveau fichier Markdown dans `src/tutos/`, par exemple
`src/tutos/mon-nouveau-tuto.md` :

```markdown
---
title: "Titre du tuto"
description: "Une phrase de résumé affichée sur les cartes."
categorie: orbite   # orbite | atterrissage | optimisation | modding
date: 2026-07-01
---

Contenu du tuto en Markdown.
```

Le tuto apparaît automatiquement dans la liste `/tutos/` et dans les
filtres de catégorie, trié par date décroissante.

## Modifier la FAQ

Toutes les questions/réponses sont dans `src/_data/faq.yaml`, organisées
en sections. Chaque section a la forme suivante :

```yaml
- section: "Nom de la section"
  questions:
    - question: "Ma question ?"
      reponse: "Ma réponse."
```

Pour ajouter une question, ajoute un bloc `question`/`reponse` dans la
bonne section. Pour ajouter une nouvelle section, ajoute un bloc
`section`/`questions` à la fin du fichier.

## Lien Discord

Le lien d'invitation est centralisé dans `src/_data/site.json`
(`discordUrl`). Le modifier à cet endroit le met à jour partout sur le site.
