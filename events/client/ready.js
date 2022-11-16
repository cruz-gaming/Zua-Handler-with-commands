const config = require(`${process.cwd()}/settings/config.json`);
const Discord = require("discord.js");

/**
 * @param {Client} client 
 */

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    try {
      try {
        client.logger(`THE PROJECT IS  START WORKING`);
       console.log("╔═══════════════════════════════════════════════════╝");
console.log(`║ 	BOT NAME:\t${client.user.tag}`);          
console.log(`║ 	SERVERS:\t${client.guilds.cache.size}`);          
console.log(`║ 	PREFIX:\t\t${config.PREFIX}`);          
console.log(`║ 	COMMANDS:\t${client.commands.size}`);          
console.log(`║ 	SLASH CMDS:\t${client.slashCommands.size}`);    
console.log(`║ 	D.JS VERSION:\tv${Discord.version}`);          
console.log(`║ 	NODE VERSION:\t${process.version}`);          
console.log(`║ 	PLATFORM:\t${process.platform} ${process.arch}`);          
console.log(`║ 	MEMORY:\t\t${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\n`);          
console.log("╚═══════════════════════════════════════════════════╗");
      } catch {
        /* */
      }
        
    } catch (e) {
      console.log(e)
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