var fs = require('fs');
const { setUncaughtExceptionCaptureCallback } = require('process');
var workDir = './';
const fileName = './users.json';
var usersRaw = fs.readFileSync('./users.json');
var users = JSON.parse(usersRaw);

//create a function to check if the user is in the users.json file
function checkUser(user) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    for (var i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            return true;
        }
    }
    return false;
}
//create a function to add cr to a specific user
function addCr(user, _cr) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    if (!checkUser(user)) { return false; }
    else
    {
        for (var i = 0; i < users.length; i++) {
            if (user === users[i].username) {
                users[i].cr += parseInt(_cr, 10);
                console.log(users[i].cr + ' is in total for ' + user);
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            //console.log(JSON.stringify(users, null, 2));
            //console.log('writing to ' + fileName);
        });
        return true;
    }
}
//create a function to remove cr from a specific user
function removeCr(user, _cr) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    if (!checkUser(user)) { return false; }
    else
    {
        for (var i = 0; i < users.length; i++) {
            if (user === users[i].username) {
                users[i].cr -= _cr;
                console.log(users[i].cr + ' is in total for ' + user);
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) 
        {
            if (err) return console.log(err);
            //console.log(JSON.stringify(users, null, 2));
            //console.log('writing to ' + fileName);
        });
        return true;
    }
}
//create a function to add a new user to the users.json file
function addUser(user, _cr) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    if(checkUser(user)) { return false; }
    else
    {
        users.push
        (
            {
            username: user,
            cr: parseInt(_cr, 10)
            }
        );
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) 
        {
            if (err) return console.log(err);
            //console.log(JSON.stringify(users, null, 2));
            //console.log('writing to ' + fileName);
            users = require('./users.json');
        });
        return true;
    }
}

function removeUser(user) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    if (!checkUser(user)) { return false; }
    else {
        for (var i = 0; i < users.length; i++) {
            if (user === users[i].username) {
                users.splice(i, 1);
                console.log(user + ' has been removed from the users.json file');
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            //console.log(JSON.stringify(users, null, 2));
            //console.log('writing to ' + fileName);
            users = require('./users.json');
        });
        return true;
    }
}
//create a function to check if the token mathces
function checkToken(_token) {
    for (var i = 0; i < token.length; i++) {
        if (_token === token[i].token) {
            return true;
        }
    }
    return false;
}
d
function getCr(user) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    for (var i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            return users[i].cr;
        }
    }
    return false;
}
function getJson() {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    console.log("retunring users: " + usersRaw);
    return usersRaw;
}

function setCr(user, _cr) {
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    //check if the user exists
    if (!checkUser(user)) { return false; }
    else{
        for (var i = 0; i < users.length; i++) {
            if (user === users[i].username) {
                users[i].cr = parseInt(_cr, 10);
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            users = require('./users.json');
        });
        return true;
    }
}


module.exports = { checkUser, addCr, removeCr, addUser, checkToken, removeUser, getCr, getJson, setCr };
