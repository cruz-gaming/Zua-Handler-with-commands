const config = require(`${process.cwd()}/settings/config.json`);

const db = require("old-wio.db");

const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {

    name: '24',

    aliases: [],

    usage: '',

    description: 'make 24/7 on your server',

    category: "music",

    cooldown: 0,

    userPerms: "",

    clientPerms: "",

    ownerOnly: false,

    toggleOff: true,

  async execute(client, message, args, ee, prefix) {

  	

    try {
        
        


const {

                member,

                guild,

            } = message;
        
        const VoiceChannel = member.voice.channel;

const msg = await message.channel.send(`**Loading please wait...**`);

    const queue = await client.distube.getQueue(VoiceChannel);

    if (!queue) return msg.edit("No song/s currently playing within this guild.");

    const { channel } = message.member.voice;

    if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

    if (queue.twentyFourSeven) {

      queue.twentyFourSeven = false;

      const off = new MessageEmbed()

        .setDescription("24/7 :** `Disabled`")

        .setColor('#000001');

      msg.edit({ content: " ", embeds: [off] });

      console.log(chalk.magenta(`[COMMAND] 24/7 used by ${message.author.tag} from ${message.guild.name}`));

    } else {

      queue.twentyFourSeven = true;

      const on = new MessageEmbed()

        .setDescription(" ** 24/7:** `Enabled`")

        .setColor('#000001');

      msg.edit({ content: " ", embeds: [on] });

      console.log(chalk.magenta(`[COMMAND] 24/7 used by ${message.author.tag} from ${message.guild.name}`));

    }

               

    } catch (e) {

      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);

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