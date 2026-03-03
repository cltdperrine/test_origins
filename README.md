## Base URL

# Documentation – Frontend tech-test

## 1. Présentation générale

Ce projet est une application frontend développée avec React + Vite + TypeScript.

Elle consomme une API CMS externe afin d'afficher:

* Une page d'accueil dynamique avec sections
* Une liste d'articles
* Une liste de vidéos
* Des pages détails pour chaque contenu

Le projet est structuré de manière modulaire et typée pour sécuriser les données issues de l'API.

---

## 2. Stack et choix technique

* **React 18**: bibliothèque UI pour créer des interfaces dynamiques
* **Vite**: environnement de développement rapide avec Hot Module Replacement performant
* **TypeScript**: sécurisation des structures de données issues de l'API
* **React Router DOM**: gestion de routes dynamiques pour les pages détail
* **Tailwind CSS**: mise en page rapide, responsive et maintenable
* **API REST externe**: récupération des contenus dynamiques

---

## 3. Arborescence du projet

```
test_origins/
│── index.html
│── package.json
│── vite.config.ts
|── .env
|── .env.example
│
└── src/
    │── main.tsx
    │── App.tsx
    │── index.css
    │
    ├── assets/
    │   └── placeholder.png
    │
    ├── components/
    │   ├── layout/
    │   │   └── Header.tsx
    │   │
    │   └── sections/
    │       ├── StaticGridNews.tsx
    │       ├── StaticCarouselNews.tsx
    │       ├── StaticSlider.tsx
    │       └── SectionRenderer.tsx
    │
    ├── pages/
    │   ├── Home.tsx
    │   ├── Articles.tsx
    │   ├── ArticleDetail.tsx
    │   ├── Videos.tsx
    │   └── VideoDetail.tsx
    │
    ├── services/
    │   └── api.ts
    │
    └── types/
        └── content.ts
```

---

## 4. Installation et lancement

### 4.1 Prérequis

* Node.js >= 18

### 4.2 Configuration `.env`

Créer un fichier `.env` à la racine du projet:

```env
VITE_ENDPOINT_URL=
VITE_X_ACCOUNT_KEY=
```

### 4.3 Installation des dépendances

```bash
npm install
```

### 4.4 Lancement du serveur

```bash
npm run dev
# ou
yarn dev
```

Application accessible sur :

```
http://localhost:5173
```

---

## 5. Architecture du projet

### 5.1 Routing

Gestion des routes avec React Router:

* "/" -> Home
* "/articles/:slug" -> détail d'un article
* "/videos/:slug" -> détail d'une vidéo

### 5.2 Gestion des données

Toutes les requêtes API passent par:

```
src/services/api.ts
```

Ce fichier centralise:
* l'URL de base
* les headers
* la gestion des erreurs

### 5.3 Typage TypeScript

Les structures de données issues de l'API sont définies dans:

```
src/types/content.ts
```

Cela permet:

* d'éviter les erreurs de proprietés inexistantes
* de sécuriser l'affichage
* d'améliorer la maintenabilité

---

## 6. Particularités API

### 6.1 Récupération des articles

L'API nécessite:

```
GET "/articles?id={id}&language=fr"
```

### 6.2 Récupération des vidéos

Les vidéos utilisent:

```
"video.url"
```

### 6.3 Problèmes rencontrés

#### 1. Slug VS ID
Certaines routes ne fonctionnaient pas avec "slug" mais uniquement avec "id".

#### 2. Gestion CORS/ vidéos
Certaines vidéos issues du CMS sont bloquées par le navigateur (OpaqueResponseBlocking).

Solution mise en place:
 * fallback Image si la vidéo ne charge pas
 * gestion conditionnelle de l'affichage du composant <video>

#### 3. Structure hétérogène des données:
 Les contenus CMS n'avaient pas toutes les mêmes propriétés (Image, Images.main, etc).

 Solution:

```
 item.image?.url ?? item.images?.main?.url
```

#### 4. Indisponibilité temporaire de l'API
À deux reprises, l'API a retourné des erreurs 401 / 503.

Actions mises en place:
* vérification via Postman pour isoler frontend / API
* ajout de logs de debug
* gestion des erreurs UI
* fallback visuel

Apprentissage:
* meilleure compréhension du debugging réseau
* gestion des erreurs asynchrones
* différenciation problème frontend / backend