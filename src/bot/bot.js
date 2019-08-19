//Carrega as depedencias
const Discord = require("discord.js")
const axios = require("axios")
const fs = require('fs')


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
  console.log("update com sucesso")
}, 900000)


//informa a inicializacao e informacoes do bot
client.on("ready", () => {
  console.log("[BOT]", `Bot Iniciado com sucesso, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`)
  client.user.setActivity(`❤️Desenvolvido por @Manoel.`)
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

//comandos
client.on("message", async message => {
  //ignora as message do bot
  if (message.author.bot) return
  //ignora mensagens enviada pelo privado
  if (message.channel.type === "dm") return;

  let prefix = process.env.PREFIX ? process.env.PREFIX : '.'

  let messageArray = message.content.split(" ")
  let command = messageArray[0]
  let args = messageArray.splice(1)

  if (!message.content.startsWith(prefix)) return

  let filescmd = client.commands.get(command.slice(prefix.length))
  if (filescmd) filescmd.run(client, message, args)

})

client.login(process.env.BOT_TOKEN);