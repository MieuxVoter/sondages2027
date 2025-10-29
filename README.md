# JM Tracker React

Application React pour visualiser et suivre les résultats de sondages utilisant 
    - le **Jugement Majoritaire**
    - le **Vote par Approbation**
    - le **Scrutin Uninominale**

## À propos du Jugement Majoritaire

Le **jugement majoritaire** est une méthode de vote innovante où chaque électeur attribue une mention (très satisfait, plutôt satisfait, ni satisfait ni insatisfait, plutôt insatisfait, très insatisfait) à chaque candidat.

Le classement final est déterminé par la **mention majoritaire** de chaque candidat, c'est-à-dire la mention qui divise les évaluations en deux parts égales. Cette approche permet d'éviter les votes stratégiques et offre une représentation plus nuancée de l'opinion publique.

## Technologies

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Material-UI (MUI)** - Composants UI
- **ECharts** - Bibliothèque de graphiques
- **ESLint** - Linting avec règles de production

## Installation

```bash
npm install
```

## Développement

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173/`

### Démarrer avec accès réseau (mobile)

Pour accéder au site depuis votre téléphone sur le même réseau :

```bash
npm run dev -- --host
```

L'application sera accessible via l'adresse IP affichée (ex: `http://192.168.x.x:5173/`)

### Linting

```bash
npm run lint
```

### Build de production

```bash
npm run build
```

Récupérer le site généré dans le répertoire /dist

### Prévisualiser le build

```bash
npm run preview
```

## Graphiques disponibles

1. **Evolution du Classement** - Evolution du classement des candidats sondage après sondage
2. **Profile de mérite - sondage unique** - Comparaison du profile de mérite des différents candidats pour un sondage donné
3. **Grille de profile de mérite** - Evolution du profile de mérite d'un candidat au cours du temps

## License

[Votre licence ici]

## Contributeurs

[Vos contributeurs ici]
