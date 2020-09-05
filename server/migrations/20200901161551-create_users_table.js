'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
      points: Sequelize.INTEGER,
      password: Sequelize.STRING(255),
      disabled: Sequelize.BOOLEAN,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
