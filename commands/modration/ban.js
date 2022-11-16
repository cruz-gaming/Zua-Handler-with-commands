const config = require(`${process.cwd()}/settings/config.json`);
const colors = require(`${process.cwd()}/settings/color.json`)
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: 'ban',
  aliases: [],
  usage: "<@use> [reason]",
  description: 'Ban a Member!',
  category: "moderation",
  cooldown: 0,
  userPerms: "BAN_MEMBERS",
  clientPerms: "BAN_MEMBERS",
  ownerOnly: false,
  toggleOff: false,

  

  async execute(client, message, args, ee) {
    try {
        
      let reason = args.slice(1).join(" ");
      const mentionedMember = message.mentions.members.first();
        
        
      if (!reason) reason = 'no reason .';
      if (!args[0]) return message.reply({ embeds:[new MessageEmbed()
      
        .setDescription(`Mention someone to ban.`)]});
        
      if (!mentionedMember) return message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        
        .setDescription(`That person is not in this guild`)]});
        
        if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(colors.green)
          
          .setDescription(`You can't ban \`reason :your Same role have him/her\``)
        ]
      });
        
      if (message.guild.me.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(colors.green)
          
          .setDescription(`i can't ban \`reason :my Same role have him/her\``)
        ]
      });
        
      if (!mentionedMember.bannable) return message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        
        .setDescription(`Sorry can't ban him`)]});

      await mentionedMember.send({ embeds:[new MessageEmbed()
        .setTitle(`baned from ${message.guild.name}`)
        .setDescription(`Reason : ${reason}`)
        .setColor(colors.green)
        
        .setTimestamp()]}).catch(err => console.log('I was unable to message the member.'));
      await mentionedMember.ban({
        reason: reason
      }).catch(err => console.log(err)).then(() => message.reply({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription("Successfully banned " + mentionedMember.user.tag)]}));
        
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