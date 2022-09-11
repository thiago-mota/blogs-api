const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { createCategory } = require('../controllers/categoryController');

const categoryRoute = express.Router();

categoryRoute.post('/', tokenValidation, createCategory);

module.exports = categoryRoute;
