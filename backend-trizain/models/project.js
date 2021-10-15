'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    team: {type: Schema.ObjectId,ref: 'Team'},
    name: String,
    description: String,
});

module.exports = mongoose.model('Project',ProjectSchema);