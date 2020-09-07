'use strict'

const Sequelize = require('sequelize');
const { db } = require('../../models');

exports.courses = async (req, res) => {
  try {
    const courses = await db.Course.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: req.params.limit,
      offset: req.params.offset,
      include: req.params.category != 'none' ? {
        model: db.Category,
        where: { id: req.params.category }
      } : '',
      where: req.params.search != undefined ? {
        name: { [Sequelize.Op.like]: '%' + req.params.search + '%' }
      } : '',
    })
    const categories = await db.Category.findAll()

    res.status(200).json({ courses, categories });

  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

exports.userCourses = async (req, res) => {
  try {
    const courses = await db.Course.findAll({
      order: [["createdAt", "DESC"]],
      include:{
        model: db.User,
        where: { 'id': req.params.userId },
      }
    })

    res.status(200).json({ courses });

  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

exports.enrollToCourse = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.body.userId },
      include: {
        model: db.Course,
      }
    })
    console.log();
    let courses = [req.body.courseId]
    user.Courses.forEach(course => courses.push(course.id));

    user.setCourses(courses)
    res.status(200).send(courses);

  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
