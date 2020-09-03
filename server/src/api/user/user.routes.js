
const controller = require('./user.controller');
const express = require('express');

const router = express.Router();

router.get('/allUsers', controller.allUsers);
router.get('/disable/:id', controller.singleUser);
router.post('/addUser', controller.saveUser);

module.exports = router;