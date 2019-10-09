const request = require('request')
const cheerio = require('cheerio')

exports.run = async (client, message, args) => {
  const URL = 'https://runescape.wiki/w/Travelling_Merchant%27s_Shop/Future'

  await request(URL, function (err, res, body) {
    if (err) {
      console.log(err)
    } else {
      var $ = cheerio.load(body)

      var data = $('tbody tr td').eq(0).text(),
        slot1 = $('tbody tr td').eq(1).text(),
        slot2 = $('tbody tr td').eq(2).text(),
        slot3 = $('tbody tr td').eq(3).text()

      var dataTomorrow = $('tbody tr td').eq(4).text(),
        slot1Tomorrow = $('tbody tr td').eq(5).text(),
        slot2Tomorrow = $('tbody tr td').eq(6).text(),
        slot3Tomorrow = $('tbody tr td').eq(6).text()

      const card = {
        color: 0xdd4e06,
        author: {
          name: message.member.user.username,
          icon_url: message.member.user.avatarURL,
        },
        thumbnail:{
          url: 'https://vignette.wikia.nocookie.net/runescape2/images/e/e5/Travelling_merchant.png/revision/latest?cb=20180312233003'
        },
        description:
        "```css\n"+
        `${data}` +
        "``` \n" +
        `> __Slot 1__ = **${slot1}** \n` +
        `> __Slot 2__ = **${slot2}** \n` +
        `> __Slot 3__ = **${slot3}** \n\n` +
        "```css\n"+
        `${dataTomorrow}` +
        "``` \n" +
        `> __Slot 1__ - **${slot1Tomorrow}** \n` +
        `> __Slot 2__ - **${slot2Tomorrow}** \n` +
        `> __Slot 3__ - **${slot3Tomorrow}**`
        
      }
      console.log(new Date().getHours())
      return message.channel.send({embed: card})
    }
  })
}

exports.help = {
  name: 'merchant'
}