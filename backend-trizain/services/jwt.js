'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'trizain_world_1234321';

exports.createToken = function(user){
    const payload = {
        sub: user._id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload,secret);
}