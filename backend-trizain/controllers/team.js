'use strict'

const Team = require('../models/team');
const Member = require('../models/member');

var controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'El controlador esta funcionando'});
    },
    create: function(req,res){
        const params = req.body;

        // Valido los datos
        if(params.name && params.name.length > 0 && params.description && params.description.length > 0){
            const team = new Team();
            team.user = req.user.sub;
            team.name = params.name;
            team.description = params.description;
            var date = new Date();
            team.code = team.name.slice(-2) + date.getTime() + team.description.slice(-2);

            team.save((err,TeamSaved)=>{
                if(err) return res.status(500).send({message:'Error al crear el equipo'});
                if(!TeamSaved) return res.status(404).send({message:'No se ha podido crear el equipo'});

                
                let member = new Member();
                member.user = req.user.sub;
                member.team = team._id,
                member.role = 'superadmin';

                member.save((err, memberSaved) => {
                    if (err) return res.status(500).send({ message: 'Error al crear miembro' });
                    if (!memberSaved) return res.status(404).send({ message: 'No se pudo añadir el miembro al equipo' });

                    return res.status(200).send({status:'success',team:TeamSaved,member:memberSaved});
                });
            });
        }else{
            return res.status(404).send({message:'Datos vacíos'});
        }
    },
    update: function(req,res){
        const params = req.body;
        const teamId = req.params.id;

        if(params.name && params.name.length > 0 && params.description && params.description.length > 0){
            delete params.code;

            Team.findOne({_id:teamId},(err,team)=>{
                if(err) return res.status(500).send({message:'Error al buscar el equipo'});
                if(!team) return res.status(404).send({message:'No se ha encontrado el equipo'});

                if(team.user == req.user.sub){
                    team.name = params.name;
                    team.description = params.description;
                    team.save((err,TeamStored)=>{
                        if(err) return res.status(500).send({message:'Error al actualizar el equipo'});
                        if(!TeamStored) return res.status(404).send({message:'No se ha podido actualizar el equipo'});

                        return res.status(200).send({status:'success',TeamUpdated:TeamStored});
                    });
                }else{
                    return res.status(404).send({message:'Permiso denegado'});
                }
            });
        }else{
            return res.status(404).send({message:'Datos vacíos'});
        }
    },
    delete: function(req,res){
        const teamId = req.params.id;

        Team.findOne({_id:teamId},(err,team)=>{
            if(err) return res.status(500).send({message:'Error al buscar el equipo'});
            if(!team) return res.status(404).send({message:'No se ha encontrado el equipo'});

            if(team.user == req.user.sub){
                team.delete((err,TeamDeleted)=>{
                    if(err) return res.status(500).send({message:'Error al actualizar el equipo'});
                    if(!TeamDeleted) return res.status(404).send({message:'No se ha podido actualizar el equipo'});

                    return res.status(200).send({status:'success',TeamDeleted:TeamDeleted});
                });
            }else{
                return res.status(404).send({message:'Permiso denegado'});
            }
        });
    },
    getTeam(req,res){
        const teamId = req.params.id;

        Team.findById(teamId).populate('user').exec((err,team)=>{
            if(err) return res.status(500).send({message:'Error al buscar el equipo'});
            if(!team) return res.status(404).send({message:'No se ha encontrado al equipo'});

            return res.status(200).send({team:team});
        });
    },
    getTeamsByUser(req,res){
        const userId = req.user.sub;

        Team.find({user:userId}).sort([['date','descending']]).exec((err,teams)=>{
            if(err) return res.status(500).send({message:'Error al buscar los equipos'});
            if(!teams) return res.status(404).send({message:'No se han encontrado los equipos'});

            return res.status(200).send({teams:teams});
        });
    }
}

module.exports = controller;