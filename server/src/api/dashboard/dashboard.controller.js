'use strict'
const {db} = require('../../models');

exports.home = async (req, res) => {
  try {
    const usersCount = await db.User.count({ where: { role: 'user' } })
    const adminsCount = await db.User.count({ where: { role: 'admin' } })
    const categoriesCount = await db.Category.count()
    const coursesCount = await db.Course.count()

    res.status(200).json({ usersCount, adminsCount, categoriesCount, coursesCount });
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.courses = async (req, res) => {
  try {
    const latestCourses = await db.Course.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: 5,

    })
    res.status(200).json(latestCourses);
  } catch (error) {
    res.status(500).send(error);
  }
}