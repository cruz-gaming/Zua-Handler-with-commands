const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'changebotname',
  aliases: ["changename"],
  usage: '',
  description: '',
  category: "ownerOnly",
  cooldown: 0,

  ownerOnly: true,
  toggleOff: false,

  

  async execute(client, message, args, ee, prefix) {    
    try{
    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(`#00ADA8`)
          
          .setTitle(`provide me a new  Name`)
          .setDescription(`**Usage:** \`${prefix}changebotname [New Bot Name]\``)
        ]
      });

    if (args.join(" ").length > 32)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(`#00ADA8`)
       
          .setTitle(`😔 Bot Name too long, can't have more then 32 Letters!`)
        ]
      });
    client.user.setUsername(args.join(" "))
      .then(user => {
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor(`#00ADA8`)
            
            .setTitle(`**my new Name is** : \`${user.username}\``)
          ]
        });
      })
       
} catch(e) {      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
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