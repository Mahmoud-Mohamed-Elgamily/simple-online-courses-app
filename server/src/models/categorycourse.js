'use strict';
const Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CategoryCourse.init({
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    courseId: DataTypes.UUID,
    categoryId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'CategoryCourse',
  });
  return CategoryCourse;
};