const config = require(`${process.cwd()}/settings/config.json`);
const {
  promisify
} = require("util");
const {
  glob
} = require("glob");
const PG = promisify(glob);
const mongoose = require('mongoose');

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  try {
    if (config.Enable_MongoDB) {
    (await PG(`${process.cwd()}/handlers/mongoDB_Events/*.js`)).map(async (file) => {
      const event = require(file);
      if (event.once) {
        mongoose.connection.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        mongoose.connection.on(event.name, (...args) => event.execute(client, ...args));
      }
    })
    client.logger(`Connecting to MongoDB`.bold.yellow);

    mongoose.Promise = global.Promise;
    await mongoose.connect(config.env.MongoDB_TOKEN || process.env.STACKS_DB, {
      //useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  }

  } catch (e) {
    console.log(e)
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