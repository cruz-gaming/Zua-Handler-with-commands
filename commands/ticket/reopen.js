const {
  MessageEmbed
} = require('discord.js');
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "reopen",
  aliases: [],
  usage: '',
  description: "reopen a closed ticket",
  category: "ticket",
  cooldown: 10,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
   if(message.channel.name.includes('closed')) {
			
			try{
        let channel = message.channel
        const user = client.users.cache.get(channel.topic)
               message.channel.setName(`ticket-${user.username}`)
    channel.permissionOverwrites.edit(user,{
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true
})
                              
        message.reply({
        embeds: [new MessageEmbed()
        .setTitle(`successfuly reopened!`)
        .setColor(ee.wrongcolor)]
    })
} catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
}
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
  