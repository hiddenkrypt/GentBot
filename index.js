require("dotenv").config();

console.log("NODE START");
console.log(process.env.DISCORD_BOT_PREFIX);
var token = process.env.DISCORD_BOT_TOKEN;

const DiscordApp = require("discord.js");
const client = new DiscordApp.Client();
const commandCenter = require("./src/CommandCenter.js")(client);


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
});

client.on('message', (msg) => {
  try{
    console.log(`msg>> [[${msg.author}]]  ${msg.content}`);
    if (msg.author == client.user) {
      return; //ignore bot sent messages, to prevent loops
    }
    if (msg.channel.type === "dm"){
      commandCenter.processDirectMessage(msg);
    } else if(msg.channel.type === "text"){
      if (msg.content.startsWith(process.env.DISCORD_BOT_PREFIX)){
        commandCenter.processServerMessage(msg);
      }
    }
  } catch(error){
    msg.send(`AN ERROR OCCURED WITH THE BOT. Tell a Programmer!`);
    msg.send(error);
  }
});


console.log(token);
client.login(token);
