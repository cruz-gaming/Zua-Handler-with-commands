const config = require(`${process.cwd()}/settings/config.json`);

const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');

module.exports = {

  name: 'avatar',
  aliases: ["av"],
  usage: '!avatar',
  description: 'members avatar',
  cooldown: 0,
  category: "info",
  userPerm: "EMBED_LINKS",
  botPermissions: "EMBED_LINKS",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee) {

    try {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

const row = new MessageActionRow()

            .addComponents(

                new MessageButton()

                    .setURL(`${member.displayAvatarURL({format: "png"})}`, true)

                    .setLabel('PNG')

                    .setStyle("LINK"),

                    new MessageButton()

                    .setURL(`${member.displayAvatarURL({format: "jpg"})}`, true)

                    .setLabel('JPG')

                    .setStyle("LINK"),

                    new MessageButton()

                    .setURL(`${member.displayAvatarURL({format: "webp"})}`, true)

                    .setLabel('WEBP')

                    .setStyle("LINK"),

);

        const avatarMenu = new MessageActionRow().addComponents(

            new MessageSelectMenu({

                placeholder: 'Choose the Image Size',

                customId: 'main',

                options: [

                    {

                        label: '128 pixels',

                        value: "Option 1",

                        emoji: '🖼️',

                    },

                    {

                        label: '256 pixels',

                        value: "Option 2",

                        emoji: '🖼️',

                    },

                    {

                        label: '[Original] 1024 pixels',

                        value: "Option 0",

                        emoji: '🖼️',

                    },

                ]

            }),

        );

        const avtEmbed = new MessageEmbed()

            .setColor(ee.color)

            .setTitle('Size : 1024px')

        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))

            

        let avt = await message.channel.send({ content: 'Avatar ' + member.user.tag, embeds: [avtEmbed], components: [avatarMenu] })

        const filter = async interaction => {

            if (interaction.user.id !== message.author.id) {

                interaction.reply({

                    content: "<:cross:906786021524525087> Don't help other people to select the menu",

                    ephemeral: true

                });

                return false;

            };

            return true;

        }

        const collector = avt.createMessageComponentCollector({

            filter,

            componentType: 'SELECT_MENU',

            time: 50000,

        })

        collector.on('collect', async (menu) => {

            if (menu.values[0] === 'Option 1') {

                menu.update({

                    embeds: [

                        avtEmbed.setTitle('Size : 128px').setImage(member.user.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))

                    ]

                })

            } else if (menu.values[0] === 'Option 0') {

                menu.update({

                    embeds: [

                        avtEmbed.setTitle('Size : 1024px').setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))

                    ]

                })

            } else if (menu.values[0] === 'Option 2') {

                menu.update({

                    embeds: [

                        avtEmbed.setTitle('Size : 256px').setImage(member.user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))

                    ]

                })

            }

        })

        collector.on('end', async (menu) => {

            avt.edit({ components: [row] });

        })

    } catch (e) {

      console.log(String(e.stack).bgRed)

      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);

      return errorLogsChannel.send({

        embeds: [new MessageEmbed()

          .setColor("RED")

          .setAuthor(message.guild.name, message.guild.iconURL({

            dynamic: true

          }))

          .setTitle(`${client.allEmojis.x} Got a Error:`)

          .setDescription(`\`\`\`${e.stack}\`\`\``)

          .setFooter(`Having: ${message.guild.memberCount} Users`)

        ]

      })

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