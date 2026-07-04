# SFS FR — site statique

Site de la communaute Discord francophone **SFS FR**, dediee au jeu
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
│   │   ├── faq.yaml       # Contenu de la FAQ (facile a editer)
│   │   └── year.js        # Annee courante pour le footer
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk   # Layout HTML principal (head, header, footer)
│   │   │   └── tuto.njk   # Layout des pages de tuto individuelles
│   │   └── partials/
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── js/main.js     # Menu mobile, accordeon FAQ, filtre de tutos
│   │   └── images/        # Logo, favicons, og:image (generes depuis le logo)
│   ├── tutos/
│   │   ├── tutos.json     # Layout par defaut des tutos
│   │   ├── index.njk      # Page de listing /tutos/
│   │   └── *.md           # Un fichier Markdown par tuto
│   ├── faq/index.njk       # Page /faq/
│   ├── a-propos/index.njk  # Page /a-propos/
│   ├── index.njk           # Page d'accueil
│   ├── robots.txt
│   └── sitemap.xml.njk
└── _site/                 # Genere par la commande build (ignore par git)
```

## Installation et developpement local

```bash
npm install
npm run serve   # lance un serveur local avec rechargement automatique
```

## Build de production

```bash
npm run build   # genere le site dans _site/
```

## Deploiement sur Cloudflare Pages

Dans les parametres du projet Cloudflare Pages :

- **Build command** : `npx eleventy`
- **Build output directory** : `_site`
- **Root directory** : `/` (racine du depot, ou le dossier contenant ce projet)

Le site est prevu pour etre servi depuis `sfsfr.pages.dev` (voir `src/_data/site.json`
si l'URL finale change, notamment pour le sitemap et les balises Open Graph).

## Ajouter un tuto

Cree un nouveau fichier Markdown dans `src/tutos/`, par exemple
`src/tutos/mon-nouveau-tuto.md` :

```markdown
---
title: "Titre du tuto"
description: "Une phrase de resume affichee sur les cartes."
categorie: orbite   # orbite | atterrissage | optimisation | modding
date: 2026-07-01
---

Contenu du tuto en Markdown.
```

Le tuto apparait automatiquement dans la liste `/tutos/` et dans les
filtres de categorie, trie par date decroissante.

## Modifier la FAQ

Toutes les questions/reponses sont dans `src/_data/faq.yaml`. Chaque entree
a la forme suivante, `categorie` valant `jeu` ou `discord` :

```yaml
- question: "Ma question ?"
  categorie: jeu
  reponse: >
    Ma reponse, sur une ou plusieurs lignes.
```

## Lien Discord

Le lien d'invitation est centralise dans `src/_data/site.json`
(`discordUrl`). Le modifier a cet endroit le met a jour partout sur le site.
