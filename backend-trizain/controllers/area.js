'use strict'

const Area = require('../models/area');
const Project = require('../models/project');
const role = require('../helpers/role');

var controller = {
    prueba: function(req,res){
        return res.status(200).send({message:'Controlador funcionando'});
    },
    save: function(req,res){
        const projectId = req.params.id;
        const params = req.body;

        Project.findOne({_id:projectId}).populate('team').exec((err,project)=>{
            if(err) return res.status(500).send({message:'Error al buscar el proyecto'});
            if(!project) return res.status(404).send({message:'No se puedo buscar el proyecto'});

            if(role.is_superadmin(project.team._id,req.member)){
                let area = new Area();
                area.project = projectId;
                area.name = params.name;
                area.dir = params.dir;
                
                area.save((err,areaSaved)=>{
                    if(err) return res.status(500).send({message:'Error al guardar el area'});
                    if(!areaSaved) return res.status(404).send({message:'No se puedo guardar el area'});

                    return res.status(200).send({status:'success',area:areaSaved});
                });
            }else{
                return res.status(404).send({message:'Permisos denegados'});
            }
        });
    },
    area: function(req,res){
        const areaId = req.params.id;

        Area.findOne({_id:areaId},(err,area)=>{
            if(err) return res.status(500).send({message:'Error al buscar el area'});
            if(!area) return res.status(404).send({message:'No se encontrar las areas'});

            return res.status(200).send({status:'success',area:area})
        });
    },
    areas: function(req,res){
        const projectId = req.params.id;

        Area.find({project:projectId},(err,areas)=>{
            if(err) return res.status(500).send({message:'Error al guardar el area'});
            if(!areas) return res.status(404).send({message:'No se encontrar las areas'});

            return res.status(200).send({status:'success',areas:areas})
        });
    },
    areasByDir: function(req,res){
        const areaId = req.params.id;

        Area.find({dir:areaId},(err,areas)=>{
            if(err) return res.status(500).send({message:'Error al guardar el area'});
            if(!areas) return res.status(404).send({message:'No se encontrar las areas'});

            return res.status(200).send({status:'success',areas:areas})
        });
    }
}

module.exports = controller