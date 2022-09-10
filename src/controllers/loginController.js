const { validateUser } = require('../services/loginService');
const { status } = require('../helpers/statusMessages');
const createToken = require('../helpers/createToken');

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const { id } = await validateUser(email, password);

    return response
    .status(status.OK_200)
    .json({ token: createToken(id) });
  } catch (error) {
    return response
    .status(status.BAD_REQUEST_400)
    .json({ message: error.message });
  }
};

module.exports = login;
