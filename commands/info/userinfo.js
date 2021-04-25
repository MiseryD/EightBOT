const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "userinfo",
  aliases: ["memberinfo", "whois"],
  description: "Infos de la personne de ton choix",
  usage: "Userinfo | <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    let member = message.mentions.users.first() || message.member;

    const statuses = {
      online: "Online",
      dnd: "Do Not Disturb",
      idle: "Idle",
      offline: "Offline/Invisible"
    };

    const embed = new MessageEmbed()
      .setTitle(member.user.username)
      .setColor(Color)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Nom Complet**", member.user.tag, true)
      .addField("**ID**", `${member.id}`, true)
      .addField("**Statut**", statuses[member.presence.status], true)
      .addField(
        `**Roles Count**`,
        message.guild.members.cache.get(member.user.id).roles.cache.size ||
          "Aucuns rôles!",
        true
      )
      .addField(`**Avatar**`, `[Link](${member.user.displayAvatarURL()})`, true)
      .addField("**A rejoint le serveur le**", member.joinedAt.toDateString())
      .addField("**A rejoint Discord le**", member.user.createdAt.toDateString())
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
