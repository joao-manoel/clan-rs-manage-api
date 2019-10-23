utils = require('../../utils/ultis')
axios = require('axios')

exports.run = async (client, message, args) => {
  
  if(utils.hasPermissionAll(message, 2)){
    if(args[0] = 'ativar'){
      let update = await axios.post(`${process.env.API_URL}/api/notification/bm/1`)
      message.channel.send(`Anuncio ativado! \n proximo anuncio sera ás ${process.env.HOURS}:${process.env.MINUTES}`)
      
    }else if(args[0] = 'desativar'){
      let update = await axios.post(`${process.env.API_URL}/api/notification/bm/0`)
    }
  }
}

exports.help = {
  "name": "setbm"
}