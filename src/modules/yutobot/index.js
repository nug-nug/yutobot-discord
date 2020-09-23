const Discord = require("discord.js");

const start = () => {
	const client = new Discord.Client({
		presence: {
			activity: {
				type: "LISTENING",
				name: `${process.env.DISCORD_COMMAND_PREFIX}help`,
			},
		},
	});

	client.once("ready", () => {
		console.log("Ready!");
	});

	//Greet new members
	client.on("guildMemberAdd", member => {
		const guildChannelManagerCache = member.guild.channels.cache;
		const welcomeTextChannel = guildChannelManagerCache.get(process.env.DISCORD_CHANNELID_WELCOME);
		const vcSyncTextChannel = guildChannelManagerCache.get(process.env.DISCORD_CHANNELID_VC_SYNC);
		const commandsTextChannl = guildChannelManagerCache.get(process.env.DISCORD_CHANNELID_COMMANDS);

		welcomeTextChannel.send(
			`welcome ${member.user}, there's cool shit in ${welcomeTextChannel}, ${vcSyncTextChannel} for text messages during voicechat, and ${commandsTextChannl} for interacting with bots, enjoy`
		);
	});

	//Listen to commands in the commands channel (except help)
	client.on("message", message => {
		const prefix = process.env.DISCORD_COMMAND_PREFIX;
		//Check message is in commands channel
		if (message.channel.id === process.env.DISCORD_CHANNELID_COMMANDS) {
			if (message.content.startsWith(prefix)) {
				//Valid command syntax; handle command
				//Tokenize command into words
				const cmd = message.content.slice(1).trim().split(" ");
				switch (cmd[0]) {
					case "ping":
						message.channel.send("Pong! (￣▽￣)ノ");
						break;
					case "help":
						message.channel.send("no 3>");
						break;
					case "uwu":
						message.channel.send("owo (*≧▽≦)");
						break;
					case "owo":
						message.channel.send("uwu (≧∇≦*)");
						break;
					default:
						message.channel.send(`sry! idk what \`${cmd[0]}\` means ¯\\_(ツ)_/¯`);
				}
			}
		} else if (message.content.trim() === `${prefix}help`) {
			//Exception for help
			message.channel.send(`try that in ${message.guild.channels.cache.get(process.env.DISCORD_CHANNELID_COMMANDS)} (｡•̀ᴗ-)✧`);
		}
	});

	client.login(process.env.DISCORD_BOT_TOKEN);
};

module.exports = start;
