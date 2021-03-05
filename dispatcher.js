const fs = require("fs");

const commandCooldown = new Set();

function run(client, message, commandFile = null) {
  if (message.author.bot) return;
  if (message.content.indexOf(process.env.prefix) !== 0) return;
  const args = message.content
    .slice(process.env.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!client.commands.has(cmd)) {
    if (!client.aliases.get(cmd)) {
    } else commandFile = client.commands.get(client.aliases.get(cmd));
  } else commandFile = client.commands.get(cmd);
  if (!commandFile) return
  if (commandCooldown.has(message.author.id)) return message.reply("Çok fazla denemeyiniz lütfen.");
  console.log(commandFile)
  commandFile.run(client, message, args);
  if (commandFile.cooldown) {
    commandCooldown.add(message.author.id);
    setTimeout(() => commandCooldown.delete(message.author.id), commandFile.cooldown);
  }
}
module.exports.run = run;

function add(client, type) {
  fs.readdir(`${__dirname}/${type}/`, (err, files) => {
    if (err) return console.error(err);
    for (let file of files) {
      if (!file.endsWith(".js")) return;
      if (type === "events") client.on(file.split(".")[0], require(`./${type}/${file}`).bind(null,client));
      else if (type === "commands") {
        var cmd = require(`./${type}/${file}`)
        client.commands.set(file.split(".")[0], cmd);
        if (cmd.aliases) cmd.aliases.forEach(a => client.aliases.set(a, cmd.name));
      }
    };
  });
}
module.exports.add = add;
