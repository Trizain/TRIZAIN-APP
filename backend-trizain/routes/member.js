'use strict'

const express = require('express');
const MemberController = require('../controllers/member');
const md_auto = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');

const route = express.Router();

route.get('/prueba',md_auto.authentication,MemberController.prueba);
route.post('/create/:code',md_auto.authentication,MemberController.create);
route.get('/:id',md_auto.authentication,MemberController.getMember);
route.get('/i/:id',md_auto.authentication,MemberController.getMyMember);
route.post('/role/:id',[md_auto.authentication,md_member.admin],MemberController.setRole);

module.exports = route;
