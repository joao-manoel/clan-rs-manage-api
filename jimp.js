const jimp = require('jimp')

async function main() {

  let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
  let mask = await jimp.read('./src/assets/img/bg/mascara.png')
  let background = await jimp.read('./src/assets/img/bg/fundo.png')

  jimp.read('https://conteudo.imguol.com.br/c/entretenimento/b4/2019/06/27/cena-de-homem-aranha-longe-de-casa-1561657357585_v2_900x506.png').then(avatar => {
      avatar.resize(111, 111)
      mask.resize(111, 111)
      avatar.mask(mask)
      background.print(
        font,
        90,
        170,
        {
          text: 'Homem Aranha',
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
        },
        441,
        76
      )
      background.composite(avatar, 247, 7).write('beta.png')
    })
    .catch(err => {
      console.log('Error ao carregar a imagem de boas vindas')
    })


}

main()