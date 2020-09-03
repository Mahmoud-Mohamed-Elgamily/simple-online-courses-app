'use strict'

const UserModel = require('../../models/User');

exports.allUsers = (req, res) => {
  UserModel.findAll({
    order:[["createdAt", "DESC"]],
    limit: req.body.limit,
    offset: req.body.offset,
    where: {},
  })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.singleUser = (req, res) => {
  UserModel.update(
    { disabled: false },
    { where: { id: req.params.id } }
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
    UserModel.create(req.body)
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