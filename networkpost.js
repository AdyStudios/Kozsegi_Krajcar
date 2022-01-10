const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const HTTP_PORT = process.env.PORT;
console.log(HTTP_PORT);
const WEBSOCKET_PORT = 8090;

var usersRaw;
var users;
var connections = new Map();

const wss = new WebSocket.Server({
    port: WEBSOCKET_PORT
});
// when new client connects
wss.on('connection', function connection(client) {
    client.on('message', function incoming(message) {
        var data = JSON.parse(message);
        if (data.type == 'login') {
            if (connections.has(client)) {
                return;
            }
            connections.set(client, data.user);
        }
    });
    client.on('close', function close() {
        connections.delete(client);
    });
});

var server = http.createServer(function(req, res) {
    const method = req.method.toLowerCase();
    if (method === 'get') {
        console.log('GET request received');
        if (req.url.startsWith('/view')) {
            //fetch users
            usersRaw = fs.readFileSync('./users.json');
            users = JSON.parse(usersRaw);

            //get user from url
            var user = req.url.split('?')[1];

            //get user's cr
            var cr = 0;
            var success = false;
            for (var i = 0; i < users.length; i++) {
                if (user === users[i].username) {
                    cr = users[i].cr;
                    success = true;
                }
            }

            //send response if successful
            if (success) 
            {
                res.writeHead(200, {'Content-Type': 'text/html'});
                var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
                html = html.replace('%%%Name%%%', user);
                html = html.replace('%%%Name%%%', user);
                html = html.replace('%%%Value%%%', cr);
                res.end(html);
                return;
            }

        } else if (req.url === ('/')) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/chooser.html').pipe(res);
            return;
        } else if (req.url === ('/favicon.ico')) {
            fs.createReadStream(__dirname + '/images/favicon.ico').pipe(res);
        }

        //send error if unsuccessful
        res.writeHead(404, {'Content-Type': 'text/html'});
        var html = fs.readFileSync(__dirname + '/404.html', 'utf8');
        res.end(html);
    }

    res.writeHead(404);
    res.end();
});

// Listen for file content changes in users.json
fs.watchFile(path.join(__dirname, 'users.json'), function(curr, prev) {
    console.log('File changed');

    //fetch users
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);

    wss.clients.forEach(function(client) {
        //get user from connections
        var user = connections.get(client);
        console.log(user);
        console.log(connections.has(client));

        //get user's cr
        var cr = 0;
        var success = false; 
        for (var i = 0; i < users.length; i++) {
            if (user === users[i].username) {
                cr = users[i].cr;
                success = true;
            }
        }

        if (success) {
            client.send(JSON.stringify({
                type: 'update',
                value: cr
            }));
        } else {
            client.send(JSON.stringify({
                type: 'error',
                message: "A felhasználó törölve lett."
            }));
            client.close();
        }
    });
});

console.log('Watching for file changes');

server.listen(HTTP_PORT);
