'use strict'
const Sequelize = require('sequelize');
const CategoryModel = require('../../models/Category');

exports.allCategories = (req, res) => {
  console.log(req.body.name);
  CategoryModel.findAndCountAll({
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

exports.newCategory = (req, res) => {
  if (req.user.role == "admin")
    CategoryModel.create({ name: req.body.name })
      .then(category => {
        res.status(200).json(category);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      })
  else
    res.status(401).send('login in with admin account first')
}

exports.deleteCategory = (req, res) => {
  if (req.user.role == "admin")
    CategoryModel.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
  else
    res.status(401).send('login in with admin account first')
}

exports.updateCategory = (req, res) => {
  if (req.user.role == "admin")
    CategoryModel.update({ name: req.body.name }, {
      where: {
        id: req.params.id
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
  else
    res.status(401).send('login in with admin account first')
}