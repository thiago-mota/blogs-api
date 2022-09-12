const postService = require('../services/postService');
const { status } = require('../helpers/statusMessages');

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

const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    await postService.removePost(id);

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

module.exports = { getAllPosts, getPost, deletePost };
