const emote = require(`${process.cwd()}/settings/emojis.json`);
const config = require(`${process.cwd()}/settings/config.json`);
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
MessageSelectMenu  
} = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Application.json`});
const component = MessageActionRow;
const embed = MessageEmbed;
const button = MessageButton;
const menu = MessageSelectMenu;

module.exports = {
  name: "add-questions",
  aliases: ["add-qs"],
  usage: '',
  description: "create application questions",
  category: "apply",
  cooldown: 0,
  userPerms: "ADMINISTRATOR",
  clientPerms: "EMBED_LINKS",
  ownerOnly: false,
  toggleOff: false,


  async execute(client, message, args, ee, prefix) {
    try {
//////////////////////////////////////////////////////
      let QuestionStatus1 = 0;
      let QuestionStatus2 = 0;
      let QuestionStatus3 = 0;
      let QuestionStatus4 = 0;
      let QuestionStatus5 = 0;
      let QuestionStatus6 = 0;
      let QuestionStatus7 = 0;
      let QuestionStatus8 = 0;
      let QuestionStatus9 = 0;
      let QuestionStatus10 = 0;
      let QuestionStatus11 = 0;
      let QuestionStatus12 = 0;
/////////////////////////////////////////////////////      
   const count = await db.fetch(`application_${message.guild.id}_status`);
      if(count === null) return message.reply({content: `**This server is not setuped application use \`setup-application\`**`, ephemeral: true});

       const sfats = await db.fetch(`application_${message.guild.id}_QCount`) 
    if (!sfats || sfats === null) return message.reply({content: `You are not setuped question amount \`setup-application\``, ephemeral: true})

    const status = await db.fetch(`application_question_${message.guild.id}_Status`);
      if(status === 1) return message.reply({content: `This server is already setuped application questions.\nUse \`reset-application\` to reset application questions.`, ephemeral: true})
      
  let but = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("done")
   .setEmoji(emote.y)
   .setCustomId("qs_confirm"),
   new button()
   .setStyle("DANGER")
   .setLabel("Cancel")
   .setEmoji(emote.x)
   .setCustomId("qs_cancel")
  )  
  
  let opt = new component().addComponents(
  new menu()
   .setCustomId("embedder")
   .setPlaceholder("Select an option")
   .addOptions([
       {
      label: "Question 1",
      description: "Set Question 1",
      value: "q1"
       },
       {
      label: "Question 2",
      description: "Set Question 2 ",
      value: "q2"
       },
       {
       label: "Question 3",
       description: "Set Question 3",
       value: "q3"
       },
       {
       label: "Question 4",
       description: "Set Question 4",
       value: "q4"
       },
     {
      label: "Question 5",
      description: "Set Question 5 ",
      value: "q5"
       },
       {
       label: "Question 6",
       description: "Set Question 6",
       value: "q6"
       },
       {
       label: "Question 7",
       description: "Set Question 7",
       value: "q7"
       },
       {
      label: "Question 8",
      description: "Set Question 8",
       value: "q8"
       },
       {
        label: "Question 9",
        description: "Set Question 9",
        value: "q9"
       },
       {
       label: "Question 10",
       description: "Set Question 10",
       value: "q10"
       },
       {
      label: "Question 11",
      description: "Set Question 11",
       value: "q11"
       },
       {
        label: "Question 12",
        description: "Set Question 12",
        value: "q12"
       },
   ])
  )
  
  let filter1 = (i) => i.user.id === message.author.id;
  let filter2 = (m) => m.author.id === message.author.id;   
      const QCount = await db.fetch(`application_${message.member.guild.id}_QCount`);
          
  let cr = new embed()
  .setTitle("Application Question Setup")
  .setDescription(`you can add first **${QCount}**  quistions.`)
  .setColor("#FF0000")
     
  let pre = new embed()
  .setColor("#FF0000")
    .setTitle("Question Setup Preview")
  .setDescription("None")
  
  
  let msg = await message.channel.send({
      embeds: [cr],
      components: [opt]
  }) 
  
 let preview = await message.channel.send({
      
      embeds: [pre],
     components: [but]
  })
  
 const colb = await preview.createMessageComponentCollector({
     filter: filter1
 })
 
