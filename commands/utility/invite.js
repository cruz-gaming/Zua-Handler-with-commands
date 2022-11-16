const config = require(`${process.cwd()}/settings/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const eec = require(`${process.cwd()}/settings/embed.json`);

module.exports = {
  name: 'invite',
  aliases: ['invite-me'],
  usage: '',
  description: 'Give You My Invite Link',
  category: "utility",
  cooldown: 0,
  userPerms: "",
  clientPerms: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {

      let embed = new MessageEmbed()
        .setTitle(`${client.allEmojis.y} Invite ${client.user.tag}`)
        .setDescription(`||[*Click here for an Invite link without Slash Commands*](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=536870911999&scope=bot)||`)
        .setColor(ee.color)
        .setImage(eec.gif)
        .setFooter({text: ee.footertext, iconURL: ee.footericon})

      let supportbutton = new MessageButton()
        .setStyle("LINK")
        .setLabel("Join Support!")
        // .setEmoji('❤️')
        .setURL(process.env.SUPPORT)

      let invitebutton = new MessageButton()
        .setStyle("LINK")
        .setLabel("Invite Me!")
        // .setEmoji('✅')
        .setURL(process.env.INVITE)

      let websitebutton = new MessageButton()
        .setStyle("LINK")
        .setLabel("Check Website!")
        // .setEmoji('🌐')
        .setURL(process.env.WEBSITE)

      const row = new MessageActionRow()
        .addComponents(supportbutton, invitebutton, websitebutton);

      return message.reply({
        embeds: [embed],
        components: [row]
      }).catch(err => console.log(err));

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);
      return errorLogsChannel.send({
        embeds: [new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.x} Got a Error:`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setFooter(`Having: ${message.guild.memberCount} Users`)
        ]
      })
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