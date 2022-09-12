const express = require('express');
const { getAllPosts, getPost, deletePost } = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = express.Router();

postRoute.post('/', tokenValidation);
postRoute.get('/', tokenValidation, getAllPosts);
postRoute.get('/:id', tokenValidation, getPost);
postRoute.delete('/:id', tokenValidation, deletePost);
postRoute.get('/search', tokenValidation);

module.exports = postRoute;
