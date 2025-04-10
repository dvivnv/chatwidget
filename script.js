const client = new tmi.Client({
  channels: ['DVIVNV']
});

client.connect();

const chat = document.getElementById('chat');

client.on('message', (channel, userstate, message, self) => {
  if (self) return;

  const username = userstate['display-name'] || userstate.username;

  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.innerHTML = `<strong>${username}:</strong> ${message}`;

  chat.appendChild(chatMessage);

  setTimeout(() => {
    chatMessage.classList.add('fade-out');
    setTimeout(() => chatMessage.remove(), 1000);
  }, 15000);
});
