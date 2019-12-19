const express = require("express")
const cors = require("cors")
require('./config/database')


const server = express()

server.use(cors)


server.use(express.json())

const port = process.env.PORT || 3333

server.listen(port, () =>{
  console.log("[Servidor]", `Backend is running on port ${port}.`)
}, (err) =>{
  if(err) console.log(err)
})


module.exports = server