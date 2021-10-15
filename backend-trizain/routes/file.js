'use strict'

const express = require('express');
const md_auth = require('../middlewares/authentication');
const md_member = require('../middlewares/admin');
const multer = require('multer');
const FileController = require('../controllers/file');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/files/');
    },
    filename: function(req,file,cb){
        cb(null,'file'+Date.now()+file.originalname);
    }
});

const upload = multer({storage:storage});

const route = express.Router();

route.get('/prueba',FileController.prueba);
route.post('/upload/:id',[md_auth.authentication,md_member.admin,upload.single('file0')],FileController.upload);
route.post('/upgrade/:id',[md_auth.authentication,md_member.admin,upload.single('file0')],FileController.upgrade);
route.get('/download/:id',[md_auth.authentication,md_member.admin,upload.single('file0')],FileController.download);

module.exports = route;