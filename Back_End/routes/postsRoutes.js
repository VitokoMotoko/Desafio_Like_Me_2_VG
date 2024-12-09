const express = require('express');
const { getPosts, createPost, likePost, deletePost } = require('../controllers/postsController');

const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/like/:id', likePost);  //Esto para le punto 1 ya lo habia creado la seman pasada
router.delete('/posts/:id', deletePost);  //Lo mismo.. tambien lo tenia listo de la semana pasada. ahora corresponde al punto 2 del desafio 2.

module.exports = router;