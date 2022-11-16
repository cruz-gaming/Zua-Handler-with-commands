
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton 
} = require('discord.js');
const emotes = require(`${process.cwd()}/settings/emojis.json`);

module.exports = {
  name: "servers",
  aliases: ["top", "svr"],
  usage: '',
  description: "",
  category: "owner",
  cooldown: 0,
  userPerms: "ADMINISTRATOR",
  clientPerms: "ADMINISTRATOR",
  ownerOnly: true,
  toggleOff: false,


    async execute(client, message) {

   let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description;
   
      description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `\`\`\`\n${i + 1}) ${r.name} \n ${r.memberCount} Members\n${r.id} \`\`\``)
          .slice(0, 10)
          .join("\n");

      let emb = new MessageEmbed()
    .setColor("#FF0000")
    .setFooter(`Stack Developers | Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
    .setDescription(description);

   let pages = new MessageActionRow().addComponents(
   new MessageButton()
  .setStyle("SECONDARY")
  
    .setLabel("previous")
 .setCustomId("previous"),
   new MessageButton()
  .setStyle("SECONDARY")
     .setLabel("next")
     
  .setCustomId("next")
   )
   
   let dis = new MessageActionRow().addComponents(
   new MessageButton()
  .setStyle("SECONDARY")
  .setEmoji("⬅️")
  .setDisabled(true)
     .setLabel("previous")
 .setCustomId("previous"),
   new MessageButton()
  .setStyle("SECONDARY")
     .setLabel("next")
     .setEmoji("➡️")
  .setDisabled(true)
  .setCustomId("next")
   )  
      
  if(client.guilds.cache.size < 10) return message.channel.send({
      embeds: [emb],
      components: [dis]
  }) 
   
      let msg = await message.channel.send({
          embeds: [emb],
          components: [pages]
      });
 
    let filter = (i) => i.user.id === message.author.id;

      let collector = msg.createMessageComponentCollector({
    filter
      });

      collector.on("collect", async (i) => {
        if (i.customId === "previous") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        
    if (i1 < 9) return msg.delete();

    description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `\`\`\`\n${i + 1}) ${r.name} \n ${r.memberCount} Members\n${r.id} \`\`\``)
          .slice(i0, i1)
          .join("\n");

    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
    .setDescription(description);

        msg.edit({
        embeds: [emb]
            
        }).catch(
            i.deferUpdate())
        }

        if (i.customId === "next") {

          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 10) return msg.delete();   
      if (!i0 || !i1) return msg.delete();

         description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `\`\`\`\n${i + 1}) ${r.name} \n ${r.memberCount} Members\n${r.id} \`\`\``)
          .slice(i0, i1)
          .join("\n");


    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
    .setDescription(description)      
    msg.edit({
        embeds: [emb]
    }).catch(
            i.deferUpdate())
        }
      })
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
     