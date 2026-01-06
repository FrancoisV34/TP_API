const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  USER: "user",
});

const User = sequelize.define("User", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [3, 50] },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    passwordHash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    role: {
        type: DataTypes.ENUM(...Object.values(USER_ROLES)),
        allowNull: false,
        defaultValue: USER_ROLES.USER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
},
{
    timestamps: true,
}
);

module.exports = {
    User, 
    USER_ROLES,
};

