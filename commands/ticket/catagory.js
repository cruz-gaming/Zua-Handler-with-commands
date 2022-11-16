const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Tickets.json`});

module.exports = {
    name: 'set-channel',
    aliases: ["sc"],
    usage: '',
    description: 'All Commands',
    cooldown: 0,
    category: "ticket",
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
    
      
    ownerOnly: false,
    toggleOff: false,

    async execute(client, message, args, ee, prefix) {
        try {

let main = new Discord.MessageEmbed()
    .setTitle(`Error`)
     .setDescription(`❗ Please mention a categoryid with this command!
example: ${prefix}set-channels 777698840464794357(category)`)
     
    if (args.length != 1) return message.reply({ embeds: [main] })
          
    const cat = message.guild.channels.cache.get(args[0]);
if (cat.type != "GUILD_CATEGORY") return message.channel.send({ content: "The input should be a category"});
          
    await db.set(`catagory_${message.guild.id}`, cat.id)
                   
      
message.reply ({ embeds:[new MessageEmbed()
          .setColor(`#AD15A6`)
          .setFooter(message.guild.name)
                         .setDescription(`Successfully setuped parent catagory`)]});
                 
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
