'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = require('./file');

const AreaSchema = Schema({
    project: {type: Schema.ObjectId,ref: 'Project'},
    name: String,
    dir: String,
    files: []
});

module.exports = mongoose.model('Area',AreaSchema);