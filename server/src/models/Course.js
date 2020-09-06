const Sequelize = require('sequelize')
const sequelize = require('../database/connection')
const UserModel = require('./User')
const CategoryModel = require('./Category')

const Course = sequelize.define('Course', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: Sequelize.STRING(15),
  description: Sequelize.TEXT,
  points: Sequelize.INTEGER,
  image: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  tableName: 'courses'
})

Course.belongsToMany(UserModel, { through: "CoursesUsers" });
Course.belongsToMany(CategoryModel, { through: "CategoryCourses" });


module.exports = Course