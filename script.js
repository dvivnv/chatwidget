const client = new tmi.Client({
  channels: ['DVIVNV'] // asegurate que esté correcto
});

client.connect();

const chat = document.getElementById('chat');

client.on('message', (channel, userstate, message, self) => {
  if (self) return;

  const username = userstate['display-name'] || userstate.username;
  const isMod = userstate.mod || userstate['user-type'] === 'mod';
  const isVip = userstate.badges && userstate.badges.vip;
  const isSub = userstate.subscriber;

  // Crear contenedor del mensaje
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  // Crear estructura del nombre
  const chatUser = document.createElement('span');
  chatUser.classList.add('chat-user');

  const nameBorder = document.createElement('span');
  nameBorder.classList.add('name-label-border');

  const nameLabel = document.createElement('span');
  nameLabel.classList.add('name-label');

  // Badge si hay
  if (isMod || isVip || isSub) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    if (isMod) badge.textContent = 'MOD';
    else if (isVip) badge.textContent = 'VIP';
    else if (isSub) badge.textContent = 'SUB';
    nameLabel.appendChild(badge);
  }

  // Nombre de usuario
  nameLabel.appendChild(document.createTextNode(` ${username}:`));

  // Unir estructura
  nameBorder.appendChild(nameLabel);
  chatUser.appendChild(nameBorder);
  chatMessage.appendChild(chatUser);

  // Contenido del mensaje
  const chatText = document.createElement('span');
  chatText.classList.add('chat-text');
  chatText.textContent = message;

  chatMessage.appendChild(chatText);
  chat.appendChild(chatMessage);

  // Borrar después de 15 segundos
  setTimeout(() => {
    chatMessage.classList.add('fade-out');
    setTimeout(() => chatMessage.remove(), 1000);
  }, 15000);
});
