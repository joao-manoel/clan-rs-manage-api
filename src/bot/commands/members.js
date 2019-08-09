//Carrega as depedencias
const Discord = require("discord.js")
const env = require("../../.env")

exports.run = (client, message, args) => {
  if (args == "update") {
    if (message.member.roles.has(env.owner)) {
      let embed = new Discord.RichEmbed()
        .setColor('#ea7010')
        .setTitle('Atualizacao de membros')
        .setAuthor(message.member.user.username, message.member.user.avatarURL)
        .setDescription('A atualizacao dos membros foi um sucesso!')
        .setTimestamp()
        .setFooter('Ate a proxima!', message.guild.iconURL);

      message.channel.send(embed)
    }
  }

  console.log(message.member.user.username, message.member.user.avatarURL)
}

exports.help = {
  name: "members"
}