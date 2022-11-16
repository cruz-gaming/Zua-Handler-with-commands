const Canvas = require('canvas');
const config = require(`${process.cwd()}/settings/config.json`);
const db = require("old-wio.db");
const { MessageAttachment } = require('discord.js');

module.exports = async (client) => {
  try{
  	
  client.on("guildMemberAdd", async (member) => {
    const { registerFont } = require('canvas');
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
registerFont(`${process.cwd()}/fonts/Italic.ttf`, { family: 'Italic' });// ././Amaranth-Regular.ttf
registerFont(`${process.cwd()}/fonts/test.ttf`,{ family: 'test' });
registerFont(`${process.cwd()}/fonts/Alien.ttf`, { family: 'Alien' });
registerFont(`${process.cwd()}/fonts/Alien-italic.ttf`, { family: 'Alien-italic' });
    

        // Declare a base size of the font
        let fontSize = 60;

        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px Italic`;
          

        
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 108);

        // Return the result to use in the actual canvas
        return ctx.font;
    

        

    };



let df = db.fetch(`welcome_image_${member.guild.id}`)
 if(!df) return;

let channel1 = db.fetch(`ichannel_${member.guild.id}`)
 if(!channel1) return;
      let channel = await client.channels.fetch(`${channel1}`);

    const canvas = Canvas.createCanvas(560, 316);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(`${process.cwd()}/sp.png`); // ./wallpaper.png
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


//fonts 
    ctx.font = applyText(canvas,member.user.tag);
    
  
    ctx.fillStyle = '#000000';
    ctx.fillText(`WELCOME`, canvas.width / 3.20, canvas.height / 4.80);

ctx.font = '35px Alien';
    
  ctx.textAlign = 'center';
    ctx.fillStyle = '#00FFFF';
  
    ctx.fillText(`Welcome To the server`, canvas.width / 2.10, canvas.height / 1.15);
    


    ctx.font = '25px Alien-italic';
    ctx.fillStyle = '#FFFFFF';
    ctx.style = "position: center; top: 50px; left: 50px; border:2px solid blue"
    ctx.fontSize = 20;
  ctx.textAlign = 'center';
    ctx.fillText(` ${member.user.tag}`, canvas.width / 1.80, canvas.height / 1.97);

  ctx.font = '15px Impact';
    ctx.fillStyle = '#FFFFFF';
    ctx.style = "position: center; top: 50px; left: 50px; border:2px solid blue"
    ctx.fontSize = 20;
  
    ctx.fillText(`YOUR POSITION IS ${member.guild.memberCount} `, canvas.width / 2.20, canvas.height / 1.70);


    ctx.beginPath();
  ctx.arc(122, 157, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 50, 95, 120, 120);

    

          
    const attachment = new MessageAttachment(canvas.toBuffer(), 'sp.png');


    channel.send({
        
        files: [attachment]
    })
  
  })

    } catch (e) {
      client.dclog(e.stack);
      console.log(e.stack);
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