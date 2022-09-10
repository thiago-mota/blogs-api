const { status } = require('../helpers/statusMessages');
const { errors } = require('../helpers/errorMessages');

const validateLogin = (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    console.log('Testando se middleware é chamado');
    return response
    .status(status.BAD_REQUEST_400)
    .json({ message: errors.MISSING_FIELDS });
  }

  next();
};

module.exports = validateLogin;
