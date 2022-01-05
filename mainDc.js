//make a discord bot that can respond to direct messages
var discord = require('discord.js');
var bot = new discord.Client();
var token = "OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.2QnWT_MPS0ri09GpkuQg_RP3J_Y";
var prefix = "!";

bot.login(token);
console.log(`Logged in as ${client.user.tag}!`);
//listen for direct messages to the bot
client.on("message", msg =>  { 
    
    if(msg.guild==null && msg.author.id!=='botDiscordId'){
        client.on('message', msg => {
            if (msg.content === 'ping') {
              msg.reply('Pong!');
            }
          });
    }
 });
client.on('message', msg => {
    if (msg.content === 'ping' && msg.guild==null && msg.author.id!=='botDiscordId') 
    {
        msg.reply('Pong!');
    }
});
