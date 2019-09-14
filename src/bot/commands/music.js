const { Util } = require('discord.js')
const YouTube = require('simple-youtube-api')
const ytdl = require('ytdl-core')

const youtube = new YouTube(process.env.GOOGLE_API_KEY)

const queue = new Map();

exports.run = async (client, message, args) => {

  const searchString = args.slice(1).join(' ')
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : ''
  const serverQueue = queue.get(message.guild.id)
  console.log("STRING: ", searchString)
  console.log("URL: ", url)
  console.log("CM: ", args[0])

  if (args[0] == "play" || args[0] == "p") {
    const voiceChannel = message.member.voiceChannel

    if (!voiceChannel) return message.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!')

    const permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has("CONNECT")) {
      return message.channel.send('Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!')
    }
    if (!permissions.has('SPEAK')) {
      return message.channel.send('Eu não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!');
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url)
      const videos = await playlist.getVideos()

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id)
        await handleVideo(video2, message, voiceChannel, true)
      }
      return message.channel.send(`Adc Playlist: **${playlist.title}** foi bem adicionada a lista!`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          message.channel.send(`
          __**Seleção**__

          ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

          Escolha uma das músicas de 1-10
        `);
          // eslint-disable-next-line max-depth
          try {
            var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 25000,
              errors: ['time']
            });
          } catch (err) {
            console.error(err);
            return message.channel.send('Nenhum valor inserido ou está inválido , cancelando a operação de seleção de vídeo.');
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send('🆘 Não consegui obter nenhum resultado de pesquisa.');
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
  }else if(args[0] == "skip" || args[0] == "s"){
    if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz');
		if (!serverQueue) return message.channel.send('Não a nada tocando posso pular pra você');
		serverQueue.connection.dispatcher.end('Skipado com Sucesso');
		return undefined;
  }else if (args[0] === 'stop') {
		if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return message.channel.send('Não tá tocando eu não posso parar pra você');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('O Comando de parar foi usado!');
		return undefined;
	} else if (args[0] === 'volume') {
		if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return message.channel.send('Não está tocando.');
		if (!args[2]) return message.channel.send(`O Volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[2];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[2] / 5);
		return message.channel.send(`Ajustar volume para: **${args[2]}**`);
	} else if (args[0] === 'np') {
		if (!serverQueue) return message.channel.send('Não a nada tocando.');
		return message.channel.send(`Tocando: **${serverQueue.songs[0].title}**`);
	}else if (args[0] === 'queue') {
		if (!serverQueue) return message.channel.send('Não a nada tocando.');
		return message.channel.send(`
    __**Lista de Música:**__

    ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

    **Tocando Agora:** ${serverQueue.songs[0].title}
        `);
	}else if (args[0] === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Pausou');
		}
		return message.channel.send('Não a nada tocando.');
	} else if (args[0] === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Rusumindo');
		}
		return message.channel.send('Não a nada tocando.');
	}

  async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);

      } catch (error) {
        console.error(`Eu não pude entrar no canal de voz: ${error}`);
        queue.delete(msg.guild.id);
        return msg.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
      else return msg.channel.send(`Agora **${song.title}** foi adicionado a lista!`);
    }
    return undefined;
  }


  function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    console.log(serverQueue.songs);


    const stream = ytdl(song.url, { filter: 'audioonly' });
    const dispatcher = serverQueue.connection.playStream(stream, song.url);
    dispatcher.on('end', reason => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Tocando: **${song.title}**`);
  }
}




exports.help = {
  name: 'music'
}