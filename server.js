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
    `Utilisateur : ${message.author.tag} (${message.author.id}) Serveur : ${message.guild.name} (${message.guild.id}) Commande : ${command.name}`
  );
});

client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannel = client.channels.cache.get('825362499934617620');
  welcomeChannel.send('**Bienvenue**, <@' + member.user.id + '> ! 👋');

  member.roles.add('834857843525812228');
  member.roles.add('826032153141051392');
  member.roles.add('826028532555317251');

  member.send('**Bienvenue** sur le serveur **__MiseryCord__** ! Lis attentivement les règles et coche le case en dessous pour avoir accès au serveur ! Si tu rencontre un problème contacte <@541992802146451476> en messages privés 😉');
});

client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannel = client.channels.cache.get('825362499934617620'); 
  leaveChannel.send('**Au revoir**, <@' + member.user.id + '> ! 🙂');
});

client.on('ready', async () => {

    let myGuild = bot.guild.cache.get('825343340663930881');
    let DeleteChannel = myGuild.channel.cache.get('825414904894455818')

    DeleteChannel.bulkDelete(100)

    let OpenTicket = new Discord.MessageEmbed()
    .setDescription('Cliquez sur 🎫 pour ouvrir un ticket')

    let guild = bot.guild.cache.get('825343340663930881');
    let SendChannel = guild.channel.cache.get('825414904894455818')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('🎫'))
})

client.on('messageReactionAdd', async(reaction, user) => {
    const message = reaction.message; 
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return; 

    if(
        ["🎫", "🔒"].includes(reaction.emoji.name)
    ) {
        switch(reaction.emoji.name) {

            case "🎫": 

            if(reaction.message.channel.id !== "825414904894455818") return console.log('Un ticket à été utilisé dans un autre salon')

            reaction.users.remove(user);

            let username = user.username;
            let categoryID = "827203603805634580";
            let channel = await message.guild.channels.create(`ticket-${username}`, {type: 'text', parent: message.guild.channels.get(categoryID)});
            .catch(err => {
                message.channel.send('Il y a eu une erreur dans le [MessageReactionAdd]') 
            }); 

            channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false }); 
            channel.updateOverwrite(member, {
                'VIEW_CHANNEL': true,
                'SEND_MESSAGES': true,
                'ADD_REACTIONS': true, 
            })
            channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == '🔨| Staff'), {'VIEW_CHANNEL': true});

            var embed1 = new Discord.MessageEmbed()
            .setTitle('Salut,')
            .setDescription('Expliquez votre problème içi')

            channel.send(`${member}`)
            channel.send(embed1).then(async msg => msg.react('🔒'))
            let logchannel = message.guild.channels.cache.find(c => c.name == 'log')
            if(!logchannel) return;
            logchannel.send(`Un membre à créé un ticket ${channel}`)
            break;

            case "🔒":

            if(!message.channel.name.startsWith('ticket')) return; 
            if(!member.hasPersission('ADMINISTRATOR')) return;

            message.channel.delete()
            let logchannel2 = message.guild.channels.cache.find(c => c.name == 'log')
            if(!logchannel2) return;
            logchannel.send(`Un ticket viens d'être fermé ${message.channel.name}`)
            break;
        }
    }
})
client.login(process.env.TOKEN);
