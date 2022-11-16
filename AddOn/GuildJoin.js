const config = require(`${process.cwd()}/settings/config.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);

const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  try{
    const description = {
        name: "guild join AddOn",
    }
    client.logger(`Loaded ${description.name}`);

    client.on("guildCreate", async (guild) => {
        
    const {ownerId} = guild;
    const owner = await guild.members.fetch(ownerId);
     const join = client.channels.cache.get(config.joinlog);
if (!join) return;
 join.send({
   embeds: [new MessageEmbed()
           .setTitle(`${emote.guild}GUILD JOIN${emote.guild}`)
        .setDescription(`${emote.arrow}**Iam join a server**\n> __**Servername:**__ \n\`${guild.name}\`\n> __**Server ID:**__ \n\`${guild.id}\`\n> __**Total Members:**__ \n\`${guild.memberCount}\`\n> __**Owner:**__\n${owner.user.tag}\n\n`)
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