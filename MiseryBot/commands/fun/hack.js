const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "hack",
  aliases: [],
  description: "Hack les autres",
  usage: "Hack <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    if (!Member)
      return message.channel.send(
        `** 🔎 Veuillez mentionner le membre que vous souhaitez pirater**`
      );

    if (Member.user.id === message.author.id)
      return message.channel.send(`** 🤦‍♂️ Tu peux pas te hack toi même, imbécile**`);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Hack Statut.: Complet**`)
      .setDescription(
        `**Nom :** ${Member.user.username} | **ID** : ${
          Member.user.id
        }`
      )
      .setFooter(`Pssst, ne le prenez pas au sérieux, c'est juste des chaînes générées aléatoirement`)
      .setTimestamp();

    await message.channel.send(`**Hacking Enclenché** - Hack de ${Member.user.username} en cours...`);

    await message.channel.send(`Hack Status: 10%`);

    await message.channel.send(`Hack Status: 20%`);

    await message.channel.send(`Hack Status: 30%`);

    await message.channel.send(`Hack Status: 40%`);

    await message.channel.send(`Hack Status: 50%`);

    await message.channel.send(`Hack Status: 60%`);

    await message.channel.send(`Hack Status: 70%`);

    await message.channel.send(`Hack Status: 80%`);

    await message.channel.send(`Hack Status: 90%`);

    setTimeout(function() {
      message.channel.send(embed);
    }, 5000);

    //End
  }
};