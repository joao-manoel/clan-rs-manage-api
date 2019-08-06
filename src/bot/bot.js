//Carrega as depedencias
const Discord = require("discord.js")
const env = require("../.env")


//Inicia o client do discord
const client = new Discord.Client()

//informa a inicializacao e informacoes do bot
client.on("ready", () =>{
  console.log("[BOT]", `Bot Iniciado com sucesso, com ${client.users.size} usuarios, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`)
  client.user.setGame(`❤️Desenvolvido por @Manoel.`)
})

//informa os canais que o bot entrar
client.on("guildCreate", guild => {
  console.log("[BOT][GUILD CREATE]", `O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). Membros: ${guild.memberCount} membros!`)
  //client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
})

//informa qual canal o bot saiu
client.on("guildDelete", guild =>{
  console.log("[BOT][Guild Delete]", `O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
  //client.user.setActivity(`Serving ${client.guilds.size} servers`)
})

//comandos
client.on("message", async message =>{
  //ignora as message do bot
  if(message.author.bot) return
  //ignora mensagens enviada pelo privado
  if(message.channel.type === "dm") return;

  //configurar o prefixo do comando
  const args = message.content.slice(env.prefix.length).trim().split(/ +/g);

  //identifica os comandos
  const comando = args.shift().toLowerCase();

  if(comando == "friends"){
    const m = await message.channel.send("Friends of Pvmemes?");
    m.edit(`I love! Queijo is gay 😂`)
  }
})

client.login(env.token_dicord);