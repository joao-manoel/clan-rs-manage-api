const axios = require('axios')
const Notification = require('../models/notification')

module.exports = {
  
  async store(req, res, next){
    var {name, ativo} = req.body

    notifExist = await Notification.findOne({name})

    if(!notifExist){
      await Notification.create({
        name,
        ativo
      }, (err) =>{
        if (err) return console.log(err)
      })

      return res.json({message: "notificação criada com sucesso!"})
    }
    return res.json({message : 'Essa notifição ja existe!'})
  },
  
  async getNotification(req, res, next){
    var {name} = req.params

    await Notification.find({name}, (err, name) =>{
      if(err) return next(err)

      return res.json(name)
    })
  },

  async Update(req, res, next){
    var {name, ativo} = req.params

    const find = await Notification.findOne({name})

    await find.updateOne({
      ativo
    }, (err) =>{
      if(err) return console.log(err)
    })

    return res.json({
      message: "Atualizado com sucesso"
    })
  }
}