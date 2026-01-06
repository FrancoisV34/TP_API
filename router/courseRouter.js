/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duration
 *         - price
 *         - instructor
 *       properties:
 *         title:
 *           type: string
 *           description: Titre du cours
 *         description:
 *           type: string
 *           description: Description du cours
 *         duration:
 *           type: integer
 *           description: Durée en minutes
 *         level:
 *           type: string
 *           enum: [débutant, intermédiaire, avancé]
 *           description: Niveau du cours
 *         price:
 *           type: number
 *           description: Prix du cours
 *         published:
 *           type: boolean
 *           description: Statut de publication
 *         instructor:
 *           type: string
 *           description: Nom de l'instructeur
 *         categoryId:
 *           type: integer
 *           description: ID de la catégorie
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
  getCourses,
  getCourse,
  getCoursesByLevelHandler,
  searchCoursesHandler,
  filterCoursesByPriceHandler,
  createCourseHandler,
  updateCourseHandler,
  deleteCourseHandler,
} = require('../controller/courseController');
const {
  createCourseValidation,
  updateCourseValidation,
  getCourseByIdValidation,
  getCoursesByLevelValidation,
  deleteCourseValidation,
} = require('../validators/courseValidator');

// Routes publiques
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer tous les cours publiés
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', getCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Récupérer un cours par son ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Cours non trouvé
 */

router.get('/:id', getCourseByIdValidation, getCourse);

/**
 * @swagger
 * /courses/level/{level}:
 *   get:
 *     summary: Récupérer les cours par niveau
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: level
 *         schema:
 *           type: string
 *           enum: [débutant, intermédiaire, avancé]
 *         required: true
 *         description: Niveau du cours
 *     responses:
 *       200:
 *         description: Liste des cours du niveau
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get(
  '/level/:level',
  getCoursesByLevelValidation,
  getCoursesByLevelHandler
);

/**
 * @swagger
 * /courses/search:
 *   get:
 *     summary: Rechercher des cours par mot-clé
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot-clé pour rechercher dans titre et description
 *     responses:
 *       200:
 *         description: Liste des cours correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/search', searchCoursesHandler);

/**
 * @swagger
 * /courses/filter:
 *   get:
 *     summary: Filtrer les cours par prix
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Prix minimum
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Prix maximum
 *     responses:
 *       200:
 *         description: Liste des cours filtrés prix mini/maxi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/filter', filterCoursesByPriceHandler);

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ Chose que je ne savais pas ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// Middleware d'authentification appliqué à partir d'ici
//router.use(authMiddleware);  ⚠️ À partir de cette ligne, TOUTES les routes nécessitent une auth

// Routes protégées (auth middleware will be added by colleague)

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Cours créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Données invalides ou incomplètes
 *       401:
 *         description: Non authentifié - Token manquant ou invalide
 *       403:
 *         description: Non autorisé - Rôle formateur requis
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createCourseValidation, createCourseHandler);
router.put('/:id', updateCourseValidation, updateCourseHandler);
router.delete('/:id', deleteCourseValidation, deleteCourseHandler);

module.exports = router;
