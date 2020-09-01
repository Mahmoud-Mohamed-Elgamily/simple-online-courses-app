'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: Sequelize.UUIDV4,
      name: Sequelize.STRING(15),
      email: Sequelize.STRING(100),
      password_hash: Sequelize.STRING(255),
      password: {
        type: Sequelize.DataTypes.VIRTUAL,
        set: function (val) {
          this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
          this.setDataValue('password_hash', this.salt + val);
        },
        validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error("Please choose a longer password");
            }
          }
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
