const {Schema, model} = require('mongoose')

const NotificationSchema = new Schema({
  name: {
    type: String,
  },
  ativo: {
    type: Number, 
    default: 1,
  }
})

module.exports = model('Notification', NotificationSchema)