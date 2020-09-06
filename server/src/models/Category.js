const Sequelize = require('sequelize')
const sequelize = require('../database/connection')
// const CourseModel = require('./Course')

const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: Sequelize.STRING(15),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  tableName: 'categories'
})

// Category.belongsToMany(CourseModel, { through: "CategoryCourse"  });

module.exports = Category