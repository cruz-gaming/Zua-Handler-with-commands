const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const emote = require(`${process.cwd()}/settings/emojis.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Tickets.json`});
  const color = require(`${process.cwd()}/settings/color.json`);

module.exports = {
  name: "close",
  aliases: ["cl", "tcl"],
  usage: '',
  description: "close a ticket which ",
  category: "ticket",
  cooldown: 10,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_CHANNELS",
  ownerOnly: false,
  toggleOff: false,



  async execute(client, message, args, ee, prefix) {
    try {
   if(message.channel.name.includes('ticket-')) {
			const rowsss = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('yes')
          .setLabel('Close')
          .setStyle("SUCCESS")
          .setDisabled(false),
         
         new MessageButton()
          .setCustomId('no')
          .setLabel('Cancel')
          .setStyle("SUCCESS")
          .setDisabled(false),
         );
    message.channel.send({
      embeds: [new MessageEmbed()
          .setColor(color.green)
          .setTitle("TICKET SYSTEM")
          .setFooter(` 
  ${message.guild.name}`, message.guild.iconURL({
          dynamic: true
          }))
          .setTimestamp()
          .setDescription(`> **You are trying to close this ticket. Are you sure to close.**`)
  ], 
       components : [rowsss]
    })
  }
}catch (e) {
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