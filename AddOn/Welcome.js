const config = require(`${process.cwd()}/settings/config.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Welcome.json`});
const color = require(`${process.cwd()}/settings/color.json`);

const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  try{
    const description = {
        name: "guild welcome AddOn",
    }
    client.logger(`Loaded ${description.name}`);

    client.on("guildMemberAdd", async (member) => {
    

      let welcomer = db.fetch(`welcome_status_${member.guild.id}`)
 if(!welcomer) return;

let channel = db.fetch(`ichannel_${member.guild.id}`)
 if(!channel)
 {
   return;
 }
 var message1 = await db.fetch(`message123_${member.guild.id}`)
  let channel1 = await client.channels.fetch(`${channel}`);
 if(!message1 || message1 == "default")
 {
 var embed = new MessageEmbed()
.setDescription(`${member} Just Join This server!!`)
.addField(`A User Just Landed In this server!!`, `Welcome To this Server ${member} I hope You enjoy here`)
.addField("Now this server members are -", `${member.guild.memberCount}`)
.setColor(`RANDOM`)
channel1.send({content: `${member}`, embeds:[new MessageEmbed()
          .setColor(color.green)

          .setDescription(`${member} Just Join This server!!`)
.addField(`A User Just Landed In this server!!`, `Welcome To this Server ${member} I hope You enjoy here`)
.addField("Now this server members are -", `${member.guild.memberCount}`)

]});

 }
     

  
    
  


 if(message1 == "disable")
 {
   return;
 }
 if(message1 && message1 != "default")
 {
   let onoroff = db.fetch(`message459_${member.guild.id}`);
    if(onoroff == "on")
    {
      
        message1 = message1
    .replace("-member-", `${member}`)
      
          .replace("-server-", `${member.guild.name}`)
          
    .replace("-memberscount-", `${member.guild.memberCount}`);
    const welcomeembed = new MessageEmbed()
    .setDescription(message1)
   channel1.send(welcomeembed)
   return;
    }
  
    
    message1 = message1
    .replace("-member-", `${member}`)
     
    
      .replace("-server-", `${member.guild.name}`)
    .replace("-memberscount-", `${member.guild.memberCount}`);
   channel1.send (`${message1}`)

 }
  
 
 



 
  }
  
);
client.on("guildMemberAdd", async (member) => {
const role = db.fetch(`autorole_${member.guild.id}`)
if(role == null) return;
 member.roles.add(`${role}`)
});
    } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
    }
    
    
};

/*
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║                   STACK DEVELOPMENT OFFICIAL SCRIPT                   ║
║                                                                       ║
║                       MANAGED BY RJRYT AND BO$$                       ║
║                                                                       ║
║                 BOTS WITH THIS SCRIPT: ZUA AND WOEBOT                 ║
║                                                                       ║
║                              DEVELOPERS                               ║
║                     1. RJRYT - https://rjryt.tech                     ║
║                     2. BO$$ - https://cruzgaming.ml                   ║
║                                                                       ║
║  Support Server: Stacks Development - https://discord.gg/NzQMqkEjVk   ║
╚═══════════════════════════════════════════════════════════════════════╝
*/