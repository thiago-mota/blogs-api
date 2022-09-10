const express = require('express');
const { createNewUser, getAllUsers } = require('../controllers/userController');
const { validateDisplayName, validateEmail,
validatePassword } = require('../middlewares/userValidations');
const { tokenValidation } = require('../middlewares/tokenValidation');

const userRoute = express.Router();

userRoute.post('/', validateDisplayName, validateEmail, validatePassword, createNewUser);
userRoute.get('/', tokenValidation, getAllUsers);
userRoute.get('/:id', tokenValidation);

module.exports = userRoute;
