const config = require(`${process.cwd()}/settings/config.json`);
const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
MessageSelectMenu  
} = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Application.json`});
module.exports = async (client) => {
  try{
    const description = {
        name: "Application AddOn",
    }
    client.logger(`Loaded ${description.name}`);

    client.on('interactionCreate', async (interaction ) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "whitelist") {

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('nothing')
          .setLabel('Whitelisted')
          .setStyle("SUCCESS")
          .setDisabled(true),
      );
     
     const rog = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('nothing')
                    .setLabel(`From ${interaction.member.guild.name}`)
                    .setStyle("SECONDARY")
        .setDisabled(true), 
            );
            
    
    const channel1 = await db.fetch(`application_${interaction.guild.id}_channel`)
     const channel = interaction.client.channels.cache.get(channel1)
     channel.messages.fetch(interaction.message.id).then(message => {
       
      const chaccept = db.fetch(`application_${interaction.guild.id}_wchannel`)
     const acceptchannel = interaction.client.channels.cache.get(chaccept)
      const heading = db.fetch(`application_${interaction.member.guild.id}_title`);
    if(heading === null) return;
   
  
           
     const guild = client.guilds.cache.get(interaction.guild.id);
    
     const user = guild.members.cache.get(message.content);       
             
            
       user.user.send({embeds: [new MessageEmbed()

              .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
              .setDescription(`\n\n> **User : <@${message.content}> has whitelisted**\n> **Application for : ${heading} **\n> Whitelisted by : ${interaction.user}**\n> **ENJOY!**`)
              .setColor("GREEN")
             .setFooter(`${interaction.guild.name}`)
            
              .setTimestamp()
              ], components: [rog]})
       acceptchannel.send ({embeds: [new MessageEmbed()

              .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
              .setDescription(`\n\n> **User : <@${message.content}> has whitelisted**\n> **Application for : ${heading} **\n> Whitelisted by : ${interaction.user}**\n> **ENJOY!**`)
              .setColor("GREEN")
             .setFooter(`${interaction.guild.name}`)
             
              .setTimestamp()
              ]})
               const role =  db.fetch(`application_${interaction.guild.id}_role_whitelist`);
              user.roles.add(`${role}`)
    message.edit({ content: `Whitelisted By :- ${interaction.user.tag}`, components: [row] })
    interaction.reply({ content: `<@${message.content}> is whitelisted`, ephemeral: true })
    })
                                                         }   
if (interaction.customId === "pending") {

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('nothing')
          .setLabel('Whitelisted')
          .setStyle("SUCCESS")
          .setDisabled(true),
      );
      const rows = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('whitelist')
          .setLabel('Whitelist')
          .setStyle("SUCCESS")
          .setDisabled(false),
      );


      const rog = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('nothing')
                    .setLabel(`From ${interaction.member.guild.name}`)
                    .setStyle("SECONDARY")
        .setDisabled(true), 
            );

  
    
    const channel1 = await db.fetch(`application_${interaction.guild.id}_channel`)
     const channel = interaction.client.channels.cache.get(channel1)
     channel.messages.fetch(interaction.message.id).then(message => {
      
     const chaccept = db.fetch(`application_${interaction.guild.id}_wpchannel`)
     const pendingchannel = interaction.client.channels.cache.get(chaccept)
      const heading = db.fetch(`application_${interaction.member.guild.id}_title`);
    if(heading === null) return;   
     const guild = client.guilds.cache.get(interaction.guild.id);
     const user = guild.members.cache.get(message.content);       
       user.user.send({embeds: [new MessageEmbed()

              .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
              .setDescription(`\n\n> **hello <@${message.content}> Thanks for your time**\n> **Your application for ${heading} is appoved by ${interaction.user}\n> join waiting vc for whitelist**\n> **\n> **ENJOY!**`)
              .setColor("GREEN")
             .setFooter(`${interaction.guild.name}`)
            
              .setTimestamp()
              ], components: [rog]})
       pendingchannel.send ({embeds: [new MessageEmbed()

              .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
              .setDescription(`> **hello <@${message.content}> Thanks for your time**\n> **Your application for ${heading} is appoved by ${interaction.user}\n> join waiting vc for whitelist **\n> **ENJOY!**`)
              .setColor("GREEN")
             .setFooter(`${interaction.guild.name}`)
             
              .setTimestamp()
              ]})
       const role =  db.fetch(`application_${interaction.guild.id}_role_pending`);
       
    user.roles.add(`${role}`)
   
  
  
       
    message.edit({ components: [rows] })
    interaction.reply({ content: `<@${message.content}> is waiting list`,  ephemeral: true })
    })
        }           
  
  if (interaction.customId === "reject") {

    

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('nothing')
          .setLabel('rejected')
          .setStyle("SUCCESS")
          .setDisabled(true),
      );

      const rog = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('nothing')
                    .setLabel(`From ${interaction.member.guild.name}`)
                    .setStyle("SECONDARY")
        .setDisabled(true), 
            );

      const channel1 = await db.fetch(`application_${interaction.guild.id}_channel`)
      const channel = interaction.client.channels.cache.get(channel1)
      channel.messages.fetch(interaction.message.id).then(message => {
        const chreject = db.fetch(`application_${interaction.guild.id}_wrchanne`)
        const rejectchannel = interaction.client.channels.cache.get(chreject)
         const heading = db.fetch(`application_${interaction.member.guild.id}_title`);
       if(heading === null) return;   
        const guild = client.guilds.cache.get(interaction.guild.id);
        const user = guild.members.cache.get(message.content);       
          user.user.send({embeds: [new MessageEmbed()
   
                 .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
                 .setDescription(`\n\n> **hello <@${message.content}> Thanks for your time**\n> **Your application for ${heading} is rejected by ${interaction.user}\n> reapply to get whitelist**`)
                 .setColor("GREEN")
                .setFooter(`${interaction.guild.name}`)
               
                 .setTimestamp()
                 ], components: [rog]})
                /* rejectchannel.send ({embeds: [new MessageEmbed()
   
                 .setTitle(`APPLICATION RESULT | ${interaction.guild.name}`)
                 .setDescription(`> **hello <@${message.content}> Thanks for your time**\n> **Your application for ${heading} is rejected by ${interaction.user}\n> reapply to get whitelist**`)
                 .setColor("GREEN")
                .setFooter(`${interaction.guild.name}`)
                
                 .setTimestamp()
                 ]})*/

                 const role =  db.fetch(`application_${interaction.guild.id}_role_reject`);
       
                 user.roles.add(`${role}`)

      message.edit({content: `rejected By :- ${interaction.user.tag}`, components: [row] })
      interaction.reply({ content: `<@${message.content}> is rejected`,  ephemeral: true })
      })
    }

    })
          
              
    } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
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