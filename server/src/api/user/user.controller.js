'use strict'
const Sequelize = require('sequelize');
const UserModel = require('../../models/User');

exports.allUsers = (req, res) => {
  console.log(req.params.name);
  UserModel.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: req.params.limit,
    offset: req.params.offset,
    where: req.params.name != undefined ? {
      name: {
        [Sequelize.Op.like]: '%' + req.params.name + '%'
      }
    } : '',
  })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.enableUsers = (req, res) => {
  UserModel.update(
    { disabled: false },
    {
      where: {
        id: { [Sequelize.Op.in]: req.body.ids }
      }
    }
  )
    .then(function (rowsUpdated) {
      res.json(rowsUpdated)
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.saveUser = (req, res) => {
  if (req.user.role == "admin")
    UserModel.create(req.body.newUser)
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      })
  else
    res.status(401).send('login in with admin account first')
}

exports.disableUsers = (req, res) => {
  if (req.user.role == "admin")
    UserModel.update(
      { disabled: true },
      {
        where: {
          id: { [Sequelize.Op.in]: req.body.ids }
        }
      }
    )
      .then(function (rowsUpdated) {
        res.json(rowsUpdated)
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      })
  else
    res.status(401).send('login in with admin account first')
}