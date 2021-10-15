'use strict'

const express = require('express');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');
const AreaController = require('../controllers/area');
const route = express.Router();

route.get('/prueba',AreaController.prueba);
route.get('/:id',[md_member.admin,md_auth.authentication],AreaController.area);
route.get('/project/:id',[md_member.admin,md_auth.authentication],AreaController.areas);
route.get('/dir/:id',[md_member.admin,md_auth.authentication],AreaController.areasByDir);
route.post('/save/:id',[md_member.admin,md_auth.authentication],AreaController.save);

module.exports = route;