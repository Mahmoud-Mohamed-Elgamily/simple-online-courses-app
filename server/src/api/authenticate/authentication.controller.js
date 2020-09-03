'use strict'
const bcrypt = require('bcrypt')
const accessTokenSecret = process.env.SECRET || 'T0p$3crE7';

const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');

exports.logIn = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ where: { email } })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        if (user.disabled)
          return res.send('This user is disabled please contact the admin');

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        res.json({ accessToken });
      } else {
        res.send('Username or password incorrect');
      }
    })
    .catch(err => res.status(500).send(err));

}

exports.signUp = (req, res) => {
  req.body.role = 'user';
  UserModel.create(req.body)
    .then(user => {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
      res.json({ accessToken, user });
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}