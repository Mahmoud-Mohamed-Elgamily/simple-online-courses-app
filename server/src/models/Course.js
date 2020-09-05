const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

const Course = sequelize.define('Course', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: Sequelize.STRING(15),
  description: Sequelize.TEXT,
  points: Sequelize.INTEGER,
  image: Sequelize.BLOB('long'),
}, {
  tableName: 'courses'
})

Course.associate = (models) => {
  Course.belongsToMany(models.User, { through: "student" });
  Course.belongsToMany(Category, { through: "categories" });
}

module.exports = Course