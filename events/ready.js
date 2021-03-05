const keepAlive = require("../keepAlive.js");

module.exports = client => {
  keepAlive.run(client, 280000);
  console.log("Bot basarili bir sekilde calistirildi ve baslatildi.");
  console.log(
    `TyroN Music Bot!`
    );
};
