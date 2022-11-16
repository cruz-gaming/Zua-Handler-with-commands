const config = require("../settings/config.json");
const {
  Client
} = require("discord.js");
const {
  Perms
} = require("../perms/permissions");
const {
  promisify
} = require("util");
const {
  glob
} = require("glob");
const PG = promisify(glob);

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  try {
    let amount = 0;
    const slashCommandsArray = [];

    (await PG(`${process.cwd()}/slashCommands/*/*.js`)).map(async (file) => {
      const command = require(file);

      if (!command.name) return await client.logger(`SlashCommand Error: Missing Name | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      if (!command.context && !command.description) return await client.logger(`SlashCommand Error: Missing Description | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      if (command.userPermissions) {
        if (!Perms.includes(command.userPermissions)) return await client.logger(`SlashCommand Error: Invalid Permission | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      }
      if (command.botPermissions) {
        if (!Perms.includes(command.botPermissions)) return await client.logger(`SlashCommand Error: Invalid Permission | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      }
      client.slashCommands.set(command.name, command);
      if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
      slashCommandsArray.push(command)
      amount++
    });
    await client.logger(`${amount} Slash Commands Loaded`.brightGreen);

    client.on("ready", async () => {
      if (config.SlashCommandsGlobal) {
        // For Global Server
        await client.application.commands.set(slashCommandsArray);

      } else {
        if (!config.SlashCommand_Server_id) return client.logger(`You need to Provide the SlashCommand_Server_id in config.json to load slash commands!`.brightRed)
        // For 1 Server Only
        await client.guilds.cache.get(config.SlashCommand_Server_id).commands.set(slashCommandsArray);
        
      }

    });
  } catch (e) {
    console.log(e.message);
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