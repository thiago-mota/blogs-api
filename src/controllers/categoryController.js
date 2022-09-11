const categoryService = require('../services/categoryService');
const { status } = require('../helpers/statusMessages');

const createCategory = async (request, response) => {
  try {
    const { name } = request.body;
    const newCategory = await categoryService.createCategory(name);

    return response
    .status(status.CREATED_201)
    .json(newCategory);
  } catch (error) {
    return response
    .status(status.BAD_REQUEST_400)
    .json({ message: error.message });
  }
};

module.exports = { createCategory };
