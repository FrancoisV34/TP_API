const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'courses.db',
  logging: false,
});

module.exports = sequelize;
