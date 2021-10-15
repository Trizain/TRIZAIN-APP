'use strict'

const express = require('express');
const MProjectController = require('../controllers/member_project');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');

const route = express.Router();

route.get('/prueba',MProjectController.prueba);
route.post('/save',[md_auth.authentication,md_member.admin],MProjectController.create);
route.get('/disable/:id',[md_auth.authentication,md_member.admin],MProjectController.disable);

module.exports = route;