const Category = require('../model/Category');
const Course = require('../model/Course');

// One-to-Many: Category has many Courses
Category.hasMany(Course, {
  foreignKey: 'categoryId',
  as: 'courses',
});

// Course belongs to Category
Course.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = { Category, Course };
