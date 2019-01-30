module.exports = {
  
  process: function(msg){

  },


  dm: function(msg){
    let addTerms = ["add","want","give","gimme","desire","need","wish","crave","yearn" ,"provide","allow","access","grant","provide","bestow"];
    let removeTerms = ["remove","take","delete","erase","extract","exclude","snag","stop","no"];
    if(msg.content.includes("nsfw")){
      if (addTerms.find(e=>{msg.content.contains(e);})){
        //give this user nsfw role on GGG
        console.log(`${msg.author} wants NSFW permission.`);
        //guild.roles <-- (collection)
        //Guild.fetchMember(<user>) <-- promise
        //guild member.addRole ("<roleID>", "<reason>"); <-- promise
      }
      else if (removeTerms.find(e=>{msg.content.contains(e);})){
        console.log(`${msg.author} DOES NOT WANT NSFW permission.`);
      }
      else {
        msg.channel.send("If you want the NSFW permission on the GGG, say something like 'I want NSFW'");
      }
    }
  }
};
