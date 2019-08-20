const axios = require('axios')
const Discord = require("discord.js")
const Utils = require('../../utils/ultis.js')
exports.run = async (client, message, args) => {

  var rank = [
    {
      name: 'Recruit',
      xp: 0
    },
    {
      name: 'Corporal',
      xp: 20000000
    },
    {
      name: 'Sergeant',
      xp: 60000000
    },
    {
      name: 'Lieutenant',
      xp: 120000000
    },
    {
      name: 'Captain',
      xp: 160000000
    },
    {
      name: 'General',
      xp: 240000000
    }
  ]

  if (args.length >= 1) {
    var cards = {
      color: 0xdd4e06,
      author: {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL,
      },
      fields: [
        {
          name: "Em breve!",
          value: 'Nos cinemas! 😂'
        }
      ]
    }

    message.channel.send({embed: cards})

  } else {
    if (Utils.hasPermissionAll(message, 3)) {
      var membros = await axios.get(`${process.env.API_URL}/api/members`)
      var membros = membros.data

      var cards = {
        color: 0xdd4e06,
        author: {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL,
        },
        fields: [],
        timestamp: new Date(),
        footer: {
          text: '❤️Desenvolvido por @Manoel.',
          icon_url: message.guild.iconURL,
        }
      }
      var m = await message.channel.send(`Analisando...`)
      const recruta = client.emojis.find(emoji => emoji.name === "recruta")
      const cabo = client.emojis.find(emoji => emoji.name === "cabo")
      const sargento = client.emojis.find(emoji => emoji.name === "sargento")
      const tenente = client.emojis.find(emoji => emoji.name === "tenente")
      const capitao = client.emojis.find(emoji => emoji.name === "capitao")
      const general = client.emojis.find(emoji => emoji.name === "general")
      var ok = 0;
      for (i = 0; i < membros.length; i++) {

        if (membros[i].rank == rank[0].name) { //recruta -> cabo
          if (membros[i].totalxp >= rank[1].xp) {
            cards.fields.push({
              name: `${recruta} ${membros[i].name}`,
              value: `Ja pode subir ${cabo} __Cabo__`
            })
            ok = -500
          }
          
        } else if (membros[i].rank == rank[1].name) { // cabo -> sargento
          if (membros[i].totalxp >= rank[2].xp) {
            cards.fields.push({
              name: `${cabo} ${membros[i].name}`,
              value: `Ja pode subir ${sargento} __Sargento__`
            })
          }
        } else if (membros[i].rank == rank[2].name) { //sargento -> tenente
          if (membros[i].totalxp >= rank[3].xp) {
            cards.fields.push({
              name: `${sargento} ${membros[i].name}`,
              value: `Ja pode subir ${tenente} __Tenente__`
            })
            ok = -500
          }
        } else if (membros[i].rank == rank[3].name) { // tenente -> capitao
          if (membros[i].totalxp >= rank[4].xp) {
            cards.fields.push({
              name: `${tenente} ${membros[i].name}`,
              value: `Ja pode subir ${capitao} __Capitao__`
            })
            ok = -500
          }
        } else if (membros[i].rank == rank[4].name) { // capitao -> general
          if (membros[i].totalxp >= rank[5].xp) {
            cards.fields.push({
              name: `${capitao} ${membros[i].name}`,
              value: `Ja pode subir ${general} __General__`
            })
            ok = -500
          }
        }else{
          ok++
        }

      }
      if(ok >= 1){
        cards.fields.push({
          name: "Esta tudo em dias!",
          value: "Ninguem ainda se qualificou para subir de rank!"
        })
      }

      m.edit({ embed: cards })

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


}

exports.help = {
  name: "strank"
}
