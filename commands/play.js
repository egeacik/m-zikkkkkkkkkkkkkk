const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");

module.exports = {
  name: "play",
  description: "Verilen ad veya url ile bir şey çalar.",
  aliases: ['p'],
  cooldown: 5000,
  async run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Üzgünüm ama müzik çalmak için bir ses kanalında olmanız gerekiyor!"
      );
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "Ses kanalınıza bağlanamıyorum, uygun izinlere sahip olduğumdan emin olun!"
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "Bu ses kanalında konuşamıyorum, uygun izinlere sahip olduğumdan emin olun!"
      );

    const serverQueue = message.client.queue.get(message.guild.id);
    const songList = await yts(args.join(" "));
    const songInfo = songList.videos[0];

    const song = {
      id: songInfo.id,
      title: songInfo.title, 
      url: songInfo.url,
      image: songInfo.imagea,
      user: message.member.id,
      description: songInfo.description,
      timestamp: songInfo.timestamp
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      const embed = new Discord.MessageEmbed()
        .setTitle(song.title)
        .setDescription(song.description)
        .addField("Süresi", song.timestamp)
        .setThumbnail(song.image)
        .setColor("RANDOM");
      return message.channel.send(
        `✅ Sıraya şarkı eklendi.`,
        embed
      );
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true
    };

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));

      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      const embed = new Discord.MessageEmbed()
        .setTitle(song.title)
        .setDescription(song.description)
        .addField("Süresi", song.timestamp)
        .setThumbnail(song.image)
        .setColor("RANDOM");
      queue.textChannel.send(embed);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Ses kanalına katılamadım: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(
        `Ses kanalına katılamadım: ${error}`
      );
    }
  }
};
