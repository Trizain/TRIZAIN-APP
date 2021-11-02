'use strict'

const mongoose = require('mongoose');
const ProjectSchema = require('./schemas/project.schema');
const Schema = mongoose.Schema;

const InvitationSchema = Schema({
    team: {type: Schema.ObjectId,ref:'Team',required:"{PATH} is required."},
    user: {type: Schema.ObjectId, ref: 'User'},
    email: String,
    projects: [ProjectSchema],
    permissions: {type:String,required:"{PATH} is required."},
    description: {type:String,required:"{PATH} is required."},
    status: {type:Number,required:"{PATH} is required."},
});

module.exports = mongoose.model('Invitation',InvitationSchema);