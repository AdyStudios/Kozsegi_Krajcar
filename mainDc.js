//make a discord bot that can respond to direct messages
const Discord = require('discord.js');
var fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const indexFile = require('./index.js');
var prefix = "!";
let token = process.env.token || fs.readFileSync('./token.token', 'utf8');
//let token = fs.readFileSync('./token.token', 'utf8');
client.commands = new Discord.Collection();

//Language variables
//Hungarian variables
var helpTitle = "Segítség";
var helpDescription = "A parancsok listája.";
var helpAdduser = "Létrehoz egy új felhasználót. Systax: !adduser <username> <cr>";
var helprmuser = "Törli a megadott felhasználót. Systax: !rmuser <username>";
var helpHelp = "Megjeleneníti ezt a lapot. Syntax: !help";
var helpaddcr = "Adott mennyiségű Községi Krajcárt ad egy adott felhasználóhoz. Syntax: !addcr <user> <cr>";
var helprmcr = "Törli a megadott felhasználót. Systax: !rmuser <username>";
var helpgetcr = "Megjeleníti egy adott felhasnáló Községi Krajcár egyenlegét. Syntax: !getcr <user>";
var helpcrlist = "Megjeleníti a ```users.json``` fájlt. Syntax: !crlist";
var helpsetcr = "Beállít egy adott mennyiségű Községi Krajcárt egy adott felhasználónak. Syntax: !crset <user> <cr>";
var helpchkuser = "Ellenőrzi, hogy létezik-e egy adott felhasználó. Syntax: !checkuser <user>";
var helpsaveusers = "Menti a ```users.json``` fájlt. Syntax: !saveusers";

var userNotExistsLang =  'A felhasználó nem létezik';
var userExistsembedLang = "A felhasználó létezik.";
var userAddedEmbedLang = "Felhasználó hozzáadva.";
var userRemovedEmbedLang = "Felhasználó eltávolítva.";
var userAndCrNotEnteredEmbedLang = 'Kérlek add meg a felhasználó nevet és Községi Krajcár mennyiséget!';
var enterUsernameEmbedLang = 'Kérlek addj meg egy felhasználó nevet!';
var userAlreadyExistsEmbedLang = 'A felhasználó már létezik.';
var crSetEmbedLang = 'Községi Krajcár Beállítva.';
var crNotEnteredEmbedLang = 'Nem érvényes Községi Krajcár mennyiség!';
var crAddedEmbedLang = 'Községi Krajcár hozzáadva.';
var crRemovedEmbedLang = "Községi Krajcár eltávolítva.";
var enterNumberEmbedLang = 'Kérlek addj meg egy számot!';
var numberNotEnteredLang = 'Nem érvényes szám!';
var purgeEmbedLang = 'Törlés sikeres!.';
var saveUsersFailedLang = 'A felhasználók mentése sikertelen!';
var saveUsersLang = 'A felhasználók mentése sikeres!';
var leaderboardsFailedLang = 'A ranglista lekérése sikertelen!';
var leaderboardsSuccesLang = 'A ranglista lekérése sikeres!';
var userAndFlagNotEnteredLang = 'Kérlek add meg a felhasználó nevet és a flaget!';
var flagAlreadyExistsLang = 'A flag már létezik.';;

const { MessageEmbed } = require('discord.js');
//update helpEmbed with the new commands
const helpenbed = new MessageEmbed()
    .setColor('#00ffc8')
    .setTitle(helpTitle)
    .setDescription(helpDescription)
    .addField('!adduser', helpAdduser)
    .addField('!rmuser', helprmuser)
    .addField('!help', helpHelp)
    .addField('!addcr', helpaddcr)
    .addField('!rmcr', helprmcr)
    .addField('!getcr', helpgetcr)
    .addField('!crlist', helpcrlist)
    .addField('!setcr', helpsetcr)
    .addField('!checkuser', helpchkuser)
    .addField('!saveusers', helpsaveusers);

