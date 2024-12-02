const express = require('express');
const { getPosts, createPost, likePost, deletePost } = require('../controllers/postsController');

const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/like/:id', likePost);
router.delete('/posts/:id', deletePost);

module.exports = router;