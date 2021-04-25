const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Unban A Member!",
  usage: "Unban <Member ID>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `**Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    if (!args[0])
      return message.channel.send(
        `**Veuillez me donner l'ID du membre que vous souhaitez debannir**`
      );

    if (isNaN(args[0])) return message.channel.send(`**Veuillez me donner un ID valide**`);

    if (args[0] === message.author.id)
      return message.channel.send(`**Vous êtes déjà débanni**`);

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send(`**Le propriétaire du serveur est déjà debanni**`);

    if (args[0] === client.user.id)
      return message.channel.send(`**Je suis déjà debanni**`);

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send(
        "** ❌ Veuillez donner un ID valide ou c'est que le membre n'est pas banni**"
      );

    let Reason = args.slice(1).join(" ") || "Non spécifiée !";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send(
        `** ❌ Je ne peux pas annuler l'exclusion de ce membre, peut-être que le membre n'est pas banni**`
      );
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`__**Deban**__`)
      .addField(`**Moderateur**`, `<@${message.author.id}>`)
      .addField(`**Membre debanni**`, `<@${Member.user.id}>`)
      .addField(`**Raison**`, `${Reason || "Non spécifiée"}`)
      .setFooter(`Debanni par ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};