'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    _id: String,
    team: {type: Schema.ObjectId,ref: 'Team'},
    name: String,
    description: String,
});

module.exports = ProjectSchema;