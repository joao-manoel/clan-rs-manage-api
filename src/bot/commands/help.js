exports.run = async (client, message, args) => {
  const card = {
    author:{
      name: message.member.user.username,
      icon_url: message.member.user.avatarURL,
    },
    thumbnail: {
      url: 'https://img6.androidappsapk.co/300/7/b/d/com.TGUK.OSRSQuestGuide.png'
    },  
    fields: [
      {
        name: '.music play <name>',
        value: '.music skip',
        inline: true
      },
      {
        name: '| Carrega uma musica',
        value: '| Pular Musica',
        inline: true
      },
      {
        name: '.music pause',
        value: '.music resume',
        inline: true
      },
      {
        name: '| Pausar a musica',
        value: '| Retorna a musica',
        inline: true
      }
    ]
  }

  message.channel.send({embed: card})
}

exports.help = {
  name: 'help'
}