module.exports = {
  name: "volume",
  description: "Mevcut ses seviyesini kontrol edin veya değiştirin.",
  aliases: ['vm'],
  run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Üzgünüm ama müzik çalmak için bir ses kanalında olmanız gerekiyor!"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Hiçbir şey oynamıyor.");
    if (!args[0])
      return message.channel.send(
        `Mevcut ses: **${serverQueue.volume}**`
      );
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`Ses şu şekilde ayarlandı: **${args[0]}**`);
  }
};
