const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const commands = require('./commandlist.json');
var emojiReg = new RegExp(/(:[\w0-9]+:)/ig);

//const emojify = require('./emojify.js');
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
				["disappoint", commands.disappoint],
        ["stare", commands.stare],
        ["flipfb", commands.flipfb],
        ["cuteface", commands.cuteface],
        ["anger1", commands.anger1],
        ["fight1", commands.fight1],
        ["ovo", commands.ovo],
				["triggered", commands.triggered],
				["reee", commands.reee],
				["derp", commands.derp]
	]);

	// Command Launcher Block
	let command_name = message.content.slice(1);
	var emopatt = /emojify/;
	if(commandList.has(command_name)){
		setTimeout(() => {message.edit(commandList.get(command_name))}, 50);
		return;
	}
	if(emopatt.test(command_name)){
		var str2 = message.content.replace("/emojify ", '');
		setTimeout(() => {message.edit(emojify(str2))}, 50);
	}

});

function emojify(word) {
		var word_bak = word;
    var numText = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
    if (word && (!word.match(emojiReg))) {
        var letterSplit = word.split('');
        word = '';
        for (var i in letterSplit) {
            if (i != 0) {
                word += ' ';
            };
            if (/[a-z]/i.test(letterSplit[i])) {
                word += ':regional_indicator_' + letterSplit[i].toLowerCase() + ':';
            } else if (/[0-9]/.test(letterSplit[i])) {
                word += numText[parseInt(letterSplit[i])];
            } else if (/#/.test(letterSplit[i])) {
                word += ':hash:';
            } else if (/\*/.test(letterSplit[i])) {
                word += ':asterisk:';
            } else if (/\?/.test(letterSplit[i])) {
                word += ':question:';
            } else if (/\+/.test(letterSplit[i])) {
                word += ':heavy_plus_sign:';
            } else if (/\-/.test(letterSplit[i])) {
                word += ':heavy_minus_sign:';
            } else if (/\</.test(letterSplit[i])) {
                word += ':arrow_backward:';
            } else if (/\>/.test(letterSplit[i])) {
                word += ':arrow_forward:';
            } else if (/\^/.test(letterSplit[i])) {
                word += ':arrow_up_small:';
            } else if (/\$/.test(letterSplit[i])) {
                word += ':heavy_dollar_sign:';
            } else if (/\!/.test(letterSplit[i])) {
                word += ':exclamation:';
            } else {
                //add warning eventually
            };
        };
    };
		var a = word_bak.length;
		word += '\n';
		for (var j = 0; j < a; j++) {
			if(word_bak[j] == ' ')
			{
				word += ' ';
			}
			else {
				word += ':ok_woman::skin-tone-' + Math.floor(Math.random() * 5 + 1) + ': ';
			}
		}
    return word;
};
