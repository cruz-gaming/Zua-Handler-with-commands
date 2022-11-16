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
  name: "leaderboard",
  aliases: ["lb"],
  usage: '',
  description: "Get Guild Leveling leaderboard",
  category: "leveling",
  cooldown: 0,
  userPerms: "",
  clientPerms: "",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
   
   let lbMessage = db.all().filter(data => data.ID.startsWith(`msgxp_${message.guild.id}`)).sort((a, b) => b.data - a.data)
		lbMessage.length = 10;
		var finalLb = ""
  
		for (var i in lbMessage) {
			finalLb += `${lbMessage.indexOf(lbMessage[i])+1}. <@${message.client.users.cache.get(lbMessage[i].ID.split('_')[2]) ? message.client.users.cache.get(lbMessage[i].ID.split('_')[2]).id : "Unknown User#0000"}> ${lbMessage[i].data}\n`;
		}
		const embed = new Discord.MessageEmbed()
			.setAuthor(`${message.guild.name}'s Message Leaderboard`)
		//	.setColor(colors.main)
			.setDescription(`**${finalLb}**`)
			.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
			.setTimestamp()
		message.channel.send({embeds: [embed]});
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