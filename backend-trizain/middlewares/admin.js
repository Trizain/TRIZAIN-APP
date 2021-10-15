'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "trizain.2020.9876789";

exports.admin = function(req,res,next){
    
    if(!req.headers.member_token){
        return res.status(404).send({message:'No existe la cabecera member'});
    }
    

    var token = req.headers.member_token.replace(/['"]+/g,'');

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
    req.member = payload;
    // Pasar la accion
    next();
} 