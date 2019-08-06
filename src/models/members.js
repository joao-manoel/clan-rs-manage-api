const {Schema, model} = require('mongoose')
const env = require('../.env')

const LogsSchema = new Schema({
  title: String,
  points: Number
},{
  timestamps: true
})

const MemberSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  rank: {
    type: String, 
    required: true
  },
  joined: {
    type: String, 
    required: true
  },
  totalPoints: {
    type: Number, 
    default: 0
  },
  clanName: {
    type: String,
    default: env.clan
  },
  totalxp: {
    type: Number,
    required: true,
    default: 0
  },
  logs:[LogsSchema]
},{
  timestamps: true
})

module.exports = model('Member', MemberSchema)