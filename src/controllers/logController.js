const Member = require('../models/members')

module.exports = {
  async create(req, res){
    const { name, eventType } = req.params
    const _name = name.replace('+', ' ')

    var points = 0

    const member =  await Member.findOne({name: _name})

    if(!member){
      return res.status(400).json({ message: "Membro nao encontrado"})
    }

    if(!event(eventType)){
      return res.status(400).json({ message: "Verifique se digitou corretamente o evento!"})
    }

    points = event(eventType)

    member.logs.push({
      title: eventType,
      points: event(eventType)
    })

    points += member.totalPoints
    member.update({totalPoints: points}, (err)=>{
      if(err) return res.status(400).json({ message: "Algo deu errado!"})
      return console.log("[Server]", `${member._name} recebeu pontos de ${eventType}`)
    })

    await member.save();

    return res.json(member)
    
  }
}

function event(type){
  switch(type){
    case "discord_active": 
      return 2
      break;
    case "fidelidade":
      return 10
      break;
    default: 
      false
  }
}

