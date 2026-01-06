const { body, param } = require('express-validator');

const createCategoryValidation = [
  body('name')
    .notEmpty()
    .withMessage('Le nom de la catégorie est obligatoire')
    .isLength({ min: 3, max: 255 })
    .withMessage('Le nom doit contenir au moins 3 caractères'),
  body('description')
    .notEmpty()
    .withMessage('La description de la catégorie est obligatoire')
    .isLength({ max: 500 })
    .withMessage('La description ne peut pas dépasser 500 caractères'),
];

const getCategoryByIdValidation = [
  param('id')
    .notEmpty()
    .isInt()
    .withMessage("L'identifiant de la catégorie doit être un entier"),
];

module.exports = {
  createCategoryValidation,
  getCategoryByIdValidation,
};
