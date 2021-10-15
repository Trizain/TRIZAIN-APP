'use strict'

const express = require('express');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');
const FileSharedController = require('../controllers/file_shared');
const route = express.Router();

route.get('/prueba',FileSharedController.prueba);
route.post('/:projectId/:fileId',[md_auth.authentication,md_member.admin],FileSharedController.share);

module.exports = route;