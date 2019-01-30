module.exports = function(client){
  var retVal = {};
  retVal.processServerMessage = function(msg){
    return msg;
    //parse args, sent to specific command function
  };
  retVal.processDirectMessage = function(msg){
    function checkMessage(e){
      return msg.content.toLowerCase().includes(e);
    }
    let pornTerms = ["nsfw", "nfsw", "nsw", "nfw", "lewd", "porn", "p0rn", "pron", "pr0n", "nood", "nude", "n00d"];
    let addTerms = ["add","want","give","gimme","gib","desire","need","wish","crave","yearn" ,"provide","allow","access","grant","provide","bestow","get","recieve"];
    let removeTerms = ["remove"," not ","dont","don't","take","delete","erase","exclude","stop","revoke"];
    if(pornTerms.find(checkMessage)){
      if (addTerms.find(checkMessage) && !removeTerms.find(checkMessage)){
        modRole(msg.author, "NSFW", true).catch((e)=>{throw e;});
      }
      else if (removeTerms.find(checkMessage)){
        modRole(msg.author, "NSFW", false).catch((e)=>{throw e;});
      }
    }
    else {
      msg.channel.send("If you want the NSFW permission on the GGG, say something like 'I want NSFW' or 'gIB LEWDS' or whatever. If you don't want this role anymore, say something like 'take my NSFW' or 'NO PRON PLZ'. For all other GentBot Actions, use the GGG bot-spam channel.");
    }
  };
  async function modRole(author,roleName,grant) {
    var server = client.guilds.get(process.env.DISCORD_BOT_GUILD_ID);
    let nsfwRole = server.roles.find(role => role.name === roleName);
    const requestingUser = await client.fetchUser(author);
    const requestingMember = await server.fetchMember(requestingUser);
    if(grant){
      await requestingMember.addRole(nsfwRole, "requested by bot DM");
      requestingUser.send(`You have been granted the ${roleName} role on the ${server} server. FYI: Other users can see what roles you have if they specifically look.` );
    } else{
      await requestingMember.removeRole(nsfwRole, "requested by bot DM");
      requestingUser.send(`The ${roleName} role has been removed from you on the ${server} server.` );
    }
  }
  return retVal;
};
