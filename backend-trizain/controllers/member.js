'use strict'

const member = require('../models/member');
const Member = require('../models/member');
const Team = require('../models/team');
const mjwt = require('../services/mjwt');

var controller = {
    prueba: function (req, res) {
        return res.status(200).send({ message: 'Controlador funcionando' });
    },
    create: function (req, res) {
        const code = req.params.code;

        Team.findOne({ code: code }, (err, team) => {
            if (err) return res.status(500).send({ message: 'Error al buscar el equipo' });
            if (!team) return res.status(404).send({ message: 'No existe un equipo con ese código' });

            Member.findOne({ user: req.user.sub }, (err, memberFound) => {
                if (err) return res.status(500).send({ message: 'Error al buscar duplicidad' });
                if (memberFound) return res.status(404).send({ message: 'Ya existes en este equipo' });

                let member = new Member();
                member.user = req.user.sub;
                member.team = team._id,
                member.role = 'none';

                member.save((err, memberSaved) => {
                    if (err) return res.status(500).send({ message: 'Error al crear miembro' });
                    if (!memberSaved) return res.status(404).send({ message: 'No se pudo añadir el miembro al equipo' });

                    return res.status(200).send({ status: 'success', member: memberSaved });
                });
            });
        });
    },
    getMember: function (req, res) {
        const memberId = req.params.id;
        const token = req.headers.access_token;
        const member = req.member;

        Member.findOne({ _id: memberId }).populate(['user', 'team']).exec((err, member) => {
            if (err) return res.status(500).send({ message: 'Error al buscar' });
            if (!member) return res.status(404).send({ message: 'No se pudo encontrar' });

            return res.status(200).send({ status: 'success', member: member });
        });
    },
    getMyMember:function(req,res){
        const teamId = req.params.id;
        const userId = req.user.sub;
        Member.findOne({team:teamId,user:userId},(err,member)=>{
            return res.status(200).send({token:mjwt.createToken(member)});
        });
    },
    setRole: function (req, res) {
        const params = req.body;
        const member = req.member;
        const memberId = req.params.id;

        if (params.role && (params.role == 'superadmin' || params.role == 'admin' || params.role == 'user')) {
            Team.findOne({_id:params.team},(err,team)=>{
                if (err) return res.status(500).send({ message: 'Error al buscar equipo' });
                if (!team) return res.status(404).send({ message: 'No se pudo buscar equipo' });
                if((member.team._id == params.team && member.role == 'superadmin') || req.user.sub == team.user){
                    Member.findOneAndUpdate({_id:memberId},params,{new:true},(err,MemberUpdated)=>{
                        if (err) return res.status(500).send({ message: 'Error al actualizar el rol' });
                        if (!MemberUpdated) return res.status(404).send({ message: 'No se pudo actualizar el rol'});

                        return res.status(200).send({message:'Rol actualizado'});
                    });
                }else{
                    return res.status(404).send({message:'Permisos denegados'});
                }
            });
        } else {
            return res.status(404).send({ message: 'Error en los paramteros' });
        }
    },
}

module.exports = controller;