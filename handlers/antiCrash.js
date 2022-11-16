module.exports = async (client) => {
  client.logger(`Starting AntiCrash`.bold.yellow);

  process.on('multipleResolves', (type, promise, reason) => { // Needed
    console.log('=== [antiCrash] | [multipleResolves] | [start] ==='.yellow.dim);
    // console.log(type, promise, reason);
    console.log('=== [antiCrash] | [multipleResolves] | [end] ==='.yellow.dim);
  });
  process.on('unhandledRejection', (reason, promise) => { // Needed
    console.log('=== [antiCrash] | [unhandledRejection] | [start] ==='.yellow.dim);
    console.log(reason);
    console.log('=== [antiCrash] | [unhandledRejection] | [end] ==='.yellow.dim);
  });
  process.on('rejectionHandled', (promise) => { // If You Want You Can Use
    console.log('=== [antiCrash] | [rejectionHandled] | [start] ==='.yellow.dim);
    console.log(promise);
    console.log('=== [antiCrash] | [rejectionHandled] | [end] ==='.yellow.dim);
  })
  process.on("uncaughtException", (err, origin) => { // Needed
    console.log('=== [antiCrash] | [uncaughtException] | [start] ==='.yellow.dim);
    console.log(err);
    console.log('=== [antiCrash] | [uncaughtException] | [end] ==='.yellow.dim);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
    console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [start] ==='.yellow.dim);
    console.log(err);
    console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [end] ==='.yellow.dim);
  });
  
  client.logger(`AntiCrash Started`.brightGreen);
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