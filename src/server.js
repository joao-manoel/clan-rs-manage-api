const express = require("express")
const database = require('./config/database')
const server = express()

server.use(express.json())

const port = 8080

server.listen(port, () =>{
  console.log("[Server]", `Backend is running on port ${port}.`)
})

module.exports = server