const { errors } = require('../helpers/errorMessages');
const { status } = require('../helpers/statusMessages'); 
const { decodeToken } = require('../helpers/createToken');

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;

  try {
    if (!authorization) {
      return response
        .status(status.UNAUTHORIZED_401)
        .json({ message: errors.TOKEN_NOT_FOUND });
    }
    request.user = decodeToken(authorization);
    next();
  } catch (error) {
    return response
      .status(status.UNAUTHORIZED_401)
      .json({ message: errors.INVALID_OR_EXPIRED_TOKEN });
  }
};

module.exports = { tokenValidation };