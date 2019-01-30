require("dotenv").config();

console.log("NODE START");
console.log(process.env.DISCORD_BOT_PREFIX);

const DiscordApp = require("discord.js");
const client = new DiscordApp.Client();
const commandCenter = require("./src/CommandCenter.js");


client.on('ready', ()=>{
  console.log("Connected! Tag: "+client.user.tag);
  //gentbot online
});


/*
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});*/
client.on('messageReactionAdd', (reaction, user)=>{
  console.log(`user: ${user.tag} added reaction ${reaction.emoji}`);
  console.log(`reaction identifier ${reaction.emoji.identifier}`);
});

client.on('message', (msg) => {
  console.log("Message recieved!: " + msg.content);
  if (msg.author == client.user) {
    return; //ignore bot sent messages, to prevent loops
  }
  if (msg.channel.type === "dm"){
    commandCenter.dm(msg);
  } else if(msg.channel.type === "text"){
    if (msg.content.startsWith(process.env.DISCORD_BOT_PREFIX)){
      commandCenter.process(msg);
    }
  }
});



client.login(process.env.DISCORD_BOT_TOKEN);
//GGG Botspam channel ID 503362277844451338
