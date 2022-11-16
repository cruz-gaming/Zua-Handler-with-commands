const config = require(`${process.cwd()}/settings/config.json`);
const color = require(`${process.cwd()}/settings/color.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const emote = require(`${process.cwd()}/settings/emojis.json`);
module.exports = {
  name: "say",
  aliases: [],
  usage: '',
  description: "send a message with bot",
  category: "utility",
  cooldown: 0,
  userPerms: "MANAGE_GUILD",
  clientPerms: "SEND_MESSAGES",
  ownerOnly: false,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
   try{
     



    message.delete();
    let Content = args.join(" ");
    
if (message.content.includes("@everyone") || message.content.includes("@here"))  

  return message.channel.send("**HEY DON'T PING EVERYONE / HERE WITH ME**");
     
      if (!Content)
        return message.reply({ embeds:[new MessageEmbed()
          .setColor(color.green)
        
          .setDescription(`Write something`)]});

    

     
      return message.channel.send({ content: `${Content}` });
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