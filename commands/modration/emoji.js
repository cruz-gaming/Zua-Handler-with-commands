const colors = require(`${process.cwd()}/settings/color.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  Client,
  Message,
  MessageEmbed,
  Util
} = require('discord.js');

module.exports = {
  name: "steal",
  aliases: ['steal-emojis', "add-emoji"],
  usage: "",
  description: "Steal Emojis from Other Servers.",
  category: "utility",
  cooldown: 0,
  userPerms: "USE_EXTERNAL_EMOJIS",
  clientPerms: "USE_EXTERNAL_EMOJIS",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      if (!args.length) return message.channel.send({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`YOU DIDN'T PROVIDE ME AN EMOJI`)]});
      for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);

        if (parsedEmoji.id) {
          const extension = parsedEmoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
          message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send({ embeds:[new MessageEmbed()
            .setColor(colors.green)
            .setDescription(`Added: \`${emoji}\``)]})).catch((e) => {
              message.channel.send({ embeds: [new MessageEmbed()
              .setColor(colors.green)
              .setDescription(`${client.allEmojis.x} Maximum Number of Animated Emojis Reached (50)`)]})
            })
        }
      }
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