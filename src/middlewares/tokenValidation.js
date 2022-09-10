const { errors } = require('../helpers/errorMessages');
const { status } = require('../helpers/statusMessages'); 

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;

  try {
  if (!authorization) {
    return response
      .status(status.UNAUTHORIZED_401)
      .json(errors.TOKEN_NOT_FOUND);
  }
  next();
} catch (error) {
  return response
    .status(status.UNAUTHORIZED_401)
    .json(errors.INVALID_OR_EXPIRED_TOKEN);
}
};

module.exports = { tokenValidation };