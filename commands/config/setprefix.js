const config = require(`${process.cwd()}/settings/config.json`);
const {
  MessageEmbed
} = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "setprefix",
  aliases: [`setprefix`],
  usage: '',
  description:"customize bot prefix",
  category: "utility",
  cooldown: 5,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
    try {
    
    let prefix = await db.fetch(`guildprefix_${message.guild.id}`);
    if (prefix === null) prefix = config.PREFIX;

      let newprefix = args[0];

      if (!newprefix) {
        return message.channel.send(`${prefix}setprefix your prefix`);
      }
      

      db.set(`guildprefix_${message.guild.id}`, newprefix);
      return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle("__PREFIX SET__")
          .setThumbnail(message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(`${message.guild.name}`, message.guild.iconURL({
            dynamic: true
          }))
          .setTimestamp()
          .setImage(``)
          .setDescription(`** Old Prefix**\n${prefix}\n** New Prefix **\n${newprefix} `)]
          });
    
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