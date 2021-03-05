module.exports = {
  name: "disconnect",
  description: "Botu içinde bulunduğu ses kanalını ayarlayın.",
  aliases: ['disc'],
  cooldown: 5000,
  run(client, message, args) {
    exports.run = (client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel)
        return message.channel.send(
          "Üzgünüm ama müzik çalmak için bir ses kanalında olmanız gerekiyor!"
        );
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue)
        return message.channel.send(
          "Senin için durdurabileceğim hiçbir müzik veya bir şey yok."
        );
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end("Müzik durduruldu!");
    };
  }
};
