'use strict'

const express = require('express');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');
const InvitationController = require('../controllers/invitation');


const route = express.Router();

route.get('/prueba',InvitationController.prueba);
route.post('/save',[md_auth.authentication,md_member.admin],InvitationController.save);

module.exports = route;