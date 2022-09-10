const { User } = require('../database/models');
const { errors } = require('../helpers/errorMessages');

const createUser = async (displayName, email, password, image) => {
  const findUserInformation = await User.findOne({ where: { email } });
  if (findUserInformation) throw Error(errors.USER_ALREADY_REGISTERED);

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = { createUser };