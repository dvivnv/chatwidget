// Conectarse a Twitch usando tmi.js
const client = new tmi.Client({
  channels: ['DVIVNV'] // Tu canal
});

client.connect();

// Elemento donde se insertan los mensajes
const chatContainer = document.getElementById('chat-container');

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  const isMod = tags.mod || tags['user-type'] === 'mod';
  const isVip = tags.badges && tags.badges.vip;
  const isSub = tags.subscriber;

  // Crear contenedor del mensaje
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message');

  // Crear span del usuario
  const userSpan = document.createElement('span');
  userSpan.classList.add('chat-user');

  const nameBorderSpan = document.createElement('span');
  nameBorderSpan.classList.add('name-label-border');

  const nameLabelSpan = document.createElement('span');
  nameLabelSpan.classList.add('name-label');

  // Insignias
  if (isMod) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'MOD';
    nameLabelSpan.appendChild(badge);
  }

  if (isVip) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'VIP';
    nameLabelSpan.appendChild(badge);
  }

  if (isSub) {
    const badge = document.createElement('span');
    badge.classList.add('chat-badge');
    badge.textContent = 'SUB';
    nameLabelSpan.appendChild(badge);
  }

  // Nombre de usuario
  nameLabelSpan.appendChild(document.createTextNode(` ${tags['display-name']}:`));
  nameBorderSpan.appendChild(nameLabelSpan);
  userSpan.appendChild(nameBorderSpan);

  // Texto del mensaje
  const messageText = document.createElement('span');
  messageText.classList.add('chat-text');
  messageText.textContent = message;

  // Agregar todo al contenedor principal
  messageDiv.appendChild(userSpan);
  messageDiv.appendChild(messageText);
  chatContainer.appendChild(messageDiv);

  // Animación de entrada
  setTimeout(() => {
    messageDiv.classList.add('show');
  }, 50);

  // Borrar el mensaje después de 20 segundos
  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => messageDiv.remove(), 1000);
  }, 20000);
});
