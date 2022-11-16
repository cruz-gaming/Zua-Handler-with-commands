const emote = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`)
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'deletechannel',
  aliases: ["dchannel"],
  usage: '<mention channel>',
  description: `delete a channel if don't want`,
  category: "moderation",
  cooldown: 0,
  userPerms: "MANAGE_CHANNELS",
  clientPerms: "MANAGE_CHANNELS",
  ownerOnly: false,
  toggleOff: false,

  
  async execute(client, message, args, ee) {
    try {
      const channelTarget = message.mentions.channels.first()
      if (!channelTarget) return message.reply({ embeds:[new MessageEmbed()
        
       
        .setDescription(`USAGE : \`deletechannel mention channel\``)]})
      channelTarget.delete().then(async (ch) => {
        await message.author.send({ embeds:[new MessageEmbed()
          .setColor(colors.green)
          
          .setDescription(`Channel has been successfully deleted.`)]}).catch(err => console.log('I was unable to message the member.'));
      });
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