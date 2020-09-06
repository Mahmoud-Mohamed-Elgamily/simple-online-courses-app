
const controller = require('./category.controller');
const express = require('express');

const router = express.Router();

router.get('/allCategories/:offset/:limit/:name?', controller.allCategories);
router.put('/:id', controller.updateCategory);
router.post('/addCategory', controller.newCategory);
router.delete('/:id', controller.deleteCategory);


module.exports = router;