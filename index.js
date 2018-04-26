console.log('Lerry...')
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json'); // a pasta de Configurações do bot
const fs = require('fs');
let xp = require("./xp.json");
// Dono: Shiro <3 // Ajudante: Az4zell

client.on("ready",  () => {
 
  client.user.setPresence({game: { name: `Eae rapaziada || ajudando ${client.guilds.size} Guilds` , type: 1,  url: "https://www.twitch.tv/az4zell"}})
    setInterval(() => {
  client.user.setPresence({game: { name: `Use `+ config.prefix +`ajuda || Jogando com ${client.users.size} Pessoas ♥` , type: 1,  url: "http://www.youtube.com"}})
    },1 * 60 * 64)
    });

    client.on("ready", () => {
      client.user.setUsername("Sistine")
    });

client.on('message', msg => {
  if (msg.content === '<@422209859749150720>') {
    msg.reply(`Oi sou o ${client.user.username}. Minha prefix:**` + config.prefix + "**");
  }
});

  
client.on("message", message => {
    if (message.author.bot) return; // Mensagem de Bot, Será ignorada
    if (!message.content.startsWith(config.prefix)) return; // Se não começar com o prefix ignora.
    let command = message.content.split(" ")[0]; // command = oq falar dps da prefix: a!alo
    command = command.slice(config.prefix.length);
   
    let args = message.content.split(" ").slice(1); // "alo"
   
    try {
      let commandFile = require(`./comandos/${command}.js`); // Procura o arquivo na pasta
      commandFile.run(client, message, args); // Executa
    } catch (err) { // caso de erro, serve para não crashar o bot
      console.error(err); // mandará o erro no Systema
    }
  });

  client.on('message',message => {

    if (message.author.bot) return;

let xpAdd = Math.floor(Math.random() * 10) + 12;
console.log(xpAdd);

if(!xp[message.author.id]){
xp[message.author.id] = {
xp: 10,
level: 0
};
}

let curxp = (xp[message.author.id]).xp;
let curLvl = xp[message.author.id].level; 
let nxtLvl = xp[message.author.id].level * 700;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
xp[message.author.id].level = curLvl + 1;
let lvlup = new Discord.RichEmbed()
.setTitle(`${message.author.username} Parabéns por upa!`)
.setColor(0xffffff)
.addField("Novo Level", curLvl + 1);

message.channel.send(lvlup);
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) =>{
if(err) console.log(err)
});
  });

  client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
	const embed = new Discord.RichEmbed()
	.setTitle('Recepção')
	.addField(`Bem-Vindo Ao Servidor`, `${member}`)
	.setColor(0xfffefe)
    channel.send({embed});
  });

  client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
	const embed = new Discord.RichEmbed()
	.setTitle('Recepção')
	.addField(`Usuario:`, `${member} Saiu do servidor`)
	.setColor(0xfffefe)
    channel.send({embed});
  });
  
client.login(config.token)
console.log('GO!')