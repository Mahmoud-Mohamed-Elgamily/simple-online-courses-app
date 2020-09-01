const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports = sequelize.define('User', {

  id: Sequelize.UUIDV4,
  name: Sequelize.STRING(15),
  email: Sequelize.STRING(100),
  password_hash: Sequelize.DataTypes.STRING,
  password: {
    type: Sequelize.DataTypes.VIRTUAL,
    set: function (val) {
      this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('password_hash', this.salt + val);
    },
    validate: {
      isLongEnough: function (val) {
        if (val.length < 7) {
          throw new Error("Please choose a longer password")
        }
      }
    }
  }
})