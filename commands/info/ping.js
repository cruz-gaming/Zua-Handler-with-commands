const config = require(`${process.cwd()}/settings/config.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: '',
  description: "Gives you information on how fast the Bot can respond to you",
  category: "info",
  cooldown: 10,
  userPerms: "SEND_MESSAGES",
  clientPerms: "SEND_MESSAGES",
  ownerOnly: false,
  toggleOff: false,

  
  async execute(client, message, args, ee) {
    try {
   let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let botLatency = new Date() - message.createdAt
        let apiLatency = client.ws.ping;
   
      message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`📶 Checking Bot ping...`)]}).then(msg => {
        msg.edit({ embeds:[new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`♻️ Checking API Latency...`)]}).then(msg => {
        msg.edit({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`〽️ Checking Uptime...`)]}).then(msg => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit({embeds:[new MessageEmbed()
          .setColor(colors.green)
          .addField("Bot ping",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                , true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                , true
            )
            .addField("Client Uptime",
                `${days}d ${hours}h ${minutes}m ${seconds}s`
                , true
            )
            .setFooter(`${client.user.tag} || Ping....`)]}
        );
        })
        })
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