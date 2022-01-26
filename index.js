var fs = require('fs');
const { setUncaughtExceptionCaptureCallback } = require('process');
var workDir = './';
const fileName = './users.json';
var usersRaw = fs.readFileSync('./users.json');
var users = JSON.parse(usersRaw);
var fs = require('fs');
const { isFloat32Array } = require('util/types');
var usersVerRaw = fs.readFileSync('./userversion.json');
var usersVer = JSON.parse(usersVerRaw);
const verfileName = './userversion.json';
//push the users.json file changes to the github repository

function pushChanges() {
    usersVerRaw = fs.readFileSync('./userversion.json');
    usersVer = JSON.parse(usersVerRaw);
    var exec = require('child_process').exec;
    exec('git add . && git status && git commit -m "users save update v' + usersVer.version + '" && git push -u origin main', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        usersVer.version += 1;
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        if(error === null) {
            fs.writeFile(verfileName, JSON.stringify(usersVer, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
        }
    });
}
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
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
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
            }
        }
        fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) 
        {
            if (err) return console.log(err);
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

//create a function to commit the changes of the users.json file
function saveUsers() {
    fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        if(err) return false;
        users = require('./users.json');
    });
    pushChanges();
    return true;
}

function getLeaderboards(topnum)
{
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);
    console.log(users);
    /*if(topnum > users.length)
    {
        return false;
    }*/
    var leaderboards = JSON.parse(usersRaw);
    console.log(leaderboards);
    leaderboards.sort(function (a,b){
        return b.cr - a.cr;
    });
    return leaderboards;
}


module.exports = { checkUser, addCr, removeCr, addUser, checkToken, removeUser, getCr, getJson, setCr, saveUsers, getLeaderboards };
