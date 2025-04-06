const client = new tmi.Client({
    channels: ['DVIVNV']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const chatContainer = document.getElementById('chat');
    const messageEl = document.createElement('div');
    messageEl.classList.add('chat-message');

    const chatUser = document.createElement('span');
    chatUser.classList.add('chat-user');

    const nameBorder = document.createElement('span');
    nameBorder.classList.add('name-label-border');

    const nameLabel = document.createElement('span');
    nameLabel.classList.add('name-label');

    // Agregamos insignias según el tipo
    if (tags.badges) {
        const badge = document.createElement('span');
        badge.classList.add('chat-badge');

        if (tags.badges.broadcaster) {
            badge.textContent = 'Streamer';
        } else if (tags.badges.vip) {
            badge.textContent = 'VIP';
        } else if (tags.mod) {
            badge.textContent = 'MOD';
        } else if (tags.badges.subscriber) {
            badge.textContent = 'Sub';
        }

        nameLabel.appendChild(badge);
    }

    const usernameText = document.createTextNode(` ${tags['display-name']} `);
    nameLabel.appendChild(usernameText);

    const messageText = document.createTextNode(`: ${message}`);

    nameBorder.appendChild(nameLabel);
    chatUser.appendChild(nameBorder);
    messageEl.appendChild(chatUser);
    messageEl.appendChild(messageText);

    chatContainer.appendChild(messageEl);

    // Animación de entrada
    messageEl.classList.add('fade-in');

    // Borrado automático después de 30 segundos
    setTimeout(() => {
        messageEl.classList.add('fade-out');
        setTimeout(() => {
            chatContainer.removeChild(messageEl);
        }, 1000);
    }, 30000);
});
