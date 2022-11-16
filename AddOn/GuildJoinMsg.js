const config = require(`${process.cwd()}/settings/config.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`);

const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
    const description = {
        name: "guild join message AddOn",
    }
    client.logger(`Loaded ${description.name}`);

    client.on("guildCreate", async (guild) => {
      try{
        const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

    let msgembed = new MessageEmbed()
        .setTitle(`${emote.y}Thanks For Adding Me!${emote.y}`)
        .setColor(colors.green)                      
        .setDescription(`**My Prefix for this server is** \`${config.PREFIX}\`\n **Use** \`${config.PREFIX}help\` **for more**\n**[invite me](${config.invite}) and join [support server](${config.support})**\n\n**Vote me in [DBL](${config.vote}) And support**`)
    if (!channel) return;
    await channel.send({
        embeds: [msgembed]
    })
        } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
    }
    });
    
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