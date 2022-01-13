//make a discord bot that can respond to direct messages
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const indexFile = require('./index.js');
var token = "OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.2QnWT_MPS0ri09GpkuQg_RP3J_Y";
var prefix = "!";

const { MessageEmbed } = require('discord.js');
const helpenbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setDescription('List of all commands, and syntax.')
    .addField('!help', 'Displays this message. Usage: !help')
    .addField('!addcr', 'Adds cr to a user. Usage: !addcr <user> <cr>')
    .addField('!rmcr', 'Removes cr from a user. Usage: !rmcr <user> <cr>')
    .addField('!getcr', 'Displays the cr of a user. Usage: !getcr <user>')
    .addField('!crlist', 'Displays the cr of all users. Usage: !crlist')
    .addField('!crset', 'Sets the cr of a user. Usage: !crset <user> <cr>');

const userNotExists = generateEmbed('A felhasználó nem létezik.', true);
const userExistsembed = generateEmbed("A felhasználó létezik.", false);
const userAddedEmbed = generateEmbed("Felhasználó hozzáadva.", false);
const userRemovedEmbed = generateEmbed("Felhasználó eltávolítva.", false);
const userandcrNotEnteredEmbed = generateEmbed("Kérlek add meg a felhasználó nevet és Községi Krajcár mennyiséget!", true);
const enterUsernameEmbed = generateEmbed('Kérlek addj meg egy felhasználó nevet!', false);
const userAlreadyExistsEmbed = generateEmbed('A felhasználó már létezik.', true);
const crSetEmbed = generateEmbed('Községi Krajcár Beállítva.', false);
const crNotEnteredEmbed = generateEmbed('Nem érvényes községi krajcár mennyiség!', true);
const crAddedEmbed = generateEmbed('Községi Krajcár hozzáadva.', false);
const crRemovedEmbed = generateEmbed("Községi Krajcár eltávolítva.", false);


function generateEmbed(_text, _error){
    if(_error){
        return new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription(_text);
    }
    else{
        return new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Success')
            .setDescription(_text);
    }
}

indexFile.addUser('test', 0);
//when the bot is ready send Logged in as {name} to the console
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//create a ping command
client.on('message', message => {
    if (message.content === '!ping' && message.channel.id === '928691523913138338') 
    {
        message.channel.send('pong');
    }
    
});

//create a purge command
/*client.on('message', message => {
    if (message.content === '!purge')
    {
        message.channel.bulkDelete(100);
    }
});
*/
//check if the message is !adduser and if true add a user with the index.js's function with arugments of the message
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; /*Ignore*/
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'adduser') {
        if(args.length < 2) {
            var result_ = null;
            var user = args[0];
            var cr = 0;
            result_ = indexFile.addUser(user, cr);

            if(!result_) {
                message.channel.send({embeds: {userAlreadyExistsEmbed}});
            }
            if(result_) {
                message.channel.send({embeds: [userAddedEmbed]});
            }
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.addUser(user, cr);

            if(!result_) {
                message.channel.send({embeds: {userAlreadyExistsEmbed}});
            }
            if(result_) {
                message.channel.send({embeds: [userAddedEmbed]});
            }
        }
    }
    //check if the message is !removeUser and if true remove a user with the index.js's function with arugments of the message
    if(command === 'rmuser') {
        if(args.length < 1) {
            message.channel.send({embeds: [enterUsernameEmbed]});
        } else {
            var result_ = null;
            var user = args[0];
            result_ = indexFile.removeUser(user);

            if(!result_) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send({ embeds: [userRemovedEmbed] });
            }
        }
    }
    //check if the message is !addcr and if true add cr to a user with the index.js's function with arugments of the message
    if(command === 'addcr') {
        if(args.length < 2) {
            message.channel.send({embers: [userandcrNotEnteredEmbed]});
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.addCr(user, cr);

            if(!result_ ) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send({embeds: [crAddedEmbed]});
            }
        }
    }
    //check if the message is !removecr and if true remove cr to a user with the index.js's function with arugments of the message
    if(command === 'rmcr') {
        if(args.length < 2) {
            message.channel.send({embers: [userandcrNotEnteredEmbed]});
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.removeCr(user, cr);

            if(!result_) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send({embeds: [crRemovedEmbed]});
            }
        }
    }
    //check if the message is !getcr and if true get cr to a user with the index.js's function with arugments of the message
    if(command === 'getcr') {
        if(args.length < 1) {
            message.channel.send({embeds: [enterUsernameEmbed]});
        } else {
            var result_ = null;
            var user = args[0];
            result_ = indexFile.getCr(user);

            if(result_ === false) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_ || result_ === 0) {
                message.channel.send('Községi Krajcár: ' + result_);
            }
        }
    }
    //check if the message is !checkUser and if true check if a user exists with the index.js's function with arugments of the message
    if(command === 'checkuser') {
        if(args.length < 1) {
            message.channel.send({embeds: [enterUsernameEmbed]});
        } else {
            var result_ = null;
            var user = args[0];
            result_ = indexFile.checkUser(user);

            if(!result_) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send({ embeds: [userExistsembed] });
            }
        }
    }
    //check if the message is !crlist and if true get cr to a user with the index.js's function with arugments of the message
    if(command === 'crlist') 
    {
        message.channel.send(indexFile.getCrAll());
    }
    //create help command
    if(command === 'help') 
    {
        message.channel.send({ embeds: [helpenbed] });
    }
    //check if the message is !setcr and if true set cr to a user with the index.js's function with arugments of the message
    if(command === 'setcr') {
        if(args[1] < 0){
            message.channel.send({embeds: [crNotEnteredEmbed]});
        }
        else if(args.length < 2) {
            message.channel.send({embers: [userandcrNotEnteredEmbed]});
        } 
        else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.setCr(user, cr);

            if(!result_) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send({embeds: [crSetEmbed]});
            }
        }
    }

});

client.login("OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.KNG8wGvooE7Hb90p6ZCmVP-KtjE");


const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const HTTP_PORT = process.env.PORT || 8089;

var usersRaw;
var users;
var connections = new Map();

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

const wss = new WebSocket.Server({ server });
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

server.listen(HTTP_PORT, ()=> console.log('Server listening on port ' + HTTP_PORT));

