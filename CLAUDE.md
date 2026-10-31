# Likelemba : règles du projet

Application web pour gérer une likelemba (tontine) depuis le navigateur.
Le cahier des charges complet est dans `../../master-prompt-likelemba.md`.

## Technique

- React avec Vite, en JavaScript. Tailwind CSS et DaisyUI pour le style, React Router pour la navigation.
- Pas de serveur : les données sont dans `localStorage`.
- Aucune nouvelle bibliothèque sans accord.

## Langue

- **Le code est en anglais** : fichiers, variables, fonctions, clés et champs enregistrés, commentaires.
- **Ce que voit l'utilisateur est en français** : textes, messages d'erreur et adresses des pages (`/connexion`, `/groupes/nouveau`).

## Clean Code

- Des noms explicites, qui disent l'intention sans avoir besoin d'un commentaire.
- De petites fonctions et de petits composants, avec une seule responsabilité.
- Pas de duplication : ce qui se répète devient un composant, un hook ou une fonction.
- Pas de valeurs magiques : les statuts, fréquences et adresses sont des constantes (`src/constants.js`, `src/routes.js`).
- Des commentaires seulement pour expliquer un « pourquoi », jamais pour répéter le code.
- Chaque couche reste à sa place :
  - `pages/` et `components/` : l'affichage.
  - `hooks/` : la logique réutilisable des composants.
  - `services/` : les données ; seul `services/storage.js` touche à `localStorage`.
  - `utils/` : des fonctions simples, sans React.

## Façon de travailler

- Une fonctionnalité à la fois, dans l'ordre du plan. Attendre la validation avant de passer à la suivante.
- Faire un commit git local après chaque fonctionnalité validée, jamais avant.
- Après chaque fonctionnalité, expliquer ce qui a été fait, les fichiers touchés et comment tester.
- Signaler ce qui ne serait pas assez sécurisé pour une vraie application.
- Les 2 heures de l'atelier ne limitent pas le périmètre.
