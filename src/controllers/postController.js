const postService = require('../services/postService');
const { status } = require('../helpers/statusMessages');
// const createToken = require('../helpers/createToken');

const getAllPosts = async (request, response) => {
  try {
    const result = await postService.getAllPosts();
    return response
      .status(status.OK_200)
      .json(result);
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message });
  }
};

const getPost = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await postService.getPost(id);

    return response
      .status(status.OK_200)
      .json(result);
  } catch (error) {
    return response
      .status(404)
      .json({ message: error.message });
  }
};

const createPost = async (request, response) => {
  try {
    const { title, content, categoryIds } = request.body;
    const userId = request.user.data;
    // console.log('CONSOLE TOSCO PQ SIM', request.user);

    const newPost = await postService.createPost(title, content, categoryIds, userId);

    return response
    .status(status.CREATED_201)
    .json(newPost);
  } catch (error) {
    response
    .status(status.BAD_REQUEST_400)
    .json({ message: error.message });
  }
};

const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    // const { authorization } = request.headers;
  
    console.log('log do Token ----->', request.user.data);
    // const logged
    // const decode = createToken.decodeToken(authorization);
    const loggedUserId = request.user.data;

    // console.log('LOG DO DECODED ---->', loggedUserId);

    const post = await postService.getPost(id);
    const postUserId = post.userId;
    // await postService.findUserId(id);
    // await postService.findPostOwnerId(id);
    // console.log('CONSOLE DO FIND POST OWNER ID ---->', OPId);

    await postService.removePost(id, loggedUserId, postUserId);

    return response
      .status(204)
      .json();
  } catch (error) {
    console.log(error);
    return response
      .status(404)
      .json({ message: error.message });
  }
};

const searchPost = async (request, response) => {
  try {
    const { q } = request.query;

    const result = await postService.searchPost(q);
    console.log('LOG DO RESULT ---->> ', result);
    return response
    .status(status.OK_200)
    .json(result);
  } catch (error) {
    response
    .status(status.BAD_REQUEST_400)
    .json({ message: error.message });
  }
};

module.exports = { getAllPosts, getPost, deletePost, createPost, searchPost };
