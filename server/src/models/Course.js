const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {

  const Course = sequelize.define('Course', {
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    name: Sequelize.STRING(15),
    description: Sequelize.TEXT,
    points: Sequelize.INTEGER,
    image: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    tableName: 'courses'
  });

  Course.associate = function (models) {
    Course.belongsToMany(models.User, { through: "CoursesUsers", foreignKey: 'courseId' });
    Course.belongsToMany(models.Category, { through: "CategoryCourses", foreignKey: 'courseId' });
  };

  return Course;
}