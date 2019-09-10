const fs = require('fs');
let bal = require('../balance.json');
let ball = require('../balance.json');

exports.run = async (client, message, args, color) => {
  let allowedRole = message.guild.roles.find("name", "Банкир");
    if (message.member.roles.has(allowedRole.id)){

  let user = message.mentions.users.first() || client.users.get(args[0]);
    if(!user) return message.channel.send(`**${message.author.username}**, Игрок не найден! Пожалуйста, указывайте привельный дискорд тег!`);
  if(user.bot) return message.channel.send(`${message.author.username}, У бота нету баланса!`);
	if(isNaN(args[1])) return message.channel.send('Введите действительное значение!');



  bal[user.id].balance = parseInt(args[1])
  fs.writeFile('./balance.json', JSON.stringify(bal, null, 2), (err) => {
    message.author.send('Успешно!')
    user.send(`\🏧  | **Передача квитанции**\`\`\`Зачесление ${args[1]} пороха \n(ID: ${message.author.id})\`\`\``);
    if(err) console.log(err);
  });
 

}}

exports.conf = {
    aliases: ['tf'],
    cooldown: "5"
}

exports.help = {
    name: "bs",
    description: "Set balance to other user",
    usage: "bs <@user|id> <amount>"
}
