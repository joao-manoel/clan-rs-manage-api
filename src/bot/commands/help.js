exports.run = async (client, message, args) => {
  const card = {
    author:{
      name: message.member.user.username,
      icon_url: message.member.user.avatarURL,
    },
   /* thumbnail: {
      url: "https://static-cdn.jtvnw.net/jtv_user_pictures/23cc286c-5716-4af0-abd0-782b642d4048-profile_image-300x300.png"
    },*/  
    description: "> **Comandos de Musicas** \n" +
    "```css\n" + 
    ".music play <nome> | Adiciona a musica a uma lista de reproducao \n" +
    ".music pause       | Pausa a musica em execucao \n" +
    ".music resume      | Executa a musica que estava pausada \n" +
    ".music skip        | Pula uma musica \n" +
    ".music stop        | Encerra a lista de reproducao \n" +
    ".music queue       | Mostra a lista de reproducao" +
    "``` \n" +
    "> **Comandos relacionado ao clan/runescape** \n" +
    "```css\n"+
    ".logs <rsn> | exibi suas atividades e se for membro do clan tem informacoes extra \n" +
    "``` \n" +
    "> **Comandos da Hierarquia** \n" +
    "```css\n"+
    ".clan | Verifica se tem algum membro apto a subir de rank" +
    "```",
    timestamp: new Date(),
    footer: {
      text: '❤️Desenvolvido por @manoel.',
    },
    
  }

  message.channel.send({embed: card})
}

exports.help = {
  name: 'help'
}