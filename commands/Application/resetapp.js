const emote = require(`${process.cwd()}/settings/emojis.json`);
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
  name: "reset-application",
  aliases: ["reset-app"],
  usage: '',
  description: "reset application",
  category: "apply",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "EMBED_LINKS",
  ownerOnly: false,
  toggleOff: false,


  async execute(client, message, args, ee, prefix) {
    try {

      const count = await db.fetch(`application_${message.guild.id}_status`);
      if(count === null) return message.channel.send("**This server is not setuped application**");
  let but = new component().addComponents(
  
   new button()
   .setStyle("SUCCESS")
   .setLabel("Cancel")
   .setEmoji(emoji.x)
   .setCustomId("cancel")
  )  
  
  let opt = new component().addComponents(
  new menu()
   .setCustomId("embedder")
   .setPlaceholder("Select an option")
   .addOptions([
       {
      label: "reset channel",
      description: "clear database of application",
      value: "resetchannel"
       },
       {
      label: "reset questions",
      description: "clear database of application",
      value: "resetquestions"
       },
           {
      label: "reset Count",
      description: "clear database of application",
      value: "resetcount"
       },
       {
      label: "resetall",
      description: "clear database of application",
      value: "resetall"
       },
      
   ])
  )
  

  let filter1 = (i) => i.user.id === message.author.id;

  let cr = new embed()
  .setTitle("Reset Application setup")
  .setDescription("**You can reset these things**\n\n \`\`\`\n•Channels\n•reset question\n•Questions count\n•Resetall\`\`\`\n\n **NB** : \`if you reset these things you need to setup one more time\`")
  .setColor("#FF0000")
     
  
  
  
  let msg = await message.channel.send({
      embeds: [cr],
      components: [opt,but]
  }) 
  
 const colb = await msg.createMessageComponentCollector({
     filter: filter1
 })
 
 
colb.on("collect", async (i) =>{
    
 if(i.customId === "cancel") {  
     i.channel.send("Successfully cancelled reset application")
    msg.delete();
    
  }
 })
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "resetchannel") {
     
       db.delete(`application_${message.guild.id}_channel`);
  
       i.reply({
    content: "**channel** has been reseted successfully",
    ephemeral: true 
     })
     }
     if(i.values[0] === "resetquestions") {
     
       db.deleteDataEach(`application_question_${message.guild.id}`);
  
       i.reply({
    content: "**questions** has been reseted successfully",
    ephemeral: true 
     })
     }
   if(i.values[0] === "resetcount") {
     
       db.delete(`application_${message.guild.id}_QCount`);
  
       i.reply({
    content: "**COUNT** has been reseted successfully",
    ephemeral: true 
     })
     }
   if(i.values[0] === "resetall") {
     
   
      db.findAndDelete((element,db) => {
       return element.ID.includes(`application_${message.guild.id}`);
    });
      db.findAndDelete((element,db) => {
       return element.ID.includes(`application_question_${message.guild.id}`);
    });
     i.reply({
    content: `Your application database is cleared now.\nYou can setup with \`setup-application\``,
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