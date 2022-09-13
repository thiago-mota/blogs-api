const express = require('express');
const { getAllPosts, getPost, deletePost,
searchPost, createPost } = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');
// const { validateFields } = require('../middlewares/postValidation');

const postRoute = express.Router();

postRoute.get('/search', tokenValidation, searchPost);
postRoute.post('/', tokenValidation, createPost);
postRoute.get('/', tokenValidation, getAllPosts);
postRoute.get('/:id', tokenValidation, getPost);
postRoute.delete('/:id', tokenValidation, deletePost);

module.exports = postRoute;
