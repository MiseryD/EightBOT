const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { Prefix, Token, Color } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");

client.on("ready", async () => {
  console.log(`✔ BOT PRÊT ✔`);
  client.user
    .setActivity(`VALORANT`, { type: "PLAYING" })
    .catch(error => console.log(error));
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Mon prefixe est : ${Prefix}`);
  }
});

let modules = ["fun", "info", "moderation"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`La commande ${command.name} à bien été chargé - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(Prefix)) return;

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Je n'ai pas les permissions nécessaire pour faire cela**"
      );
    command.run(client, message, args);
  }
  console.log(
    `Utilisateur : ${message.author.tag} (${message.author.id}) Serveur : ${message.guild.name} (${message.guild.id}) Commande : ${command.name}`
  );
});

client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannel = client.channels.cache.get('855127116155453551');
  welcomeChannel.send('**Bienvenue**, <@' + member.user.id + '> ! 👋');

  member.send('**Bienvenue** sur le serveur **__VALORANT FR__**, lis attentivement les règles dans le salon <#855152790087270401>. Une fois cela fait, si tu souhaite jouer avec les autres jouers tu peux aller dans le salon <#855154473047162881> pour obtenir le rôle joueur 😉. Bon amusement ! ');
});

client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannel = client.channels.cache.get('855127116155453551'); 
  leaveChannel.send('**Au revoir**, <@' + member.user.id + '> ! 🙂');
});

client.login(process.env.TOKEN);
