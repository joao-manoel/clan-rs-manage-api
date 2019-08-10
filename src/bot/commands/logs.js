const Discord = require("discord.js")
const axios = require("axios")

exports.run = async (client, message, args) => {
  if(args != null){
    data = `${args[0]} ${args[1] ? args[1] : ''} ${args[2] ? args[2] : ''} ${args[3] ? args[3] : ''} ${args[4] ? args[4] : ''}`
    var NameUrl = data.replace(" ", "+")
    console.log(data)
    
  }
}

exports.help = {
  name: "logs"
}