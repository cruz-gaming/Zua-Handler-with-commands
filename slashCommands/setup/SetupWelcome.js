const config = require(`${process.cwd()}/settings/config.json`);
const ee = require(`${process.cwd()}/settings/color.json`);
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:`${process.cwd()}/databases/Welcome.json`});
const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");



module.exports = {
    name: 'setup-welcome',
    usage: '',
    description: 'Create Backup for your Server!',
    category: "utility",
    userPerms: "ADMINISTRATOR",
    clientPerms: "ADMINISTRATOR",
    ownerOnly: false,
    toggleOff: false,
    options: [{
            name: 'channel',
            type: 'SUB_COMMAND',
            description: 'channel setup',
            options: [{
      
                name: 'channel',
      
                type: 'CHANNEL',
              channelTypes: ["GUILD_TEXT"],
                description: 'channel selection',
                required: true,
            }]
    },
    {
            name: 'message',
            type: 'SUB_COMMAND',
            description: 'variables : -members-,-memberscount-,-server-',
            options: [{
                name: 'message',
                type: 'STRING',
                description:'variables : -members-,-memberscount-,-server-',
                required: true,
            }]
        },
        {
            name: 'role',
            type: 'SUB_COMMAND',
            description: 'Give auto role',
            options: [{
                name: 'role',
                type: "ROLE",
                description: 'Give auto role',
               required: true,
            }]
        },
        {
            name: 'autorole-disable',
            type: 'SUB_COMMAND',
            description: 'remove autorole',
        },
              {
            name: 'default',
            type: 'SUB_COMMAND',
            description: 'default message send',
        },
{
            name: 'disable',
            type: 'SUB_COMMAND',
            description: 'disable message',
        },
              {
            name: 'image-enable',
            type: 'SUB_COMMAND',
            description: 'image  send',
        },
              {
            name: 'image-disable',
            type: 'SUB_COMMAND',
            description: 'image  desable',
        },

    ],

        
        
  

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(client, interaction, args, ee) {
        const SubCommand = interaction.options.getSubcommand();;

        if (SubCommand === "channel") {
      
const Admin1 = interaction.options.getChannel("channel");
          //Admin1 = interaction.channel;
          
    db.set(`welcome_status_${interaction.guild.id}`,1);
 db.set(`ichannel_${interaction.guild.id}`, Admin1.id)

    
 interaction.reply(`(${Admin1}) channel has been set in database`);

        } else if (SubCommand === "role") {
      
const role1 = interaction.options.getRole("role");
          //Admin1 = interaction.channel;
          
    db.set(`autorole_${interaction.guild.id}`, role1.id);
 

    
 interaction.reply({content: `Ok Now i will give ${role1} role when someone join this server`,ephemeral : true})

        }   else if (SubCommand === "autorole-disable") {
      

          
    db.delete(`autorole_${interaction.guild.id}`);
 

    
 interaction.reply({content : `Done i have Disabled auto role in your server enable it by adding any role`,ephemeral: true});

        }    else if (SubCommand === "message") {
       
       
        const message1 = interaction.options.getString("message");
          db.set(`welcome_status_${interaction.guild.id}`,1);
            db.set(`message123_${interaction.guild.id}`, message1);
  interaction.reply(`Done\n${message1} \nYour Message Has been set in Database`);

        } else if (SubCommand === "default") {
            
          const default1 = interaction.options.getString("default1");              
          db.set(`welcome_status_${interaction.guild.id}`,1);
          db.set(`message123_${interaction.guild.id}`, default1);
  interaction.reply("Done i have set the message of welcome to default")   

                    } else if (SubCommand === "disable") {
            
          const default2 = interaction.options.getString("disable");              
           db.delete(`welcome_status_${interaction.guild.id}`);
  interaction.reply("Done i have disabled the welcome message of this server")   

                    }  else if (SubCommand === "image-enable") {
            
         // const default2 = interaction.options.getString("image-enable");              
           db.set(`welcome_image_${interaction.guild.id}`, 1);
  
  interaction.reply("i am enabled image.Now i will send welcome card in specified channel")   

                    } else if (SubCommand === "image-disable") {
            
         // const default2 = interaction.options.getString("image-disable");              
           db.delete(`welcome_image_${interaction.guild.id}`);
  
  interaction.reply("Done i have set this in my database")   

                    } 
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