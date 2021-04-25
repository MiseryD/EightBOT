const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "mute",
  aliases: [],
  description: "Mute A User!",
  usage: "Mute <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        `** ❌ Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`** 🔎 Veuillez mentionner un utilisateur**`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `Please Create Mute Role | Role Name : Muted`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`** ❌ Le membre est déjà muet**`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`__**MUTE**__`)
      .addField(`**Moderateur**`, `<@${message.author.id}>`)
      .addField(`**Membre muté**`, `<@${Member.user.id}>`)
      .addField(`**Raison**`, `${Reason || "Non spécifiée"}`)
      .setFooter(`Mute par ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`**Une erreur s'est produite :( , réessayez plus tard**`);
    }

    //End
  }
};
