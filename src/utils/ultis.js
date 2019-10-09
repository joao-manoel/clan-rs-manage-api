

module.exports = {
  name(data) {
    name = ""
    for (i = 0; i < data.length; i++) {
      name = `${data[i]} `
    }

    return name
  },

  setTime(duration){
    if(duration.hours > 0){
      return `${duration.hours}:${duration.minutes}:${duration.seconds}`
    }else{
      return `${duration.minutes}:${duration.seconds}`
    }
    
  },

  hasPermissionAll(message, group = 1) {
    let local = '608109896730411030'
    let leader = '540020757481127936'
    let admin = '601912462320599051'
    let vice = '599616989316644871'
    let fiscal = '601912131054469144'
    let coordenador = '601912403814383652'
    let organizador = '601912748410011668'
    let membro = "538658634884841472"
    //all permission
    if (group === 1) {
      if (message.member.roles.has(local)
        || message.member.roles.has(leader)
        || message.member.roles.has(admin)
        || message.member.roles.has(vice)
        || message.member.roles.has(fiscal)
        || message.member.roles.has(coordenador)
        || message.member.roles.has(organizador)
        || message.member.roles.has(membro)) {
        return true
      }
    } else if (group === 2) {
      if (message.member.roles.has(local)
        || message.member.roles.has(leader)
        || message.member.roles.has(admin)
        || message.member.roles.has(vice)
        || message.member.roles.has(fiscal)
        || message.member.roles.has(coordenador)
        || message.member.roles.has(organizador)) {
        return true
      }
    }else if (group === 3){
      if (message.member.roles.has(local)
        || message.member.roles.has(leader)
        || message.member.roles.has(admin)
        || message.member.roles.has(vice)
        || message.member.roles.has(fiscal)
        || message.member.roles.has(coordenador)) {
        return true
      }
    }

    return false
  },
  
  emojis(patente, client){
    name = patente.toLowerCase().replace(/ /g, '')
    return client.emojis.find(emoji => emoji.name === name)
  },

  convertName(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
  },

  convertNameUrl(name){
    return name.replace(/ /g, '_').trim()
  },

  ConfirmCurrentDate(date){
    date = date.split(" ")
    
  },

  rank(data) {
    switch (data) {
      case "Owner":
        return "Dono"
        break;
      case "Deputy Owner":
        return "Vice Dono"
        break;
      case "Overseer":
        return "Fiscal"
        break;
      case "Coordinator":
        return "Coordenador"
        break;
      case "Organiser":
        return "Organizador"
        break;
      case "General":
        return "General"
        break;
      case "Captain":
        return "Capitao"
        break;
      case "Lieutenant":
        return "Tenente"
        break;
      case "Sergeant":
        return "Sargento"
        break;
      case "Corporal":
        return "Cabo"
        break;
      case "Recruit":
        return "Recruta"
        break;
      default:
    }
  }
}