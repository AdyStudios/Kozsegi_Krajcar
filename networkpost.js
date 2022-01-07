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
        console.log('GET request received');
        if (req.url.startsWith('/view')) {
            //fetch users
            var usersRaw = fs.readFileSync('./users.json');
            var users = JSON.parse(usersRaw);

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
                //TODO: animate cr value
                html = html.replace('%%%Value%%%', cr);
                res.end(html);
                return;
            }

        } else if (req.url === ('/')) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/chooser.html').pipe(res);
            return;
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
    wss.clients.forEach(function(client) {
        //close connnection with client
        client.close();
    });
});

console.log('Watching for file changes');

server.listen(HTTP_PORT);