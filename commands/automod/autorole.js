const config = require(`${process.cwd()}/settings/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});
const emote = require(`${process.cwd()}/settings/emojis.json`);
const color = require(`${process.cwd()}/settings/color.json`);

module.exports = {
  name: "autorole",
  aliases: [],
  usage: '',
  description: "give a role who joined server",
  category: "automod",
  cooldown: 10,
  userPerms: "MANAGE_ROLES",
  clientPerms: "MANAGE_ROLES",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {

      if (message.content.includes("@everyone")) {
        return message.reply("Everyone is already automatically given by discord");
      }
      if(!args[0])
{
  return message.reply("Hey You didnt Gave me role to add when a member joins the server");
}
  var role1 = message.mentions.roles.first().id;
  const role = message.mentions.roles.first() ;
  if (message.guild.me.roles.highest.position <= role.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(color.red)
        
          .setDescription(`${emote.x} I cannot add this roles as this role is the same or higher then mine.`)
        ]
      });
    if(!role1)
    {
      var role1 = args[0];
    }
if(args[0] == "disable" || args[0] == "off")
{
 
  db.delete(`autorole_${message.guild.id}`);
  return message.reply("Done i have Disabled auto role in your server enable it by adding any role");
}
else {
message.reply(`Ok Now i will give this role when someone joins this server role - ${role1}`)
db.set(`autorole_${message.guild.id}`, role1);
}
     
    } catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
    }
  }
}


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

