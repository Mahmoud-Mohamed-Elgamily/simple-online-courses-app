
const controller = require('./course.controller');
const express = require('express');
const uploadFile = require('../../middleware/imageUploader');

const router = express.Router();

router.get('/courses', controller.allCourses);
router.post('/addCourse',uploadFile.single('image'), controller.newCourse);


module.exports = router;