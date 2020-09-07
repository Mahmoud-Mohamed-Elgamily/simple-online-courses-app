'use strict'
const Sequelize = require('sequelize');
const { db } = require('../../models');

exports.allCourses = async (req, res) => {
  try {
    const courses = await db.Course.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: req.params.limit,
      offset: req.params.offset,
      where: req.params.name != undefined ? {
        name: { [Sequelize.Op.like]: '%' + req.params.name + '%' }
      } : '',

      include: [
        {
          model: db.Category,
        },
        
      ]
    })
    const categories = await db.Category.findAll()

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
        const newCourse = await db.Course.create({
          name: body.name,
          description: body.description,
          points: body.points,
          image: `/images/${file.filename}`,
        })

        body.categories.length > 1 ? body.categories = body.categories.split(',') : '';
        newCourse.setCategories(body.categories)

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

  if (req.user.role == "admin")
    try {
      req.file ? req.body.image = `/images/${req.file.filename}` : "";
      const course = await db.Course.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      const updatedCourse = await db.Course.findByPk(req.params.id)
      if (req.body.categories ?? false) {
        req.body.categories.length > 1 ? req.body.categories = req.body.categories.split(',') : '';
        updatedCourse.setCategories(req.body.categories)
      }

      req.file ?
        res.status(200).json(`/images/${req.file.filename}`)
        :
        res.status(200).json(course);
    } catch (err) {
      console.log(err)
      res.status(404).send(err)
    }

  else
    res.status(401).send('login in with admin account first')
}

exports.delete = async (req, res) => {
  if (req.user.role == "admin")
    try {
      const course = await db.Course.destroy({
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
