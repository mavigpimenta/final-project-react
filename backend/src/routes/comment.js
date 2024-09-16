const express = require('express');
const CommentController = require('../controllers/CommentController');
const route = express.Router();

route
    .post('/create', CommentController.create)
    .patch('/edit', CommentController.edit)
    .delete('/delete', CommentController.delete)

module.exports = route;