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
  name: "addroletobotss",
  aliases: ["abots"],
  usage: '',
  description: "give role to all bots",
  category: "automod",
  cooldown: 0,
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
           .setColor("RANDOM")
                   
           .setTitle(`bot role add`)
           .setDescription(`Mention a role to give every bots`)
         ]});
         if(role.permissions.has('ADMINISTRATOR'))
      return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`Can't give role.This role have \`ADMINISTRATOR \``)
         ]})

         const hrle = await db.fetch(`botrole_${message.guild.id}`);
      if(hrle === 1) return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           
           .setTitle(`Already runing a process please wait`)
         ]});
const cool = await db.fetch(`cooldownbot_${message.guild.id}`);
      if(cool === 1) return message.reply({embeds : [new MessageEmbed()
           .setColor("RED")
           .setTitle(`This command currently cooldown for 10 min when u used`)
         ]});
       if (message.member.roles.highest.position <= role.position)
         return message.reply({embeds : [new MessageEmbed()
           .setColor("RANDOM")
           
           .setTitle(`bot role add`)
           .setDescription(`i can't add this role \nreason: this role higher than me `)
         ]});
       await message.guild.members.fetch().catch(() => {});
       var members = message.guild.members.cache.filter(member => !member.roles.cache.has(role.id) && member.user.bot).map(this_Code_is_by_Tomato_6966 => this_Code_is_by_Tomato_6966);
       if (!members || members.length == 0)
         return message.reply({embeds :[new MessageEmbed()
           .setColor("RANDOM")
           
           .setTitle(`bot role add`)
           .setTitle(`all bo have this role`)
         ]});
       let seconds = (Number(members.length) * 1500);
       message.reply({embeds:  [new MessageEmbed()
          .setColor("RANDOM")
           
         .setAuthor(`bot role add `, "https://cdn.discordapp.com/emojis/951687114716766218.gif?v=1&size=48&quality=lossless")
         .setDescription(`${members.length} Bots need this role...`)
       ]}).then(msg => setTimeout(()=>{try { 
            db.set(`botrole_${message.guild.id}`, 1);
         
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
           content: `success <@${message.author.id}>`,
           embeds: [new MessageEmbed()
             .setColor("RANDOM")
                   
             .setTitle(`SUCCESS`)
             .setDescription(`Successfully added ${role} to \`${success}  BOTS\`  in this server have \`${counter}  BOTS\``)
          ]}).then(msg => setTimeout(()=>{try { 
            db.delete(`botrole_${message.guild.id}`);
         db.set(`cooldownbot_${message.guild.id}`,1);           
          } catch {} 
          }, 150)).then(msg => setTimeout(()=>{try { 
            db.delete(`cooldownbot_${message.guild.id}`)
          } catch {} 
          }, 600000));

         
       
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