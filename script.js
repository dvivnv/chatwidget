const client = new tmi.Client({
    channels: ['DVIVNV']
  });
  
  client.connect();
  
  client.on('message', (channel, tags, message, self) => {
    if (self) return;
  
    const chat = document.getElementById('chat');
    if (!chat) return;
  
    const messageEl = document.createElement('div');
    messageEl.classList.add('chat-message');
  
    const userSpan = document.createElement('span');
    userSpan.classList.add('chat-user');
  
    const borderSpan = document.createElement('span');
    borderSpan.classList.add('name-label-border');
  
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('name-label');
  
    const badges = tags.badges || {};
    if (badges.moderator) {
      const badge = document.createElement('span');
      badge.classList.add('chat-badge');
      badge.innerText = 'MOD';
      nameSpan.appendChild(badge);
    } else if (badges.vip) {
      const badge = document.createElement('span');
      badge.classList.add('chat-badge');
      badge.innerText = 'VIP';
      nameSpan.appendChild(badge);
    } else if (badges.subscriber) {
      const badge = document.createElement('span');
      badge.classList.add('chat-badge');
      badge.innerText = 'SUB';
      nameSpan.appendChild(badge);
    }
  
    const nameText = document.createTextNode(` ${tags['display-name']}:`);
    nameSpan.appendChild(nameText);
  
    borderSpan.appendChild(nameSpan);
    userSpan.appendChild(borderSpan);
  
    const textSpan = document.createElement('span');
    textSpan.classList.add('chat-text');
    textSpan.innerText = message;
  
    messageEl.appendChild(userSpan);
    messageEl.appendChild(textSpan);
    chat.appendChild(messageEl);
  
    chat.scrollTop = chat.scrollHeight;
  
    messageEl.classList.add('fade-in');
    setTimeout(() => {
      messageEl.classList.add('fade-out');
      setTimeout(() => {
        messageEl.remove();
      }, 1000);
    }, 10000);
  });
  