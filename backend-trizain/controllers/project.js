'use strict'

const Project = require('../models/project');
const Team = require('../models/team');
const role = require('../helpers/role');

const controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'Controlador project funcionando'});
    },
    create:function(req,res){
        const params = req.body;
        const name = params.name && params.name.length != 'undefined' ? params.name : null;
        const description = params.description && params.description != 'undefined' > 0 ? params.description : null; 
        const teamId = req.params.id;

        if(name && description){
            Team.findById(teamId,(err,team)=>{
                if (err) return res.status(500).send({ message: 'Error al buscar equipo' });
                if (!team) return res.status(404).send({ message: 'No se pudo encontrar al equipo' });
                
                if (role.is_superadmin(team._id,req.member)){
                    let project = new Project();
                    project.name = name;
                    project.description = description;
                    project.team = team._id;
                    project.save((err,projectSaved)=>{
                        if (err) return res.status(500).send({ message: 'Error al guardar el proyecto' });
                        if (!team) return res.status(404).send({ message: 'No se pudo guardar el proyecto' });

                        return res.status(200).send({status:'success',project:projectSaved});
                    });
                }else{
                    return res.status(404).send({message:'Permisos denegados'})
                }
            });
        }
    },
    update: function(req,res){
        const params = req.body;
        const projectId = req.params.id;

        if(params.name && params.name != 'undefined' && params.description && params.description != 'undefined'){
            Team.findById(req.member.team,(err,team)=>{
                if (err) return res.status(500).send({ message: 'Error al buscar equipo' });
                if (!team) return res.status(404).send({ message: 'No se pudo encontrar al equipo' });

                if(role.is_superadmin(team,req.member)){
                    Project.findByIdAndUpdate(projectId,params,{new:true},(err,projectUpdated)=>{
                        if (err) return res.status(500).send({ message: 'Error al guardar el proyecto' });
                        if (!projectUpdated) return res.status(404).send({ message: 'No se pudo actualizar el proyecto' });

                        return res.status(200).send({status:'success',project:projectUpdated});
                    });
                }else{
                    return res.status(404).send({message:'Permisos denegados'})
                }
            });
        }
    },
    getProject: function(req,res){
        const projectId = req.params.id;

        Project.findOne({_id:projectId}).populate('team').exec((err,project)=>{
            if (err) return res.status(500).send({ message: 'Error al buscar el proyecto' });
            if (!project) return res.status(404).send({ message: 'No se pudo buscar el proyecto' });

           
            if(project.team._id == req.member.team){
                return res.status(200).send({status:'success',project:project});
            }else{
                return res.status(404).send({message:'Error en la ruta'});
            }
        });
    },
    getProjects: function(req,res){
        const teamId = req.params.id;

        Project.find({team:teamId},(err,projects)=>{
            if (err) return res.status(500).send({ message: 'Error al buscar el proyecto' });
            if (!projects) return res.status(404).send({ message: 'No se pudo buscar el proyecto' });

            if(teamId == req.member.team){
                return res.status(200).send({status:'success',projects:projects});
            }else{
                return res.status(404).send({message:'Error en la ruta'});
            }
        });
    }
}

module.exports = controller;