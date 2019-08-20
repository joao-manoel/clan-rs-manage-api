const axios = require('axios')

const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args) => {
  
  var membros = await axios.get(`${process.env.API_URL}/api/members`)
  var membros = membros.data

  var membro1 = membros[Math.floor(Math.random() * membros.length) + 1]
  var membro2 = membros[Math.floor(Math.random() * membros.length) + 1]

  
  var frases = [
    'Hoje o trofeu de casal do ano vai para...', 
    'Que casal lindo!', 
    'Todos ja sabiam que era amor!']
  var frases_rand = frases[Math.floor(Math.random() * frases.length)]

  var emoji = [
    '😍',
    '💑',
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '💞',
    '💓',
    '💝'
  ]

  var emoji_rand =emoji[Math.floor(Math.random() * emoji.length)]

  var cards = {
    color: 0xf556ed,
    author: {
      name: message.member.user.username,
      icon_url: message.member.user.avatarURL
    },
    fields: [
      {
        name: `${frases_rand}`,
        value: `***${utils.convertName(membro1.name)} ${emoji_rand} ${utils.convertName(membro2.name)}***`
      }
    ],
      footer: {
        text: '❤️Desenvolvido por @Manoel.'
      }
  }

  message.channel.send({embed: cards})

}
exports.help = {
  name: 'match'
}