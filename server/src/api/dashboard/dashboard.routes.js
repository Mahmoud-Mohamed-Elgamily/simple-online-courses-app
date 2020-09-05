
const controller = require('./dashboard.controller');
const express = require('express');

const router = express.Router();

router.get('/home', controller.home);
router.get('/courses', controller.courses);

module.exports = router;