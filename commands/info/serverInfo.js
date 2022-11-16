const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const moment = require("moment");
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "serverinfo",
  aliases: [],
  usage: '',
  description: "Gives you information on how fast the Bot can respond to you",
  category: "info",
  cooldown: 10,
  userPerms: "",
  clientPerms: "",
  ownerOnly: false,
  toggleOff: false,
 premium: false, 

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, prefix, Function, Color, Config, Emote) {
    try {
const { guild } = message;
    const { channels, roles, ownerId } = guild;
const totalChannels = channels.cache.size;
      const owner = await guild.members.fetch(ownerId);
    const createdAt = moment(guild.createdAt);
      const categories = channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size;
      const textChannels = channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
    const voiceChannels = channels.cache.filter((c) => c.type === "GUILD_VOICE" || c.type === "GUILD_STAGE_VOICE").size;
    const threadChannels = channels.cache.filter(
      (c) => c.type === "GUILD_PRIVATE_THREAD" || c.type === "GUILD_PUBLIC_THREAD"
    ).size;

    const memberCache = guild.members.cache;
    const all = memberCache.size;
    const bots = memberCache.filter((m) => m.user.bot).size;
    const users = all - bots;
    const onlineUsers = memberCache.filter((m) => !m.user.bot && m.presence?.status === "online").size;
    const onlineBots = memberCache.filter((m) => m.user.bot && m.presence?.status === "online").size;
    const onlineAll = onlineUsers + onlineBots;
    const Online = message.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size;
    const ofline = message.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size;
        

        const rolesCount = roles.cache.size;
        
    const rolesString = roles.cache
      .filter((r) => !r.name.includes("everyone"))
      .map((r) => `${r.name}[${getMembersInRole(memberCache, r)}]`)

           let { verificationLevel } = guild;
    switch (guild.verificationLevel) {
      case "VERY_HIGH":
        verificationLevel = "┻�?┻ミヽ(ಠ益ಠ)ノ彡┻�?┻";
        break;

      case "HIGH":
        verificationLevel = "(╯°□°）╯︵ ┻�?┻";
        break;

      default:
        break;
    }

      message.reply({ embeds:[new MessageEmbed()
        .setColor(`#10F6F2`)
      .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(`

**__INFORMATION OF THIS SERVER__**
`)
.addField("SERVER NAME",`\`\`\`${message.guild.name}\`\`\``)
.addField("GUILD ID",`\`\`\`${message.guildId}\`\`\``)
.addField("GUILD OWNER",`\`\`\`${owner.user.tag}\`\`\``)
.addField("GUILD PROFILE ",`[Click here](${guild. iconURL({format: "png"})})`, true)
    .addField(`Server Members [${all}]`, `\`\`\` Total Members: ${users}\nTotal Bots: ${bots}\nOnline members : ${Online}\nOffline members : ${ofline}\`\`\``, true)
      
      .addField(
        `Categories and channels [${totalChannels}]`,
        `\`\`\`Categories: ${categories} | Text: ${textChannels} | Voice: ${voiceChannels} | Thread: ${threadChannels}\`\`\``,
        false
      )
      
      .addField("Verification", `\`\`\`${verificationLevel}\`\`\``, true)
      .addField("Boost Count", `\`\`\`${guild.premiumSubscriptionCount}\`\`\``, true)
      .addField(
        `Server Created [${createdAt.fromNow()}]`,
        `\`\`\`${createdAt.format("dddd, Do MMMM YYYY")}\`\`\``,
        false
      )
]
                    });
        function getMembersInRole(members, role) {
  return members.filter((m) => m.roles.cache.has(role.id)).size;
        
        }
                              }catch (e) {
                                Function.SendErrorEmbed(message, "Somthing is wrong. please try again later", true);
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
