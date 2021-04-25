const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "coinflip",
  aliases: ["toss", "flip"],
  description: "Pile ou face",
  usage: "Coinflip",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const coins = ["Pile", "Face"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**La pièce est tombé du coté**`)
      .setDescription(coins[result])
      .setFooter(`Lancé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};