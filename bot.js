const Discord = require("discord.js");
const ddg = require('ddg');
const client = new Discord.Client();
const config = require('./config.json');
const commands = require('./commandlist.json');
const fs = require("fs");

client.login(config.token);

client.on('ready', () => {
	console.log('I am ready!');
});

client.on("message", message => {

	// Check so that Selfbot only replies to me
	if(message.author !== client.user) return;

	// Exit and Stop if config.prefix isn't there
	if(!message.content.startsWith(config.prefix)) return;

	// Prevent Botception
	if(message.author.bot) return;

	// Add Commands Here And Mirror The Changes in commandlist.json
	let commandList = new Map([
		["lenny", commands.lenny],
		["gun", commands.gun],
		["crie", commands.crie],
		["disappoint", commands.disappoint]
	]);

	// Command Launcher Block
	let command_name = message.content.slice(1);
	if(commandList.has(command_name)){
		setTimeout(() => {message.edit(commandList.get(command_name))}, 50);
		return;
	}

});
