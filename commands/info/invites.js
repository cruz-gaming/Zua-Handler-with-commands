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

module.exports = {
  name: "invites",
  aliases: [],
  usage: '',
  description: "Discription",
  category: "name",
  cooldown: 10,
  userPerms: "SEND_MESSAGES",
  clientPerms: "SEND_MESSAGES",
  ownerOnly: true,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
   let user = message.mentions.users.first() || message.author
      let invites = await message.guild.invites.fetch();
      let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

      if (userInv.size <= 0) {
        return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${user} don't have any invites`)]})
      }

      let invCodes = userInv.map(x => x.code).join('\n')
      let i = 0;
      userInv.forEach(inv => i += inv.uses)

      message.reply({embeds: [new MessageEmbed()
        .setTitle(`${user.username}`)
        .setDescription(`**User have **\`${i}\` **Invites**`)
  
        .setColor('#89F2EF')
        .setTimestamp()]})
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