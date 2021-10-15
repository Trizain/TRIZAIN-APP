'use strict'

const FileShared = require('../models/file_shared');
const File = require('../models/file');
const Team = require('../models/team');
const role = require('../helpers/role');

var controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'Controlador de prueba funcionando'});
    },
    share: function(req,res){
        let projectId = req.params.projectId;
        let fileId = req.params.fileId;
        let permissions = parseInt(req.body.permissions);

        File.findOne({_id:fileId}).populate('project').exec((err,file)=>{
            if(err) return res.status(500).send({message:'Error al buscar el archivo'});
            if(!file) return res.status(200).send({message:'No existe el archivo'});

            Team.findById(file.project.team,(err,team)=>{
                if(err) return res.status(200).send({message:'Error al procesar el pedido'});

                if(role.is_superadmin(team,req.member)){
                    let fileShared = new FileShared();
                    fileShared.project = projectId;
                    fileShared.file = file._id;
                    fileShared.permissions = permissions;

                    fileShared.save((err,fileS)=>{
                        if(err) return res.status(500).send({message:'Error al buscar el archivo'});
                        return res.status(200).send({file:fileS});
                    });
                }else{
                    return res.status(404).send({message:'No tienes permisos',team:team,member:req.member});
                }
            });   
        });
    }
}

module.exports = controller;