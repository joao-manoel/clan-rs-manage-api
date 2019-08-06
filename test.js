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

console.log(event('fidelidade'))