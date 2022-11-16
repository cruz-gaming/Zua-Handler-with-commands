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
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Settings.json`});
const emote = require(`${process.cwd()}/settings/emojis.json`);
const map = new Map();

module.exports = {
  name: "addroletohumans",
  aliases: ["arh"],
  usage: '',
  description: "give role to all human",
  category: "automod",
  cooldown: 10,
  userPerms: "MANAGE_ROLES",
  clientPerms: "MANAGE_ROLES",
  ownerOnly: false,
  toggleOff: false,
  


  async execute(client, message, args, ee, prefix) {
  	
    try {
    
      
       
       if (map.get(message.guild.id))
         return message.reply({embeds : [new MessageEmbed()
           .setColor("RANDOM")
                   
           .setTitle(``)
         ]});
       let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first() || message.guild.roles.cache.get(args[0]);
       if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
         return message.reply({embeds :[new MessageEmbed()
           .setColor("CYAN")
                   
           .setTitle(`Auto Role To human`)
           .setDescription(`Mention a role to give every human `)
         ]});

      if(role.permissions.has('ADMINISTRATOR'))
      return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`Can't give role.This role have \`ADMINISTRATOR \``)
         ]})

         const hrle = await db.fetch(`humanrole_${message.guild.id}`);
      if(hrle === 1) return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`Already runing a process please wait`)
         ]});

const cool = await db.fetch(`cooldown_${message.guild.id}`);
      if(cool === 1) return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`This command currently cooldown for 25 min when u used`)
         ]});
    

       if (message.member.roles.highest.position <= role.position)
         return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`can't give role.higher than me`)
         ]});
       await message.guild.members.fetch().catch(() => {});
       var members = message.guild.members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).map(code=> code);
       if (!members || members.length == 0)
         return message.reply({embeds :[new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`all humans have this role`)
         ]});
       
       
       
       let seconds = (Number(members.length) * 1500);
       message.reply({embeds:  [new MessageEmbed()
          .setColor("RANDOM")
                 
         .setAuthor(`Adding roles to human`, "https://cdn.discordapp.com/emojis/921757269711020062.gif?v=1&size=48&quality=lossless")
         .setDescription(`in this server need \`${members.length}\` Humans to ${role}'s role.`)
       ]}).then(msg => setTimeout(()=>{try { 
            db.set(`humanrole_${message.guild.id}`, 1);
         
          } catch {} 
          }, 150));
      

       var success = 0;
       var failed = 0;
       var counter = 0;
       addroletomember(members[counter])
       map.set(message.guild.id, true)
       async function addroletomember(member) {
         if (counter == members.length) return send_finished()
         counter++;
         await member.roles.add(role.id).then(async s => {
           success++;
           await delay(1500)
           addroletomember(members[counter]);
         }).catch(e => {
           failed++;
           addroletomember(members[counter]);
         })
         
       }
      
       function send_finished() {
         map.set(message.guild.id, false)
        
         message.reply({
           content: `<@${message.author.id}>`,
           embeds: [new MessageEmbed()
             .setColor("GREEN")
                     
             .setTitle("Result")
             .setDescription(`role : ${role} \nSuccess: \`${success} \`\nCount: \`${counter}\`\n`)
          ]}).then(msg => setTimeout(()=>{try { 
            db.delete(`humanrole_${message.guild.id}`);
         db.set(`cooldown_${message.guild.id}`,1);           
          } catch {} 
          }, 150)).then(msg => setTimeout(()=>{try { 
            db.delete(`cooldown_${message.guild.id}`)
          } catch {} 
          }, 1500000));

         
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