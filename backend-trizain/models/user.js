'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    full_name: String,
    username: String,
    email: String,
    password: String,
    sex: String,
    profession: String,
    image: String,
    date: {type: Date, default: null},
    role: String
});

UserSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.password;

    return obj;
}

module.exports = mongoose.model('User',UserSchema);