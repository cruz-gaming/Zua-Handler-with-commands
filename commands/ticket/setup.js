const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
MessageSelectMenu  
} = require('discord.js');
const emoji = require(`${process.cwd()}/settings/emojis.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Tickets.json`});
const component = MessageActionRow;
const embed = MessageEmbed;
const button = MessageButton;
const menu = MessageSelectMenu;

module.exports = {
  name: "setup-ticket",
  aliases: [""],
  usage: '',
  description: "create ticket for your service",
  category: "ticket",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: false,
  toggleOff: false,


  async execute(client, message, args, ee, prefix) {
    try {
    const sfats = await db.fetch(`Staff_${message.guild.id}`) 
    if (!sfats || sfats === null) return message.reply(`This server needs to set up their staff roles first! \`${prefix}setstaff\``)
   
   
      let channel = message.mentions.channels.first();
      if(!channel) return message.reply("Please provide a **valid** channel ")
    
   let conf = false;
      
  let but = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("Send")
   .setEmoji(emoji.y)
   .setCustomId("embc"),
   new button()
   .setStyle("DANGER")
   .setLabel("Cancel")
   .setEmoji("🗑")
   .setCustomId("embd")
  )  
  
 let buts = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("Create ticket")
   .setEmoji(emoji.ticket)
   .setCustomId("ticket"),
   )



  let result = new embed()
 .setImage(`https://media.discordapp.net/attachments/956536393906143243/957324552415883285/stacks-devCRROPED.png`)
  .setColor("#2F3136");
      
  let opt = new component().addComponents(
  new menu()
   .setCustomId("embedder")
   .setPlaceholder("Select an option")
   .addOptions([
       {
      label: "Title",
      description: "Set a title for the Ticket",
      value: "etitle"
       },
       {
      label: "Description",
      description: "Set a description for the Ticket ",
      value: "edesc"
       },
       {
       label: "Image",
       description: "Set a image for the Ticket",
       value: "eimg"
       },
       {
       label: "Color",
       description: "Set a color for the Ticket",
       value: "ecolor"
       },
       {
      label: "Footer",
      description: "Set a footer text for the Ticket",
       value: "efooter"
       },
       {
        label: "Thumbnail",
        description: "Set a thumbnail for the Ticket",
        value: "ethumb"
       },
       {
       label: "Timestamp",
       description: "Set a timestamp for the Ticket (beside footer)",
       value: "etime"
       }
   ])
  )
  

  let filter1 = (i) => i.user.id === message.author.id;
  let filter2 = (m) => m.author.id === message.author.id;    
  
  let cr = new embed()
  .setTitle("Ticket setup")
  .setDescription(" pick an option below to set a value for Tcket")
  .setColor("#FF0000")
     
  let pre = new embed()
  .setColor("#FF0000")
  .setDescription("None")
  
  
  let msg = await message.channel.send({
      embeds: [cr],
      components: [opt]
  }) 
  
 let preview = await message.channel.send({
      content: "**Result:**",
      embeds: [pre],
     components: [but]
  })
  
 const colb = await preview.createMessageComponentCollector({
     filter: filter1
 })
 
colb.on("collect", async (i) =>{
    if(i.customId === "embc") {
    if(conf === false) return i.reply({
        
    })
      i.channel.send(`**Ticket was successfully sent in** ${channel}!`)
        msg.delete();
        preview.delete();
       channel.send({
           embeds: [result],
components: [buts]
       })
   }
 if(i.customId === "embd") {  
     i.channel.send("Successfully cancelled making Ticket")
    msg.delete();
    preview.delete(); 
  }
 })
 
 
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "etitle") {
     i.reply({
    content: "**Title** has been selected! Now, please provide title for the Ticket.",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let title = t1.first().content;
   pre.setTitle(title);
   result.setTitle(title);
   t1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     
   if(i.values[0] === "edesc") {
   i.reply({
    content: "**Description** has been  selected! Now, please provide description for the Ticket.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
   pre.setDescription(desc);
   result.setDescription(desc);
   d1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }   
     if(i.values[0] === "ecolor") {
     i.reply({
    content: "**Color** has been selected! Now, please provide HEX COLOR for the Ticket .",
    ephemeral: true 
     })
       let c1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let color = c1.first().content;
   if(!color.startsWith("#")) return i.followUp({
       content: "Hex code must start with #. To provide a color again, please click the menu and press this option again.",
       ephemeral: true
   })
   result.setColor(color);
   pre.setColor(color);
   c1.first().delete();
   preview.edit({
      content: "**Preview:**",
       embeds: [pre]
    });
     } 
     
    if(i.values[0] === "efooter") {
     i.reply({
    content: "**Footer** has been selected! Now, please provide footer text for the Ticket.",
    ephemeral: true 
     })
       let f1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let footer = f1.first().content;
   result.setFooter(footer);    
   pre.setFooter(footer);
   f1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
   if(i.values[0] === "ethumb") {
     i.reply({
    content: "**Thumbnail** has been selected! Now, please provide thumbnail URL for the Ticket.",
    ephemeral: true 
     })
       let th1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let thumb = th1.first().content; 
 function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
     
    if(is_url(thumb) === false) {
        th1.first().delete();
        return i.followUp({
       content: "**__Thumbnail__** must be a link. To provide a thumbnail again, please click the menu and press this option again.",
       ephemeral: true
   }) 
    }               
   pre.setThumbnail(thumb);
  result.setThumbnail(thumb);     
   th1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }   
     if(i.values[0] === "eimg") {
     i.reply({
    content: "**Image** has been selected! Now, please provide image link for the Ticket.",
    ephemeral: true 
     })
       let i1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let img = i1.first().content; 
 function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
     
    if(is_url(img) === false) {
        i1.first().delete();
        return i.followUp({
       content: "**__Image__** must be a link. To provide an image again, please click the menu and press this option again.",
       ephemeral: true
   }) 
    }               
   pre.setImage(img);
   result.setImage(img);     
   i1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "eurl") {
     i.reply({
    content: "**URL** has been selected! Now, please provide URL for the Ticket.",
    ephemeral: true 
     })
       let u1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let url = u1.first().content;
   pre.setURL(url);
   result.setURL(url);
   u1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "eauthor") {
     i.reply({
    content: "**Author** has been selected! Now, please provide author text for the Ticket.",
    ephemeral: true 
     })
       let a1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let author = 
   a1.first().content;
   result.setAuthor(author);
   pre.setAuthor(author);
   a1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "etime") {
     i.reply({
    content: "**Timestamp** has been selected! Now, __Are you sure you want to set timestamp? (true/false)**",
    ephemeral: true 
     })
         
       let ti1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let times = ti1.first().content;   
         let tim = [
             "true",
             "false"
         ];
         if(!tim.includes(times)) return i.followUp({
             content: "Option must be `true` or `false`. ",
             ephemeral: true
         })
         if(times === "true") {
       pre.setTimestamp();
       result.setTimestamp(); 
              ti1.first().delete();
             preview.edit({
             content: "**Preview:**",
             embeds: [pre]
             });
         } else if(times === "false"){
    ti1.first().delete();
         }
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