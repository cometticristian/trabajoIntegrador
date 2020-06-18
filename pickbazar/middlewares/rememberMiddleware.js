const fs = require('fs');
const path = require('path');

const usersDB = path.join(__dirname, '../data/usersDB.json');
let users = JSON.parse(fs.readFileSync(usersDB, 'utf-8'));

function rememberMiddleware (req, res, next){

if (req.cookies.remember != undefined &&
    req.session.userFound == undefined){

        userFound = users.filter(function (user) {
			return user.email == req.cookies.remember
        });
        
        req.session.userFound = userFound;
    }

next()
}

module.exports = rememberMiddleware;