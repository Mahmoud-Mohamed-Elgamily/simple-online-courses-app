const Sequelize = require('sequelize')
const sequelize = require('../database/connection')
const bcrypt = require("bcrypt");

module.exports = sequelize.define('User', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  role: {
    type: Sequelize.ENUM,
    values: ['user', 'admin'],
    defaultValue:'user',
  },
  password: Sequelize.STRING(255),
  disabled:Sequelize.BOOLEAN,
  
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  },
  instanceMethods: {
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  },
  // timestamps: false,
  tableName: 'users'
})