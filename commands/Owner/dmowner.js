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
  name: "dmowner",
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
      const msg = args.join(" ")
    if (!msg) return message.reply({
      embeds: [new MessageEmbed()
        .setColor(color.red)
        .setDescription(`Please supply the message to sent to owners`)
      ]
    })

    client.guilds.cache.forEach(async (e) => {
      const ower = await client.users.fetch(e.ownerId)

      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`<a:announces:951687541847887902> AN MESSAGE FROM MY OWNERS`)
        .setDescription(`${msg}`)
      ower.send({
        embeds: [embed]
      })
    })

    return message.reply({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Sending to Owners`)
      ]
    })
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