const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { validateRegister, validateLogin } = require("../validators/authValidator");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification et gestion des utilisateurs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un compte utilisateur
 *     tags: [Auth]
 *     description: >
 *       Crée un nouvel utilisateur.
 *       Le rôle attribué par défaut est **user**.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: user@email.com
 *                 role:
 *                   type: string
 *                   example: user
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/register", validateRegister, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Se connecter
 *     tags: [Auth]
 *     description: >
 *       Authentifie un utilisateur et retourne un **JWT**.
 *       Ce token doit être utilisé dans l'en-tête :
 *       `Authorization: Bearer <token>`
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", validateLogin, authController.login);

module.exports = router;
