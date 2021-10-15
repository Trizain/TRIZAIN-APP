'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    content: String,
    date: {type: Date, default: Date.now},
    member: {type: Schema.ObjectId, ref: 'Member'}
});

module.exports = CommentSchema;