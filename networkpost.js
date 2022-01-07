const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const HTTP_PORT = 8089;
const WEBSOCKET_PORT = 8090;

const wss = new WebSocket.Server({
    port: WEBSOCKET_PORT
});

var server = http.createServer(function(req, res) {
    const method = req.method.toLowerCase();
    if (method === 'get') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);

    }
    res.writeHead(404);
    res.end();
});

// Listen for file content changes in users.json
fs.watchFile(path.join(__dirname, 'users.json'), function(curr, prev) {
    console.log('File changed');
    wss.clients.forEach(function(client) {
        //close connnection with client
        client.close();
    });
});
console.log('Watching for file changes');

server.listen(HTTP_PORT);