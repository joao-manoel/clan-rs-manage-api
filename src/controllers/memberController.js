const axios = require('axios')
const Member = require('../models/members')
const env = require('../.env')

module.exports = {

  async index(req, res, next){

   await Member.find({}, (err, members) =>{
      if(err) return next(err)
      return res.json(members)
    })

  },

  async store(req, res, next){

    const {name, joined, rank} = req.body
    const name_ = name.replace(' ', "+")
    //responsavel por busca o totalxp do jogador pelo runemetrics
    const runemetrics = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${name_}&activities=20`)
    const {totalxp} = runemetrics.data
    //responsavel por busca qual clan o jogador esta
    const buscarPlayer = await axios.get(`https://services.runescape.com/m=website-data/playerDetails.ws?names=%5B%22${name_}%22%5D&callback=jQuery000000000000000_0000000000&_=0`)
    const r1 = buscarPlayer.data.replace('jQuery000000000000000_0000000000([', '')
    const r2 = r1.replace(']);', '')
    const player = JSON.parse(r2);
    const {clan: clanName} = player
    if(runemetrics.data.error){
      const {error} = runemetrics.data
      switch(error){
        case "PROFILE_PRIVATE":
          return res.json('jogador esta com o perfil privado ativado')
        case "NO_PROFILE":
          return res.json('jogador nao encontrado!')
      }
    }
    if(clanName != env.clan){
      return res.json(`Esse jogador nao faz parte do ${env.clan}`)
    }

    //verifica se o membro ja ta adicionado no banco de dados
    const memberExists = await Member.findOne({name: name})
    if(memberExists){
      return res.json({ message: 'Esse membro ja foi adicionado!'})
    }

    console.log(req.body)

    const member = await Member.create({
      name,
      rank,
      joined,
      totalxp,
      clanName
    })

    return res.json(member)
  }

}