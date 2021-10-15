'use strict'

const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_trizain',{useUnifiedTopology:true , useNewUrlParser:true})
    .then(()=>{
        console.log("Se ha conectado correctamente a la base de datos");
        app.listen(3800,()=>{
            console.log('Conectado correctamente al servidor');
        });
    })
    .catch(err => {
        console.log("Error al conectarse al servidor");
    });