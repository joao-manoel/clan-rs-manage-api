const axios = require("axios")
const utils = require('../../utils/ultis.js')

exports.run = async (client, message, args) => {
 console.log(client.users)
}

exports.help = {
  name: 'order'
}