const express = require('express');
const UserController = require('../controllers/UserController');
const route = express.Router();
const authMiddleware = require('../controllers/AuthController');

route
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .put('/update', authMiddleware, UserController.updatePassword)
    .get('/getUsers', authMiddleware, UserController.searchUsers)
    .delete('/delete/:id', authMiddleware, UserController.delete)

module.exports = route;