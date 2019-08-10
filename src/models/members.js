const {Schema, model} = require('mongoose')
const env = require('../.env')

const MemberSchema = new Schema({
  name: String,
  rank: String,
  totalPoints: {
    type: Number, 
    default: 0
  },
  totalxp: {
    type: Number,
    required: true,
    default: 0
  }
},{
  timestamps: true
})

module.exports = model('Member', MemberSchema)