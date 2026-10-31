# Likelemba

Application web pour gérer une likelemba (tontine) depuis le navigateur, sans cahier ni discussion WhatsApp.

L'utilisateur est l'**organisateur du groupe** : il crée le groupe, ajoute les membres et note les cotisations. Les membres n'ont pas de compte.

## Les règles de la likelemba

- Le groupe fixe une cotisation, une devise (CDF ou USD) et une fréquence (chaque semaine, chaque quinzaine ou chaque mois).
- À chaque tour, tous les membres cotisent, bénéficiaire compris : la cagnotte vaut donc la cotisation multipliée par le nombre de membres.
- À chaque tour, un membre différent reçoit la cagnotte. Il y a autant de tours que de membres.
- Le cycle se termine quand chaque membre a reçu la cagnotte une fois.

## Démarrer le projet

Il faut [Node.js](https://nodejs.org) et npm.

```bash
npm install
```

```bash
npm run dev
```

L'application s'ouvre sur <http://localhost:5173>.

| Commande          | Rôle                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Lance le serveur de développement     |
| `npm run build`   | Prépare la version finale dans `dist` |
| `npm run preview` | Affiche la version finale en local    |
| `npm run lint`    | Vérifie le code avec Oxlint           |

La gestion des comptes a besoin de Web Crypto : ouvre l'application sur `localhost` ou en HTTPS.

## Utiliser l'application

1. **Crée un compte**, ou connecte-toi. La session reste ouverte quand on recharge la page.
2. **Crée un groupe** : nom, cotisation, devise, fréquence et date de début. Tu en deviens automatiquement membre.
3. **Ajoute les membres** : le nom est obligatoire, le téléphone facultatif.
4. **Fixe l'ordre de passage** : par tirage au sort, ou en montant et descendant les membres dans la liste.
5. **Clique sur « Démarrer »** (2 membres minimum). Les membres, leur ordre et les détails du groupe ne peuvent plus changer.
6. **Coche les membres qui ont payé** : la date est enregistrée automatiquement, et tu peux décocher en cas d'erreur.
7. **Clique sur « Passer au tour suivant »** quand tout le monde a payé. Au dernier tour, le bouton devient « Clôturer le cycle ».

Le tableau de bord montre le tour en cours, le bénéficiaire, le montant collecté et l'historique des tours passés. Un groupe peut être supprimé à tout moment.

## Technique

React avec Vite en JavaScript, Tailwind CSS et DaisyUI pour le style, React Router pour la navigation. Il n'y a pas de serveur : tout est enregistré dans le `localStorage` du navigateur.

```text
src/
├── pages/        Les pages, une par adresse
├── components/   Les morceaux d'interface
├── hooks/        La logique réutilisable des composants
├── services/     Les données (seul storage.js touche à localStorage)
├── utils/        Des fonctions simples, sans React
├── constants.js  Les devises, fréquences et statuts
├── routes.js     Les adresses des pages
└── index.css     Le thème : couleurs et formes
```

| Adresse                 | Page                       |
| ----------------------- | -------------------------- |
| `/`                     | Mes groupes                |
| `/connexion`            | Connexion                  |
| `/inscription`          | Création de compte         |
| `/groupes/nouveau`      | Nouveau groupe             |
| `/groupes/:id`          | Détail et suivi du groupe  |
| `/groupes/:id/modifier` | Modification du groupe     |

| Clé `localStorage`  | Contenu                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| `likelemba_users`   | Les comptes, avec le mot de passe haché                                   |
| `likelemba_session` | L'identifiant de l'utilisateur connecté                                   |
| `likelemba_groups`  | Les groupes de tous les comptes, avec leurs membres, tours et paiements   |

Le code est en anglais, l'interface et ses adresses en français. Les règles du projet sont dans [CLAUDE.md](CLAUDE.md).

## Limites

**Cette version est faite pour un atelier : ne l'utilise pas pour de vrais comptes ni pour suivre de l'argent réel.**

- **Mots de passe :** ils sont hachés en SHA-256 avec un sel, ce qui est trop rapide pour résister à une attaque par force brute. Une vraie application utiliserait bcrypt ou Argon2 sur un serveur.
- **Séparation des comptes :** elle ne sert qu'à l'affichage. Toute personne qui a accès au navigateur peut lire et modifier toutes les données, y compris les noms et les téléphones des membres.
- **Sauvegarde :** les données restent dans un seul navigateur, et vider ses données de navigation les efface définitivement.

Ne sont pas prévus : le paiement mobile, le partage d'un groupe entre plusieurs téléphones, les rappels, les pénalités de retard et les groupes à plusieurs organisateurs. L'interface est pensée pour l'ordinateur ; l'adaptation au téléphone viendra plus tard.
