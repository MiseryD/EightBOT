const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unmute",
  aliases: [],
  description: "Unmute A User!",
  usage: "Unmute <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        `**Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`** 🔎 Veuillez mentionner un utilisateur**`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `Il n'y a pas de rôle muet, donc le membre n'est plus muet!`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`** ❌ Le membre est déjà démuté**`);
    }

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`__**INFO UNMUTE**__`)
      .addField(`**Moderateur**`, `<@${message.author.id}>`)
      .addField(`**Membre démuté**`, `<@${Member.user.id}>`)
      .setFooter(`Démuté par ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`**Une erreur s'est produite, réessayez plus tard**`);
    }

    //End
  }
};