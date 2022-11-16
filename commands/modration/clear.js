const emote = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['remove'],
  usage: "[number]",
  description: 'Purge Messages!',
  category: "moderation",
  cooldown: 0,
  userPerms: "MANAGE_MESSAGES",
  clientPerms: ["MANAGE_MESSAGES", "SEND_MESSAGE"],
  ownerOnly: false,
  toggleOff: false,



  async execute(client, message, args, ee) {
    try {

      if (isNaN(args[0]))
        return message.channel.send('**please supply a valid amount');
      if (args[0] >= 100)
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor("GREEN")

            .setDescription('**I cant delete more than** \`99\`** messages**')]
        });

      message.channel.bulkDelete(args[0], true).then(msg => {
        message.channel.send(`**Cleared \` ${msg.size} \` messages out of \` ${args[0]} \` messages!**`)
      }).catch((err) => {
        console.log(err)
        return message.reply("**An error occurred!**")
      })
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