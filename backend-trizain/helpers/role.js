'use strict'

exports.is_superadmin = function(team,member){
    if(team == member.team && member.role == 'superadmin'){
        return true;
    }else{
        return false;
    }
}