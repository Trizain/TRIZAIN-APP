'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = Schema({
    user: {type: Schema.ObjectId,ref: 'User'},
    team: {type: Schema.ObjectId,ref: 'Team'},
    role: String
});

module.exports = mongoose.model('Member',MemberSchema);