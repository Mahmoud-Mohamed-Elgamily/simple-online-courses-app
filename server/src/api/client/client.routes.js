
const controller = require('./client.controller');
const express = require('express');
const authenticateJWT = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/courses/:offset/:limit/:category?/:search?', controller.courses);
router.get('/:userId/courses', controller.userCourses);
router.post('/enrollToCourse', authenticateJWT, controller.enrollToCourse);
router.post('/cancel', authenticateJWT, controller.cancel);
router.post('/finish', authenticateJWT, controller.finish);

module.exports = router;