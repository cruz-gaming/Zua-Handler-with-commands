const {
  MessageEmbed
} = require('discord.js');
const moment = require("moment");
const emote = require(`${process.cwd()}/settings/emojis.json`);
const config = require(`${process.cwd()}/settings/config.json`);
const filters = require(`${process.cwd()}/settings/filters.json`);
const {
  DisTube
} = require("distube");
const {
  SpotifyPlugin
} = require("@distube/spotify");
const {
  SoundCloudPlugin
} = require("@distube/soundcloud");

module.exports = async (client) => {

  // Console Logger
  client.logger = (data) => {
    // if (!settings[`debug-logs`]) return;
    let logstring = `${String(`╚═══════════════════════════════════════════════════╗`).green}${`
`}${`║ ${moment().format("DD-MM-YYYY HH:mm:ss").white}  〢 `}`
    let exit = `${`
`}${String(`╔═══════════════════════════════════════════════════╝`).green}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };
    
    client.dclog = (data) => {

    if (!config.modlog) return;

    const footer = `${String(`STACK-DEVELOPERS`)}${` | `}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`}`

const LogsChannel = client.channels.cache.get(config.modlog);

if (!LogsChannel) return;

LogsChannel.send({

  embeds: [new MessageEmbed()

    .setColor(`BLUE`)

    .setTitle(` ${emote.m} error logger | stack_developers`)

    .setDescription(`${data}`)

    .setFooter(`${footer}`) ]

       }); 

  };

    // Distube   
  client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    //emitAddListWhenCreatingQueue: false,
    searchSongs: 0,
    youtubeCookie: config.env.youtubeCookie || process.env.youtubeCookie,
    nsfw: true,
    emptyCooldown: 25,
    ytdlOptions: {
      //requestOptions: {
      //  agent //ONLY USE ONE IF YOU KNOW WHAT YOU DO!
      //},
      highWaterMark: 1024 * 1024 * 64,
      quality: "highestaudio",
      format: "audioonly",
      liveBuffer: 60000,
      dlChunkSize: 1024 * 1024 * 64,
    },
    youtubeDL: false,
    updateYouTubeDL: false,
    customFilters: filters,
    plugins: [
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: true,
        api: {
          clientId: config.env.spotify_clientID || process.env.spotify_clientID,
          clientSecret: config.env.spotify_clientSecret || process.env.spotify_clientSecret,
        },
      }),
      new SoundCloudPlugin()
    ]
  });
  
    client.on("voiceStateUpdate", (oldState, newState) => {
      try{
        if(client.user.id != newState.id) return;
        if (
            (!oldState.streaming && newState.streaming)   ||
            (oldState.streaming && !newState.streaming)   ||
            (!oldState.serverDeaf && newState.serverDeaf) ||
            (oldState.serverDeaf && !newState.serverDeaf) ||
            (!oldState.serverMute && newState.serverMute) ||
            (oldState.serverMute && !newState.serverMute) || 
            (!oldState.selfDeaf && newState.selfDeaf)     ||
            (oldState.selfDeaf && !newState.selfDeaf)     ||
            (!oldState.selfMute && newState.selfMute)     ||
            (oldState.selfMute && !newState.selfMute)     ||
            (!oldState.selfVideo && newState.selfVideo)   ||
            (oldState.selfVideo && !newState.selfVideo) 
         )
        if ((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId)) {
            try{ newState.setDeaf(true);  }catch{ }
            return;
        }
      }catch{

      }
    
  });
  
  //ANTI UNMUTE
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false){
      try{
        newState.setDeaf(true).catch(() => {});
      } catch (e){
        //console.log(e)
      }
    }
  });

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