'use strict'
const Sequelize = require('sequelize');
const UserModel = require('../../models/User');
const CategoryModel = require('../../models/Category');
const CourseModel = require('../../models/Course');

exports.home = async (req, res) => {
  try {
    const usersCount = await UserModel.count({ where: { role: 'user' } })
    const adminsCount = await UserModel.count({ where: { role: 'admin' } })
    const categoriesCount = await CategoryModel.count()
    const coursesCount = await CourseModel.count()

    res.status(200).json({ usersCount, adminsCount, categoriesCount, coursesCount });
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.courses = async (req, res) => {
  try {
    const latestCourses = CourseModel.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      offset: 0,
    })
    res.status(200).json(latestCourses);
  } catch (error) {
    res.status(500).send(error);
  }
}