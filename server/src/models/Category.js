const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    name: Sequelize.STRING(15),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    tableName: 'categories'
  });

  Category.associate = function (models) {
    Category.belongsToMany(models.Course, { through: "CategoryCourse", foreignKey: 'categoryId' });
  };

  return Category;
}