const config = require('../settings/config.json');
//const discordTranscripts = require('discord-html-transcripts');
const ee = require('../settings/embed.json')
const emojis = require('../settings/emojis.json');
const color = require('../settings/color.json');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Tickets.json`});

const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");

module.exports = async (client, prefix) => {
  

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "ticket") {

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('ticket')
          .setLabel('Create ticket')
      
          .setStyle("PRIMARY")
          .setDisabled(false),
      );

                var nameer = `ticket-${interaction.user.username}`
                var checkTickets = interaction.guild.channels.cache.find(c => c.name == nameer.split(' ').join('-').toLocaleLowerCase());
                if (checkTickets) {
            interaction.channel.send(`${interaction.user} you have already a ticket \`ticket-${interaction.user.username}\``
                    ).then(async function(m) {
                        setTimeout(() => {
                            m.delete();
                        }, 1000 * 7);
                    });
                    return
                }

interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    permissionOverwrites: [{
                           id: interaction.user.id,
                            allow: [ "VIEW_CHANNEL", `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`]
                        },
                        {
            id: (await db.fetch(`Staff_${interaction.guild.id}`)),
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
          },              
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
        
                    ],parent: (await db.fetch(`catagory_${interaction.guild.id}`)), position: 1, topic: `${interaction.user.id}`, reason: "ticket claim"
                    
                })
    .then(async function(channel) {
                    
      const rows = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('close')
          .setLabel('Close')
          .setEmoji('956526334815907920')
          .setStyle("SUCCESS")
          .setDisabled(false)    
      );
      
      let StaffRole = await db.fetch(`Staff_${interaction.guild.id}`);
      await channel.send({ content: `${interaction.user} <@&${StaffRole}>`,
        embeds: [new MessageEmbed()
          .setColor(color.green)
          .setTitle("TICKET SYSTEM")
          
          .setFooter(` 
  ${interaction.guild.name}`, interaction.guild.iconURL({
          dynamic: true
          }))
          .setTimestamp()
          .setDescription(` 
**Hello** __${interaction.user.tag}__ \n> **As your request i opened a private channel for you. Please say what __ help__ you need.**\n> **You can also ping the helpers** <@&${StaffRole}>.\n> **Interact with button to close your this ticket.**
`)],components: [rows]}).then(msg => {
                      msg.pin()
  });
});

      interaction.reply({ content: `**Your ticket is opened at** \`ticket-${interaction.user.username}\``, ephemeral: true })
    }

  if (interaction.customId === "close") {
if (!interaction.channel.name.includes("ticket-")) {
                interaction.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `This is not a ticket channel`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            const rowss = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('yes')
          .setLabel('Close')
          .setStyle("SUCCESS")
          .setDisabled(false),
         
         new MessageButton()
          .setCustomId('no')
          .setLabel('Cancel')
          .setStyle("SUCCESS")
          .setDisabled(false),
         
         
         );      
          interaction.reply({
            embeds: [new MessageEmbed()
          .setColor(color.green)
          .setTitle("TICKET SYSTEM")
          .setFooter(` 
  ${interaction.guild.name}`, interaction.guild.iconURL({
          dynamic: true
          }))
          .setTimestamp()
          .setDescription(`> **You are trying to close this ticket. Are you sure to close.**`)
  ]
          ,components: [rowss]
                
            })
            }
           
     if (interaction.customId === "confirm_yes") {
       interaction.reply({
      embeds: [new MessageEmbed()
      .setTitle(`Ticket will be deleted in 10 seconds!`)
      .setColor(color.green)]
})
       interaction.message.delete()
      setTimeout(async () => { 
        interaction.channel.delete();
                            }, 10 * 500)
}

if (interaction.customId == `no`) {
 
    interaction.message.delete()
  
}
  
if (interaction.customId === "yes") {
const rowsss = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('confirm_yes')
          .setLabel('Delete')
          .setStyle("DANGER")
          .setDisabled(false),

        new MessageButton()
          .setCustomId('no')
          .setLabel('Cancel')
          .setStyle("SUCCESS")
          .setDisabled(false),
         

         );
       interaction.reply({
            embeds: [new MessageEmbed()
            .setTitle(`Closed Ticket`)
            .setDescription(`**This ticket is closed by ${interaction.user.tag}.**`)
     .setColor(color.red)], components : [rowsss]
                            })
  let channel = interaction.channel
              
  setTimeout(async () => {
                channel.setName(`🔴-closed-ticket`)
    const user = client.users.cache.get(channel.topic);
     channel.permissionOverwrites.edit(user,{
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false
})
})
  interaction.message.delete()
}

})
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