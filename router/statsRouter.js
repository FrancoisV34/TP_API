const express = require('express');
const router = express.Router();
const {
  getCoursesStatsHandler,
  getUsersStatsHandler,
} = require('../controller/statsController');
const authMiddleware = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

/**
 * @swagger
 * /stats/courses:
 *   get:
 *     summary: Statistiques des cours par catégorie
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryId:
 *                     type: integer
 *                   categoryName:
 *                     type: string
 *                   courseCount:
 *                     type: integer
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé - Rôle admin requis
 */
router.get(
  '/courses',
  authMiddleware.authRequired,
  requireRole('admin'),
  getCoursesStatsHandler
);

/**
 * @swagger
 * /stats/users:
 *   get:
 *     summary: Statistiques des utilisateurs par rôle
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques du nombre d'utilisateurs par rôle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                   userCount:
 *                     type: integer
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé - Rôle admin requis
 */
router.get(
  '/users',
  authMiddleware.authRequired,
  requireRole('admin'),
  getUsersStatsHandler
);

module.exports = router;
