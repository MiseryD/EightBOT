client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannel = client.channels.cache.get('855127116155453551');
  welcomeChannel.send('**Bienvenue** <@' + member.user.tag + '> ! 👋');

  member.roles.add('855153584735518770');

  member.send('**Bienvenue** sur le serveur **__MiseryCord__** ! Lis attentivement les règles et coche le case en dessous pour avoir accès au serveur ! Si tu rencontre un problème contacte <@541992802146451476> en messages privés 😉');
});

client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannel = client.channels.cache.get('855127116155453551'); 
  leaveChannel.send('Au revoir, <@' + member.user.tag + '> ! 🙂');
});
