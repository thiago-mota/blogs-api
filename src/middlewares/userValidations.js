const { errors } = require('../helpers/errorMessages');
const { status } = require('../helpers/statusMessages');

const validateDisplayName = (request, response, next) => {
  const { displayName } = request.body;

  if (displayName.length < 8) {
    return response
    .status(status.BAD_REQUEST_400)
    .json({ message: errors.INVALID_DISPLAYNAME_LENGTH });
  }
  next();
};

const validateEmail = (request, response, next) => {
  const { email } = request.body;

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // https://www.educba.com/email-validation-in-javascript/

  if (!emailRegex.test(email)) {
    return response
    .status(status.BAD_REQUEST_400)
    .json({ message: errors.INVALID_EMAIL });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;

  if (password.length < 6) {
    return response
      .status(status.BAD_REQUEST_400)
      .json({ message: errors.INVALID_PASSWORD_LENGTH });
  }
  next();
};

module.exports = { validateDisplayName, validateEmail, validatePassword };
