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
  name: "level-channel",
  aliases: ["set-lc", "setlc"],
  usage: 'level-channel #channel',
  description: "set leveling channel",
  category: "leveling",
  cooldown: 0,
  userPerms: "",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
   
   if (!args[0]) {
		  let b = await db.fetch(`rank_channel_${message.guild.id}`);
		  let channelName = message.guild.channels.cache.get(b);
		  if (message.guild.channels.cache.has(b)) {
			return message.channel.send(
			  `**Rank Channel Set In This Server Is \`${channelName.name}\`**`
			);
		  } else
			return message.channel.send(
			  "**<a:no:784463793366761532> Please Enter A Channel Name or ID To Set**"
			);
		}
			let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
	
			if (!channel || channel.type == 'text') return message.channel.send("**<a:no:784463793366761532> Please Enter A Valid Text Channel**");
	
			try {
				let a = await db.fetch(`rank_channel_${message.guild.id}`)
	
				if (channel.id === a) {
					return message.channel.send("**<a:no:784463793366761532> This Channel is Already Set As Rank Channel**")
				} else {
					client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("<a:yes:784463701305458708> **Rank Channel Set**")
					db.set(`rank_channel_${message.guild.id}`, channel.id)
	
					message.channel.send(`<a:yes:784463701305458708> **Rank Channel Has Been Set Successfully in \`${channel.name}\`**`)
				}
			} catch {
				return message.channel.send("<a:no:784463793366761532> **Error - `Missing Permissions Or Channel Is Not A Text Channel`**");
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