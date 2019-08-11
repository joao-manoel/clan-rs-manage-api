const express = require('express')
const MemberController = require('./controllers/memberController')

module.exports = function (server) {

  const router = express.Router()
  
  server.use('/api', router)


  //lista todos os membros
  router.get('/members', MemberController.index)
  //cadastra ou atualiza os membros
  router.post('/members', MemberController.store)

  router.get('/members/:name', MemberController.getUser)

  console.log("[SERVER]", "Routas carregadas com sucesso.")

}