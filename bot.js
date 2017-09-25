const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MzYxMjYzMTg4Nzg2MDIwMzUy.DKiIjA.lpR-Xkqfc07J_ljxXmQdASmqpD8';

client.login(token).then().catch(err=>console.log(err));
client.on('message', message =>{
	// if the message is the bot's then it leaves.
	if(message.author.bot) return;
	
	if (message.content.substring(0, 1) == '?') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
		args = args.splice(1);
	}
	
	var voiceChannel = client.channels.filter(g=>{
		return g.type == 'voice' && g.name == 'General';
	}).first();
	
	if(cmd.toLowerCase() === 'ready'){
		message.channel.send('Haiiiiii! Let\'s play a game');
		voiceChannel.join().then(connection =>{
			console.log('Started playing');
			const dispatcher = connection.playFile('./Ready.mp3');
			console.log('Done playing');
			dispatcher.on('end',()=> connection.disconnect());
		})
		.catch(err => console.log(err));
	}
	if(cmd.toLowerCase() === 'rock' || cmd.toLowerCase() === 'paper' || cmd.toLowerCase() === 'scissors' || cmd.toLowerCase() === 'scissor'){
		var choices = ['rock','paper','scissors'];
		var userResponse = cmd.toLowerCase();
		var userWins = false;
		var response = choices[Math.floor(Math.random()*3)];
		message.channel.send('I chose '+response);
		if(userResponse == 'paper'){
			if(response == 'rock'){
				message.channel.send('You won :(');
				userWins = true;
			}else if(response == 'scissors'){
				message.channel.send('KATTA');
			}else{
				message.channel.send('There was a tie');
			}
		}
		if(userResponse == 'rock'){
			if(response == 'scissors'){
				message.channel.send('You won :(');
				userWins = true;
			}else if(response == 'paper'){
				message.channel.send('KATTA');
			}else{
				message.channel.send('There was a tie');
			}
		}
		if(userResponse == 'scissor' || userResponse == 'scissors'){
			if(response == 'paper'){
				message.channel.send('You won :(');
				userWins = true;
			}else if(response == 'rock'){
				message.channel.send('KATTA');
			}else{
				message.channel.send('There was a tie');
			}
		}
		if(userWins == true){
			voiceChannel.join().then(connection =>{
				console.log('Started playing');
				const dispatcher = connection.playFile('./Omedetou.mp3');
				console.log('Done playing');
				dispatcher.on('end',()=> connection.disconnect());
			})
		}
	}
});


