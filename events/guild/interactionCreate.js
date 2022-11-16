const config = require(`${process.cwd()}/settings/config.json`);
const {
	Client,
	CommandInteraction,
	MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const {
	databasing,
	onCoolDown,
} = require(`${process.cwd()}/handlers/functions`);

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {Client} client 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		try {

			databasing(client, interaction.guild.id)
            const guild_settings = client.settings.get(interaction.guild.id);

            let ee = guild_settings.embed;

            let {
                prefix
            } = guild_settings;

			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
				return interaction.reply({
					content: `❌ I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``,
					ephemeral: true
				})
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
				return interaction.reply({
					content: `${client.allEmojis.x} I am missing the Permission to \`EMBED_LINKS\``,
					ephemeral: true
				})
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setTitle(`${client.allEmojis.x} I am missing the Permission to \`ADD_REACTIONS\``)
					],
					ephemeral: true
				})

			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command) return client.slashCommands.delete(interaction.commandName);

				if (command) {

					const args = [];

					for (let option of interaction.options.data) {
						if (option.type === "SUB_COMMAND") {
							if (option.name) args.push(option.name);
							option.options?.forEach((x) => {
								if (x.value) args.push(x.value);
							})
						} else if (option.value) args.push(option.value);
					}

					if (command.toggleOff) {
						return await interaction.reply({
							embeds: [new MessageEmbed()
								.setTitle(`${client.allEmojis.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
								.setColor(ee.wrongcolor)
							]
						}).catch((e) => {
							console.log(e)
						});
					}
					if (!interaction.member.permissions.has(command.userPermissions)) return await interaction.reply({
						embeds: [new MessageEmbed()
							.setDescription(`${client.allEmojis.x} **I do not have \`${command.userPermissions}\` permission to use \`${command.name}\` command!**`)
							.setColor(ee.wrongcolor)
						],
						ephemeral: true
					}).catch((e) => {
						console.log(e)
					});
					if (!interaction.guild.me.permissions.has(command.botPermissions)) return await interaction.reply({
						embeds: [new MessageEmbed()
							.setDescription(`${client.allEmojis.x} **I do not have \`${command.botPermissions}\` permission to use \`${command.name}\` command!**`)
							.setColor(ee.wrongcolor)
						],
						ephemeral: true
					}).catch((e) => {
						console.log(e)
					});
					if (onCoolDown(interaction, command)) {
						return await interaction.reply({
							embeds: [new MessageEmbed()
								.setColor(ee.wrongcolor)
								.setDescription(`${client.allEmojis.x} **Please wait \`${onCoolDown(interaction, command).toFixed(1)} seconds\` Before using the \`${command.name}\` command again!.**`)
							],
							ephemeral: true
						});
					}
					command.execute(client, interaction, args, ee, prefix);
				}
			}

		} catch (e) {
			console.log(e)
			return interaction.channel.send({
				embeds: [new MessageEmbed()
					//.setColor(ee.wrongcolor)
					.setTitle(`${client.allEmojis.x} ERROR | An error occurred`)
					//.setFooter(ee.footertext, ee.footericon)
					.setDescription(`\`\`\`${e.message}\`\`\``)
				]
			});
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