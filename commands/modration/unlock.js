const emote = require(`${process.cwd()}/settings/emojis.json`);
const Discord = module.require("discord.js");

module.exports = {
  name: 'unlock',
  aliases: ["ulc"],
  usage: '',
  description: 'Channel Lock',
  cooldown: 0,
  category: "moderation",
  userPerms: "MANAGE_CHANNELS",
  clientPerms: "MANAGE_CHANNELS",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee) {
    try {
      message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true 
    });
      const embed = new Discord.MessageEmbed()
   .setTitle("**UnLocked**")
   .setDescription(`🔒 ${message.channel} **has been unLocked**`)
   
   .setTimestamp()
   .setColor(ee.color);
   await message.channel.send({ embeds: [embed] });
   message.delete();
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
