//make a discord bot that can respond to direct messages
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
var token = "OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.2QnWT_MPS0ri09GpkuQg_RP3J_Y";
var prefix = "!";


console.log(`Logged in as !`);
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

client.login("OTI4MzAzMDcwNTA3NTg5NzQ0.YdWzmw.KNG8wGvooE7Hb90p6ZCmVP-KtjE");
