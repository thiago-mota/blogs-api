const express = require('express');
const { createNewUser, getAllUsers, findUser } = require('../controllers/userController');
const { validateDisplayName, validateEmail,
validatePassword } = require('../middlewares/userValidations');
const { tokenValidation } = require('../middlewares/tokenValidation');

const userRoute = express.Router();

userRoute.post('/', validateDisplayName, validateEmail, validatePassword, createNewUser);
userRoute.get('/', tokenValidation, getAllUsers);
userRoute.get('/:id', tokenValidation, findUser);

module.exports = userRoute;
