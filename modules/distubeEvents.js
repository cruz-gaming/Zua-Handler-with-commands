const config = require(`${process.cwd()}/settings/config.json`);
const db = require("old-wio.db")
const ee = require(`${process.cwd()}/settings/embed.json`);
const {
  MessageButton,
  MessageActionRow,
  MessageEmbed
} = require(`discord.js`);


module.exports = async (client,message) => {
    const description = {
        name: "Distube Events",
    }
    client.logger(`Module: Loaded ${description.name}`.bold.green);

  try {

    const MusicButtons = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('music-skip')
        .setEmoji(client.allEmojis.musicButtons.skip)
       
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('music-pause')
        .setEmoji(client.allEmojis.musicButtons.pause)
      
        .setStyle('SECONDARY'),
        
        new MessageButton()
        .setCustomId('music-stop')
        .setEmoji(client.allEmojis.musicButtons.stop)
     
        .setStyle('DANGER'),
        new MessageButton()
        .setCustomId('music-resume')
        .setEmoji(client.allEmojis.musicButtons.resume)

        .setStyle('SUCCESS'),
      
     
      );
      
      const MusicButtons1 = new MessageActionRow()
      .addComponents(
    
  new MessageButton()
        .setCustomId('music-10s-less')
        .setEmoji(client.allEmojis.musicButtons.less10Sec)
     
        .setStyle('DANGER'),
        new MessageButton()
        .setCustomId('music-10s-more')
        .setEmoji(client.allEmojis.musicButtons.forward10Sec)
     
        .setStyle('SUCCESS'),
       
       new MessageButton()
        .setCustomId('music-volume-negative')
        .setEmoji(client.allEmojis.musicButtons.negative10vol)
     
        .setStyle('DANGER'),
        new MessageButton()
        .setCustomId('music-volume-plus')
        .setEmoji(client.allEmojis.musicButtons.plus10vol)
     
        .setStyle('SUCCESS'),
        );
    
    

   
const status = queue => `Volume: \`${queue.volume}% \` | Filter: \`${queue.filters.join(", ") || "Off"}\`  Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` \n Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    client.distube
    .on("playSong", (queue, song) =>
        {
          
     const play1 = new MessageEmbed()
      .setColor(ee.color)
         .setTitle(`Hear high quality songs by me `)
     .setDescription(`ㅤ\n\n[${song.name} - ${song.formattedDuration}](${song.url})\n\n\`\`\`\nRequested by : ${song.user.tag} || Volume : ${queue.volume}% || \nDuration : ${song.formattedDuration}\n\`\`\`\n\n**SONG DETAILS**\n\`\`\`Uploaded by : ${song.uploader.name} || Likes : ${song.likes} || Dislikes : ${song.dislikes} \n\`\`\`\n\n [LINK](${song.uploader.url})`)
//.setDescription(`ㅤ\n\n[${song.name} - ${song.formattedDuration}](${song.url})\n\n ${client.allEmojis.set} **Requisted by **\n\`${song.user.tag}\`\n\n ${client.allEmojis.set} **Volume**\n\`${queue.volume}% \`\n\n ${client.allEmojis.set} **Duration**\n\`${song.formattedDuration}\`\n\n ${client.allEmojis.play} **SONG DETAILS** ${client.allEmojis.play}\n\n ${client.allEmojis.set} **uploaded by**\n\`${song.uploader.name}\`\n\n ${client.allEmojis.set} **Likes**\n\`${song.likes}👍\`\n\n ${client.allEmojis.set} **Dislikes**\n\`${song.dislikes}👎\`\n\n ${client.allEmojis.set}  [LINK](${song.uploader.url})`)
       
     

       .setImage(`https://media.discordapp.net/attachments/840554324160544789/987409998739017768/PicsArt_06-17-11.04.16.jpg`)
          .setAuthor(`Now playing.....`, `https://cdn.discordapp.com/emojis/955112766564360252.gif?v=1&size=48&quality=lossless`)
          .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
          
          
         

     let Sendmenu = queue.textChannel.send({embeds: [play1],components: [MusicButtons, MusicButtons1]})
  })
      
      .on("addSong", (queue, song) =>
        {
          
        
        queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor("GREEN")
          
          .setTimestamp()
          .setFooter("New song has been Added By: " + song.user.tag, song.user.displayAvatarURL({
            dynamic: true
          }))
         
          .setTitle(`${client.allEmojis.y} Song Added to the Queue`)
          .setDescription(`Added [${song.name}](${song.url}) - \`${song.formattedDuration}\`.Wait for the current song finished `)
        ],ephemeral: true
      })})
      
      .on("addList", (queue, playlist) => queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
           
          .setTimestamp()
          .setFooter("Added By: " + playlist.user.tag, playlist.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.y} Playlist Added to the Queue`)
          .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs to queue\n${status(queue)}`)
        ],ephemeral: true
      }))
      .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send({
          embeds: [
            new MessageEmbed()
            .setColor(ee.color)
             
            .setTimestamp()
            .setTitle(`Choose an option from below`)
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
          ],ephemeral: true
        })
      })
      .on("searchCancel", message => message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.wrongcolor)
           
          .setTimestamp()
          .setTitle(`⛔️ Searching Canceled`)
        ],ephemeral: true
      }))
      .on("error", (channel, e) => {
        console.error(e);
        channel.send({
          embeds: [
            new MessageEmbed()
            .setColor(ee.wrongcolor)
             
            .setTimestamp()
            .setTitle(`⛔️ Error`)
            .setDescription(`${e}`)
          ],ephemeral: true
        })
      })
      .on("empty", queue =>

       

        queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
           
          .setTimestamp()
          .setTitle(`${client.allEmojis.finish} Leaving Channel`)
          .setDescription(`Voice channel is empty! Leaving the channel...`)
        ],ephemeral: true
      })
         )
      .on("searchNoResult", message => message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.wrongcolor)
           
          .setTimestamp()
          .setDescription(`**No result found!**`)
        ],ephemeral: true
      }))
      .on("finish", queue =>

    queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
           
          .setTitle(`${client.allEmojis.finish}  SONG FINISHED...`)
          .setDescription("🎧 **There are no more songs in the queue leaving...**")
          .setTimestamp()
        ],
        ephemeral: true
      }))
      .on(`finishSong`, (queue, song) => {
        
    
        queue.textChannel.send({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setAuthor(`${song.name}`, `https://cdn.discordapp.com/attachments/883978730261860383/883978741892649000/847032838998196234.png`, song.url)
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
             
          ],
          ephemeral: true
        })
      })
     
     
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