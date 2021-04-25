const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "warn",
  aliases: [],
  description: "Warn A User!",
  usage: "Warn <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `** ❌ Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`** 🔎 Veuillez mentionner un utilisateur**`);

    let Reason = args.slice(1).join(" ");

    client.db.add(`Warn_${message.guild.id}_${Member.user.id}`, 1);

    let Warnings = client.db.get(
      `Warnings_${message.guild.id}_${Member.user.id}`
    );

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`__**WARN**__`)
      .addField(`**Moderateur**`, `<@${message.author.id}>`)
      .addField(`**Membre Warn**`, `<@${Member.user.id}>`)
      .addField(`**Avertissement**`, Warnings)
      .addField(`**Raison**`, `${Reason || "Non spécifiée"}`)
      .setFooter(`Warn par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};