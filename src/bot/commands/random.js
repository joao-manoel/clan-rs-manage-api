const axios = require("axios")
const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args, dm) => {
  if (utils.hasPermissionAll(message, 2)) {

    var membros = await axios.get(`${process.env.API_URL}/api/members`)
    var membros = membros.data
    var number = Math.floor(Math.random() * membros.length) + 1

    var sorteado = membros[number]
    var name_replace = sorteado.name.replace(" ", "_")
    var name = sorteado.name.charAt(0).toUpperCase() + sorteado.name.slice(1)
    
    
    var send = await message.channel.send(`Embaralhando os membros...`)

    var word = ['Eu escolho voce!', 'Que sortudo!', 'E o escolhido é...']
    word = word[Math.floor(Math.random() * word.length)]


    var cards = {
      color: 0xdd4e06,
      author: {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL
      },
      thumbnail: {
        url: `https://secure.runescape.com/m=avatar-rs/${name_replace}/chat.png`,
      },
      fields: [
        {
          name: word,
          value: `***${name}***`
        }
      ],
      timestamp: new Date(),
        footer: {
          text: '❤️Desenvolvido por @Manoel.',
          icon_url: message.guild.iconURL,
        }
    }

    setTimeout(() =>{
      
      send.edit(`***Toque os tambores!!!***`)
    }, 2000)

    setTimeout(() =>{
      
      send.edit({embed: cards})
    }, 4000)
    

  }else{
    var cards = {
      color: 0xdd4e06,
      author: {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL,
      },
      fields: [
        {
          name: "Permissao Negada",
          value: 'Voce nao tem permissao para usar esse comando!'
        }
      ]
    }

    message.channel.send({embed: cards})
  }
}

exports.help = {
  name: 'r'
}