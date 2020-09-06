'use strict'
const Sequelize = require('sequelize');
const CourseModel = require('../../models/Course');
const categoriesModel = require('../../models/Category');
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

exports.allCourses = async (req, res) => {
  try {
    const courses = await CourseModel.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: req.params.limit,
      offset: req.params.offset,
      where: req.params.name != undefined ? {
        name: { [Sequelize.Op.like]: '%' + req.params.name + '%' }
      } : '',
    })
    const categories = await categoriesModel.findAll()

    res.status(200).json({ courses, categories });

  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

exports.newCourse = async (req, res) => {
  if (req.user.role == "admin") {
    const { file, body } = req;
    console.log(file);
    if (file.mimetype.startsWith('image/')) {
      try {
        const newCourse = await CourseModel.create({
          name: body.name,
          description: body.description,
          points: body.points,
          image: `/images/${file.filename}`,
        })
        // newCourse.setCategory(body.categories)
        console.log(newCourse);

        res.status(200).json(newCourse);
      } catch (error) {
        console.log(error);
        res.status(404).send(error);
      }
    }
    else
      res.status(401).send('wrong file type')
  }
  else
    res.status(401).send('login in with admin account first')
}

exports.update = async (req, res) => {
  console.log(req);
  if (req.user.role == "admin")
    try {
      req.file ? req.body.image = `/images/${req.file.filename}` : "";
      const course = await CourseModel.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      req.file ?
        res.status(200).json(`/images/${req.file.filename}`)
        :
        res.status(200).json(course);
    } catch (err) {
      res.status(404).send(err)
    }

  else
    res.status(401).send('login in with admin account first')
}

exports.delete = async (req, res) => {
  if (req.user.role == "admin")
    try {
      const course = await CourseModel.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(course)
    } catch (error) {
      res.status(404).send(error)
    }
  else
    res.status(401).send('login in with admin account first')
}
