const {
  MessageEmbed
} = require('discord.js');
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "forcedelete",
  aliases: ["fdelete","fdl"],
  usage: '',
  description: "force delete a ticket",
  category: "ticket",
  cooldown: 10,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee) {
   if(message.channel.name.includes('ticket')){
			
			try{
        await 
			message.channel.send({
        embeds: [new MessageEmbed()
          .setTitle(`Ticket will be deleted in 10 seconds!`)
          .setColor(ee.wrongcolor)]
 })
          setTimeout(async () => {
               message.channel.delete();
                    }, 10 * 500)
      } catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
}
   } else message.reply(" :x: **This is not a ticket channel or Ticket is not closed.**");
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
  