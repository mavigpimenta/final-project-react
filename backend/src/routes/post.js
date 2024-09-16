const express = require('express');
const PostController = require('../controllers/PostController');
const route = express.Router();

route
    .post('/create', PostController.create)
    .patch('/edit', PostController.edit)
    .get('/getAll', PostController.getAll)
    .delete('/delete', PostController.delete)

module.exports = route;