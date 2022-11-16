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
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Application.json`});
const emote = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {
  name: "apply",
  aliases: [],
  usage: '',
  description: "starting dm questions",
  category: "apply",
  cooldown: 10,
  userPerms: "",
  clientPerms: "",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
  	
    try {
let startmsg = await db.fetch(`application_${message.member.guild.id}_start`);
if(startmsg === null) startmsg = `**New application from**`;
let endmsg = await db.fetch(`application_${message.member.guild.id}_end`);
if(endmsg === null) endmsg = `**Application submitted**`;
let app_title = await db.fetch(`application_${message.member.guild.id}_title`);
if(app_title === null) app_title = "New Application";
let whitelised = await db.fetch(`application_${message.guild.id}_whitelist`);
if(whitelised === null) whitelised = `Make him whitelist`;
let pendindss = await db.fetch(`application_${message.guild.id}_pending`);
if(pendindss === null) pendindss = `Make him waiting`;
let rejects = await db.fetch(`application_${message.guild.id}_rejects`);
if(rejects === null) rejects = `Make him reject`;
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('nothing')
                    .setLabel(`From ${message.member.guild.name}`)
                    .setStyle("SECONDARY")
        .setDisabled(true), 
            );
           
           const rows = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('whitelist')
                    .setLabel(`${whitelised}`)
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId('pending')
                    .setLabel(`${pendindss}`)
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId('reject')
                    .setLabel(`${rejects}`)
                    .setStyle("DANGER"),
            );
      const status = await db.fetch(`application_${message.guild.id}_status`);
      if(status === null) return message.reply({content: "**This server is not setuped application**", ephemeral: true});
      const QS = await db.fetch(`application_question_${message.guild.id}_Status`);
      if(QS === null) return message.reply({content: `This server is not setuped application questions.`, ephemeral: true})
      const count = await db.fetch(`application_${message.guild.id}_QCount`);

let questions = [];
for(let i = 1; i <= count; i++)
{
  let qs = db.fetch(`application_question_${message.member.guild.id}_${i}`);
  questions[i-1] = qs;
}
      
if (message.author.bot) { return } message.react("<a:DM:971853993699594250>");

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;
        await message.author.send({content: startmsg,components : [row]});
        await db.set(`application_${message.guild.id}_user`, message.author.id)
        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;

        const collector = channel.createMessageCollector({filter});

        collector.on("collect", () => {
          if (collectCounter < questions.length){
            channel.send(questions[collectCounter++]);
          }else{
            channel.send({content: endmsg});
            collector.stop("fulfilled")
          }
        })
      const appch = await db.fetch(`application_${message.guild.id}_channel`)  
        const appsChannel = client.channels.cache.get(`${appch}`);
        collector.on("end", (collected, reason) => {
          if (reason === "fulfilled"){
            let index = 1;
            const mappedResponse = collected.map((msg) => {
              return `${index++} ${questions[endCounter++]}\n>  **${msg.content}**`
            })
            .join("\n\n");

              const embed = new MessageEmbed()
              .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true})})
              .setTitle(app_title)
              .setDescription(mappedResponse)
              .setColor("f5f5f5")
              .setTimestamp()
            
          
              appsChannel.send({ content:`${message.author.id}`, embeds: [embed],components: [rows] })
          }
        
        }); 
                              
                                
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
      