
const controller = require('./authentication.controller');
const express = require('express');
const router = express.Router();

router.post('/logIn', controller.logIn);
router.post('/signUp', controller.signUp);

module.exports = router;