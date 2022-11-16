const config = require(`${process.cwd()}/settings/config.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);

const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  try{
    const description = {
        name: "guild left AddOn",
    }
    client.logger(`Loaded ${description.name}`);

    client.on("guildDelete", async (guild) => {
     const left = client.channels.cache.get(config.leftlog);
if (!left) return;
 left.send({
   embeds: [new MessageEmbed()
           .setTitle(`${emote.guild}GUILD LEFT${emote.guild}`)
        .setDescription(`${emote.arrow}**Iam left a server**\n> __Servername:__ \n\`${guild.name}\`\n> __Server ID:__ \n\`${guild.id}\`\n> __Total Members:__ \n\`${guild.memberCount}\`\n> __Owner:__\n${guild.owner}\n\n`)
       .setFooter(`${client.guilds.cache.size} servers `)
       .setFooter(`${client.guilds.cache.size} servers `)
        .setTimestamp()
        .setColor("#ff52bf")
          ]
       });
    });  
  } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
    }
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