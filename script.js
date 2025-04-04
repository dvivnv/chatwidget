const client = new tmi.Client({
    connection: {
        reconnect: true,
        secure: true
    },
    channels: ['dvivnv'] // <-- Todo en minúscula
});

client.connect();

// Confirmación de conexión en la consola
client.on('connected', (addr, port) => {
    console.log(`✅ Conectado a ${addr}:${port}`);
});

// Recibir mensajes
client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const chatContainer = document.getElementById('chat-messages');

    const messageEl = document.createElement('div');
    messageEl.classList.add('chat-message');

    const badgeEl = document.createElement('span');
    badgeEl.classList.add('chat-badge');

    // Agregar badges visuales
    if (tags.badges) {
        if (tags.badges.broadcaster) {
            badgeEl.textContent = '🛑';
        } else if (tags.badges.moderator) {
            badgeEl.textContent = '⚔️';
        } else if (tags.badges.vip) {
            badgeEl.textContent = '💎';
        } else if (tags.badges.subscriber) {
            badgeEl.textContent = '⭐';
        }
    }

    const nameEl = document.createElement('span');
    nameEl.classList.add('chat-username');
    nameEl.textContent = tags['display-name'] || tags.username;

    const textEl = document.createElement('span');
    textEl.classList.add('chat-text');
    textEl.textContent = `: ${message}`;

    messageEl.appendChild(badgeEl);
    messageEl.appendChild(nameEl);
    messageEl.appendChild(textEl);

    chatContainer.appendChild(messageEl);

    // Animación de entrada (solo si después le ponés animaciones con CSS)
    messageEl.classList.add('fade-in');

    // Borrar mensajes viejos después de un rato
    setTimeout(() => {
        messageEl.classList.add('fade-out');
        setTimeout(() => {
            chatContainer.removeChild(messageEl);
        }, 1000);
    }, 15000); // 15 segundos
});
