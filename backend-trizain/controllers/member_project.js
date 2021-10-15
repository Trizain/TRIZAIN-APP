'use strict'

const MemberProject = require('../models/member_project');
const Member = require('../models/member');
const role = require('../helpers/role');
const Team = require('../models/team');

var controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'Controlador member project funcionando'});
    },
    create: function(req,res){
        const params = req.body;
        const teamId = req.params.id;

        Team.findById(req.member.team,(err,team)=>{
            if(role.is_superadmin(team,req.member)){
                Member.findById(params.member,(err,member)=>{
                    if(err) return res.status(500).send({message:'Error al comprobar el miembro'});
                    if(!member) return res.status(404).send({message:'No se encontro al miembro'});
    
                    if(member.team == req.member.team){
                        const member_project = new MemberProject();
                        member_project.project = params.project;
                        member_project.member = params.member;
                        member_project.project_role = params.project_role;
                        member_project.status = 'active';
                        member_project.save((err,mprojectSaved)=>{
                            if(err) return res.status(500).send({message:'Error al guardar el miembro en proyecto'});
                            if(!mprojectSaved) res.status(404).send({message:'No se puedo guardar el miembro en proyecto'});
    
                            return res.status(200).send({status:'success',member_project:mprojectSaved});
                        });
                    }else{
                        return res.status(404).send({message:'Error con el miembro a guardar'});
                    }
                });
            }else{
                return res.status(404).send({message:'Permisos denegados'});
            }
        });
    },
    disable: function(req,res){
        const mprojectId = req.params.id;

        Team.findById(req.member.team,(err,team)=>{
            if(role.is_superadmin(team,req.member)){
               MemberProject.findOne({_id:mprojectId}).populate('member').exec((err,mproject)=>{
                if(err) return res.status(500).send({message:'Error al buscar el miembro en proyecto'});
                if(!mproject) return res.status(404).send({message:'No se puedo buscar el miembro en proyecto'});

                if(mproject.member.team == req.member.team){
                    mproject.status = 'inactive';
                    mproject.save((err,mprojectSaved)=>{
                        if(err) return res.status(500).send({message:'Error al dehabilitar el miembro en proyecto'});
                        if(!mprojectSaved) res.status(404).send({message:'No se pudo dehabilitar el miembro en proyecto'});
    
                        return res.status(200).send({status:'success',member_project:mprojectSaved});
                    });
                }
               });
            }else{
                return res.status(404).send({message:'Permisos denegados'});
            }
        });

    }
    

}

module.exports = controller;