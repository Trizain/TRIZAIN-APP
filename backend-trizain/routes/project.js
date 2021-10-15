'use strict'

const express = require('express');
const ProjectController = require('../controllers/project');
const md_auth = require('../middlewares/authentication');
const md_admin = require('../middlewares/admin');
const route = express.Router();

route.get('/prueba',ProjectController.prueba);
route.post('/save/:id',[md_auth.authentication,md_admin.admin],ProjectController.create);
route.put('/update/:id',[md_auth.authentication,md_admin.admin],ProjectController.update);
route.get('/:id',[md_auth.authentication,md_admin.admin],ProjectController.getProject);
route.get('/team/:id',[md_auth.authentication,md_admin.admin],ProjectController.getProjects);

module.exports = route; 