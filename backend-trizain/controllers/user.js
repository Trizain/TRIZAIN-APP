'use strict'

const validation = require('../validations/validation_user');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const User = require('../models/user');

var controller = {
    prueba: function(req,res){
        res.status(200).send({
            'message':'Hola mundo desde el controlador'
        });
    },
    save: function(req,res){
        const params = req.body;
        var user = new User();

        // Validar datos
        const errors = validation(params);

        if(!errors){
            user.full_name = params.full_name;
            user.username = params.username;
            user.email = params.email.toLowerCase();

            // Comprobar duplicidad
            User.findOne({email:user.email},(err,issetUser)=>{
                if(err) return res.status(500).send({message:'Error al comprobar duplicidad'});
                if(issetUser) return res.status(400).send({message:'El email ya esta registrado'});

                // Cifrar contraseña
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    user.password = hash;
    
                    user.save((err,userSaved)=>{
                        if(err) return res.status(500).send({message:'Error al guardar el usuario'});
                        if(!userSaved) return res.status(404).send({message:'No se ha podido guardar el usuario'});
    
                        return res.status(200).send({
                            user: userSaved
                        });
                    });
                });
            });
        }else{
            return res.status(404).send({
                'errors':errors
            });
        }
    },
    login: function(req,res){
        const params = req.body;
        const email = params.email.toLowerCase();
        const password = params.password;

        // Validar datos
        let validate_email = email && validator.isEmail(email) && !validator.isEmpty(email);
        let validate_password = password && !validator.isEmpty(password);

        if(validate_email && validate_password){
            User.findOne({email:email},(err,user)=>{
                if(err) return res.status(500).send({message:'Error al buscar el usuario'});
                if(!user) return res.status(404).send({message:'No se ha podido buscar el usuario'});

                // Comparar contraseñas
                bcrypt.compare(password,user.password,(err,check)=>{
                    if(check){

                        // Limpio los datos a enviar
                        user.password = undefined;

                        if(!validator.isEmpty(params.getToken)){
                            return res.status(200).send({token:jwt.createToken(user)});
                        }

                        return res.status(200).send({user});
                    }else{
                        return res.status(404).send({message:'La contraseña es incorrecta'});
                    }
                });
            });
        }else{
            return res.status(404).send({
                message:'Parametros inválidos'
            });
        }
    },
    update: function(req,res){
        const params = req.body;
        const errors = validation(params,true);

        if(!errors){
            User.findOne({email:params.email},(err,userCheck)=>{
                if(err) return res.status(500).send({message:'Error al actualizar el usuario'});
                if(userCheck){
                    if(userCheck.email == req.user.email) return res.status(200).send({message:'El email ya existe'});
                }
            });
            User.findOneAndUpdate({_id:req.user.sub},params,{new:true},(err,userUpdated)=>{
                if(err) return res.status(500).send({message:'Error al actualizar usuario'});
                if(!userUpdated) res.status(404).send({message:'No se ha podido actualizar al usaurio'});

                return res.status(200).send({status:'success',user:userUpdated});
            });
        }else{
            return res.status(404).send({errors:errors});
        }
    },
    all: function(req,res){
        User.find({}).exec((err,users)=>{
            if(err) return res.status(500).send({message:'Error al buscar usuarios'});
            if(!users) res.status(404).send({message:'No se ha buscar los usuarios'});

            return res.status(200).send({
                'status' : 'success',
                'users': users
            });
        });
    }
}

module.exports = controller;