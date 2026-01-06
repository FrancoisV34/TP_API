# TP_API - API de Gestion de Cours en Ligne

TP Final API express/node/JWT

TP final du cours API.

## Description

Cette API permet de gérer une plateforme de cours en ligne. Elle fournit des fonctionnalités pour créer, lire, mettre à jour et supprimer des cours et des catégories.

## Installation

1. Cloner le repository :

   ```bash
   git clone https://github.com/FrancoisV34/TP_API.git
   cd TP_API
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Configurer les variables d'environnement :
   Créer un fichier `.env` à la racine du projet avec :

   ```
   JWT_SECRET=votre_secret_jwt
   PORT=3000
   DB_NAME=courses.db
   ```

4. Lancer le serveur :

   ```bash
   npm start
   ```

   Ou en mode développement :

   ```bash
   npm run dev
   ```

## Utilisation

Le serveur démarre sur le port 3000 par défaut.

Pour se connecter en tant que ADMIN (
{
"email": "admin@admin.com",
"username": "admin",
"password": "admin123",
"role": "admin"
}
) utilisez email en tant qu'identifiant et password comme mot de passe

Pour se connecter en tant que USER (
{
"email": "user@user.com",
"username": "user",
"password": "user1234"
}
) utilisez email en tant qu'identifiant et password comme mot de passe

Pour se connecter en tant que INSTRUCTOR (
{
"email": "instructor@instructor.com",
"username": "instructor",
"password": "instructor1234",
"role": "instructor"
}
) utilisez email en tant qu'identifiant et password comme mot de passe

### Documentation Swagger

Accédez à la documentation interactive sur : `http://localhost:3000/api-docs`

Accédez directement à tous les cours qui sont publiés (published: true): `http://localhost:3000/courses`

Accédez directement à toutes les catégories ici : `http://localhost:3000/categories`

### Routes disponibles

#### Cours (Courses)

- `GET /courses` - Récupérer tous les cours publiés
- `GET /courses/:id` - Récupérer un cours par son ID
- `GET /courses/level/:level` - Récupérer les cours par niveau (débutant, intermédiaire, avancé)
- `POST /courses` - Créer un cours (authentification requise) (Vous devez d'abord avoir créé une "categories" pour lier avec le categoryId)
- `PUT /courses/:id` - Modifier un cours (authentification requise)
- `DELETE /courses/:id` - Supprimer un cours (authentification requise, admin uniquement)

#### Catégories (Categories)

- `GET /categories` - Récupérer toutes les catégories
- `GET /categories/:id` - Récupérer une catégorie avec ses cours
- `POST /categories` - Créer une catégorie (authentification requise, admin uniquement)

## Tests

Lancer les tests avec :

```bash
npm test
```

## Base de données

L'API utilise SQLite. La base de données est automatiquement créée/synchronisée au démarrage du serveur.

## Auteurs

Fait par Sonny YEM et François VITTECOQ
