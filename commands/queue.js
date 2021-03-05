module.exports = {
  name: "queue",
  description: "Sırayı görüntülemenizi sağlar.",
  aliases: ['q'],
  cooldown: 5000,
  run(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Hiçbir şey oynamıyor.");

    return message.channel.send(`
    __**Şarkı sırası:**__

    ${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

    **Şu an oynayan:** ${serverQueue.songs[0].title}
    `);
  }
};
