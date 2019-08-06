const express = require('express')
const MemberController = require('./controllers/memberController')
const LogController = require('./controllers/logController')

module.exports = function (server) {

  const router = express.Router()
  server.use('/api', router)

  router.post('/members/logs/:name/:eventType', LogController.create)

  router.get('/members', MemberController.index)
  router.post('/members', MemberController.store)

  console.log("[Server]", "Routas Carregadas com sucesso!")

}