colb.on("collect", async (i) =>{
    
  if(i.customId === "qs_confirm") {  

    if(QuestionStatus1 === 0) return i.reply({content: `First question is not setuped`, ephemeral: true})
    if(QuestionStatus2 === 0) return i.reply({content: `Second question is not setuped`, ephemeral: true})
    if(QuestionStatus3 === 0) return i.reply({content: `Third question is not setuped`, ephemeral: true})
    if(QuestionStatus4 === 0) return i.reply({content: `Fourth question is not setuped`, ephemeral: true})
    if(QuestionStatus5 === 0) return i.reply({content: `Fifth question is not setuped`, ephemeral: true})
    if(QuestionStatus6 === 0)
      if(QCount > 5) return i.reply({content: `The Question 6 is not setuped`, ephemeral: true})
    if(QuestionStatus7 === 0)
      if(QCount > 6) return i.reply({content: `The Question 7 is not setuped`, ephemeral: true})
    if(QuestionStatus8 === 0)
      if(QCount > 7) return i.reply({content: `The Question 8 is not setuped`, ephemeral: true})
    if(QuestionStatus9 === 0)
      if(QCount > 8) return i.reply({content: `The Question 9 is not setuped`, ephemeral: true})
    if(QuestionStatus10 === 0)
      if(QCount > 9) return i.reply({content: `The Question 10 is not setuped`, ephemeral: true})
    if(QuestionStatus11 === 0)
      if(QCount > 10) return i.reply({content: `The Question 11 is not setuped`, ephemeral: true})
    if(QuestionStatus12 === 0)
      if(QCount > 12) return i.reply({content: `The Question 12 is not setuped`, ephemeral: true})

    db.set(`application_question_${message.guild.id}_Status`, 1);
     i.reply({content: "Successfully setuped application questions", ephemeral: true});
    msg.delete();
    preview.delete();
const applylog = client.channels.cache.get(config.applylog);
                    if (!applylog) return;
                    applylog.send(`${message.member.guild.name} has successfuly setuped application questions`)
   
  }
 if(i.customId === "qs_cancel") {  
     i.reply({content: "You canceled application questions", ephemeral: true});
   db.deleteDataEach(`application_question_${message.guild.id}`);
    msg.delete();
    preview.delete(); 
  }
 })
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "q1") {
     i.reply({
    content: "**question 1** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })

  
    let title = t1.first().content;
       await db.set(`application_question_${message.guild.id}_1`, title)
       QuestionStatus1 = 1;
       pre.setTitle("setuped question 1");
   
   pre.setDescription(title);
   
   t1.first().delete();
   preview.edit({
       
       embeds: [pre]
    });
     }
     
   if(i.values[0] === "q2") {
   i.reply({
    content: "**question 2** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_2`, desc)
     QuestionStatus2 = 1;
   pre.setTitle("setuped question 2");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }   
   if(i.values[0] === "q3") {
   i.reply({
    content: "**question 3** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_3`, desc)
     d1.first().delete();
     QuestionStatus3 = 1;
   pre.setTitle("setuped question 3");
   
   pre.setDescription(desc);
   preview.edit({
        
       embeds: [pre]
    });
     }   
   if(i.values[0] === "q4") {
   i.reply({
    content: "**question 4** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_4`, desc)
     QuestionStatus4 = 1;
   pre.setTitle("setuped question 4");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }  

if(i.values[0] === "q5") {
   i.reply({
    content: "**question 5** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_5`, desc)
  QuestionStatus5 = 1;
   pre.setTitle("setuped question 5");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q6") {
       if(QCount < 6) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 6** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_6`, desc)
       QuestionStatus6 = 1;
   pre.setTitle("setuped question 6");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q7") {
       if(QCount < 7) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 7** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_7`, desc)
       QuestionStatus7 = 1;
   pre.setTitle("setuped question 7");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q8") {
       if(QCount < 8) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 8** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_8`, desc)
       QuestionStatus8 = 1;
   pre.setTitle("setuped question 8");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q9") {
       if(QCount < 9) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 9** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_9`, desc)
       QuestionStatus9 = 1;
   pre.setTitle("setuped question 9");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q10") {
       if(QCount < 10) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 10** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_10`, desc)
       QuestionStatus10 = 1;
   pre.setTitle("setuped question 10");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q11") {
       if(QCount < 11) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 11** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_11`, desc)
       QuestionStatus11 = 1;
   pre.setTitle("setuped question 11");
   
   pre.setDescription(desc);
   
   d1.first().delete();
   preview.edit({
        
       embeds: [pre]
    });
     }
     if(i.values[0] === "q12") {
       if(QCount < 12) {
         return i.reply({content: `Your maximum number of question is ${QCount}, You can't add more.`, ephemeral: true})
             }
   i.reply({
    content: "**question 12** has been  selected! Now, please provide question.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
     await db.set(`application_question_${message.guild.id}_12`, desc)
       QuestionStatus12 = 1;
   pre.setTitle("setuped question 12");
   
   pre.setDescription(desc);
   
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