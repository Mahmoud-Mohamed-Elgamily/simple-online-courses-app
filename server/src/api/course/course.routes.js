
const controller = require('./course.controller');
const express = require('express');
const router = express.Router();

const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({ storage: storage })

router.get('/allCourses/:offset/:limit/:name?', controller.allCourses);
router.put('/:id', upload.single('image'), controller.update);
router.post('/addCourse', upload.single('image'), controller.newCourse);
router.delete('/:id', controller.delete);

module.exports = router;