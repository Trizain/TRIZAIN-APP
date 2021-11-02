'use strict'

const express = require('express');
const TeamController = require('../controllers/team');
const md_auth = require('../middlewares/authentication');

const route = express.Router();

route.get('/prueba',TeamController.prueba);
route.post('/save',md_auth.authentication,TeamController.create);
route.put('/update/:id',md_auth.authentication,TeamController.update);
route.delete('/delete/:id',md_auth.authentication,TeamController.delete);
route.get('/:id',md_auth.authentication,TeamController.getTeam);
route.get('/all/teams',md_auth.authentication,TeamController.getTeamsByUser);

module.exports = route;