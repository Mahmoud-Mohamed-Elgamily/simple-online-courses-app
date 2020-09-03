const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('Category', {
  id: Sequelize.UUIDV4,
  name: Sequelize.STRING(15),
}, {
  tableName: 'categories'
})