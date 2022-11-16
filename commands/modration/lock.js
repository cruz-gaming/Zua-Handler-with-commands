const emote = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const Discord = module.require("discord.js");
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
module.exports = {
  name: 'lock',
  aliases: ["lc"],
  usage: '',
  description: 'Channel Lock',
  cooldown: 0,
  category: "moderation",
  userPerms: "MANAGE_CHANNELS",
  clientPerms: "MANAGE_CHANNELS",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false
    });
      const embed = new Discord.MessageEmbed()
   .setTitle("**Locked**")
   .setDescription(`🔒 ${message.channel} **has been Locked**`)
   
   .setTimestamp()
   .setColor(colors.green)
   await message.channel.send({ embeds: [embed] });
   message.delete();
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