const userNotExists = generateEmbed(userNotExistsLang, true);
const userExistsembed = generateEmbed(userExistsembedLang, false);
const userAddedEmbed = generateEmbed(userAddedEmbedLang, false);
const userRemovedEmbed = generateEmbed(userRemovedEmbedLang, false);
const userAndCrNotEnteredEmbed = generateEmbed(userAndCrNotEnteredEmbedLang, true);
const enterUsernameEmbed = generateEmbed(enterUsernameEmbedLang, true);
const userAlreadyExistsEmbed = generateEmbed(userAlreadyExistsEmbedLang, true);
const crSetEmbed = generateEmbed(crSetEmbedLang, false);
const crNotEnteredEmbed = generateEmbed(crNotEnteredEmbedLang, true);
const crAddedEmbed = generateEmbed('Községi Krajcár hozzáadva.', false);
const crRemovedEmbed = generateEmbed("Községi Krajcár eltávolítva.", false);
const enterNumberEmbed = generateEmbed('Kérlek addj meg egy számot!', true);
const numberNotEntered = generateEmbed('Nem érvényes szám!', true);
const purgeEmbed = generateEmbed('Törlés sikeres!.', false); 
const saveUsersFailed = generateEmbed('A felhasználók mentése sikertelen!', true);
const saveUsers = generateEmbed('A felhasználók mentése sikeres!', false);
const leaderboardsFailed = generateEmbed('A ranglista lekérése sikertelen!', true);
const leaderboardsSucces = generateEmbed('A ranglista lekérése sikeres!', false);
const userAndFlagNotEnteredEmbed = generateEmbed('Kérlek add meg a felhasználó nevet és a flaget!', true);
const flagAlreadyExists = generateEmbed('A flag már létezik.', true);

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
function generateTextEmbed(_title, _text, _color)
{
    return new MessageEmbed()
        .setColor(_color)
        .setTitle(_title)
        .setDescription(_text);
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
            message.channel.send({embeds: [userAndCrNotEnteredEmbed]});
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
            message.channel.send({embeds: [userAndCrNotEnteredEmbed]});
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
                message.channel.send({embeds: [generateTextEmbed(user + ' Községi Krajcár egyenlege: ' + result_, '', '#00ff00')]});
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
            message.channel.send({embeds: [userAndCrNotEnteredEmbed]});
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
    //check if the command is !saveusers and if true save the users with the index.js's function with arugments of the message
    if(command === 'saveusers') {
        var result_ = null;
        result_ = indexFile.saveUsers();

        if(!result_) {
            message.channel.send({ embeds: [saveUsersFailed] });
        }
        if(result_) {
            message.channel.send({ embeds: [saveUsers] });
        }
    }
    //check if the command is !addflag and if true add a flag to a user with the index.js's function with arugments of the message
    if(command === 'addflag') {
        console.log("addflag");
        if(args.length < 2) {
            message.channel.send({embeds: [userAndFlagNotEnteredEmbed]});
        } else {
            console.log("addflagelse");
            var result_ = null;
            var user = args[0];
            var flag = args[1];
            result_ = indexFile.addFlag(user, flag);

            if(result_ === 2){
                message.channel.send({ embeds: [flagAlreadyExists] });
            }
            if(!result_ && result_ != 2)
            {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_ != false) 
            {
                message.channel.send("Flag hozzáadva!\n" + result_);
                //TODO:check if role arleady exists
            }
        }
    }
    //check if the command is !leaderboards and if true get the leaderboards with the index.js's function with arugments of the message
    if(command === 'leaderboards') {
        /*if(args.length < 1)
        {
            message.channel.send({embeds: [enterNumberEmbed]});
            return;
        }*/
        //else
        //{
            var result_ = null;
            result_ = indexFile.getLeaderboards(args[0]);

            if(result_ === null || result_ === false) {
                message.channel.send({ embeds: [leaderboardsFailed] });

            }
            if(result_) {
                message.channel.send({ embeds: [leaderboardsSucces] });
                message.channel.send('```json\n' + JSON.stringify(result_) + '\n```')
            }
        //}
    }

});
client.login(token);
//client.login(process.env.token);
//     / | / / ____/_  __/ |     / / __ \/ __ \/ //_/
//    /  |/ / __/   / /  | | /| / / / / / /_/ / ,<   
//   / /|  / /___  / /   | |/ |/ / /_/ / _, _/ /| |  
//  /_/ |_/_____/ /_/    |__/|__/\____/_/ |_/_/ |_|  
/*
              ,---------------------------,
              |  /---------------------\  |
              | |                       | |
              | |        Községi        | |
              | |        Krajcár        | |
              | |        Network        | |
              | |                       | |
              |  \_____________________/  |
              |___________________________|
            ,---\_____     []     _______/------,
          /         /______________\           /|
        /___________________________________ /  | ___
        |                                   |   |    )
        |  _ _ _                 [-------]  |   |   (
        |  o o o                 [-------]  |  /    _)_
        |__________________________________ |/     /  /
    /-------------------------------------/|      ( )/
  /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


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

        } 
        else if (url === ('/')) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/chooser.html').pipe(res);
            return;
        } 
        else if (url === ('/favicon.ico')) {
            fs.createReadStream(__dirname + '/images/favicon.ico').pipe(res);
        }
        else if(url === ('/leaderboards'))
        {
            //TODO: fix leaderboard forammting
            usersRaw = fs.readFileSync('./users.json');
            users = JSON.parse(usersRaw);
            var html = fs.readFileSync(__dirname + '/leaderboards.html', 'utf8');
            var _leadeboards = JSON.stringify(indexFile.getLeaderboards(users.length));
            html = html.replace('%%%LB%%%', _leadeboards);
            fs.createReadStream(__dirname + '/leaderboards.html').pipe(res);
            res.end(html);
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
        //TODO: send update to leaderboards @Hema2 !!!!!
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

