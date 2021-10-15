'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MProjectSchema = Schema({
    member: {type: Schema.ObjectId,ref:'Member'},
    project: {type: Schema.ObjectId,red:'Project'},
    project_role: String,
    status: String
});

module.exports = mongoose.model('Member_Project',MProjectSchema);