const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb+srv://bot:moraes145@cluster0-lmnna.mongodb.net/members?retryWrites=true&w=majority',  { useNewUrlParser: true })