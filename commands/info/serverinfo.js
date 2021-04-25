const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "serverinfo",
  aliases: ["serverinformation"],
  description: "Afficher les informations du serveur",
  usage: "Serverinfo",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "Aucuns Emojis";
    const Roles = guild.roles.cache.size || "Aucuns Rôles";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle(guild.name)
      .setColor(Color)
      .setThumbnail(guild.iconURL())
      .addField(`**Nom**`, guild.name, true)
      .addField(`**ID**`, `${guild.id}`, true)
      .addField(`**Propriétaire**`, `${guild.owner.user.tag}`, true)
      .addField(`**Roles**`, Roles, true)
      .addField(`**Emojis**`, Emojis, true)
      .addField(`**Members**`, Members, true)
      .addField(`**Humains**`, Humans, true)
      .addField(`**Bots**`, Bots, true)
      .addField(`**Serveur créé le**`, guild.createdAt.toDateString())
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};