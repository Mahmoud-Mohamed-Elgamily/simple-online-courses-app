'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CategoryCourses', {
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
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'id',
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CategoryCourses');
  }
};