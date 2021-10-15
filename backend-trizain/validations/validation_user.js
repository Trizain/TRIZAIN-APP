'use strict'

const validator = require('validator');

function Validate(params,token = false){
    
    var params_valid = []; 
    var errors = [];
    
    //Valido los datos recibidos
    var validate_name = !params.full_name || validator.isEmpty(params.full_name.trim()) ? 'El campo de nombre esta vacío' : null;
    var validate_username = !params.username || validator.isEmpty(params.username.trim()) ? 'El campo de username esta vacio' : null;
    var validate_email = !params.email || validator.isEmpty(params.email.trim()) || !validator.isEmail(params.email) ? 'El email no es válido' : null;

    if(!token){
        var validate_password = !token && !params.password || validator.isEmpty(params.password.trim()) ? 'El campo de contraseña esta vacío' : null;
    }
    
    // Junto todas las validaciónes para capturar los errores
    params_valid.push(validate_name,validate_username,validate_password,validate_email);

    //Capturo los errores
    params_valid.forEach(error =>{
        if(error != null) errors.push(error);  
    });

    // Devuelvo el resultado, false si no se han encontrado errores y en caso de haberse encontrado los devuelvo
    if(errors.length == 0){
        return false;
    }else{
        return errors;
    }

}

module.exports = Validate;