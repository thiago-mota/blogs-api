const express = require('express');

const { validateLogin } = require('../middlewares/loginValidation');
const loginController = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/login', validateLogin, loginController);

module.exports = loginRoute;
