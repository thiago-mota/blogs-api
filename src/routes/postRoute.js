const express = require('express');
const { getAllPosts } = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = express.Router();

postRoute.post('/', tokenValidation);
postRoute.get('/', tokenValidation, getAllPosts);

module.exports = postRoute;
