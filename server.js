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
    .setActivity(`twitch.tv/MiseryyD👾`, { type: "STREAMING", url: 'https://twitch.tv/MiseryyD' })
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
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
});

client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannel = client.channels.cache.get('825362499934617620');
  welcomeChannel.send('**Bienvenue** <@' + member.user.tag + '> ! 👋');

  member.roles.add('834857843525812228');
  member.roles.add('826032153141051392');
  member.roles.add('826028532555317251');

  member.send('**Bienvenue** sur le serveur **__MiseryCord__** ! Lis attentivement les règles et coche le case en dessous pour avoir accès au serveur ! Si tu rencontre un problème contacte <@541992802146451476> en messages privés 😉');
});

client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannel = client.channels.cache.get('825362499934617620'); 
  leaveChannel.send('Au revoir, <@' + member.user.tag + '> ! 🙂');
});

client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return
    if (reaction.emoji.name == "✅") {
        reaction.message.channel.send('Tu as réagi : ✅');
        reaction.message.guild.channels.create(`ticket de ${user.username}`, {
            type: 'text',
            parent: "827203603805634580",
            permissionOverwrites: [{
                id: reaction.message.guild.id,
                deny: ['SEND_MESSAGES'],
                allow: ['ADD_REACTIONS']
            }]
        }).then(channel_ticket => {
            channel_ticket.send("Channel crée !")
        })
    }
})

client.login(process.env.TOKEN);
