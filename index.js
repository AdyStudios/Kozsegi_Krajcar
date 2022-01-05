var fs = require('fs');
const fileName = './users.json';
var users = require('./users.json');
var token = require('./token.json');

//create a function to check if the user is in the users.json file
function checkUser(user) {
    for (var i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            return true;
        }
    }
    return false;
}
//create a function to add cr to a specific user
function addCr(user, _cr) {
    for (var i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            users[i].cr += _cr;
            console.log(users[i].cr + ' is in total for ' + user);
        }
    }
    fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(users, null, 2));
        console.log('writing to ' + fileName);
      });
}
//create a function to remove cr from a specific user
function removeCr(user, _cr) {
    for (var i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            users[i].cr -= _cr;
            console.log(users[i].cr + ' is in total for ' + user);
        }
    }
    fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(users, null, 2));
        console.log('writing to ' + fileName);
      });
}
//create a function to add a new user to the users.json file
function addUser(user, _cr) {
    users.push({
        username: user,
        cr: _cr
    });
    fs.writeFile(fileName, JSON.stringify(users, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(users, null, 2));
        console.log('writing to ' + fileName);
      });
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

