// const { status } = require('../helpers/statusMessages');
const { errors } = require('../helpers/errorMessages');

const validateFields = async (request, response, next) => {
  const { title, content, categoryIds } = request.body;

  if (!title || !content) throw Error(errors.MISSING_FIELDS);
  if (!categoryIds) throw Error(errors.CATEGORY_IDS_NOT_FOUND);
  next();
};

module.exports = { validateFields };
