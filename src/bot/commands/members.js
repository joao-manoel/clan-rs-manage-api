//Carrega as depedencias
const Discord = require("discord.js")
const axios = require("axios")
const numeral = require("numeral")
const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args) => {

  let api_url = process.env.API_URL

  if (args.length >= 1) {
      if (args[0] == "update" || args[0] == "u") {

        let update = await axios.post(`${api_url}/api/members`)

        let embed = new Discord.RichEmbed()
          .setColor(0xdd4e06)
          .setTitle('Atualizacao de membros')
          .setAuthor(message.member.user.username, message.member.user.avatarURL)
          .setDescription(update.data.message)
          .setTimestamp()
          .setFooter('❤️Desenvolvido por @Manoel.', message.guild.iconURL);

        message.channel.send(embed)

      } else {
        data = `${args[0]} ${args[1] ? args[1] : ''} ${args[2] ? args[2] : ''} ${args[3] ? args[3] : ''} ${args[4] ? args[4] : ''}`

        if (data == null) {

          let embed = new Discord.RichEmbed()
            .setColor(0xdd4e06)
            .setAuthor(message.member.user.username, message.member.user.avatarURL)
            .setDescription("Para procurar um membro digite `.ilog username`")

          message.channel.send(embed)

        } else {

          await axios.post(`${api_url}/api/members`)
          let user = await axios.get(`${api_url}/api/members/${data}`)


          if (user.data != null) {

            var name = user.data.name
            var name = name.charAt(0).toUpperCase() + name.slice(1)
            let metrics = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${utils.convertNameUrl(name)}&activities=20`)
            let totalxp_clan = numeral(user.data.totalxp).format(`0,0`)
            let totalskill = numeral(metrics.data.totalskill).format('0,0')
            let totalxp = numeral(metrics.data.totalxp).format('0,0')

            let activities = metrics.data.activities

            var word = ['Queijo gado demais', 'Vougan gay', 'Brazil noob', 'Setimus Chico Bióca'];
            var rand = word[Math.floor(Math.random() * word.length)];

            var m = await message.channel.send(`${rand}...`)
            m.edit("Buscando...")


            const card = {
              color: 0xdd4e06,
              author: {
                name: message.member.user.username,
                icon_url: message.member.user.avatarURL,
              },
              thumbnail: {
                url: `https://secure.runescape.com/m=avatar-rs/${utils.convertNameUrl(name)}/chat.png`,
              },
              fields: [
                {
                  name: 'Rs Nickname',
                  value: `__${name}__`,
                },
                {
                  name: 'Rank',
                  value: `${utils.emojis(utils.rank(user.data.rank), client)} __${utils.rank(user.data.rank)}__`,
                  inline: true
                },
                {
                  name: 'Clan Total XP',
                  value: `__${totalxp_clan}__`,
                  inline: true
                },
                {
                  name: `Total Skill`,
                  value: `__${totalskill}__`,
                  inline: true
                },
                {
                  name: 'Total XP',
                  value: `__${totalxp}__`,
                  inline: true
                },

              ],
              timestamp: new Date(),
              footer: {
                text: '❤️Desenvolvido por @manoel.',
              },
            }

            if (!metrics.data.error) {
              var logs = (logs) =>{
                var log = ``
                for (i = 0; i < 7; i++) {
                  log += ` [${logs[i].date}] ${logs[i].text} \n`
                }
                return log
              }

              card.description = "```" + logs(activities) + "```"
              
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
          } else {
            //vai quem nao e membro
            if (args.length == 1) {
              var name = `${utils.name(args)}`
            } else {
              var name = `${args[0]} ${utils.name(args)}`
            }

            let metrics = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${utils.convertNameUrl(name)}&activities=20`)
            let activities = metrics.data.activities
            var word = ['Queijo gado demais', 'Vougan gay', 'Brazil noob', 'Setimus Chico Bióca', 'Cain pegador de noiada']
            var word_rand = word[Math.floor(Math.random() * word.length)];
            let totalskill = numeral(metrics.data.totalskill).format('0,0')
            let totalxp = numeral(metrics.data.totalxp).format('0,0')

            let avatar = `https://secure.runescape.com/m=avatar-rs/${utils.convertNameUrl(name)}/chat.png`

            var m = await message.channel.send(`${word_rand}...`)
            m.edit("Buscando...")

            var name = name.charAt(0).toUpperCase() + name.slice(1)

            if (metrics.data.error) {
              if (metrics.data.error == "PROFILE_PRIVATE") {
                var card = {
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
                      value: `__${name}__`,
                    },
                    {
                      name: '-',
                      value: '***Devido o perfil ser privado nao foi possivel pega os logs!***'
                    }

                  ],
                  timestamp: new Date(),
                  footer: {
                    text: '❤️Desenvolvido por @Manoel.',
                  },
                }
              } else {
                var card = {
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
                      value: `***__${name}__***`,
                      color: 0xdd4e06
                    },
                    {
                      name: '-',
                      value: '***Ops!, Algo de errado nao esta certo!***'
                    }

                  ],
                  timestamp: new Date(),
                  footer: {
                    text: '❤️Desenvolvido por @Manoel.',
                  },
                }
              }
            } else {
              var card = {
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
                    value: `__${name}__`,
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
                },
              }

              var logs = (logs) =>{
                var log = ``
                for (i = 0; i < 7; i++) {
                  log += ` [${logs[i].date}] ${logs[i].text} \n`
                }
                return log
              }

              card.description = "```" + logs(activities) + "```"

            }



            m.edit({ embed: card })
          }

        }

      }
    
  }
}

exports.help = {
  name: "logs"
}
