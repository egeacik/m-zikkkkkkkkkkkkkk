const Discord = require("discord.js");

module.exports = {
  name: "resume",
  description: "Duraktılan müziği devam ettirin.",
  aliases: ['rm'],
  cooldown: 5000,
  run(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Oynayan hiçbir şey yok.");
    const embed = new Discord.MessageEmbed()
      .setTitle(`🎶 Sarki devam ediyor **${serverQueue.songs[0].title}**`)
      .setDescription(serverQueue.songs[0].description)
      .addField("Süresi", serverQueue.songs[0].timestamp)
      .setThumbnail(serverQueue.songs[0].image)
      .setColor("RANDOM");
    return message.channel.send(embed);
  }
};
