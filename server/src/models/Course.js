const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('Course', {
  id: Sequelize.UUIDV4,
  name: Sequelize.STRING(15),
  description: Sequelize.TEXT,
  points: Sequelize.INTEGER,
  image: Sequelize.BLOB,
}, {
  tableName: 'courses'
})