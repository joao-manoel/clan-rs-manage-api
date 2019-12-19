const express = require("express")
require('./config/database')
const server = express()

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

server.use(express.json())

const port = process.env.PORT || 3333

server.listen(port, () =>{
  console.log("[Servidor]", `Backend is running on port ${port}.`)
}, (err) =>{
  if(err) console.log(err)
})


module.exports = server