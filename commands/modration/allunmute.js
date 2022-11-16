const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "sunmute",
  aliases: [],
  usage: '',
  description: "Discription",
  category: "moderation",
  cooldown: 10,
  userPerms: "ADMINISTRATOR",
  clientPerms: "ADMINISTRATOR",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
      let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channel) return message.channel.send("You must enter a channel ID or be on a voice channel");
        channel.members.filter((x) => !x.permissions.has("ADMINISTRATOR"))
            .forEach((x, index) => {
                x.voice.setMute(false);
            });
        message.channel.send(
            `\`${channel.name}\` All members on your channel have been silenced`)
        


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