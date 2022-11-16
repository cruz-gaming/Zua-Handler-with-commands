const config = require(`${process.cwd()}/settings/config.json`);
const color = require(`${process.cwd()}/settings/color.json`);

const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "report",
  aliases: ['bugreport'],
  usage: '<bug>',
  description: "bot suggest command",
  category: "support",
  cooldown: 0,

  ownerOnly: false,
  toggleOff: false,

  

  async execute(client, message, args, ee) {
    try {
      const msg = args.join(" ")
      if (!msg) return message.reply({ embeds:[new MessageEmbed()
        .setColor(color.green)
      
        .setDescription(`\`\`\`Send a bug report for __${client.user.tag}__\`\`\``)]})

      message.reply({ embeds:[new MessageEmbed()
       .setColor(color.green)
        .setDescription(`${emote.y} **${message.author.username} Drafted the bug**`)]})

      const reportChannel = client.channels.cache.get(config.suggestionChannel)
      if (!reportChannel) return;

      reportChannel.send({ embeds:[new MessageEmbed()
        .setColor(color.green)
        .setTitle(`__New bug report:__`)
        .setDescription(`**Author:**\n> ${message.author.username} | (${message.author.id})\n**report:**\n> ${msg}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`report From: ${message.guild.name} | (${message.guild.id})`, message.guild.iconURL({
          dynamic: true
        }))]}).then(sendMessage => sendMessage.react(emote.y)).then(reaction => reaction.message.react(emote.x))
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