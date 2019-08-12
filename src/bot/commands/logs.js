const Discord = require("discord.js")
const axios = require("axios")
const numeral = require("numeral")
const utils = require("../../utils/ultis.js")

exports.run = async (client, message, args) => {
  if (args != null) {
    
    if(args.length == 1){
      var name = `${utils.name(args)}`
    }else{
      var name = `${args[0]} ${utils.name(args)}`
    }
    
    var NameUrl = name.replace(" ", "_").trim()
    let metrics = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${NameUrl}&activities=20`)
    let activities = metrics.data.activities
    var word = ['Queijo gado demais', 'Vougan gay', 'Brazil noob', 'Setimus Chico Bióca', 'Cain pegador de noiada'];
    var word_rand = word[Math.floor(Math.random() * word.length)];
    let totalskill = numeral(metrics.data.totalskill).format('0,0')
    let totalxp = numeral(metrics.data.totalxp).format('0,0')

    let avatar = `https://secure.runescape.com/m=avatar-rs/${NameUrl}/chat.png`

    console.log(name)

    var m = await message.channel.send(`${word_rand}...`)
    m.edit("Buscando...")

    const card = {
      color: 0xdd4e06,
      author: {
        name: message.member.user.username,
        icon_url: message.member.user.avatarURL,
      },
      thumbnail: {
        url: avatar,
      },
      fields: [
        {
          name: 'Rs Nickname',
          value: `__${metrics.data.name}__`,
        },
        {
          name: 'Total Skill',
          value: `__${totalskill}__`,
          inline: true
        },
        {
          name: 'Total XP',
          value: `__${totalxp}__`,
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        text: '❤️Desenvolvido por @Manoel.',
        icon_url: message.guild.iconURL,
      },
    }

    if (!metrics.data.error) {
      for (i = 0; i < activities.length; i++) {
        card.fields.push({
          name: activities[i].date,
          value: `${activities[i].text}`
        })
      }
    } else {
      if (metrics.data.error == "PROFILE_PRIVATE") {
        card.fields.push({
          name: "⛔ Error",
          value: "Não foi possivel busca as atividades devido o perfil ser privado!",
        })
      } else {
        card.fields.push({
          name: "⛔ Error",
          value: "Ops!, Algo deu errado!"
        })
      }
    }

    m.edit({ embed: card })

  }
}

exports.help = {
  name: "log"
}