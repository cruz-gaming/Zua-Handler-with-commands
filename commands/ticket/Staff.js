const emote = require(`${process.cwd()}/settings/emojis.json`);
const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Tickets.json`});

module.exports = {
    name: 'setstaff',
    aliases: ["ss"],
    usage: '',
    description: 'set a staff of ticket helper',
    cooldown: 0,
    category: "ticket",
    userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
    ownerOnly: false,
    toggleOff: false,

    async execute(client, message, args, ee, prefix) {
        try {
        
          const Admin = message.mentions.roles.first();
    if (!Admin) {
    
      let main = new Discord.MessageEmbed()
     .setDescription(`Please mention an staff role.
example : ${prefix}setstaff 770988400047947746`)
      return message.reply({ embeds: [main] })
              
    }
         await db.set(`Staff_${message.guild.id}`, Admin.id)


          let suc = new Discord.MessageEmbed()
     .setDescription(`Successfully setuped staff role`)
      return message.reply({ embeds: [suc] })
      

                 
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