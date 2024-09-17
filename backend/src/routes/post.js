const express = require('express');
const PostController = require('../controllers/PostController');
const route = express.Router();
const authMiddleware = require('../controllers/AuthController');

route
    .post('/create', authMiddleware, PostController.create)
    .patch('/edit/:id', authMiddleware, PostController.edit)
    .get('/getAll', PostController.getAll)
    .get('/getTitle', PostController.getByTitle)
    .delete('/delete', authMiddleware, PostController.delete)

module.exports = route;