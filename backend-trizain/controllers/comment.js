'use strict'

const Comment = require('../models/comment');
const File = require('../models/file');
const MemberProject = require('../models/member_project');
const validator = require('validator');
 
var controller = {
    prueba:function(req,res){
        return res.status(200).send({message:'Controlador de comentarios funcionando'});
    },
    save:function(req,res){
        let fileId = req.params.id;

        File.findOne({_id:fileId}).populate('member').exec((err,file)=>{
            MemberProject.findOne({
                project: file.project,
                member:req.member.sub
            },(err,mproject)=>{
                if(err) return res.status(500).send({message:'Error al buscarte en el proyecto'});
                if(!mproject){ 
                    return res.status(404).send({message:'No existes en el proyecto'})
                }else{
                    if(req.body.content && !validator.isEmpty(req.body.content)){
                        let comment = {
                            member: req.member.sub,
                            content: req.body.content
                        };
                        file.comments.push(comment);
                        file.save((err,fileSaved)=>{
                            if(err) return res.status(500).send({message:'Error al actualizar el proyecto'});
                            if(!fileSaved) return res.status(404).send({message:'No se pudo guardar file'});

                            return res.status(200).send({status:'success',file:fileSaved});
                        });
                    }else{
                        res.status(404).send({status:'failed',message:'El comentario esta vacío'});
                    }
                }
            });
        });
    },
    update: function(req,res){
        let commentId = req.params.id;
        let content = req.body.content;
        if(req.body.content && !validator.isEmpty(req.body.content)){
            File.findOneAndUpdate({
                "comments._id":commentId
            },
            {
                "$set":{
                    "comments.$.content":content
                }
            },
            {new:true},
            (err,file)=>{
                if(err) return res.status(500).send({message:'Error al actualizar el comentario'});
                if(!file) return res.status(404).send({message:'No se pudo guardar el comentario'});

                return res.status(200).send({status:'success',file:file});
            }
            );
        }else{
            res.status(404).send({status:'failed',message:'El comentario esta vacío'});
        }
    }
}

module.exports = controller;