'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: "08e17ad0-ed9b-11ea-b6d4-e7cf1119ae5b",
      name: "admin",
      email: "a@a.com",
      password: "$2b$10$p77DzjH/1OtRQYF6IzhlfugkmpqQjb4wIuNzMjHgw5eASA6mXvGdm", // 123456
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
