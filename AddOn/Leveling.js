const config = require(`${process.cwd()}/settings/config.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/leveling.json`});
const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js')

module.exports = async (client,prefix) => {
  try{
    const description = {
        name: "Leveling AddOn",
    }
    client.logger(`Loaded ${description.name}`);

  	client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
  if (message.channel.type === "dm") return;
  
  let messageArray = message.content.length;
  // let cmd = messageArray[0];
  // let args = messageArray.slice(1);
      let exptemp = (messageArray / 4) * 2;
       let exp = Math.round(exptemp);
        if(exp <= 1) exp = 2;
  db.add(`msgxp_${message.guild.id}_${message.author.id}`, exp);
  let messagefetch = db.fetch(
    `msgxp_${message.guild.id}_${message.author.id}`
  );
      
      let newlvl = updatedLevel(messagefetch);
      let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`);
  if(levelfetch != newlvl) { 
   if(levelfetch == null) {
     db.set(`level_${message.guild.id}_${message.author.id}`, 0);
     let levelembed = new Discord.MessageEmbed()
      .setDescription(
        `**Hy ${message.author}, Welcome to the Server. This is the starting here** `
      )
      .setColor("GREEN");
   let rankChannel = db.fetch(`rank_channel_${message.guild.id}`);
   if (!rankChannel) return ;/*message.channel.send({ontent:`${message.author}`,  embeds: [levelembed]});*/
    let rankmsgChannel = message.guild.channels.cache.get(rankChannel);
    if (!rankmsgChannel) return;
    rankmsgChannel.send({ content:`${message.author}`,  embeds: [levelembed]});
   } else {
db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`);
    let levelembed = new Discord.MessageEmbed()
      .setDescription(
        `**Nice ${message.author}, you just advanced to level ${levelfetch}** `
      )
      .setColor("GREEN");
   let rankChannel = db.fetch(`rank_channel_${message.guild.id}`);
   if (!rankChannel) return;
       /*message.channel.send({ontent:`${message.author}`,  embeds: [levelembed]});*/
    let rankmsgChannel = message.guild.channels.cache.get(rankChannel);
    if (!rankmsgChannel) return;
    rankmsgChannel.send({ content:`${message.author}`,  embeds: [levelembed]});
 
   }
  }
});

  
    } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
    }

function updatedLevel(exp){
    if(exp >= 0 && exp <= 500) return 0;
    else if(exp > 500 && exp <= 1000) return 1;
    else if(exp > 1000 && exp <= 2000) return 2;
    else if(exp > 2000 && exp <= 3000) return 3;
    else if(exp > 3000 && exp <= 4000) return 4;
    else if(exp > 4000 && exp <= 5000) return 5;
    else if(exp > 5000 && exp <= 6000) return 6;
    else if(exp > 6000 && exp <= 8000) return 7;
    else if(exp > 8000 && exp <= 10000) return 8;
    else if(exp > 10000 && exp <= 15000) return 9;
    else if(exp > 15000 && exp <= 20000) return 10;
    else if(exp > 20000 && exp <= 50000) return 11;
    else if(exp > 50000 && exp <= 100000) return 12;
    else if(exp > 100000 && exp <= 500000) return 13;
    else if(exp > 500000 && exp <= 1000000) return 14;
    else if(exp > 1000000 && exp <= 2000000) return 15;
    else if(exp > 2000000 && exp <= 5000000) return 16;
    else if(exp > 5000000 && exp <= 10000000) return 17;
    else if(exp > 10000000 && exp <= 20000000) return 18;
    else if(exp > 20000000 && exp <= 35000000) return 19;
    else if(exp > 35000000 && exp <= 50000000) return 20;
    else
        return 21;
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