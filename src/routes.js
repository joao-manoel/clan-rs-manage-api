const express = require('express')
const MemberController = require('./controllers/memberController')
const LogController = require('./controllers/logController')

module.exports = function (server) {

  const router = express.Router()
  server.use('/api', router)

  //cadastra os logs
  router.post('/members/logs/:name/:eventType', LogController.create)
  //lista todos os membros
  router.get('/members', MemberController.index)
  //cadastra ou atualiza os membros
  router.post('/members', MemberController.store)

}