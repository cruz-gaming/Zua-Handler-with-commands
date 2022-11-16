const config = require(`${process.cwd()}/settings/config.json`);
const {
    MessageEmbed
} = require('discord.js');
/*const db = require("old-wio.db");*/
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});
const emote = require(`${process.cwd()}/settings/emojis.json`);
const embed = require(`${process.cwd()}/settings/embed.json`);
const colors = require(`${process.cwd()}/settings/color.json`);
const Discord = require("discord.js");
const {  onCoolDown, escapeRegex } = require(`${process.cwd()}/handlers/functions`);

module.exports = {
    name: "messageCreate",

    async execute(client, message) {

        try {
            if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;


          
          
           
           
            let prefix = await db.fetch(`guildprefix_${message.guild.id}`);
    if (prefix === null) prefix = config.PREFIX;
          
            if (message.author.bot) return;

            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
            if (!prefixRegex.test(message.content)) return;
            const [, mPrefix] = message.content.match(prefixRegex);

            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
                return message.reply({
                content:   `I don't have permission  to \`USE_EXTERNAL_EMOJIS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
                return message.reply({ embeds: [new MessageEmbed()
                        .setColor('RED')
                        .setTitle(` I am missing the Permission to \`EMBED_LINKS\``)
                    ]
                    
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`${emote.x} I am missing the Permission to \`ADD_REACTIONS\``)
                    ]
                })

            const args = message.content.slice(mPrefix.length).trim().split(/ +/);
            const cmd = args.shift()?.toLowerCase();

            if (cmd.length === 0) {
                if (mPrefix.includes(client.user.id))
                    return message.reply({
                        embeds: [new MessageEmbed()
                          
      .setColor(colors.green)                      
    .setTitle(`${emote.y} Hello Iam zua ${emote.y}`)
        .setDescription(`**My Prefix for this server is** \`${prefix}\`\n **Use** \`${prefix}help\` **for more**\n**[invite me](${config.invite}) and join [support server](${config.support})**\n\n**Vote me in [DBL](${config.vote}) And support**`)
        .setFooter(`Mentioned me by ${message.author.username}`)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({dynamic: true}))
                        ]
                    }).catch(() => {});
                return;
            }

            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                try {
                    if (command.toggleOff) {
                        return await message.reply({
                            embeds: [new MessageEmbed()
                                .setDescription(`${emote.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                                .setColor(embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e))
                                })
                            }, 3000)
                        }).catch((e) => {
                            console.log(String(e))
                        });
                    }
                    if (command.ownerOnly) {
                        if (!config.ownerid.includes(message.author.id)) return await message.reply({
                            embeds: [new MessageEmbed()
                                .setDescription(`${emote.x}**You cannot use \`${prefix}${command.name}\` command as this is a developer command.**`)
                                .setColor(embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e))
                                })
                            }, 3000)
                        }).catch((e) => {
                            console.log(String(e))
                        });
                    }
                    
                    if (command.adminOnly) {
                        if(roles = role.permissions.has('ADMINISTRATOR'))
      return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`Can't give role.This role have \`ADMINISTRATOR \``)
         ]}).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e))
                                })
                            }, 3000)
                        }).catch((e) => {
                            console.log(String(e))
                        });
                    }
                    if (!message.member.permissions.has(command.userPerms)) return await message.reply({
                        embeds: [new MessageEmbed()
                            .setDescription(`${emote.x} **You do not have \`${command.userPerms}\` permission to use \`${prefix}${command.name}\` command!**`)
                            .setColor(`RED`)
                        ]
                    }).catch((e) => {
                        console.log(e)
                    });
                    if (!message.guild.me.permissions.has(command.clientPerms)) return await message.reply({
                        embeds: [new MessageEmbed()
                            .setDescription(`${emote.x} **I do not have \`${command.clientPerms}\` permission to use \`${prefix}${command.name}\` command!**`)
                            .setColor(`RED`)
                        ]
                    }).catch((e) => {
                        console.log(e)
                    });

                  
                    if (onCoolDown(message, command)) {
                        return await message.reply({
                            embeds: [new MessageEmbed()
                                .setColor(`RED`)
                                .setDescription(`${emote.x} **Please wait \`${onCoolDown(message, command).toFixed(1)} seconds\` Before using the \`${prefix}${command.name}\` command again!.**`)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e))
                                })
                            }, 3000)
                        }).catch((e) => {
                            console.log(String(e))
                        });
                    }
                    command.execute(client, message, args, prefix);
                    console.log(`${command.name} `.brightGreen + ` used in ${message.guild.name}`.red + ` by ${message.author.tag}`.cyan)
                  /*  console.log(`${command.name} used in ${message.guild.name} by ${message.author.tag}`)*/
                  const commandLogsChannel = client.channels.cache.get(config.cmdlog);
                    if (!commandLogsChannel) return;
                    commandLogsChannel.send({
                        embeds: [new MessageEmbed()
                            .setColor(`GREEN`)
                            .setTitle(`${emote.star} command use log | from ${message.guild.name}`)
                            .addField(`**${emote.users} Author**`, `\`${message.author.tag}\``)
                            .addField(`${emote.arrow}** Command Name**`, `\`${command.name}\``)
                        .setThumbnail(message.guild.iconURL({dynamic: true}))
.setImage("https://media.discordapp.net/attachments/888037025289211944/888072704471728169/48f84e1533414c42a803b2e88cd257611a669f1br1-320-1_hq.gif")  
                        ]
                    });
                } catch (e) {
                    console.log(e.stack);
                  client.dclog(e.stack);
                }
            }   
        } catch (e) {
            console.log(e)
            return client.channels.cache.get(config.modlog).send({
                embeds: [new MessageEmbed()
                    .setTitle(`${emote.x} SOMTHING BAD IS HAPPENED`)
                    .setDescription(`\`${e.stack}\``)
                ]
            });
        }
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