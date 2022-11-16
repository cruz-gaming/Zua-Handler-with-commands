const config = require(`${process.cwd()}/settings/config.json`);
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ["vol"],
    usage: '',
    description: 'Increase or decrease volume ',
    category: "music",
    cooldown: 7,
    userPerms: "",
    clientPerms: "",
    ownerOnly: false,
    toggleOff: false,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args, ee) {
        try {

            const {
                member,
                guild,
            } = message;

            const {
                channel
            } = member.voice;


            const search = args.join(" ")

            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
                ],
            });

            if (channel.userLimit != 0 && channel.full)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter({text: ee.footertext, iconURL: ee.footericon})
                        .setTitle(`Your Voice Channel is full, I can't join!`)
                    ],
                });


            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
                ],

            });

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ]
            });

            const Volume = Number(args[0]);

            if (!Volume) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.mediancolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.m} Please specify a number between 1 and 150`)
                ]
            });

            if (Volume > 150 || Volume < 1)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.mediancolor)
                        .setTimestamp()
                        .setTitle(`${client.allEmojis.m} Please specify a number between 1 and 150`)
                    ]
                });

            client.distube.setVolume(VoiceChannel, Volume);
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.volume} Volume has been set to \`${Volume}\`!`)
                ]
            });


        } catch (e) {
            console.log(e)
            return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
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