const { BlogPost, User, Category } = require('../database/models');

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

module.exports = { getAllPosts };
