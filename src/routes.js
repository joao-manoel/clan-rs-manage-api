const express = require('express')
const MemberController = require('./controllers/memberController')
const NotificationController = require('./controllers/notificationController')
module.exports = function (server) {

  const router = express.Router()
  
  server.use('/api', router)


  //lista todos os membros
  router.get('/members', MemberController.index)
  //cadastra ou atualiza os membros
  router.post('/members', MemberController.store)

  router.get('/members/:name', MemberController.getUser)

  router.post('/notification', NotificationController.store)

  router.get('/notification/:name', NotificationController.getNotification)

  router.post('/notification/:name/:ativo', NotificationController.Update)

  console.log("[SERVER]", "Routas carregadas com sucesso.")

}