const config = require(`${process.cwd()}/settings/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const {
    JsonDatabase
} = require("wio.db");

const db = new JsonDatabase({
  databasePath:"./databases/warn.json"
});
const Discord = require('discord.js');
const ms = require('ms');
const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {
  name: "warn",
  aliases: [],
  usage: '',
  description: "Discription",
  category: "moderation",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_ROLES",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix,guild ) {
  	
    try {
   const user = message.mentions.members.first();
	  
		  if (!user) {
			return message.channel.send(
			  "**Please mention a user**"
			);
		  }
	  
		  if (message.mentions.users.first().bot) {
			return message.channel.send("<a:no:784463793366761532> **You can not warn bots**");
		  }
	  
		  if (message.author.id === user.id) {
			return message.channel.send("**You can not warn yourself -_-**");
		  }

      /*const id = message.content.match(/<?@?!?(\d{17,19})>?/)[1]
     
/*const {guild } = message.guild.id
	  const {ownerId} = guild;
    const owner = await guild.members.fetch(ownerId);
		  if (user.id === message.guild.owner.id) {
			return message.channel.send(
			  "<a:no:784463793366761532> **Bruh, you can not warn server owner -_-**"
			);
      }*/
	  
		  const reason = args.slice(1).join(" ");
	  
		  if (!reason) {
			return message.channel.send(
			  "**Please provide \`reason\` to warn**"
			);
		  }

    let warnings = db.fetch(`warnings_${message.guild.id}_${user.id}`);
	  
		  if (warnings === null) {
			db.set(`warnings_${message.guild.id}_${user.id}`, 1);
			var warningEmbed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle(`**You've been warned in ${message.guild.name}**`)
			.addField('Warned by', `**${message.author.tag}**`)
			.addField('Reason', `**${reason}**`)
			.setTimestamp();
			user.send({embeds :[warningEmbed]});

			var warnSuccessfulEmbed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setDescription(`<a:yes:784463701305458708> **User Successfully Warned**`)
			.addField('Warned by', `${message.author}`)
			.addField('Reason', `**${reason}**`)
			let mChannel = db.fetch(`modlog_${message.guild.id}`)
		    if(!mChannel) return message.channel.send({embeds: [warnSuccessfulEmbed]})
		    let warnChannel = message.guild.channels.cache.get(mChannel)
		    if(!warnChannel) return;
		    warnChannel.send(warnSuccessfulEmbed)
		  } else if(warnings !== null) {
			
			db.add(`warnings_${message.guild.id}_${user.id}`, 1);
			
			var warningEmbed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle(`**You've been warned in ${message.guild.name}**`)
			.addField('Warned by', `**${message.author.tag}**`)
			.addField('Reason', `**${reason}**`)
			.setTimestamp();
			user.send({embeds: [warningEmbed]});
       
let warnigs = db.fetch(`warnings_${message.guild.id}_${user.id}`);
			
			var warnSuccessfulEmbed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setDescription(`**USER SUCCESSFULLY WARNED**`)
       .addField('User',`${user}(${message.mentions.user})`)
       
			.addField('Warned by', `${message.author}(${message.author.tag})`)
        .addField('user have now',`${warnigs}`)
			.addField('Reason', `**${reason}**`)
       .setTimestamp()

		  //  message.delete(); 
		    let mChannel = db.fetch(`modlog_${message.guild.id}`)
		    if(!mChannel) return message.channel.send({embeds:[warnSuccessfulEmbed]})
		    let warnChannel = message.guild.channels.cache.get(mChannel)
		    if(!warnChannel) return;
		    warnChannel.send({embeds: [warnSuccessfulEmbed]})
			
			
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