const emote = require(`${process.cwd()}/settings/emojis.json`);
const config = require(`${process.cwd()}/settings/config.json`);
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
MessageSelectMenu  
} = require('discord.js');
const emoji = require(`${process.cwd()}/settings/emojis.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Application.json`});
const component = MessageActionRow;
const embed = MessageEmbed;
const button = MessageButton;
const menu = MessageSelectMenu;

module.exports = {
  name: "setup-application",
  aliases: ["set-app"],
  usage: '',
  description: "setup application",
  category: "apply",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "EMBED_LINKS",
  ownerOnly: false,
  toggleOff: false,


  async execute(client, message, args, ee, prefix) {
    try {

const count = await db.fetch(`application_${message.guild.id}_status`);
      if(count === 1) return message.channel.send("**This server is already setuped application\nuse \`reset-application\` to reset**");
      
      let channel_status = 0;
      let count_status = 0;
      let title_status = 0;
      let start_status = 0;
      let end_status = 0;
      let wchannel = 0;
      let wpchannel = 0;
      let wrchannel = 0;
      let role1_status = 0;
      let role2_status = 0;
      let role3_status = 0;
      
  let but = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("Finish")
   .setEmoji(emoji.y)
   .setCustomId("embc"),
   new button()
   .setStyle("DANGER")
   .setLabel("Cancel")
   .setEmoji(emoji.x)
   .setCustomId("embd")
  )  
  
  let opt = new component().addComponents(
  new menu()
   .setCustomId("embedder")
   .setPlaceholder("Select an option")
   .addOptions([
       {
      label: "1.Channel",
      description: "Set channel for submit application",
      value: "channel"
       },
       {
      label: "2.Heading",
      description: "Set a heading for the application",
      value: "heading"
       },
       {
      label: "3.Question Count",
      description: "Set count for questions",
      value: "count"
       },
       {
      label: "4.Application starting message",
      description: "Set message for when started dming",
      value: "start"
       },
       {
      label: "5.Application last message",
      description: "Set message for when end dming",
      value: "end"
       },
       {
      label: "6.Whitelist result Channel",
      description: "Set channel for whitelist result",
      value: "success"
       },
        {
      label: "7.Pending result Channel",
      description: "Set channel for whitelist pending result",
      value: "pendings"
       },
       {
      label: "8.Reject result Channel",
      description: "Set channel for whitelist reject result",
      value: "rejected"
       },
     {
      label: "9.Whitelist role",
      description: "set auto role for  accepted application",
      value: "role1"
       },
       {
      label: "10.Pending role",
      description: "set auto role for pending application",
      value: "role2"
       },
       {
      label: "11.Reject role",
      description: "set auto role for reject application",
      value: "role3"
       },
   ])
  )
  

  let filter1 = (i) => i.user.id === message.author.id;
  let filter2 = (m) => m.author.id === message.author.id;    
  
  let cr = new embed()
  .setTitle("Application Setup")
  .setDescription("**For set a application you need to give the following options\n1 - Application collecting channel\n2 - Application Heading\n3 - Application questions count\n4 - Application start message\n5 - Application sucess message\n6 - Whitelist result channel\n7 - Pending result channel\n8 - Reject result channel\n9 - Accepted role\n10 - Pending role\n11 - Reject role\n\nYou van give me the given options by selecting the menu given below.**")
  .setColor("#FF0000")
     
  let pre = new embed()
  .setColor("#FF0000")
     pre.setTitle("Application Setup")
  
  
  let msg = await message.channel.send({
      embeds: [cr],
      components: [opt]
  }) 
  
 let preview = await message.channel.send({
      content: "**Preview:**",
      embeds: [pre],
     components: [but],ephemeral: true
  })
  
 const colb = await preview.createMessageComponentCollector({
     filter: filter1
 })
 
colb.on("collect", async (i) =>{
    if(i.customId === "embc") {  
      if(!channel_status) return i.reply({content: "collect channel is not setuped!", ephemeral: true})
      if(!title_status) return i.reply({content: "Heading is not setuped!", ephemeral: true})
      if(!count_status) return i.reply({content: "question count is not setuped!", ephemeral: true})
      if(!start_status) return i.reply({content: "start message is not setuped!", ephemeral: true})
      if(!end_status) return i.reply({content: "End message is not setuped!", ephemeral: true})
      if(!wchannel_status) return i.reply({content: "whitelist restlt channel is not setuped!", ephemeral: true})
     if(!wpchannel_status) return i.reply({content: "whitelist pending channel restlt is not setuped!", ephemeral: true})
     if(!wrchannel_status) return i.reply({content: "whitelist reject restlt channel is not setuped!", ephemeral: true})
      if(!role1_status) return i.reply({content: "whitelist role is not setuped!", ephemeral: true})
      if(!role2_status) return i.reply({content: "pending role is not setuped!", ephemeral: true})
      if(!role3_status) return i.reply({content: "reject role is not setuped!", ephemeral: true})
     i.reply({content: "Application setup successfully Completed!", ephemeral: true})
      db.add(`application_${message.guild.id}_status`, 1);

                                      
      
    msg.delete();
    preview.delete(); 
      const applylog = client.channels.cache.get(config.applylog);
                    if (!applylog) return;
                    applylog.send(`${message.member.guild.name} has successfuly setuped application setup`)
  }
 if(i.customId === "embd") {  
     i.reply({content: "Successfully cancelled setuping application", ephemeral: true})
   db.deleteDataEach(`application_${message.guild.id}`);
    msg.delete();
    preview.delete(); 
  }
 })
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "channel") {
     i.reply({
    content: "**channel** has been selected! Now, please provide channel",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })


       let desc = t1.first().content.startsWith('<#');
       //const Admin = d1.mentions.roles.first();
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid channel to add as a __Application__ Channel.**`);
        else {
          Admin1 = t1.first().content;
          Admin1 = Admin1.slice(2, -1);
        }
await db.set(`application_${message.guild.id}_channel`, Admin1)
   pre.addField("Application channel",`<#${Admin1}>`);
  channel_status = 1;
   t1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
       
     }
     
   if(i.values[0] === "heading") {
   i.reply({
    content: "**heading** has been  selected! Now, please provide Heading.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
     await db.set(`application_${message.guild.id}_title`, desc);
   pre.addField("Application title", desc);
     title_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
     if(i.values[0] === "count") {
     i.reply({
    content: "**count** has been  selected! Now, please provide question count.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
     const appch = desc;
    if (appch < 5 || appch > 12) {
      return message.reply({
    content: `please give a number between 5 and 12`,
    ephemeral: true 
     })
    }
          
    await db.set(`application_${message.guild.id}_QCount`, appch)
   pre.addField("Quistions count", desc);
       count_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
     
    if(i.values[0] === "start") {
     i.reply({
    content: "**application starting message** has been  selected! Now, please provide startup msg.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
     await db.set(`application_${message.guild.id}_start`, desc)
   pre.addField("Starting message", desc);
      start_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
   if(i.values[0] === "end") {
     i.reply({
    content: "**application ending message** has been  selected! Now, please provide ending msg",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
     await db.set(`application_${message.guild.id}_end`, desc)
   pre.addField("Application confirm message", desc);
     end_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
     if(i.values[0] === "success") {
     i.reply({
    content: "**whitelist result channel** has been selected! Now, please provide channel",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })


       let desc = t1.first().content.startsWith('<#');
       //const Admin = d1.mentions.roles.first();
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid channel to add as a __Application__ Channel.**`);
        else {
          Admin1 = t1.first().content;
          Admin1 = Admin1.slice(2, -1);
        }
await db.set(`application_${message.guild.id}_wchannel`, Admin1)
   pre.addField("Application whitelist channel",`<#${Admin1}>`);
  wchannel_status = 1;
   t1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
       
     }
     if(i.values[0] === "pendings") {
     i.reply({
    content: "**whitelist pending channel** has been selected! Now, please provide channel",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })


       let desc = t1.first().content.startsWith('<#');
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid channel to add as a __Application pending result__ Channel.**`);
        else {
          Admin1 = t1.first().content;
          Admin1 = Admin1.slice(2, -1);
        }
await db.set(`application_${message.guild.id}_wpchannel`, Admin1)
   pre.addField("Application pending channel",`<#${Admin1}>`);
  wpchannel_status = 1;
   t1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
       
     }
   if(i.values[0] === "rejected") {
     i.reply({
    content: "**whitelist rejected channel** has been selected! Now, please provide channel",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })


       let desc = t1.first().content.startsWith('<#');
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid channel to add as a __Application rejected result__ Channel.**`);
        else {
          Admin1 = t1.first().content;
          Admin1 = Admin1.slice(2, -1);
        }
await db.set(`application_${message.guild.id}_wrchannel`, Admin1)
   pre.addField("Application rejected channel",`<#${Admin1}>`);
  wrchannel_status = 1;
   t1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
       
     }

     if(i.values[0] === "role1") {
     i.reply({
    content: "**whitelist role ** has been  selected! Now, please provide startup msg.",
    ephemeral: true 
     })
       let Admin;
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
       
    let desc = d1.first().content.startsWith('<@&');
       //const Admin = d1.mentions.roles.first();
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid role to add as a __whitelist__ role.**`);
        else {
          Admin = d1.first().content;
          Admin = Admin.slice(3, -1);
        }
     await db.set(`application_${message.guild.id}_role_whitelist`, Admin)
   pre.addField("Whitelist role", `<@&${Admin}>`);
     role1_status = 1; 
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }  
     if(i.values[0] === "role2") {
     i.reply({
    content: "**pending role ** has been  selected! Now, please provide startup msg.",
    ephemeral: true 
     })
       let Admin;
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
       
    let desc = d1.first().content.startsWith('<@&');
       //const Admin = d1.mentions.roles.first();
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid role to add as a __whitelist__ role.**`);
        else {
          Admin = d1.first().content;
          Admin = Admin.slice(3, -1);
        }
     await db.set(`application_${message.guild.id}_role_pending`, Admin)
   pre.addField("Pending role", `<@&${Admin}>`);
      role2_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }  
     if(i.values[0] === "role3") {
     i.reply({
    content: "**reject role ** has been  selected! Now, please provide startup msg.",
    ephemeral: true 
     })
       let Admin;
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
       
    let desc = d1.first().content.startsWith('<@&');
       if(!desc) return message.channel.send(`${emote.x} **Please provide a valid role to add as a __whitelist__ role.**`);
        else {
          Admin = d1.first().content;
          Admin = Admin.slice(3, -1);
        }
     await db.set(`application_${message.guild.id}_role_reject`, Admin)
   pre.addField("Reject role", `<@&${Admin}>`);
      role3_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
 })
    } catch (e) {
      message.channel.send(`${emote.x} __**Somthing is wrong. please try again later**__`);
      client.dclog(e.stack);
console.log(e.stack);
}
  },
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