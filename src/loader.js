const server = require('./server')
require('dotenv/config');
require('./routes')(server)
require("./bot/bot") // bot
console.log(process.env.APP_NAME) 