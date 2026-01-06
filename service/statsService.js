const { sequelize, QueryTypes } = require('sequelize');
const Course = require('../model/Course');
const Category = require('../model/Category');
const { User } = require('../model/User');

//stats des cours par catégorie (admin uniquement)
const getCoursesStats = async () => {
  try {
    const stats = await Course.findAll({
      attributes: [
        'categoryId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'courseCount'],
      ],
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
      group: ['categoryId', 'category.id', 'category.name'],
      raw: true,
    });

    return stats.map((stat) => ({
      categoryId: stat.categoryId,
      categoryName: stat['category.name'],
      courseCount: stat.courseCount,
    }));
  } catch (error) {
    throw new Error(`Error retrieving courses stats: ${error.message}`);
  }
};

//stats des utilisateurs par rôle (admin uniquement)
const getUsersStats = async () => {
  try {
    const stats = await User.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('id')), 'userCount'],
      ],
      group: ['role'],
      raw: true,
    });

    return stats.map((stat) => ({
      role: stat.role,
      userCount: stat.userCount,
    }));
  } catch (error) {
    throw new Error(`Error retrieving users stats: ${error.message}`);
  }
};

module.exports = {
  getCoursesStats,
  getUsersStats,
};
