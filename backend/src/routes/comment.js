const express = require('express');
const CommentController = require('../controllers/CommentController');
const route = express.Router();
const authMiddleware = require('../controllers/AuthController');

route
    .post('/create', authMiddleware, CommentController.create)
    .patch('/edit/:id', authMiddleware, CommentController.edit)
    .delete('/delete/:id', authMiddleware, CommentController.delete)

module.exports = route;