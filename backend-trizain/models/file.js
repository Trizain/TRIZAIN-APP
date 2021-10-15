'use strict'

const mongoose = require('mongoose');
const CommentSchema = require('./comment');
const Schema = mongoose.Schema;

const FileSchema = Schema({
    project: {type: Schema.ObjectId,ref:'Project'},
    member: {type: Schema.ObjectId, ref: 'Member'},
    name: String,
    version: Number,
    size: String,
    date: {type: Date, default: null},
    tags: String,
    comments: [CommentSchema]
});

module.exports = mongoose.model('File',FileSchema);