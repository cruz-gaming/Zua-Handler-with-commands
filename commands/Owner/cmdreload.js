const emote = require(`${process.cwd()}/settings/emojis.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const glob = require('glob');

module.exports = {
  name: 'reload-commands',
  aliases: ['r-cmd'],
  usage: '',
  description: 'Reloads a command',
  category: "ownerOnly",
  cooldown: 0,

  ownerOnly: true,
  toggleOff: false,

  async execute(client, message, args, ee, prefix) {
    try {
      client.commands.sweep(() => true);
      glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
        if (err) return console.log(err);
        filePaths.forEach((file) => {
          delete require.cache[require.resolve(file)];

          const command = require(file);

          if (command.name) {
            client.commands.set(command.name, command);
          }

          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach((alias) => {
              client.aliases.set(alias, command.name)
            });
          }
        });
      });
      message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`${client.allEmojis.y} Successfully Reloaded Commands`)]});
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