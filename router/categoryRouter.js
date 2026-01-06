/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de la catégorie
 *         name:
 *           type: string
 *           description: Nom de la catégorie
 *         description:
 *           type: string
 *           description: Description de la catégorie
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

//quand auth sera mis en place, ajouter le middleware d'authentification aux routes protégées
// Ajouter roles pour bonus (instructor / admin)
//un peu dans ce genre : router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteCourseValidation, deleteCourseHandler);

const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategoryHandler,
} = require('../controller/categoryController');
const {
  createCategoryValidation,
  getCategoryByIdValidation,
} = require('../validators/categoryValidator');

// Routes publiques

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie avec ses cours
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Détails de la catégorie avec ses cours
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
 */
router.get('/:id', getCategoryByIdValidation, getCategory);

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ Chose que je ne savais pas ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// Middleware d'authentification appliqué à partir d'ici
//router.use(authMiddleware);  ⚠️ À partir de cette ligne, TOUTES les routes nécessitent une auth
//meme chose que pour courseRouter.js

// Routes protégées (auth middleware will be added by colleague)
// Only admin can create categories

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Catégorie créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Non autorisé - Rôle administrateur requis
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createCategoryValidation, createCategoryHandler);

module.exports = router;
