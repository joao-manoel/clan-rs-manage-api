//Carrega as depedencias
const Discord = require("discord.js")
const axios = require("axios")
const jimp = require('jimp')
const fs = require('fs')
const utils = require('../utils/ultis.js')
var ffmpeg = require('ffmpeg-static')

//Inicia o client do discord
const client = new Discord.Client()
client.commands = new Discord.Collection();

fs.readdir('./src/bot/commands/', function (err, files) {
  if (err) console.error(err)
  if (!files) return console.error("nenhum comando encontrado")

  let filesjs = files.filter(f => f.split(".").pop() == "js")
  filesjs.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`Commando ${f} carregado com sucesso`)
    client.commands.set(props.help.name, props)
  })

});

setInterval(async () => {
  await axios.post(`${process.env.API_URL}/api/members`)
}, 900000)


//informa a inicializacao e informacoes do bot
client.on("ready", () => {
  console.log("[BOT]", `Bot Iniciado com sucesso, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`)
  client.user.setActivity(`❤️Desenvolvido por @Manoel`)
})

//informa os canais que o bot entrar
client.on("guildCreate", guild => {
  console.log("[BOT][GUILD CREATE]", `O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). Membros: ${guild.memberCount} membros!`)
  //client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
})

//informa qual canal o bot saiu
client.on("guildDelete", guild => {
  console.log("[BOT][Guild Delete]", `O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
  //client.user.setActivity(`Serving ${client.guilds.size} servers`)
})


client.on("guildMemberAdd", async member => {

  let channel = process.env.DEV ? client.channels.get(`608109375810437140`) : client.channels.get(`544514586280460288`)
  let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
  let mask = await jimp.read('./src/assets/img/bg/mascara.png')
  let background = await jimp.read('./src/assets/img/bg/fundo.png')

  jimp.read(member.user.displayAvatarURL).then(avatar => {
    avatar.resize(111, 111)
    mask.resize(111, 111)
    avatar.mask(mask)
    background.print(
      font,
      90,
      170,
      {
        text: member.user.username,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
      },
      441,
      76
    )
    background.composite(avatar, 247, 7).write('welcome.png')
    channel.send(``, {
      files: ['welcome.png']
    })

    console.log(`${member.user.username} recebeu as boas-vindas!`)
  })
    .catch(err => {
      console.log('Error ao carregar a imagem de boas vindas')
    })
})


//comandos
client.on("message", async message => {

  var dm = false

  //ignora as message do bot
  if (message.author.bot) return
  if (message.channel.type === 'dm') {
    dm = true
    console.log(dm)
  }

  let prefix = process.env.PREFIX ? process.env.PREFIX : '.'

  let messageArray = message.content.split(" ")
  let command = messageArray[0]
  let args = messageArray.splice(1)

  if (!message.content.startsWith(prefix)) return

  let filescmd = client.commands.get(command.slice(prefix.length))
  if (filescmd) filescmd.run(client, message, args, command, dm)

})

client.login(process.env.BOT_TOKEN);