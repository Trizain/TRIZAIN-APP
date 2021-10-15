'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    user: {type: Schema.ObjectId,ref: 'User'},
    name:String,
    description:String,
    code:String,
    date:{type: Date, default: Date.now()}
});

module.exports = mongoose.model('Team',TeamSchema);