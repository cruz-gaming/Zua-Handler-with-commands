const config = require(`${process.cwd()}/settings/config.json`);

const {

  Client,

  Message,

  MessageEmbed,

  MessageActionRow,

  MessageSelectMenu,

  MessageButton

} = require('discord.js');

const emote = require(`${process.cwd()}/settings/emojis.json`);

const ee = require(`${process.cwd()}/settings/color.json`);

module.exports = {

  name: "vcid",

  aliases: [],

  usage: '',

  description: "check your voice channel id",

  category: "automod",

  cooldown: 0,

  userPerms: "MANAGE_CHANNELS",

  clientPerms: "MANAGE_CHANNELS",

  ownerOnly: false,

  toggleOff: false,

  async execute(client, message, args, ee, prefix) {

  	

    try {

    

  

      const id1 = message.member.voice.channel.id;

const id2 = message.member.voice.channel;

await message.channel.send({ embeds:[new MessageEmbed()

        .setColor(ee.green)

        .setDescription(`Done here is Your Voice Channel id :- ${id2}`)]})

      message.channel.send(`${id1}`);

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