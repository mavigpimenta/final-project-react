const express = require('express');
const CommentController = require('../controllers/CommentController');
const route = express.Router();
const authMiddleware = require('../controllers/AuthController');

route
    .post('/create', authMiddleware, CommentController.create)
    .patch('/edit', authMiddleware, CommentController.edit)
    .delete('/delete', authMiddleware, CommentController.delete)

module.exports = route;