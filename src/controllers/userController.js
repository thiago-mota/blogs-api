// const { errors } = require('../helpers/errorMessages');
const { status } = require('../helpers/statusMessages');
const { createToken } = require('../helpers/createToken');
const { createUser, getAllUsersService } = require('../services/userService');

const createNewUser = async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    const { id } = await createUser(displayName, email, password, image);

    return response
    .status(status.CREATED_201)
    .json({ token: createToken(id) });
  } catch (error) {
    return response
    .status(status.CONFLICT_409)
    .json({ message: error.message });
  }
};

const getAllUsers = async (request, response) => {
  const getAll = await getAllUsersService();

  return response
  .status(status.OK_200)
  .json(getAll);
};

module.exports = { createNewUser, getAllUsers };