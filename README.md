# Démarche France 2035

Site statique public de présentation du programme Démarche France 2035.

## Mettre à jour le site

1. Modifier les contenus dans `generate.mjs`.
2. Lancer `node generate.mjs`.
3. Contrôler avec `node validate.mjs` puis `node --check dist/assets/site.js`.

Les quatre PDF téléchargeables se trouvent dans `dist/downloads/`. Le site n’utilise ni base de données, ni formulaire, ni module social tiers, ni traceur publicitaire.
