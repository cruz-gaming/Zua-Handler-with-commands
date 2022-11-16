const config = require(`${process.cwd()}/settings/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/leveling.json`});
const Discord = require('discord.js');


//const cooldown = new Set();

const Canvacord = require('canvacord')
const canvas = require('canvacord')


const ms = require('ms');
const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {
  name: "rank",
  aliases: [],
  usage: '',
  description: "Get Users rank",
  category: "leveling",
  cooldown: 0,
  userPerms: "",
  clientPerms: "",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
   let user = message.mentions.users.first() || message.author

        var reqXP;

		
		 lbMessage = db.all().filter(data => data.ID.startsWith(`msgxp_${message.guild.id}`)).sort((a, b) => b.data - a.data);
		let levelfetch = db.fetch(`level_${message.guild.id}_${user.id}`);
      let rankMsg = await db.get(`msgxp_${message.guild.id}_${user.id}`);
   //reqXP = (levelfetch + 1) * 25;
      reqXP = getlvlmax(levelfetch);
	let place = lbMessage.findIndex(p => p.ID === `msgxp_${message.guild.id}_${user.id}`)
        let defualt_bg = 'https://media.discordapp.net/attachments/982133215357718588/998127235573747743/PicsArt_07-17-12.51.05.jpg'

        let bg = db.fetch(`rankbg_${user.id}`)
        if(bg == null) bg = defualt_bg
		    const color = ["#64F14B", "#0A782F"]
        const rankCard = new canvas.Rank()
                 .setAvatar(user.displayAvatarURL({
            format: 'png'
        }))
        .setCurrentXP(rankMsg || 0)
        .setRequiredXP(reqXP)
        .setProgressBar(color, "GRADIENT")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", `${bg}`)
        .setProgressBarTrack("#000")
        .setLevel(levelfetch || 0, 'Level: ', true)
        .setRank(place + 1, 'Rank: ', true)
 
    rankCard.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data,"RankCard.png");
            message.channel.send({files : [attachment]});
        });
    
    } catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
    }
  }
}

function getlvlmax(lvl){
    if(lvl == 0) return 500;
    else if(lvl == 1) return 1000;
    else if(lvl == 2) return 2000;
    else if(lvl == 3) return 3000;
    else if(lvl == 4) return 4000;
    else if(lvl == 5) return 5000;
    else if(lvl == 6) return 6000;
    else if(lvl == 7) return 8000;
    else if(lvl == 8) return 10000;
    else if(lvl == 9) return 15000;
    else if(lvl == 10) return 20000;
    else if(lvl == 11) return 50000;
    else if(lvl == 12) return 100000;
    else if(lvl == 13) return 500000;
    else if(lvl == 14) return 1000000;
    else if(lvl == 15) return 2000000;
    else if(lvl == 16) return 5000000;
    else if(lvl == 17) return 10000000;
    else if(lvl == 18) return 20000000;
    else if(lvl == 19) return 35000000;
    else if(lvl == 20) return 50000000;
    else
        return 90000000;
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