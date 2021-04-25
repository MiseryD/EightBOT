const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "** ❌ Vous n'êtes pas autorisé à utiliser cette commande**"
      );

    if (!args[0])
      return message.channel.send(`** 🔎 Veuillez me donner une quantités de messages**`);

    if (isNaN(args[0]))
      return message.channel.send(`** ❌ Veuillez me donner une valeur numérique**`);

    if (args[0] < 4)
      return message.channel.send(
        `** 😡 Tu peux supprimmer ${args[0]} messages tous seul, flemmard**`
      );

    if (args[0] > 100)
      return message.channel.send(
        `** ❌ Je peux pas effacer ${args[0]} messages en raison de la limite de Discord**`
      );

    let Reason = args.slice(1).join(" ") || "Non spécifiée !";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(__**`Messages Supprimés !**__`)
        .setFooter(`Clear par ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};