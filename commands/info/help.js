const config = require(`${process.cwd()}/settings/config.json`);
const prefix = require(`${process.cwd()}/settings/config.json`);
const emotes = require(`${process.cwd()}/settings/emojis.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const Discord = require('discord.js');
  const moment = require("moment")
require("moment-duration-format")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});

const {
  Client,
  Message,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  MessageButton
} = require('discord.js');

module.exports = {
  name: "help",
  aliases: ["hlp", "h"],
  usage: '',
  description: "Get list of all commands",
  category: "info",
  cooldown: 10,
  userPerms: "SEND_MESSAGES",
  clientPerms: "SEND_MESSAGES",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
       if (args[0]) {
        const embed = new MessageEmbed()
          .setColor(ee.color)

        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed
              .setColor(ee.wrongcolor)
              .setDescription(`${client.allEmojis.x} No Information found for the command **${args[0].toLowerCase()}**`)
            ]
          });
        }
        if (cmd.name) embed.setTitle(`${client.allEmojis.y} Information About the Commands`);
        if (cmd.name) embed.addField("**<a:arrow_5:951687542569328650> Command name**", `\`${cmd.name}\``);
        if (cmd.description) embed.addField("**<a:arrow_5:951687542569328650> Description**", `\`${cmd.description}\``);
        if (cmd.aliases) try {
          embed.addField("**<a:arrow_5:951687542569328650> Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**<a:arrow_5:951687542569328650> Cooldown**", `\`${cmd.cooldown} Seconds\``);
        if (cmd.usage) {
          embed.addField("**<a:arrow_5:951687542569328650> Usage**", `\`${config.PREFIX}${cmd.usage}\``);
           embed.setFooter("Syntax: <> = required, [] = optional");
        }
        return message.reply({
          embeds: [embed]
        });
      } else {
    try{
        let totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)

        let menuOptions = [{
            label: 'Moderation',
            description: 'get moderation commands',
            value: 'modration',
            emoji: '987366512979476500',
          },
          {
            label: 'Application',
            description: 'get application commands',
            value: 'apply',
            emoji: '987366459820879893',
          },
          {
            label: 'Ticket',
            description: 'get ticket commands',
            value: 'ticket',
            emoji: '951737025256624218',
          },
          {
            label: 'music',
            description: 'hear music with high quality',
            value: 'music',
            emoji: '951700072662437918',
          },
          {
            label: 'automod',
            description: 'setup your server',
            value: 'auto',
            emoji: '951687698530324531',
          },
          {
            label: 'welcome',
            description: 'setup welcome and leave',
            value: 'welcome',
            emoji: '987637799656243202',
          },
          {
            label: 'leveling',
            description: 'check your level in your guild',
            value: 'level',
            emoji: '951687699255951370',
          },
          {
            label: 'Utility',
            description: 'get utility commands',
            value: 'utility',
            emoji: '993694073804300310',
          },
          {
            label: 'Info',
            description: 'get infos commands',
            value: 'info',
            emoji: '931955762467573760',
          },
          { 
            label: 'Information',
            description: 'get info about bot and developers',
            value: 'Information',
            emoji: '951687543265583114',
          },
          {
            label: 'Main menu',
            description: 'Return to main menu',
            value: 'option9',
            emoji: '959698030595014676',
          }
        ];
        let invite = new Discord.MessageButton()
      .setStyle('LINK')
      .setLabel('Invite Me') 
      .setURL(`${config.invite}`);
      let support = new Discord.MessageButton()
      .setStyle('LINK')
      .setLabel('Support Server') 
      .setURL(`${config.support}`);
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    let select = new MessageSelectMenu()
          .setCustomId("selector")
          .setPlaceholder("Click me to view the Help Menu Category Pages!")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(menuOptions)

    let row = new MessageActionRow()
    .addComponents(invite, support);

     let Menu_List = new MessageActionRow()
          .addComponents([select])
      
        const embed = new Discord.MessageEmbed()
        .setTitle(`__** ${client.user.tag}\`s list of commands** __`)
        .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()   
        .setColor(colors.green)
        .setImage(`https://media.discordapp.net/attachments/896674371500920832/957639405093404743/350kb.gif`)
        .addField("***__My Features __***",
`>>> **One of the best __Multi purpose__ Discord Bot!\n\n${emotes.aplay} Music \n\n<:settings:987366512979476500> Moderation\n\n ${emotes.store} Info\n\n ${emotes.apply} Application \n\n ${emotes.ticket} Ticket\n\n ${emotes.star} Utility\nand so many features!**`)                          
        .addField("__***STATS***__",` \n>>> **${emotes.ping} BotPing: ${Math.floor(client.ws.ping)}ms**\n\n**${emotes.users} Total users : ${totalUsers}**\n\n**${emotes.guild} Total Guilds : ${client.guilds.cache.size}**\n\n**${emotes.arrow} Prefix : ${config.PREFIX}**\n\n`)
     
          
          .addField("__***SECTION COMMANDS***__",`**To view Section commands select from menu by clicking below!**\n`)
        .addField("**__SUPPORTS__**",`> **If you find any bugs or glitches pls report it to developer by using the command \`${config.PREFIX}bugreport\`**\n> **Send your valuable feedback by using \`${config.PREFIX}feedback\`**`)
          
        const embed1 = new Discord.MessageEmbed()
        .setTitle('<a:settings_6:951687329481887784> ***__MODERATION __***')
        .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()  
          .setColor(colors.green)
        .setDescription(`${client.commands.filter((cmd) => cmd.category === "moderation").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);

        const embed2 = new Discord.MessageEmbed()
      .setTitle(`${emotes.store} ***__INFO __*** `)
       .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()   
          .setColor(colors.green)
         .setDescription(`${client.commands.filter((cmd) => cmd.category === "info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
        .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
     
     const music1 = new Discord.MessageEmbed()
      .setTitle(`${emotes.store} ***__MUSIC __*** `)
       .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()   
          .setColor(colors.green)
         .setDescription(`${client.commands.filter((cmd) => cmd.category === "music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
        .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);

      const embed3 = new Discord.MessageEmbed()
      .setTitle(`<a:dnx_tool:951685152856227890> ***__UTILITY __***`)
       .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()
        .setColor(colors.green)
  
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);

        const embed7 = new Discord.MessageEmbed()
      .setTitle(`${emotes.star} ***__TICKET __***`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()     
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "ticket").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
     
     const welcome1 = new Discord.MessageEmbed()
      .setTitle(`${emotes.star} ***__WELCOME __***`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()     
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "welcome").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
     
     const level = new Discord.MessageEmbed()
      .setTitle(`${emotes.level} ***__LEVELING __***`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()     
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "leveling").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
     
    const apply = new Discord.MessageEmbed()
      .setTitle(`${emotes.apply} ***__APPLICATION__***`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()     
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "apply").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
      
   
   
      const embed12 = new Discord.MessageEmbed()
      .setTitle(`${emotes.mod} ***__AUTOMOD __***`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()     
      .setDescription(`${client.commands.filter((cmd) => cmd.category === "automod").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `**•**\` ${cmd.name}\`\n╰ **${cmd.description}**`).join("\n")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);

        let server = await db.fetch(`sponcer_server_name`);
        if(server === null) server = `Loading....`;
        let link = await db.fetch(`sponcer_server_link`);
        if(link === null) link = `Loading........`;


      const embed8 = new Discord.MessageEmbed()
      .setTitle(`<a:diamond:951748047174508594> ***__INFORMATION __***`)
      .setImage(`https://media.discordapp.net/attachments/956536393906143243/957968378256035870/standard.gif`)
      .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()   
        .setColor(colors.green)
      .addField("**BOT INFORMATION**",`[${client.user.tag}](${config.invite})`)
      .addField("**powered by**","[STACK Development](https://discord.gg/NcCPUgKvTg)")
      .addField("**developed by**",`[RJRYT#7873](https://rjryt.tk/) and [BO$$#2548](https://cruzgaming.ml/)`)
     . addField("Host sponcered by", ` [${server}](${link})\n\n`)

      .addField("**usefull links**",`[invite](${config.invite}) • [support server](${config.support}) • [website](https://zuabot.ml/) • [vote](${config.vote})`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(colors.green);
         
         const embedend = new Discord.MessageEmbed()
      .setTitle(` __***Help section timeout***__`)
       .setFooter(`Requested by ${message.author.username}`)
  	.setTimestamp()
  
       .addField(`${emotes.star} **Command Timeout**`,`> **This help menu is expired! Please retype the command to view again.**`)
      .setThumbnail(client.user.displayAvatarURL())
   .setColor(colors.green);

      let Sendmenu = await message.reply({
          embeds: [embed],
          components: [Menu_List, row]
  
        })
    const collector = await Sendmenu.createMessageComponentCollector ({
           filter: (i) => (i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
             time: 85000
        })
    collector.on("collect" , (b) => {
      if (b.user.id !== message.author.id)
                return b.reply({
                  content: `${emotes.x} **This help menu is not for you.**`,
                  ephemeral: true
                });
        if(b.values[0] == "modration") {
            Sendmenu.edit({
          embeds: [embed1],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "info") {
            Sendmenu.edit({
          embeds: [embed2],
          components: [Menu_List, row] 
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "utility") {
            Sendmenu.edit({
          embeds: [embed3],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "ticket") {
            Sendmenu.edit({
          embeds: [embed7],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "music") {
            Sendmenu.edit({
          embeds: [music1],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "apply") {
            Sendmenu.edit({
          embeds: [apply],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "Information") {
            Sendmenu.edit({
          embeds: [embed8],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "auto") {
            Sendmenu.edit({
          embeds: [embed12],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }
        if(b.values[0] == "welcome") {
            Sendmenu.edit({
          embeds: [welcome1],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }  
        if(b.values[0] == "level") {
            Sendmenu.edit({
          embeds: [level],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }   
        if(b.values[0] == "option9") {
            Sendmenu.edit({
          embeds: [embed],
          components: [Menu_List, row]
        }).catch(e => {})
                b.deferUpdate().catch(e => {})
        }   
    })
    collector.on("end", (b) => {
        Sendmenu.edit({
          embeds: [embedend],
          components: [row]
        })
   })
      
    } catch (e) {
      message.channel.send(`${emotes.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
}
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