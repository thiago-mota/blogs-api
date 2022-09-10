// const { errors } = require('../helpers/errorMessages');
const { status } = require('../helpers/statusMessages');
const { createToken } = require('../helpers/createToken');
const userService = require('../services/userService');

const createNewUser = async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    const { id } = await userService.createUser(displayName, email, password, image);

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
  const getAll = await userService.getAllUsers();

  return response
  .status(status.OK_200)
  .json(getAll);
};

const findUser = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await userService.findUser(id);

    return response
    .status(status.OK_200)
    .json(result);
  } catch (error) {
    return response
    .status(status.NOT_FOUND_404)
    .json({ message: error.message });
  }
};

module.exports = { createNewUser, getAllUsers, findUser };