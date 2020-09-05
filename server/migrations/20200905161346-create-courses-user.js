'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CoursesUsers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

      courseId: {
        type: Sequelize.UUID,
        references: {
          model: 'courses',
          key: 'id',
        }
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CoursesUsers');
  }
};