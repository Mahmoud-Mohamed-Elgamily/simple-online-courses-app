
const controller = require('./user.controller');
const express = require('express');

const router = express.Router();

router.get('/allUsers/:offset/:limit/:name?', controller.allUsers);
router.post('/addUser', controller.saveUser);
router.post('/disable', controller.disableUsers);
router.post('/enable', controller.enableUsers);

module.exports = router;