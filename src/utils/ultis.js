

module.exports = {
  name(data){
    name = ""
    for (i = 0; i < data.length; i++) { 
      name = `${data[i]} `
    }
  
    return name
  }
}