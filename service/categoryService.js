const Category = require('../model/Category');
const Course = require('../model/Course');

const getAllCategories = async () => {
  return await Category.findAll();
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id, {
      include: {
        model: Course,
        as: 'courses',
      },
    });
    if (!category) {
      throw new Error(`Category with ${id} not found`);
    }
    return category;
  } catch (error) {
    throw new Error(`Error retrieving category: ${error.message}`);
  }
};

const createCategory = async (data) => {
  try {
    return await Category.create(data);
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};
