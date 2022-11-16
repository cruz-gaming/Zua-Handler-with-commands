const config = require(`${process.cwd()}/settings/config.json`);

const {

  Client,

  Message,

  MessageEmbed,

  MessageActionRow,

  MessageSelectMenu,

  MessageButton

} = require('discord.js');

const sourcebin = require('sourcebin_js')

const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {

  name: "sourcebin",

  aliases: ["sb"],

  usage: '',

  description: "make a long message to short",

  category: "utility",

  cooldown: 10,

  userPerms: "EMBED_LINKS",

  clientPerms: "EMBED_LINKS",

  ownerOnly: false,

  toggleOff: false,

  async execute(client, message, args, ee, prefix) {

  	

    try {

      if (!args.join(' ')) return message.reply('Please give a code/message to make as link')

      sourcebin.create([{

      name: `Code by ${message.author.tag}`,

      content: args.join(' '),

      languageId: 'js'

    }])

      .then(src => {

           message.channel.send(src.url)

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