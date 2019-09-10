let balance = require("../balance.json");

exports.run = async (client, message, args) => {
  if (message.channel.type == "dm") return;  
  
  let member = message.mentions.users.first() || client.users.get(args[0]);
  if (!member) member = message.author;
  if (member.bot) return message.channel.send(`**${message.author.username}**, Бот не имеет баланс!`);

    if(!balance[member.id]){
      balance[member.id] = {
      balance: 0
      };
    }

    if(!balance[member.id]){
    balance[member.id] = {
      balance: 0
    };
    }

  let uBalance = balance[member.id].balance;
  if (uBalance == 0) {
    message.channel.send(`**${member.username} У вас на балансе 0 пороха!**`);
  } else {
  message.channel.send(`**${member.username}** У вас на балансе **${uBalance} пороха!**`);
  }
}

exports.conf = {
    aliases: ["bal"],
    cooldown: "5"
}

exports.help = {
    name: 'ball',
    description: 'To show someone Balance Amount',
    usage: 'ball [@mention]'
}