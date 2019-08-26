const axios = require('axios')

const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args) => {

  if (args.length >= 2) {

    console.log(args)

    var porc = Math.floor(Math.random() * 101)
    var word = []
    var graf = null

    var match1 = args[0]
    var match2 = args[1]


    if (match1 == "manoel" || match2 == "manoel"|| match1 == "<@275622111266209793>" || match2 == "<@275622111266209793>") {
      if (match1 == "sininho" || match2 == "sininho" || match1 == "<@195727507373162497>" || match2 == "<@195727507373162497>"
        || match1 == "uvinha chan" || match2 == "uvinha chan" || match1 == "<@265277939208290315>" || match2 == "<@265277939208290315>"
        || match1 == "fumiguinha" || match2 == "fumiguinha" || match1 == "<@584911898319912961>" || match2 == "<@584911898319912961>"
        || match1 == "aninha" || match2 == "aninha" || match1 == "<@301107476311572503>" || match2 == "<@301107476311572503>"
        ) {
        porc = 100
      }
    }

    

    if (porc >= 100) {
      word = ['Nasceram um para o outro!', 'Um completa o outro!']
      graf = `[|||||${porc}%|||||]`
    } else if (porc >= 90) {
      word = ['Ja da para casar!', 'Pede em namoro logo!']
      graf = `[|||||${porc}%||||_]`
    } else if (porc >= 80) {
      word = ['Ate que a primeira briga o separe', 'Entre tapa e beijos!']
      graf = `[|||||${porc}%|||__]`
    } else if (porc >= 70) {
      graf = `[|||||${porc}%||___]`
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
    } else if (porc >= 60) {
      word = ['incompatibilidade Baixa', 'Cada um no seu quadrado']
      graf = `[|||||${porc}%|____]`
    } else if (porc >= 50) {
      word = ['Vamos ver oque da!', 'Cada um no seu quadrado']
      graf = `[|||||${porc}%_____]`
    } else if (porc >= 40) {
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
      graf = `[||||${porc}%______]`
    } else if (porc >= 30) {
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
      graf = `[|||${porc}%_______]`
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
    } else if (porc >= 20) {
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
      graf = `[||${porc}%________]`
    } else if (porc >= 10) {
      word = ['Por sua conta em risco', 'Cada um no seu quadrado']
      graf = `[|${porc}%_________]`
    } else if (porc === 0) {
      word = ['FAIL FAIL FAIL FAIL FAIL']
      graf = `[FAIL ${porc}% FAIL]`
    }
    word = word[Math.floor(Math.random() * word.length)]

    var cards = {
      color: 0xf556ed,
      author: {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL
      },
      fields: [
        {
          name: ` \` ${word} \`  `,
          value: `*${utils.convertName(match1)}* \`${graf}\` *${utils.convertName(match2)}*`
        }
      ],
      footer: {
        text: '❤️Desenvolvido por @manoel.'
      }
    }

    message.channel.send({ embed: cards })

  } else {

    var membros = await axios.get(`${process.env.API_URL}/api/members`)
    var membros = membros.data

    var membro1 = membros[Math.floor(Math.random() * membros.length) + 1]
    var membro2 = membros[Math.floor(Math.random() * membros.length) + 1]


    var frases = [
      'Hoje o trofeu de casal do ano vai para...',
      'Que casal lindo!',
      'Todos ja sabiam que era amor!',
      'Vamos aplaudir de pe o casal!',
      'Isso que e um casal da pohh@@!',
      'Fico pensando quem é a voz ativa do casal?!',
      'Nasceram um para o outro!'
    ]
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

    var emoji_rand = emoji[Math.floor(Math.random() * emoji.length)]

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
        text: '❤️Desenvolvido por @manoel.'
      }
    }

    message.channel.send({ embed: cards })
  }

}
exports.help = {
  name: 'match'
}