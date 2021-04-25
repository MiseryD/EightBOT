const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "warnings",
  aliases: ["warning"],
  description: "Show User Warnings!",
  usage: "Warnings <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`** 🔎 Veuillez mentionner quelqu'un**`);

    let Warnings = client.db.get(
      `Attention_${message.guild.id}_${Member.user.id}`
    );

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**NOMBRE DE WARN**`)
      .setDescription(`<@${Member.user.id}> à ${Warnings || "0"} Warns !`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};