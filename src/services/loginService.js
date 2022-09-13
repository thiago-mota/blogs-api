const { User } = require('../database/models');
const { errors } = require('../helpers/errorMessages');

const validateUser = async (email, password) => {
  const findUserInformation = await User.findOne({ where: { email, password } });
  if (!findUserInformation) throw Error(errors.INVALID_FIELDS);

  return findUserInformation;
  // const loginInformation = await User.create({ email, password });
  // return loginInformation;
};

module.exports = { validateUser };
