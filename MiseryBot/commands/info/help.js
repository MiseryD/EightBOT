const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Liste des commandes",
  usage: "Help | <Command Name>",
  run: async(client, message, args) => {
    
    message.delete();
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`**__Voici la lists de mes commandes__**`)
    .setDescription(`Utilisez ${Prefix}Help <nom de la commande> pour plus d'infos sur celle-ci` + 
    "\n\n**Fun**\n`Avatar, Coinflip, Howgay, Meme, Rate, Dicksize, Ascii, Hack, Randomnumber`" + "\n\n" +
    "**Information**\n`Help, Userinfo, Serverinfo, Ping`")
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    
    if (!args.length) return message.channel.send(embed);

    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));

    let embed2 = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${cmd.name} Information!`)
      .addField(`Autres nom`, cmd.aliases || "Aucuns")
      .addField(`Usage`, cmd.usage || "Aucun Usage")
      .addField(`Description`, cmd.description || "Aucune description")
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
