const express = require("express")
require('./config/database')
const fs = require('fs')

const cors = require('./config/cors')

const server = express()

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

server.use(express.json())
const port = process.env.PORT || 3333

/*const httpsOptions = {
  cert: false.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
}
*/
server.listen(port, () => {
  console.log("[Servidor]", `Backend is running on port ${port}.`)
}, (err) => {
  if (err) console.log(err)
})


module.exports = server