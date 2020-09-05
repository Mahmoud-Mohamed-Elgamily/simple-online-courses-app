const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: Sequelize.STRING(15),
}, {
  tableName: 'categories'
})

Category.associate = (models) => {
  Category.belongsToMany(models.Course, { through: "courses" });
}

module.exports = Category