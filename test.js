var fs = require('fs');

var usersRaw = fs.readFileSync('./users.json');
var users = JSON.parse(usersRaw);0

users[2].flag = "flag1";
console.log(users[2].flag);

fs.writeFile('./users.json', JSON.stringify(users, null, 2), function writeJSON(err) 
{
  if (err) return console.log(err);
  users = require('./users.json');
});