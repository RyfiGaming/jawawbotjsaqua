const fs = require('fs');
let bal = require('../balance.json');
let ball = require('../balance.json');

exports.run = async (client, message, args, color) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);

    if(!user) return message.channel.send(`**${message.author.username}**, Игрок не найден! Пожалуйста, указывайте привельный дискорд тег!`);
  if (user.id == message.author.id) return message.channel.send('Ты не можешь перевести пирох себе!');
  if(user.bot) return message.channel.send(`${message.author.username}, У бота нету баланса!`);
  if(!args[1]) return message.channel.send('Пожалуйста, укажите стоимость перевода');
	if(isNaN(args[1])) return message.channel.send('Введите действительное значение!');

  if(!bal[user.id]){
    bal[user.id] = {
      balance: 0
    };
  }
  if(!ball[message.author.id]){
    ball[message.author.id] = {
      balance: 0
    };
  }

   if(ball[message.author.id].balance < args[1]) return message.channel.send(`Проверьте еще раз **${message.author.username}**, У вас нет \**${args[1]}** пироха`);

  var curBal = bal[user.id].balance;
  let curBall = ball[message.author.id].balance;
 
  bal[user.id].balance = curBal + parseInt(args[1])
  fs.writeFile('./balance.json', JSON.stringify(bal, null, 2), (err) => {
    user.send(`\🏧  | **Передача квитанции**\`\`\`Ты получил(а) ${args[1]} пороха от ${message.author.tag}\n(ID: ${message.author.id})\`\`\``);
    if(err) console.log(err);
  });
  ball[message.author.id].balance = curBall - parseInt(args[1])
  fs.writeFile('./balance.json', JSON.stringify(ball, null, 2), (err) => {
    message.channel.send(`Привет **${user.tag}**, Ты получил **${args[1]}** пороха от **${message.author.tag}**`);
    if(err) console.log(err);
  });

}

exports.conf = {
    aliases: ['tf'],
    cooldown: "5"
}

exports.help = {
    name: "tran",
    description: "Transfer balance to other user",
    usage: "tran <@user|id> <amount>"
}
