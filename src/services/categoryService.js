const { Category } = require('../database/models');
const { errors } = require('../helpers/errorMessages');

const createCategory = async (category) => {
  const newCategory = await Category.create({ name: category });

  if (!newCategory.name) throw Error(errors.NAME_IS_REQUIRED);
  return newCategory;
};

module.exports = { createCategory };
