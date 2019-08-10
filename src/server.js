const express = require("express")
require('./config/database')
const server = express()


server.use(express.json())


const port = 8080

server.listen(port, () =>{
  console.log("[Server]", `Backend is running on port ${port}.`)
}, (err) =>{
  if(err) console.log(err)
})

module.exports = server