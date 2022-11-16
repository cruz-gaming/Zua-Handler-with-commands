module.exports = async (client) => {
  client.logger(`Loading AddOn Files...`);
  
  require(`${process.cwd()}/AddOn/GuildJoin`)(client);
	require(`${process.cwd()}/AddOn/GuildLeft`)(client);
  require(`${process.cwd()}/AddOn/GuildJoinMsg`)(client);
  require(`${process.cwd()}/AddOn/Welcome`)(client);
  require(`${process.cwd()}/AddOn/WelcomeImage`)(client);
  require(`${process.cwd()}/AddOn/Application`)(client);
  require(`${process.cwd()}/AddOn/Leveling`)(client);
  
  client.logger(`Loaded AddOn Files`);
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