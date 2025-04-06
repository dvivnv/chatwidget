const client = new tmi.Client({
  channels: ['DVIVNV'] // Cambialo si estás testeando con otro canal
});

client.connect();

const chatContainer = document.getElementById('chat');

client.on('message', (channel, userstate, message, self) => {
  if (self) return;

  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  const username = userstate['display-name'] || userstate.username;

  chatMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatContainer.appendChild(chatMessage);

  setTimeout(() => {
    chatMessage.classList.add('fade-out');
    setTimeout(() => chatMessage.remove(), 1000);
  }, 15000);
});
