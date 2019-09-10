const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
    message.channel.send('Команды:');
    message.channel.send('Посмотреть баланс ~ball');
    message.channel.send('Перевести порох ~tran <@тег> <кол-во>');
    bot.send(embed);

};
module.exports.help = {
    name: "help"
};