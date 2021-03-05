module.exports = {
  name: "skip",
  description: "O anda çalan şarkıyı atlar.",
  aliases: ['s'],
  cooldown: 5000,
  run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Üzgünüm ama müzik çalmak için bir ses kanalında olmanız gerekiyor!"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "Senin için atlayabileceğim hiçbir şey yok."
      );
    if (message.member.id != serverQueue.user)
      return message.channel.send(
        "Çalmadığınız bir şarkıyı atlayamazsınız."
      );
    serverQueue.connection.dispatcher.end("Şarkı başarıyla geçildi.");
  }
};
