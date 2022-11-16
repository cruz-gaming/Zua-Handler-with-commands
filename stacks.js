require('dotenv').config();
require(`${process.cwd()}/handlers/keepAlive`)();
const config = require(`${process.cwd()}/settings/config.json`);
const ee = require(`${process.cwd()}/settings/embed.json`);
const SoundCloudPlugin = require('@distube/soundcloud');
const SpotifyPlugin = require('@distube/spotify');
const {
    Client,
    Intents,
} = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");

console.clear;
let ZUA_LOG_START = `${String(`╔═══════════════════════════════════════════════════╝`).green}${`
`}${`║ 		STACK DEVELOPERS OFFICIAL SCRIPT`.red}${`
`}${`║       	 STARTING THE BOT `.red}`
    let ZUA_LOG_END = `${`
`}${String(`╚═══════════════════════════════════════════════════╗`).green}`
    console.log(ZUA_LOG_START, ZUA_LOG_END.green);


const client = new Client({
    fetchAllMembers: false,
    restTimeOffset: 0,
    shards: 'auto',
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {activities: [{name: `Stacks Development`,type: "PLAYING",}],
    status: "ONLINE"
}});




client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

["extraEvents","addon", "clientVariables", "antiCrash", "eventHandler", "commandHandler", "slashCommandHandler","enmapDB", "mongoDBHandler", "loadModules","ticketHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

const DisTube = require('distube');
const player = new DisTube.default(client, {
    leaveOnEmpty: false,
    leaveOnStop: true,
    leaveOnFinish: false,
    searchSongs: 0,
    youtubeDL: true,
    updateYouTubeDL: true,
    plugins: [new SoundCloudPlugin.default(), new SpotifyPlugin.default()]
});



client.login(config.STACKS_TOKEN || process.env.STACKS_TOKEN);

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