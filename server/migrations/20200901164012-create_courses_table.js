'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1
      },
      name: Sequelize.STRING(15),
      description: Sequelize.TEXT,
      points: Sequelize.INTEGER,
      image: Sequelize.BLOB,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("courses");
  }
};
