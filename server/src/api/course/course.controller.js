'use strict'
const Sequelize = require('sequelize');
const CourseModel = require('../../models/Course');

exports.allCourses = (req, res) => {
  console.log(req.params.name);
  CourseModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: req.params.limit,
    offset: req.params.offset,
    where: req.params.name != undefined ? {
      name: { [Sequelize.Op.like]: '%' + req.params.name + '%' }
    } : '',
  })
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.newCourse = (req, res) => {
  console.log(req);
  // if (req.user.role == "admin")
  //   CourseModel.create(req.body.newCourse)
  //     .then(course => {
  //       res.json(course);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(404).send(error);
  //     })
  // else
  //   res.status(401).send('login in with admin account first')
}