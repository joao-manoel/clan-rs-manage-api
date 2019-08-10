const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect(`mongodb+srv://${procss.env.DB_USER}:${procss.env.DB_PASS}@cluster0-lmnna.mongodb.net/members?retryWrites=true&w=majority`,  { useNewUrlParser: true })