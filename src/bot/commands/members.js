//Carrega as depedencias
const Discord = require("discord.js")
const axios = require("axios")
const env = require("../../.env")

exports.run = async (client, message, args) => {
  if (args != null) {
    if (message.member.roles.has(env.owner)) {
      if (args == "update") {
        let update = await axios.post(`http://localhost:3333/api/members`)

        let embed = new Discord.RichEmbed()
          .setColor('#1af025')
          .setTitle('Atualizacao de membros')
          .setAuthor(message.member.user.username, message.member.user.avatarURL)
          .setDescription(update.data.message)
          .setTimestamp()
          .setFooter('Ate a proxima!', message.guild.iconURL);

        message.channel.send(embed)
      }else{
        let user = await axios.get(`http://localhost:3333/api/members/${args}`)
        
        console.log(user.data.rank)
      }
    }else{
      let embed = new Discord.RichEmbed()
          .setColor('#fa0c0c')
          .setTitle('To de Olho!')
          .setAuthor(message.member.user.username, message.member.user.avatarURL)
          .setDescription('Voce nao tem permisao para usar esse comando!')
          .setTimestamp()
          .setFooter('Ate a proxima!', message.guild.iconURL);

        message.channel.send(embed)
    }
  }
}

exports.help = {
  name: "members"
}
