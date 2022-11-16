const config = require(`${process.cwd()}/settings/config.json`);
const color = require(`${process.cwd()}/settings/color.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "feedback",
  aliases: ['botfeedback'],
  usage: '<content>',
  description: "give a feedback for bot",
  category: "support",
  cooldown: 0,

  ownerOnly: false,
  toggleOff: false,

  

  async execute(client, message, args, ee) {
    try {
      const msg = args.join(" ")
      if (!msg) return message.reply({ embeds:[new MessageEmbed()
        .setColor(color.green)
      
        .setDescription(`**Send a** \`\`\`FEEDBACK for \`\`\` ** __${client.user.tag}__**`)]})

      message.reply({ embeds:[new MessageEmbed()
       .setColor(color.green)
        .setDescription(`${emote.y} **${message.author.username} Drafted feedback **`)]})

      const reportChannel = client.channels.cache.get(config.reportChannel)
      if (!reportChannel) return;

      reportChannel.send({ embeds:[new MessageEmbed()
        .setColor(color.green)
        .setTitle(`__New Feedback__`)
        .setDescription(`**Author:**\n> ${message.author.username} | (${message.author.id})\n**content:**\n> ${msg}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`report From: ${message.guild.name} | (${message.guild.id})`, message.guild.iconURL({
          dynamic: true
        }))]}).then(sendMessage => sendMessage.react(client.allEmojis.y)).then(reaction => reaction.message.react(client.allEmojis.x))
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