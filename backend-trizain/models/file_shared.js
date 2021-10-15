'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSharedSchema = Schema({
    project: {type: Schema.ObjectId,ref:'Project'},
    file: {type: Schema.ObjectId,ref:'File'},
    permissions: Number
});

module.exports = mongoose.model('FileShared',FileSharedSchema);