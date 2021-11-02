'use strict'

const express = require('express');
var bodyParser = require('body-parser');
const app = express();

// cargar rutas
const user_routes = require('./routes/user');
const team_routes = require('./routes/team');
const member_routes = require('./routes/member');
const project_routes = require('./routes/project');
const file_routes = require('./routes/file');
const mprojec_routes = require('./routes/member_project');
const comment_route = require('./routes/comment');
const fileShared_route = require('./routes/file_shared');
const area_routes = require('./routes/area');
const invitation_routes = require('./routes/invitation');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,member_token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/user',user_routes);
app.use('/team',team_routes);
app.use('/member',member_routes);
app.use('/project',project_routes);
app.use('/file',file_routes);
app.use('/mproject',mprojec_routes);
app.use('/comment',comment_route);
app.use('/shared',fileShared_route);
app.use('/area',area_routes);
app.use('/invitation',invitation_routes);

//exportar
module.exports = app;