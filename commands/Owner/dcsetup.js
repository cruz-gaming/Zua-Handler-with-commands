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
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});
const component = MessageActionRow;
const embed = MessageEmbed;
const button = MessageButton;
const menu = MessageSelectMenu;

module.exports = {
  name: "owner",
  aliases: ["set-sp"],
  usage: '',
  description: "owner cmd",
  category: "owner",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "MANAGE_GUILD",
  ownerOnly: true,
  toggleOff: false,


  async execute(client, message, args, ee, prefix) {
    try {


  let but = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("done")
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
      label: "server name",
      description: "set server name",
      value: "server"
       },
       {
      label: "dc link",
      description: "Set dc link",
      value: "dc"
       },
     {
      label: "set maintanance",
      description: "Set maintanance",
      value: "main"
       },
     {
      label: "set maintanance off",
      description: "Set maintanance off",
      value: "mainoff"
       },
     {
      label: "reset",
      description: "reset",
      value: "reset"
       },
   ])
  )
  

  let filter1 = (i) => i.user.id === message.author.id;
  let filter2 = (m) => m.author.id === message.author.id;    
  
  let cr = new embed()
  .setTitle("Sponcer setup")
  .setDescription("Sponcer link setup")
  .setColor("#FF0000")
     
  let pre = new embed()
  .setColor("#FF0000")
     pre.setTitle("sponcer Setup")
  
  
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
      
     
      
    msg.delete();
    preview.delete(); 
      
  }
 if(i.customId === "embd") {  
     i.reply({content: "Successfully cancelled setuping application", ephemeral: true})
   
    msg.delete();
    preview.delete(); 
  }
 })
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "server") {
     i.reply({
    content: "**server name** has been selected! Now, please provide server name",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })

  let desc = d1.first().content;
       
       
await db.set(`sponcer_server_name`, desc)
   pre.addField(`server name:`,desc);
  
   d1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
       
     }
     
   if(i.values[0] === "dc") {
   i.reply({
    content: "**dc link** has been  selected! Now, please provide dc link.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let link = d1.first().content;
   conf = true;
     await db.set(`sponcer_server_link`, link);
   pre.addField("application title", link);
     title_status = 1;
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }  
   if(i.values[0] === "main") {
     
  let desc =  ("On going for a break no commands will run few times")
    
     db.set(`maintanance_on`,desc);
  
     i.reply({
    content: `successfully enabed maintanance mode`,
    ephemeral: true 
     })
   
     }   
   if(i.values[0] === "mainoff") {
     
   const status = await db.fetch(`maintanance_on`);
      if(status === null ) return message.reply({content: "**Not in maintanance mode **", ephemeral: true});
      db.deleteDataEach(`maintanance_`);
  
     i.reply({
    content: `successfully Desabled maintanance mode`,
    ephemeral: true 
     })
   
     }   
   if(i.values[0] === "reset") {
     
   
      db.deleteDataEach(`sponcer_`);
  
     i.reply({
    content: `Your  database is cleared now.`,
    ephemeral: true 
     })
   
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
