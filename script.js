const client = new tmi.Client({
    channels: ['DVIVNV']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const chatMessages = document.getElementById('chat-messages');

    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');

    const chatUser = document.createElement('span');
    chatUser.classList.add('chat-user');

    const nameBorder = document.createElement('span');
    nameBorder.classList.add('name-label-border');

    const nameLabel = document.createElement('span');
    nameLabel.classList.add('name-label');

    // Ejemplo: agregar insignia si es moderador
    if (tags.mod) {
        const badge = document.createElement('span');
        badge.classList.add('chat-badge');
        badge.textContent = 'MOD';
        nameLabel.appendChild(badge);
    }

    nameLabel.appendChild(document.createTextNode(` ${tags['display-name']}:`));
    nameBorder.appendChild(nameLabel);
    chatUser.appendChild(nameBorder);

    const chatText = document.createElement('span');
    chatText.classList.add('chat-text');
    chatText.textContent = message;

    chatMessage.appendChild(chatUser);
    chatMessage.appendChild(chatText);
    chatMessages.appendChild(chatMessage);
});
