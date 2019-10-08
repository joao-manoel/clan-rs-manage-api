const jsonp = require('node-jsonp');


jsonp('http://services.runescape.com/m=website-data/playerDetails.ws?names=[%22Manoel%22]',function(json){
  console.log(json)
})