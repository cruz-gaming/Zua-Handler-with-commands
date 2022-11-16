const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'leave-guild',
    aliases: ["leave-server"],
    usage: '',
    description: '',
    category: "ownerOnly",
    cooldown: 0,
    ownerOnly: true,
    toggleOff: false,

    

    async execute(client, message, args, ee, prefix) {
      try{
        if (!args[0]) return message.reply({
            embeds: [new MessageEmbed()
                .setColor(`#00ADA8`)
                .setDescription(`Please send Server ID`)
            ]
        })

        let guild = client.guilds.cache.get(args[0]);
        if (!guild) return message.reply({
            embeds: [new MessageEmbed()
                .setColor(`#00ADA8`)
                .setDescription(`am not in that server `)
            ]
        })

        let leaveGuild = await guild.leave()

        if (leaveGuild) {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor(`#00ADA8`)
                    .setDescription(`am lefted from **${guild.name}** (${guild.id})`)
                ]
            })
        } else {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${client.allEmojis.x} I was unable to left the server`)
                ]
            })
        }
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