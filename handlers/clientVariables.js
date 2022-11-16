const { Collection } = require("discord.js");
const config = require(`${process.cwd()}/settings/config.json`);

module.exports = async (client) => {

   	client.commands = new Collection();
	client.slashCommands = new Collection();
	client.events = new Collection();
	client.aliases = new Collection();
	client.cooldowns = new Collection();
   	client.allEmojis = require(`${process.cwd()}/settings/emojis.json`);
   	client.owners = config.ownerID;

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