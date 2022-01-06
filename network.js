var test = "test";
//post the test variable to a server on port 3000
var http = require('http');
var fs = require('fs');
var fileName = './users.json';
var usersRaw = fs.readFileSync('./users.json');
var users = JSON.parse(usersRaw);
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(test);
});
server.listen(3000);
