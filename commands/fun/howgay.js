const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "howgay",
  aliases: [],
  description: "A quel % es-tu gay ?",
  usage: "Howgay <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Es-tu gay ?**`)
      .setDescription(`${Member.user.username} est ${Result}% Gay 🏳️‍🌈`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};