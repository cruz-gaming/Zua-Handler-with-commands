const config = require(`${process.cwd()}/settings/config.json`);
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ["p"],
    usage: 'play <song name/link>',
    description: 'play a song which you want',
    category: "music",
    cooldown: 0,
    userPerms: "",
    clientPerms: "CONNECT",
    ownerOnly: false,
    toggleOff: false,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args, ee, song ) {
        try {

            const {
                member,
                guild,
            } = message;

            const {
                channel
            } = member.voice;


            const search = args.join(" ")

            if (!search) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.mediancolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.m} Please specify a name of the song or link of the song`)
                ]
            });

            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x}  Join a Voice Channel to use this command`)
                ]
            });

            if (channel.userLimit != 0 && channel.full)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        
                        .setTitle(`Increase your voice channel capacity.after that use play command!`)
                    ]
                });


            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
                ]
            });

          
          message.react("<a:YuklenmeGif:955114222201745458>")

           /* let newmsg = await message.reply({
                content: `>>> ${client.allEmojis.music.searching} Searching: **${search}**`,
            }).then(msg => {
      let gg = msg.edit({content : `>>> hi`}).catch(e => {
                console.log(e)
            })*/
          setTimeout(() => {
message.react("🔍")
          },2500)
            const queue =  client.distube.getQueue(VoiceChannel);
             client.distube.play(VoiceChannel, search, {
                textChannel: message.channel,
                member: member
            });

            setTimeout(() => {
message.react("<a:verify:951686817260924938>")
          },2500)
      

          
/*
            msg.edit({
                content: `>>> ${queue?.songs?.length > 0 ? `${client.allEmojis.music.queue} Added to Queue` : `${client.allEmojis.music.play} Playing`}: **${search}**`,
            }).catch(e => {
                console.log(e)
            })
            },10 * 500)*/
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