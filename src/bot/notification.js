const axios = require('axios')

module.exports = {
  bmNotification(client){
    var membros = process.env.DEV ? "<@&636621251682631696>" : "<@&538658634884841472>",
    amigos = process.env.DEV ? "<@&636660100597153793>" : "<@&571670550028746752>"

  channelId = process.env.DEV ? '636585335706615822' : '538659409249697793'
  setInterval(async () => {
    var d = new Date()
    var month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + d.getMonth() + 1
    var date = d.getDate() + "/" + month + "/" + d.getFullYear()
    let notification = await axios.get(`${process.env.API_URL}/api/notification/bm`)
    console.log(`Proximo anuncio sera as ${process.env.HOURS}:${process.env.MINUTES}`)
    if (d.getHours() == process.env.HOURS && d.getMinutes() == process.env.MINUTES) {
      if (notification.data[0]['ativo'] == 1) {
        client.channels.get(channelId).send(`${client.emojis.find(emoji => emoji.name === 'bm')} **Evento PvM - BM** ${client.emojis.find(emoji => emoji.name === 'bm')} \n:date: __Data__: ${date} - :watch: __Hora__: 00:00 __RS Horas__ \n:earth_africa: Wold 35\n:busts_in_silhouette: Apenas para ${membros} & ${amigos}\n:triangular_flag_on_post: Pedem __inv__ no clan chat, __funções serão definida na hora__, caso queira fazer uma função notifique o lider do grupo.`)
        console.log("Evento de BM Anunciado!")
        await axios.post(`${process.env.API_URL}/api/notification/bm/0`)
      } else {
        await axios.post(`${process.env.API_URL}/api/notification/bm/1`)
      }
    }
    console.log(`${d.getHours()}:${d.getMinutes()}`)
  }, 60000)
  }
}