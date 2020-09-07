'use strict'
const bcrypt = require('bcrypt')
const accessTokenSecret = process.env.SECRET || 'T0p$3crE7';

const jwt = require('jsonwebtoken');
const { db } = require('../../models');


exports.logIn = (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({
    where: { email },
    include: {
      model: db.Course,
    }
  })
    .then((user) => {
      if (!user)
        return res.status(203).json({ code: 403, message: 'No such Email please register' });

      if (bcrypt.compareSync(password, user.password)) {
        if (user.disabled)
          return res.status(203).json({ code: 401, message: 'This user is disabled please contact the admin' });

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

        res.status(200).json({ user: {id:user.id, name: user.name, email: user.email, role: user.role, }, courses: user.Courses, accessToken });
      } else {
        return res.status(203).json({ code: 401, message: 'Username or password incorrect' });
      }
    })
    .catch(err => {
      res.status(500).json({ code: 500, message: 'Something went wrong with the server' })
    });

}

exports.signUp = (req, res) => {
  req.body.role = 'user';
  db.User.create(req.body)
    .then(user => {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
      res.json({ user: user, accessToken });
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}