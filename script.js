const client = new tmi.Client({
  channels: ['DVIVNV']
});

client.connect();

const chat = document.getElementById('chat');

client.on('message', (channel, userstate, message, self) => {
  if (self) return;

  const username = userstate['display-name'] || userstate.username;
  const isMod = userstate.mod || userstate['user-type'] === 'mod';
  const isVip = userstate.badges && userstate.badges.vip;
  const isSub = userstate.subscriber;

  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  const chatUser = document.createElement('span');
  chatUser.classList.add('chat-user');

  const nameLabelBorder = document.createElement('span');
  nameLabelBorder.classList.add('name-label-border');

  const nameLabel = document.createElement('span');
  nameLabel.classList.add('name-label');

  // Badge si tiene
  if (isMod) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'MOD';
    nameLabel.appendChild(badge);
  } else if (isVip) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'VIP';
    nameLabel.appendChild(badge);
  } else if (isSub) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'SUB';
    nameLabel.appendChild(badge);
  }

  // Nombre de usuario
  const nameText = document.createTextNode(` ${username}:`);
  nameLabel.appendChild(nameText);

  nameLabelBorder.appendChild(nameLabel);
  chatUser.appendChild(nameLabelBorder);
  chatMessage.appendChild(chatUser);

  // Texto del mensaje
  const messageText = document.createTextNode(` ${message}`);
  chatMessage.appendChild(messageText);

  chat.appendChild(chatMessage);

  // Animación de entrada
  setTimeout(() => {
    chatMessage.classList.add('show');
  }, 10);

  // Desaparición automática
  setTimeout(() => {
    chatMessage.classList.add('fade-out');
    setTimeout(() => chatMessage.remove(), 1000);
  }, 15000);
});
