const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-lmnna.mongodb.net/members?retryWrites=true&w=majority`,  { useNewUrlParser: true })