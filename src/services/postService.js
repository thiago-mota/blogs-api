const { BlogPost, User, Category } = require('../database/models');
const { errors } = require('../helpers/errorMessages');

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { model: Category, as: 'categories' }],
    });
  return allPosts;
};

const getPost = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { model: Category, as: 'categories' }],
    });

    if (!post) throw Error(errors.POST_DOES_NOT_EXIST);

    return post;
};

const findPost = async (id) => {
  const result = await BlogPost.findByPk(id, { attributes: { exclude: 'password' } });
  return result;
};

const removePost = async (id) => {
  const checkPost = await findPost(id);

  if (!checkPost) throw Error(errors.POST_DOES_NOT_EXIST);

  const removed = await BlogPost.destroy(
    { where: { id } },
  );

  return removed;
};

module.exports = { getAllPosts, getPost, removePost };
