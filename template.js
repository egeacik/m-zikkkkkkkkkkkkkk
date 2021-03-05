"use strict";

const Discord = require("discord.js");

if (process.env.token && process.env.prefix) {
  const dispatcher = require("./dispatcher");
  const client = new Discord.Client();
  client.commands = new Discord.Collection();
  client.queue = new Discord.Collection();
  client.aliases = new Discord.Collection();
  ['commands', 'events'].forEach(handler => dispatcher.add(client, handler));
  client.on("message", message => dispatcher.run(client, message));
  client.login(process.env.token);
} else console.log(".env dosyanızı yapılandırmadınız");
