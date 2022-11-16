const emote = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'slowmode',
  aliases: [],
  usage: "[seconds]",
  description: 'Sets SlowMode for Channels',
  category: "moderation",
  cooldown: 0,
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
      if (!args[0]) {
        message.channel.setRateLimitPerUser(0);
        return message.reply({ embeds:[new MessageEmbed()
          .setColor(colors.green)
          .setDescription(`usage:\`slowmode  time\`.`)]})
      }
      const raw = args[0];
      const milliseconds = ms(raw)
      if (isNaN(milliseconds)) return message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`This is not a valid time!`)]});
      if (milliseconds < 1000) return message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`The minimum slowmode is 1 seconds`)]});
      if (milliseconds > 21600000) return message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`The maximum slowmode is 21600 seconds`)]});
      message.channel.setRateLimitPerUser(milliseconds / 1000);
      message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setTitle(`The slowmode for this channel has been set to ${ms(milliseconds, {
      long: true
    })}`)]})
    } catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
}
  },
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