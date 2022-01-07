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
    .setDescription('This is a help command')
    .addField('!help', 'Displays this message. Usage: !help')
    .addField('!addcr', 'Adds cr to a user. Usage: !addcr <user> <cr>')
    .addField('!rmcr', 'Removes cr from a user. Usage: !rmcr <user> <cr>')
    .addField('!getcr', 'Displays the cr of a user. Usage: !getcr <user>')
    .addField('!crlist', 'Displays the cr of all users. Usage: !crlist')
    .addField('!crset', 'Sets the cr of a user. Usage: !crset <user> <cr>');

const userNotExists = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Error')
    .setDescription('User does not exist!');

const userExistsembed = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Success')
    .setDescription('User exists.');
const userAddedEmbed = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Success')
    .setDescription('User added.');
const userRemovedEmbed = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Success')
    .setDescription('User removed.');

indexFile.addUser('test', 0);

console.log(`Logged in as !`);
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
            message.channel.send('Please enter a username and cr');
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.addUser(user, cr);

            if(!result_) {
                message.channel.send('User already exists');
            }
            if(result_) {
                message.channel.send({embeds: [userAddedEmbed]});
            }
        }
    }
    //check if the message is !removeUser and if true remove a user with the index.js's function with arugments of the message
    if(command === 'rmuser') {
        if(args.length < 1) {
            message.channel.send('Please enter a username');
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
            message.channel.send('Please enter a username and cr');
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.addCr(user, cr);

            if(!result_ ) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send('Községi Krajcár added');
            }
        }
    }
    //check if the message is !removecr and if true remove cr to a user with the index.js's function with arugments of the message
    if(command === 'rmcr') {
        if(args.length < 2) {
            message.channel.send('Please enter a username and cr');
        } else {
            var result_ = null;
            var user = args[0];
            var cr = args[1];
            result_ = indexFile.removeCr(user, cr);

            if(!result_) {
                message.channel.send({ embeds: [userNotExists] });
            }
            if(result_) {
                message.channel.send('Községi Krajcár removed');
            }
        }
    }
    //check if the message is !getcr and if true get cr to a user with the index.js's function with arugments of the message
    if(command === 'getcr') {
        if(args.length < 1) {
            message.channel.send('Please enter a username');
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
            message.channel.send('Please enter a username');
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

});

client.login("OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.KNG8wGvooE7Hb90p6ZCmVP-KtjE");