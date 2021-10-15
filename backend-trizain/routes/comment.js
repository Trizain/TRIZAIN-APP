'use strict'

const express = require('express');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');
const CommentController = require('../controllers/comment');
const route = express.Router();

route.get('/prueba',CommentController.prueba);
route.post('/save/:id',[md_auth.authentication,md_member.admin],CommentController.save);
route.put('/update/:id',[md_auth.authentication,md_member.admin],CommentController.update);

module.exports = route;