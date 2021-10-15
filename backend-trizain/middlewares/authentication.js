'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');

const secret = 'trizain_world_1234321';

exports.authentication = function(req,res,next){
    // Comprobar si llega la autorización
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NO existe la cabezera authorization'});
    }

    // Limpiar el token de comillas
    var token = req.headers.authorization.replace(/['"]+/g,'');

    //Decodificar token
    try{
        var payload = jwt.decode(token,secret);

        // Comprobar si el token ha expirado
        if(payload.exp <= moment().unix()){
            return res.status(404).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        return res.status(404).send({message: 'El token no es válido'});
    }
    
    // Adjuntar el usuario identificado a la request
    req.user = payload;


    // Pasar la accion
    next();
}