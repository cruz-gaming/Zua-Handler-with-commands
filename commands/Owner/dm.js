const config = require(`${process.cwd()}/settings/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const db = require("old-wio.db");
const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {
  name: "dm",
  aliases: [],
  usage: '',
  description: "Discription",
  category: "name",
  cooldown: 10,
  userPerms: "",
  clientPerms: "",
  ownerOnly: true,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.mediancolor)
          .setDescription(`You did not mention a user, or you gave an invalid id`)]});
      if (!args.slice(1).join(" "))
        return message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.mediancolor)
          .setDescription(`You did not specify your message`)]});
      user.user
        .send({ embeds:[new MessageEmbed()
          .setColor(ee.color)
          .setDescription(args.slice(1).join(" "))]})
        .catch(() => message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`That user could not be DM!`)]}))
        .then(() => message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Sent a message to ${user.user.tag}`)]}));
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