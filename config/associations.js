const Category = require('../model/Category');
const Course = require('../model/Course');
const { User } = require('../model/User');

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

User.hasMany(Course, {
    foreignKey: "userId" ,
    as: 'courses'
});

Course.belongsTo(User, {
    foreignKey: "userId",
    as: 'user'
});

module.exports = { Category, Course, User };
