require('dotenv').config()

const server = require('./server')
require('./routes')(server)
require("./bot/bot") // bot

console.log(process.env.APP_NAME) 