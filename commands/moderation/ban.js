const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Pink } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Ban A Member!",
  usage: "Ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `** ❌ Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `** 🔎 Veuillez mentionner le membre que vous souhaitez bannir**`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`** ❌ Veuillez mentionner un membre valide**`);

    if (Member.id === message.author.id)
      return message.channel.send(`** ❌ Vous ne pouvez pas vous bannir**`);

    if (Member.id === client.user.id)
      return message.channel.send(`** 😔 S'il te plait, ne me ban pas ;-;**`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`** 🤦‍♂️ Vous ne pouvez pas bannir le propriétaire du serveur, idiot !**`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`** ❌ Je ne peux pas bannir ce membre**`);

    try {
      console.log(`La personne a bien été ban !`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "Non spécifiée !"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`__**BAN**__`)
        .addField(`**Moderateur**`, `<@${message.author.id}>`)
        .addField(`**Membre banni**`, `<@${Member.tag}>`)
        .addField(`**Raison**`, `${Reason || "Non spécifiée !"}`)
        .setFooter(`Ban par ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Vous avez été banni du serveur **VALORANT FR** pour ${Reason ||
            "Non spécifiée !"}`
        );
      message.channel.send(embed);
      console.log(
        `${Member.tag} (${Member.id}) viens d'être banni de ${
          message.guild.name
        } Pour ${Reason || "Non spécifiée !"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `**✅ Membre BAN **`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
