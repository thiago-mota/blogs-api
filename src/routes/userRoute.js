const express = require('express');
const { createNewUser } = require('../controllers/userController');
const { validateDisplayName, validateEmail,
validatePassword } = require('../middlewares/userValidations');

const userRoute = express.Router();

userRoute.post('/', validateDisplayName, validateEmail, validatePassword, createNewUser);

module.exports = userRoute;
