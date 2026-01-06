const { body, param } = require('express-validator');

const createCourseValidation = [
  body('title')
    .notEmpty()
    .withMessage('Le titre est obligatoire')
    .isLength({ min: 3, max: 255 })
    .withMessage('TLe titre doit contenir entre 3 et 255 caractères'),
  body('description')
    .notEmpty()
    .withMessage('La description est obligatoire')
    .isLength({ min: 10 })
    .withMessage('La description doit contenir au moins 10 caractères'),
  body('duration')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('La durée doit être un entier positif (en minutes)'),
  body('level')
    .isIn(['débutant', 'intermédiaire', 'avancé'])
    .withMessage(
      'Le niveau de difficulté doit être débutant, intermédiaire, ou avancé'
    ),
  body('price')
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage('Le prix doit être un nombre positif (supérieur ou égal à 0)'),
  body('instructor')
    .notEmpty()
    .withMessage('Le nom du professeur est obligatoire'),
  body('categoryId')
    .isInt()
    .withMessage("L'identifiant de la catégorie doit être un entier"),
];

const updateCourseValidation = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage("l'identifiant du cours doit être un entier"),
  ...createCourseValidation,
];

const getCourseByIdValidation = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage("L'identifiant du cours doit être un entier"),
];

const getCoursesByLevelValidation = [
  param('level')
    .notEmpty()
    .isIn(['débutant', 'intermédiaire', 'avancé'])
    .withMessage(
      'Le niveau de difficulté doit être débutant, intermédiaire, ou avancé'
    ),
];

const deleteCourseValidation = [
  param('id').isInt().withMessage("L'identifiant du cours doit être un entier"),
];

module.exports = {
  createCourseValidation,
  updateCourseValidation,
  getCourseByIdValidation,
  getCoursesByLevelValidation,
  deleteCourseValidation,
};
