const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
  name: "ascii",
  aliases: [],
  description: "Ascii Art!",
  usage: "Ascii <Text>",
  run: async (client, message, args) => {
    //Start

    message.delete();
    
    let Content = args.join(" ");

    if (!Content) return message.channel.send(`** 🔎 Veulillez me donner quelque chose à noter**`);

    let Result = await figletAsync(Content);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setDescription("```" + Result + "```")
      .setTimestamp();

    if (Content.length > 20)
      return message.channel.send(`** ❌ Dsl mais la limite de lettres est de 20 lettres** ☹`);

    message.channel.send(embed);

    message.delete();

    //End
  }
};