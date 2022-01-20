//make a discord bot that can respond to direct messages
const Discord = require('discord.js');
var fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const indexFile = require('./index.js');
const token = process.env.TOKEN;
var prefix = "!";
client.commands = new Discord.Collection();


const { MessageEmbed } = require('discord.js');
//update helpEmbed with the new commands
const helpenbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setDescription('List of all commands, and syntax.')
    .addField('!help', 'Megjeleneníti ezt a lapot. Syntax: !help')
    .addField('!addcr', 'Adott mennyiségű Községi Krajcárt ad egy adott felhasználóhoz. Syntax: !addcr <user> <cr>')
    .addField('!rmcr', 'Adott mennyiségű Községi Krajcárt távolít el egy adott felhasználótól. Syntax: !rmcr <user> <cr>')
    .addField('!getcr', 'Megjeleníti egy adott felhasnáló Községi Krajcár egyenlegét. Syntax: !getcr <user>')
    .addField('!crlist', 'Megjeleníti a ```users.json``` fájlt. Syntax: !crlist')
    .addField('!crset', 'Beállít egy adott mennyiségű Községi Krajcárt egy adott felhasználónak. Syntax: !crset <user> <cr>')
    .addField('!checkuser', 'Ellenőrzi, hogy létezik-e egy adott felhasználó. Syntax: !checkuser <user>')

const userNotExists = generateEmbed('A felhasználó nem létezik.', true);
const userExistsembed = generateEmbed("A felhasználó létezik.", false);
const userAddedEmbed = generateEmbed("Felhasználó hozzáadva.", false);
const userRemovedEmbed = generateEmbed("Felhasználó eltávolítva.", false);
const userandcrNotEnteredEmbed = generateEmbed('Kérlek add meg a felhasználó nevet és Községi Krajcár mennyiséget!', true);
const enterUsernameEmbed = generateEmbed('Kérlek addj meg egy felhasználó nevet!', true);
const userAlreadyExistsEmbed = generateEmbed('A felhasználó már létezik.', true);
const crSetEmbed = generateEmbed('Községi Krajcár Beállítva.', false);
const crNotEnteredEmbed = generateEmbed('Nem érvényes Községi Krajcár mennyiség!', true);
const crAddedEmbed = generateEmbed('Községi Krajcár hozzáadva.', false);
const crRemovedEmbed = generateEmbed("Községi Krajcár eltávolítva.", false);
const enterNumberEmbed = generateEmbed('Kérlek addj meg egy számot!', false);
const numberNotEntered = generateEmbed('Nem érvényes szám!', true);
const purgeEmbed = generateEmbed('Törlés sikeres!.', false);


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


//check if the message is !adduser and if true add a user with the index.js's function with arugments of the message
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; /*Ignore*/
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'adduser') {
        if(args.length < 1) {
            message.channel.send({embeds: [enterUsernameEmbed]});
        }
        else if(args.length < 2) {
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
        } 
        else if(args.length < 3) {
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
        var _js = indexFile.getJson();
        message.channel.send('```json\n' + _js + '\n```');
        _js = null;
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
    //create a purge command
    if(command === 'purge') {
        if(args.length < 1) {
            message.channel.send({embeds: [enterNumberEmbed]});
        } else {
            var result_ = null;
            var number = args[0];
            result_ = indexFile.purge(number);

            if(!result_) {
                message.channel.send({ embeds: [numberNotEntered] });
            }
            if(result_) {
                message.channel.send({embeds: [purgeEmbed]});
            }
        }
    }
});

client.login(token);
//     / | / / ____/_  __/ |     / / __ \/ __ \/ //_/
//    /  |/ / __/   / /  | | /| / / / / / /_/ / ,<   
//   / /|  / /___  / /   | |/ |/ / /_/ / _, _/ /| |  
//  /_/ |_/_____/ /_/    |__/|__/\____/_/ |_/_/ |_|  

const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const HTTP_PORT = process.env.PORT || 8089;

var usersRaw;
var users;
var connections = new Map();

var server = http.createServer(function(req, res) {
    const method = req.method.toLowerCase();
    if (method === 'get') {
        var url = decodeURI(req.url);
        if (url.startsWith('/view')) {
            //fetch users
            usersRaw = fs.readFileSync('./users.json');
            users = JSON.parse(usersRaw);

            //get user from url
            var user = url.split('?')[1];

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

        } else if (url === ('/')) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/chooser.html').pipe(res);
            return;
        } else if (url === ('/favicon.ico')) {
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
    // File changed, reload users

    //fetch users
    usersRaw = fs.readFileSync('./users.json');
    users = JSON.parse(usersRaw);

    wss.clients.forEach(function(client) {
        //get user from connections
        var user = connections.get(client);

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

