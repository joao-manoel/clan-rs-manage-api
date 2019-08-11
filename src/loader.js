require('dotenv').config()

const server = require('./server')
require('./routes')(server)
require("./bot/bot") // bot