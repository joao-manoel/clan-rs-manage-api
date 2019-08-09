const axios = require('axios')
const Member = require('../models/members')

module.exports = {

  async store(req, res, next) {
    const file = await axios.get('http://services.runescape.com/m=clan-hiscores/members_lite.ws?clanName=friends+of+pvmeme')
    let data = file.data.split("\n")
    data = data.splice(1)

    data.forEach(async members => {
      const membro = members.split(',')
      const name = membro[0].toLowerCase().replace(/�/g, ' ')
      const rank = membro[1]
      const totalxp = membro[2]

      //verifica se o membro ja ta adicionado no banco de dados
      const memberExists = await Member.findOne({ name })


      if (name == null && !name)
        return false;

      if (memberExists) {

        if (memberExists.name != name || memberExists.rank != rank || memberExists.totalxp != totalxp) {
          await memberExists.updateOne({
            name,
            rank,
            totalxp
          }, (err) => {
            if (err) return console.log(err)
          })
        }
      } else {
        await Member.create({
          name,
          rank,
          totalxp
        }, (err) => {
          if (err) return console.log(err)
        })
      }
    });

    return res.json({ message: 'Membros cadastrado ou atualizado com sucesso.' })

  },

  async getUser(req, res, next){
    const name = req.params.name.toLowerCase()

    await Member.findOne({name}, (err, user) => {
      if (err) return next(err)
      return res.json(user)
    })
  },

  async index(req, res, next) {

    await Member.find({}, (err, members) => {
      if (err) return next(err)
      return res.json(members)
    })

  },

}