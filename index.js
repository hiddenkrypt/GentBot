require("dotenv").config();

console.log("NODE START");
console.log(process.env.DISCORD_BOT_PREFIX);

const DiscordApp = require("discord.js");
const client = new DiscordApp.Client();

client.on('ready', ()=>{
  console.log("Connected! Tag: "+client.user.tag);
});

client.login(process.env.DISCORD_BOT_TOKEN);



//GGG Botspam channel ID 503362277844451338
