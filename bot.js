//Carrega as depedencias
const Discord = require("discord.js")
const Config = require("./config.json")


//Inicia o client do discord
const client = new Discord.Client()

//informa a inicializacao e informacoes do bot
client.on("ready", () =>{
  console.log("Ready", `Bot Iniciado com sucesso, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`)
  client.user.setGame(`Eu estou em ${client.guilds.size} servidores`)
})

//informa os canais que o bot entrar
client.on("guildCreate", guild => {
  console.log("Guild Create", `O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). Membros: ${guild.memberCount} membros!`)
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
})

//informa qual canal o bot saiu
client.on("guildDelete", guild =>{
  console.log("Guild Delete", `O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
  client.user.setActivity(`Serving ${client.guilds.size} servers`)
})

//comandos
client.on("message", async message =>{

})

client.login(Config.token);