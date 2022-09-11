const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { createCategory, findAllCategory } = require('../controllers/categoryController');

const categoryRoute = express.Router();

categoryRoute.post('/', tokenValidation, createCategory);
categoryRoute.get('/', tokenValidation, findAllCategory);

module.exports = categoryRoute;
