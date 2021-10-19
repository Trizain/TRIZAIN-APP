'use strict'

const File = require('../models/file');
const Project = require('../models/project');
const Area = require('../models/area');
const MemberProject = require('../models/member_project');
const FileShared = require('../models/file_shared');
const role = require('../helpers/role');
const fs = require('fs');
const project = require('../models/project');

const controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'File controller funcionando'});
    },
    upload: function(req,res){
        var filename = "No se envio ningún archivo";

        if(!req.file){
            return res.status(200).send({message:filename});
        }
        console.log(req.file.path);
        // Nombre y extension del archivo
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        filename = file_split[2];
        var file_ext = filename.split('\.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            const area_id = req.params.id;

            Area.findById(area_id,(err,area)=>{
                if(err) return res.status(500).send({message:'Error al buscar el area'});
                if(!area) return res.status(500).send({message:'NO existes el area'});

                MemberProject.findOne({member:req.member.sub, project: area.project},(err,mproject)=>{
                    if(err) return res.status(500).send({message:'Error al buscarte en el proyecto'});
                    if(role.is_superadmin(req.member.team,req.member) == false){
                        return res.status(500).send({message:'NO existes en este proyecto'});
                    } 
                    
                    var file = new File();
                    file.project = area.project;
                    file.member = req.member.sub;
                    file.name = filename;
                    file.version = 1;
                    file.size = req.file.size / 1000000;
                    file.date = Date.now();
                    file.tags = req.body.tags ? req.body.tags : null;
                    file.save((err,fileSaved)=>{
                        if(err) return res.status(500).send({message:'Error al guardar file'});
                        if(!fileSaved) return res.status(404).send({message:'No se pudo guardar file'});
    
                        area.files.push(fileSaved);
                        area.save((err,areaSaved)=>{
                            if(err) return res.status(500).send({message:'Error al guardar file'});
                            if(!areaSaved) return res.status(404).send({message:'No se pudo guardar file'});
                            return res.status(200).send({status:'success',area:areaSaved});
                        });
                    });
                   
                });
            });
        }else{
            fs.unlink(file_path,(err)=>{
                if(err) return res.status(500).send({status:'failed',message:'Error al borrar el archivo inválido.'})
                return res.status(404).send({status:'failed',message:'La extensión del archivo no es válida.'});
            });
        }
    },
    upgrade: function(req,res){
        let fileId = req.params.id;

        var filename = "No se envio ningún archivo";

        if(!req.file){
            return res.status(200).send({message:filename});
        }
        // Nombre y extension del archivo
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        filename = file_split[2];
        var file_ext = filename.split('\.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            File.findById(fileId,(err,file)=>{                
                MemberProject.findOne({member:req.member.sub, project: file.project},(err,mproject)=>{
                    if(err) return res.status(500).send({message:'Error al buscarte en el proyecto'});
                    if(!mproject) return res.status(500).send({message:'NO existes en este proyecto'});
                    
                    var new_file = new File();
                    new_file.project = file.project;
                    new_file.member = req.member.sub;
                    new_file.version = file.version + 1;
                    new_file.name = file.version + '_' + filename;
                    new_file.size = req.file.size / 1000000;
                    new_file.date = Date.now();
                    new_file.tags = file.tags;
                    console.log(new_file);
                    new_file.save((err,fileSaved)=>{
                        if(err){ 
                            fs.unlink(file_path,(err)=>{
                                if(err) return res.status(500).send({status:'failed',message:'Error al borrar el archivo inválido.'})
                                return res.status(404).send({status:'failed',message:'La extensión del archivo no es válida.'});
                            });
                            return res.status(500).send({message:'Error al guardar file'})
                        };
                        if(!fileSaved){
                            fs.unlink(file_path,(err)=>{
                                if(err) return res.status(500).send({status:'failed',message:'Error al borrar el archivo inválido.'})
                                return res.status(404).send({status:'failed',message:'La extensión del archivo no es válida.'});
                            }); 
                            return res.status(404).send({message:'No se pudo guardar file'});
                        }
                        return res.status(200).send({status:'success',file:fileSaved});
                    });
                });
            });
        }else{
            fs.unlink(file_path,(err)=>{
                if(err) return res.status(500).send({status:'failed',message:'Error al borrar el archivo inválido.'});
                return res.status(404).send({status:'failed',message:'La extensión del archivo no es válida.'});
            });
        }
    },
    download: function(req,res){
        let fileId = req.params.id;
        let member = req.member;
        let pase = false;

        File.findOne({_id:fileId}).populate('project').exec((err,file)=>{
            if(err) return res.status(500).send({status:'failed',message:'Error al buscar el archivo.'});
            if(!file) return res.status(404).send({status:'failed',message:'No existe el archivo indicado'});

            MemberProject.findOne({member:member.sub},(err,mproject)=>{
                if(err) return res.status(500).send({status:'failed',message:'Error al buscar el archivo.'});
                if((mproject && mproject.project == file.project) || role.is_superadmin(file.project.team,member)){
                    return res.download('uploads/files/'+file.name,file.name,function(err){
                        if(err){
                            console.log("Es un error!!");
                        }
                    });
                }else{
                    FileShared.findOne({project:mproject.project,file:file._id},(err,fileS)=>{
                        if(err) return res.status(500).send({status:'failed',message:'Error al buscar el archivo.'});
                        if(!fileS) res.status(404).send({status:'failed',message:'No tienes permisos'});

                        return res.download('uploads/files/'+file.name,file.name,function(err){
                            if(err){
                                console.log(err);
                            }
                        });

                    });
                }
            });
        });
        
    }
}

module.exports = controller;
