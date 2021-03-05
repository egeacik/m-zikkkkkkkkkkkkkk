module.exports = {
  name: "pause",
  description: "Çalmakta olan bir müziği durdurur.",
  aliases: ['ps'],
  cooldown: 5000,
  run(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue && !queue.playing)
      return message.channel.send("Oynayan bir müzik yok.");
    queue.playing = false;
    queue.connection.dispatcher.pause();
    return message.channel.send("⏸ Müzik durduruldu!");
  }
};
