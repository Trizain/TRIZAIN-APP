'use strict'

const Invitation = require('../models/invitation');
const role = require('../helpers/role');

const controller = {
    prueba: function(req,res){
        return res.status(200).send({
            'message':'Mensaje de prueba funcionando'
        })
    },
    save:function(req,res){
        const params = req.body;
        const invitation = new Invitation();

        console.log(params.projects);
        if(role.is_superadmin(params.team,req.member)){
            invitation.team = params.team;
            invitation.projects = params.projects;
            invitation.user = params.user;
            invitation.permissions = params.permissions;
            invitation.status = params.status;
            invitation.description = params.description;
            if(params.user){
                invitation.user = params.user;
            }else if(params.email){
                invitation.email = params.email;
            }
            let errors = invitation.validateSync();
            if(errors){
                return res.status(400).send({
                    message: 'Error en la validación',
                    errors: errors.errors
                });
            }
            invitation.save((err,invitationSaved)=>{
                if (err) return res.status(400).send({
                    message: 'Error al buscar equipo',
                    errors: err
                });
                if (!invitationSaved) return res.status(404).send({ message: 'No se pudo crear la invitación' });


                return res.status(200).send({
                    status:'success',
                    invitation:invitationSaved
                });
            });
            
        }else{
            return res.status(400).send({
                status:'error',
                message: 'No tienes permisos'
            });
        }
    }


}

module.exports = controller;