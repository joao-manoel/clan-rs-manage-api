const axios = require('axios')
const Member = require('../models/members')

module.exports = {

  async store(req, res, next) {
    const file = await axios.get('http://services.runescape.com/m=clan-hiscores/members_lite.ws?clanName=friends+of+pvmeme')
    let data = file.data.split("\n")
    data = data.splice(1)

    var membros = []

    var allMembers = await Member.find({}, null, {sort: {totalxp: 'desc'}})
    
    for(i = 0; i < data.length; i++){
      if(data != null){
        var dados = data[i].split(',')
        var name = dados[0].toLowerCase().replace(/�/g, ' ')
        membros.push({
          name: name,
          rank: dados[1]
        })
      }
    }

    function verificar(arr, procurar) {
      var chave = procurar[0];
      var valor = procurar[1];
      return !!arr.filter(function (el) {
          return el[chave] == valor;
      }).length;
    } 

    allMembers.forEach(async members => {
      if(!verificar(membros, ['name', members.name])){
        Member.remove({name: members.name}, (err) =>{
          if(!err){
            console.log(`O membro: ${members.name} foi removido do banco de dados!`)
          }else{
            console.log(`Nao foi possivel remover o membro: ${members.name}`)
          }
        })
      }
    })

   // console.log(verificar(membros, ['name', 'mc queijo']))
    

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
    })

    

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
    
    await Member.find({}, null, {sort: {totalxp: 'desc'}}, (err, members) => {
      if (err) return next(err)
      return res.json(members)
    })

  },

}