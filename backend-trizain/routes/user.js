'use strict'

const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authentication');

const route = express.Router();

route.get('/prueba',md_auth.authentication,UserController.prueba);
route.post('/save',UserController.save);
route.post('/login',UserController.login);
route.put('/update',md_auth.authentication,UserController.update);

module.exports = route;