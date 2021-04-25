const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Kick A Member!",
  usage: "Kick <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `** ❌ Vous n'êtes pas autorisé à utiliser cette commande**`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `** 🔎 Veuillez mentionner un membre que vous souhaitez kick**`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`** ❌ Veuillez mentionner un membre valide**`);

    if (Member.id === message.author.id)
      return message.channel.send(`** ❌ Vous ne pouvez pas vous kick**`);

    if (Member.id === client.user.id)
      return message.channel.send(`** 😔 S'il te plaît, ne me kick pas ;-;**`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`** 🤦‍♂️ Vous ne pouvez pas expulser le propriétaire du serveur, idiot**`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.kickable)
      return message.channel.send(`** ❌ Je ne peux pas kick ce membre**`);

    try {
      console.log(`**Le membre a été kick !**`);

      setTimeout(function() {
        User.kick({ reason: `${Reason || "Non spécifiée !"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`__**KICK__**`)
        .addField(`**Moderateur**`, `<@${message.author.id}>`)
        .addField(`**Membre expulsé**`, `<@${Member.id}>`)
        .addField(`**Raison**`, `${Reason || "Non spécifiée !"}`)
        .setFooter(`Kick par ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Vous avez été expulsé du serveur MiseryCord pour ${Reason ||
            "Non spécifiée !"}`
        );
      message.channel.send(embed);
      console.log(
        `**${Member.tag} (${Member.id}) c'est fait kick**${
          message.guild.name
        } Pour ${Reason || "Non spécifiée !"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `**Je ne peux pas kick ce membre. Peut-être que le membre a un rôle plus élevé que moi**`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
