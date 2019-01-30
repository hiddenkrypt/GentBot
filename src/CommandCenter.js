module.exports = function(client){
  var retVal = {};
  retVal.processServerMessage = function(msg){
    return msg;
    //parse args, sent to specific command function
  };
  retVal.processDirectMessage = function(msg){
    function checkList(e){
      return msg.content.includes(e) || msg.content.includes(e.toUpperCase());
    }
    let pornTerms = ["nsfw", "lewd", "porn", "p0rn", "pron", "pr0n", "nfsw"];
    let addTerms = ["add","want","give","gimme","gib","desire","need","wish","crave","yearn" ,"provide","allow","access","grant","provide","bestow","get","recieve"];
    let removeTerms = ["remove","not","dont","don't","take","delete","erase","extract","exclude","snag","stop","no","revoke"];
    if(pornTerms.find(checkList)){
      if (addTerms.find(checkList) && !removeTerms.find(checkList)){
        grantRole(msg.author, "NSFW");
      }
      else if (removeTerms.find(checkList)){
        revokeRole(msg.author, "NSFW");
      }
      else{
        msg.channel.send("say 'give me porn' to get the NSFW role, or 'take my lewds' to remove the nsfw channel. Or somethign like that. The bot is a little loose with syntax for DMs. ");
      }
    }
    else {
      msg.channel.send("If you want the NSFW permission on the GGG, say something like 'I want NSFW'. If you don't wand this role anymore, message me with something like 'take my NSFW'. For all other GentBot Actions, use the GGG bot-spam channel.");
    }
  };
  async function grantRole(author,roleName) {
    var server = client.guilds.get(process.env.DISCORD_BOT_GUILD_ID);
    let nsfwRole = server.roles.find(role => role.name === roleName);
    const requestingUser = await client.fetchUser(author);
    const requestingMember = await server.fetchMember(requestingUser);
    await requestingMember.addRole(nsfwRole, "requested by bot DM");
    requestingUser.send(`You have been granted the ${roleName} role on the ${server} server. FYI: Other users can see what roles you have if they specifically look.` );
  }
  async function revokeRole(author,roleName) {
    var server = client.guilds.get(process.env.DISCORD_BOT_GUILD_ID);
    let nsfwRole = server.roles.find(role => role.name === roleName);
    const requestingUser = await client.fetchUser(author);
    const requestingMember = await server.fetchMember(requestingUser);
    await requestingMember.removeRole(nsfwRole, "requested by bot DM");
    requestingUser.send(`The ${roleName} role has been removed from you on the ${server} server.` );
  }
  return retVal;
};
