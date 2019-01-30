module.exports = {

  process: function(msg){
    //parse args, sent to specific command function
  },


  dm: function(msg){
    let pornTerms = ["nsfw", "lewd", "porn", "p0rn", "pron", "pr0n", "nfsw"];
    let addTerms = ["add","want","give","gimme","desire","need","wish","crave","yearn" ,"provide","allow","access","grant","provide","bestow"];
    let removeTerms = ["remove","take","delete","erase","extract","exclude","snag","stop","no"];
    if(pornTerms.find(e=>{return msg.content.includes(e);})){
      if (addTerms.find(e=>{return msg.content.includes(e);})){
        console.log(`${msg.author} wants NSFW permission.`);
        grantNSFW(msg.author);
      }
      else if (removeTerms.find(e=>{return msg.content.includes(e);})){
        console.log(`${msg.author} wants to remove NSFW permission.`);
      }
      else {
        msg.channel.send("If you want the NSFW permission on the GGG, say something like 'I want NSFW'");
      }
    }
  }
};


function grantNSFW() {

  //give this user nsfw role on GGG
  //guild.roles <-- (collection)
  //Guild.fetchMember(<user>) <-- promise
  //guild member.addRole ("<roleID>", "<reason>"); <-- promise
}
