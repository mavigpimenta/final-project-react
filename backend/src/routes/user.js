const express = require('express');
const UserController = require('../controllers/UserController');
const route = express.Router();

route
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .post('/update', UserController.updatePassword)

module.exports = route;