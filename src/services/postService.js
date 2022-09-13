const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../database/models');
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

    // console.log('CONSOLE DO POST ----->', post);
    if (!post) throw Error(errors.POST_DOES_NOT_EXIST);

    return post;
};

const createPost = async (title, content, categoryIds, userId) => {
  if (!title || !content || !categoryIds) throw Error(errors.MISSING_FIELDS);
  console.log('LOG DO USER ID---->>>', userId);

  // console.log('CONSOLE PARÂMETROS ----->', title, content, categoryIds, userId);
  const findCategory = await Category.findAll();
  // console.log('LOG FIND CATEGORY -----> ', findCategory);
  
  const checkCategories = findCategory
  .every((category) => categoryIds.includes(category.dataValues.id));
  // console.log('LOG ALL CATEGORIES ---->', checkCategories);

  if (!checkCategories) throw Error(errors.CATEGORY_IDS_NOT_FOUND);
  const newPost = await BlogPost.create({ title, content, userId });
  const postId = newPost.dataValues.id;
  
  await Promise.all(
    categoryIds
    .map((categoryId) => PostCategory
    .create({ postId, categoryId })),
  );
  // console.log('LOG DO MAP DAS CATEGORIAS ----->', categories);

  // console.log('CONSOLE DO NEW POST ----->', newPost);
  console.log('CONSOLE DO ID DO NEW POST ----->', newPost.dataValues.id);
  return newPost;
};

// Precisa ter a estrutura abaixo: { postId, categoryId }
// const PostCategory = sequelize.define("PostCategory",
// {
//   postId: { <-----
//     primaryKey: true, 
//     foreignKey: true,
//     type: DataTypes.INTEGER, 
//   },
//   categoryId: { <----
//     primaryKey: true,
//     foreignKey: true,
//     type: DataTypes.INTEGER,
//   },
// },
// { timestamps: false },
// );

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
    const result = await BlogPost.findAll({ include:
    [
      { model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ],
    },
  });
    return result;
  };
  
  // https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize

module.exports = { getAllPosts, getPost, removePost, createPost, searchPost };
