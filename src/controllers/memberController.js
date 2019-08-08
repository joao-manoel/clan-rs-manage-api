const axios = require('axios')
const Member = require('../models/members')
const env = require('../.env')
const utf8 = require('utf8');

module.exports = {

  async store(req, res, next) {
    const file = await axios.get('http://services.runescape.com/m=clan-hiscores/members_lite.ws?clanName=friends+of+pvmeme')
    const data = file.data.split("\n")
    const data2 = data.splice(1)

    data2.forEach(async members => {
      const membro = members.split(',')
      const name = membro[0].toLowerCase().replace(/�/g, ' ')
      const rank = membro[1]
      const totalxp = membro[2]

      //verifica se o membro ja ta adicionado no banco de dados
      const memberExists = await Member.findOne({ name })

      if(name == null)
        return false;

      if (memberExists) {

        await memberExists.updateOne({
          name,
          rank,
          totalxp
        }, (err) => {
          if (err) return console.log(err)
          return console.log(`${name} atualizado`)
        })
      }else{
        await Member.create({
          name,
          rank,
          totalxp
        }, (err) => {
          if (err) return console.log(err)
          return console.log(`${name} cadastrado`)
        })
      }

      

    });

    return res.json({ message: 'membros cadastrado ou atualizado com sucesso' })

  },
  async index(req, res, next) {

    await Member.find({}, (err, members) => {
      if (err) return next(err)
      return res.json(members)
    })

  },

}