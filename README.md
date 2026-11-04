# Devantio — site web

Site vitrine de Devantio (agence digitale pour commerces locaux, EMF Fribourg).

**En ligne :** https://trivex-ia.github.io/Devantio/
**Dépôt GitHub :** https://github.com/Trivex-ia/Devantio

## Structure

- `index.html` — page principale
- `style.css` — styles
- `script.js` — animation d'apparition au scroll (sans dépendance externe)
- `assets/` — logo et visuels
- `404.html`, `robots.txt`, `sitemap.xml` — pages techniques

## Contact

Le formulaire de contact utilise [FormSubmit](https://formsubmit.co) (gratuit, sans compte à créer) et pointe actuellement vers l'email perso d'Alex en attendant une adresse dédiée (ex: devantio.officiel@gmail.com). Pour changer la destination : modifier l'adresse dans l'attribut `action` du `<form>` dans `index.html`.

## Prochaines étapes

- Brancher devantio.ch une fois le domaine acheté (GitHub Pages → Custom domain)
- Créer un template réutilisable à partir de cette base pour les premiers clients
- Ajouter le chatbot IA (service premium) une fois les premiers clients signés

## Développement local

Ouvrir `index.html` directement dans un navigateur, ou lancer un petit serveur local :

```bash
python3 -m http.server 8000
```
