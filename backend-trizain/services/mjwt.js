'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'trizain.2020.9876789';

exports.createToken = function(member){
    console.log(member);
    const payload = {
        sub:member._id,
        team:member.team,
        role:member.role
    }

    return jwt.encode(payload,secret);
}