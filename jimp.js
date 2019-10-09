const request = require('request')
const cheerio = require('cheerio')

const URL = 'https://runescape.wiki/w/Travelling_Merchant%27s_Shop/Future'


async function main() {
  await request(URL, function(err, res, body){
    if(err){
      console.log(err)
    }else{
      console.log('scraping links')
      var $ = cheerio.load(body)

      
      console.log($('tbody tr td').eq(0).text())
      console.log($('tbody tr td').eq(1).text())
      console.log($('tbody tr td').eq(2).text())
      console.log($('tbody tr td').eq(3).text())
      console.log($('tbody tr td').eq(4).text())


      /*
      $('tbody tr').each(function(i, link){
        console.log('%s', $('td').text())
      })*/
    }
  })
}

main()