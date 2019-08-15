//Carrega as depedencias
const Discord = require("discord.js")
const axios = require("axios")
const numeral = require("numeral")
const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args) => {
  

  
  let api_url = process.env.API_URL

  if (args != null) {
    if (utils.hasPermissionAll(message)) {

      if (args == "update" || args == "u") {
        let update = await axios.post(`${api_url}/api/members`)

        let embed = new Discord.RichEmbed()
          .setColor('#dd4e06')
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
            .setColor("#dd4e06")
            .setAuthor(message.member.user.username, message.member.user.avatarURL)
            .setDescription("Para procurar um membro digite /m username")
          message.channel.send(embed)
        } else {
          await axios.post(`${api_url}/api/members`)
          let user = await axios.get(`${api_url}/api/members/${data}`)


          if (user.data != null) {
            var name = user.data.name
            var name = name.charAt(0).toUpperCase() + name.slice(1)
            var NameUrl = name.replace(" ", "+")
            let metrics = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${NameUrl}&activities=20`)
            let totalxp_clan = numeral(user.data.totalxp).format(`0,0`)
            let totalskill = numeral(metrics.data.totalskill).format('0,0')
            let totalxp = numeral(metrics.data.totalxp).format('0,0')

            console.log(NameUrl)
            
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
                url: `https://secure.runescape.com/m=avatar-rs/${NameUrl}/chat.png`,
              },
              fields: [
                {
                  name: 'Rs Nickname',
                  value: `__${name}__`,
                },
                {
                  name: 'Rank',
                  value: `__${rank(user.data.rank)}__`,
                  inline: true
                },
                {
                  name: 'Clan Total XP',
                  value: `__${totalxp_clan}__`,
                  inline: true
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
                },
              ],
              timestamp: new Date(),
              footer: {
                text: '❤️Desenvolvido por @Manoel.',
                icon_url: message.guild.iconURL,
              },
            }
            if(!metrics.data.error){
              for (i = 0; i < activities.length; i++) { 
                card.fields.push({
                  name: activities[i].date,
                  value: `${activities[i].text}`
                })
              }
            }else{
              if(metrics.data.error == "PROFILE_PRIVATE"){
                card.fields.push({
                  name: "⛔ Error",
                  value: "Não foi possivel busca as atividades devido o perfil ser privado!",
                })
              }else{
                card.fields.push({
                  name: "⛔ Error",
                  value: "Ops!, Algo deu errado!"
                })
              }
              
            }
            

            m.edit({embed: card})
          } else {
            let embed = new Discord.RichEmbed()
              .setColor('#dd4e06')
              .setAuthor(message.member.user.username, message.member.user.avatarURL)
              .setDescription(`Nenhum membro encontrado com esse nome: ***${data}*** `)
              .setTimestamp()
              .setFooter('❤️Desenvolvido por @Manoel.', message.guild.iconURL);

            message.channel.send(embed)
          }

        }

      }
    } else {
      let embed = new Discord.RichEmbed()
        .setColor('#fa0c0c')
        .setTitle('To de Olho!')
        .setAuthor(message.member.user.username, message.member.user.avatarURL)
        .setDescription('Voce nao tem permisao para usar esse comando, venha fazer parte do nosso clan para poder usar!')
        .setTimestamp()
        .setFooter('Ate a proxima!', message.guild.iconURL);

      message.channel.send(embed)
    }
  }



  function rank(data) {
    switch (data) {
      case "Owner":
        return "Dono"
        break;
      case "Deputy Owner":
        return "Vice Dono"
        break;
      case "Overseer":
        return "Fiscal"
        break;
      case "Coordinator":
        return "Coordenador"
        break;
      case "Organiser":
        return "Organizador"
        break;
      case "General":
        return "General"
        break;
      case "Captain":
        return "Capitao"
        break;
      case "Lieutenant":
        return "Tenente"
        break;
      case "Sergeant":
        return "Sargento"
        break;
      case "Corporal":
        return "Cabo"
        break;
      case "Recruit":
        return "Recruta"
        break;
      default:
    }
  }

}

exports.help = {
  name: "m"
}
