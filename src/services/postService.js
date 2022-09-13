const { Op } = require('sequelize');
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

    console.log('CONSOLE DO POST ----->', post);
    if (!post) throw Error(errors.POST_DOES_NOT_EXIST);

    return post;
};

const createPost = async (title, content, categoryIds, userId) => {
  const newPost = await BlogPost.create({ title, content, categoryIds, userId });
  console.log('CONSOLE NEW POST ----->', newPost);
  return newPost;
};

// const findUserId = async (id) => {
//   const post = await getPost(id);
//   const uId = post.userId;
//   // console.log('CONSOLE DO USERID ---->', uId);

//   return uId;
// };

// const findPostOwnerId = async (id) => {
//   const post = await getPost(id);
//   const OPId = post;
//   console.log('CONSOLE DO OPID ==---->>>>', OPId);
//   const OP = await User.findByPk(OPId);
//   // console.log('LOG DO OP!!! ---->>', OP.id);
//   return OP.id;
// };

const removePost = async (id, loggedUserId, postUserId) => {
    // const post = await getPost(id);
    // const postUserId = post.userId;

    // console.log('log post user id ====>>', postUserId);
  
    // const userId = findUserId(id);
    // const OPId = findPostOwnerId(id);
  
    console.log('POST USER ID', postUserId, 'LOGGED USER ID', loggedUserId);
    if (postUserId !== loggedUserId) throw Error(errors.UNAUTHORIZED_USER);

    const removed = await BlogPost.destroy(
      { where: { id } },
    );
    return removed;
  };

  const searchPost = async (q) => {
    const result = await BlogPost.findAll({ where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ] },
  });

    return result;
  };

  // https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize

module.exports = { getAllPosts, getPost, removePost, createPost, searchPost };
