const Discord = require('discord.js')

module.export.run = aysnc(bot,message,args) => {

    message.delete()
    if(message.memebr.hasPersmission("ADMINISTRATOR")) return;

    let OpenTicket = new Discord.MessageEmbed()
    .setDescription('Cliquez sur 🎫 pour ouvrir un ticket')

    let myGuild = bot.guild.cache.get('825343340663930881');
    let SendChannel = myGuild.channel.cache.get('825414904894455818')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('🎫'))
}

module.export.config = {
    name: 'openTicket'
}