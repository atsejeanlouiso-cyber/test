# Aurelia — École Internationale

Site vitrine statique haut de gamme pour une école imaginaire parisienne.

## Ouvrir le site

Il suffit de double-cliquer sur `index.html`. Aucune installation ni compilation n'est nécessaire.

Pour un aperçu local avec serveur :

```bash
# Python
python -m http.server 8000

# ou Node.js
npx serve .
```

Puis ouvrir `http://localhost:8000`.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure et contenus (toutes les sections) |
| `styles.css` | Direction artistique, responsive, animations |
| `script.js` | Menu mobile, révélations, formulaire, newsletter |
| `robots.txt` | Fichier d'indexation pour l'hébergement |

## Personnalisation rapide

- **Identité** : modifier le nom, l'adresse et le téléphone dans `index.html`.
- **Couleurs** : variables dans le bloc `:root` de `styles.css` (`--navy`, `--gold`, `--ivory`, …).
- **Typographies** : Google Fonts `Cormorant Garamond` + `Manrope`, à remplacer dans le `<head>` si souhaité.
- **Photos** : URL Unsplash présentes dans `styles.css` (`.hero-bg`, `.about-img-*`, `.program-img`, `.gallery-item`, `.method-bg`). Remplacer par vos propres visuels pour la production.
- **Formulaire** : l'envoi est simulé dans `script.js` (voir le commentaire « Simulation d'envoi »). Brancher votre service (Formspree, API, backend…) à cet endroit.

## Sections

Accueil · L'École · Formations · Notre méthode · Le campus · Admission · Contact · Pied de page.
