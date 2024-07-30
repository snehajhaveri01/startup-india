(function() {
  // Create and style chat icon
  var chatIcon = document.createElement('div');
  chatIcon.id = 'chat-icon';
  chatIcon.style.right = '20px';
  chatIcon.style.width = '30vw';
  chatIcon.style.height = '30vw';
  chatIcon.style.maxWidth = '60px';
  chatIcon.style.maxHeight = '60px';
  chatIcon.style.backgroundColor = "black";
  chatIcon.style.borderRadius = '50%';
  chatIcon.style.justifyContent = 'center';
  chatIcon.style.alignItems = 'center';
  chatIcon.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  chatIcon.style.cursor = 'pointer';
  chatIcon.style.zIndex = '1000';
  chatIcon.style.fontSize = '4vw';
  chatIcon.style.position = 'static';
  chatIcon.style.display = 'inline-block';
  chatIcon.style.verticalAlign = 'middle';
  chatIcon.style.marginLeft = '10px';

  chatIcon.style.transition = 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out';
  chatIcon.addEventListener('mouseenter', function() {
    chatIcon.style.transform = 'scale(1.1)';
    chatIcon.style.backgroundColor = '#F06D45';
  });
  chatIcon.addEventListener('mouseleave', function() {
    chatIcon.style.transform = 'scale(1.0)';
    chatIcon.style.backgroundColor = 'black';
  });

  chatIcon.innerHTML = `
    <img src="https://img-cdn.thepublive.com/fit-in/1200x675/smstreet/media/media_files/W5cOkLDaOBwFhsoTrioW.jpg" alt="Chat Logo" style="width: 60%; height: 60%; max-width: 40px; max-height: 40px; border-radius: 50%; object-fit: cover;">
  `;

  var chatContainer = document.querySelector('.chat-container');
  chatContainer.appendChild(chatIcon);
  // document.body.appendChild(chatIcon);


  // Create and style chat widget
  var chatWidget = document.createElement('div');
  chatWidget.id = 'aichatbot';
  chatWidget.style.display = 'none';
  chatWidget.style.position = 'fixed'; // Changed to fixed
  chatWidget.style.top = '50%'; // Center vertically
  chatWidget.style.left = '50%'; // Center horizontally
  chatWidget.style.transform = 'translate(-50%, -50%)'; // Adjust position to center
  chatWidget.style.width = '300px';
  chatWidget.style.height = '1200px';
  chatWidget.style.maxHeight = '400px';
  chatWidget.style.zIndex = '1001';
  chatWidget.style.border = '1px solid #2d3748';
  chatWidget.style.borderRadius = '10px';
  chatWidget.style.overflow = 'hidden';
  chatWidget.style.fontFamily = 'sans-serif';
  chatWidget.style.backgroundColor = 'white';
  chatWidget.style.color = '#ffffff';
  chatWidget.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  chatWidget.style.fontSize = '14px';

  chatWidget.innerHTML = `
  <div id="chat-header" style="background-color: #F06D45; color: black; padding: 10px; text-align: center; font-size: 1.5em;">
    <img src="assets/startup.png" alt="StartUp India" style="width: 200px; height: 20px;"> 
  </div>
  <div id="chat-messages" style="height: 70%; overflow-y: auto; padding: 10px;"></div>
  <div style="padding: 10px; display: flex; align-items: center; background-color: #00000;">
    <input type="text" id="chat-input" style="flex: 1; padding: 15px; border: none; border-radius: 20px; background-color: #0B031E; color: #fff; outline: none; font-size: 0.8em;" placeholder="Let the magic begin, Ask a question." />
    <button id="chat-send" style="margin-left: 10px; background-color: black; color: white; border: none; border-radius: 50%; width: 10vw; height: 10vw; max-width: 40px; max-height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1em;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="30" height="30">
        <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
      </svg>
    </button>
  </div>
`;

  // document.body.appendChild(chatWidget);
  chatContainer.appendChild(chatWidget);

  // Toggle chat widget display
  chatIcon.addEventListener('click', () => {
    chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
    if (chatWidget.style.display === 'block') {
      appendMessage("Hello, I am BotWot! What is on your mind?", false); 
    }
  });

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  const appendMessage = (content, isUser) => {
    const messageDiv = document.createElement('div');
    messageDiv.style.display = 'flex';
    messageDiv.style.alignItems = 'flex-start';
    messageDiv.style.justifyContent = isUser ? 'flex-end' : 'flex-start';
    messageDiv.style.margin = '10px 0';

    const avatar = document.createElement('img');
    avatar.style.width = '5vw';
    avatar.style.height = '5vw';
    avatar.style.maxWidth = '32px';
    avatar.style.maxHeight = '32px';
    avatar.style.borderRadius = '50%';
    avatar.style.margin = isUser ? '0 0 0 10px' : '0 10px 0 0';

    const messageSpan = document.createElement('div');
    messageSpan.style.maxWidth = '70%';
    messageSpan.style.padding = '10px';
    messageSpan.style.borderRadius = isUser ? '12px 12px 0 12px' : '12px 12px 12px 0';
    messageSpan.style.backgroundColor = isUser ? '#4299e1' : '#2d3748';
    messageSpan.style.color = '#fff';

    const textSpan = document.createElement('div');
    if (isUser) {
      textSpan.textContent = content;
    } else {
      textSpan.innerHTML = content; // Use innerHTML for bot messages to render HTML
    }
    textSpan.style.marginBottom = '5px';

    const timeSpan = document.createElement('div');
    timeSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeSpan.style.fontSize = '0.75rem';
    timeSpan.style.opacity = '0.7';
    timeSpan.style.textAlign = isUser ? 'right' : 'left';

    messageSpan.appendChild(textSpan);
    messageSpan.appendChild(timeSpan);

    avatar.src = isUser ? "https://cdn1.vectorstock.com/i/1000x1000/91/60/user-profile-3d-icon-avatar-or-person-button-vector-46429160.jpg" : 'assets/startup.png';

    if (isUser) {
      messageDiv.appendChild(messageSpan);
      messageDiv.appendChild(avatar);
    } else {
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(messageSpan);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const appendTypingIndicator = () => {
    const typingDiv = document.createElement('div');
    typingDiv.style.display = 'flex';
    typingDiv.style.alignItems = 'center';
    typingDiv.style.margin = '10px 0';

    const avatar = document.createElement('img');
    avatar.src = 'assets/startup.png'; 
    avatar.style.height = '32px';
    avatar.style.width = '4vw';
    avatar.style.maxWidth = '32px';
    avatar.style.maxHeight = '32px';
    avatar.style.borderRadius = '50%';
    avatar.style.marginRight = '10px';

    const dotsContainer = document.createElement('div');
    dotsContainer.style.display = 'flex';
    dotsContainer.style.gap = '4px';

    const typingText = document.createElement('div');
    typingText.textContent = 'Typing...';
    typingText.style.color = '#ccc';
    typingText.style.fontSize = '0.8em';

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#4a5568';
      dot.style.animation = `bounce 1.5s ease-in-out ${i * 0.5}s infinite, typingAnimation 0.5s step-end ${i * 0.5}s 2 alternate`; 
      dotsContainer.appendChild(dot);
    }

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingText);
    typingDiv.appendChild(dotsContainer);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv;
  };

  function formatBotResponse(text) {
    // Split the text into sections based on double newlines
    const sections = text.split('\n\n');
    
    // Format each section
    const formattedSections = sections.map(section => {
      // Check if the section is a header (starts with a dash or asterisk)
      if (section.trim().startsWith('-') || section.trim().startsWith('*')) {
        return `<h4 style="color: #F3E008; margin-top: 15px; margin-bottom: 5px;">${section.trim().substring(1).trim()}</h4>`;
      }
      // Check if the section contains a list (lines starting with dash or asterisk)
      else if (section.includes('\n-') || section.includes('\n*')) {
        const listItems = section.split('\n').map(item => {
          if (item.trim().startsWith('-') || item.trim().startsWith('*')) {
            return `<li>${item.trim().substring(1).trim()}</li>`;
          }
          return item;
        }).join('');
        return `<ul style="margin-top: 0; padding-left: 20px;">${listItems}</ul>`;
      }
      // Otherwise, treat it as a regular paragraph
      else {
        return `<p>${section}</p>`;
      }
    });
    
    // Combine all formatted sections
    const formattedHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #f0f0f0;">
        ${formattedSections.join('')}
      </div>
    `;
    return formattedHtml;
  }

  chatSend.addEventListener('click', async () => {
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, true);
    chatInput.value = '';

    const typingIndicator = appendTypingIndicator();

    try {
      const response = await fetch('https://api.botwot.io/user/proxy/sessionChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": "669bea6783f712df352b1331",
          "sessionId": localStorage.getItem('sessionId') || "",
          "question": message,
          "subscriptionPlanId": "subscriptionPlanId1",
          "botId": "66a15ce4ae91c5d6e81f9b61"
        })
      });
      const data = await response.json();
      if (data && data.chats && data.chats.length > 0) {
        const botResponse = formatBotResponse(data.chats[data.chats.length - 1].answer);
        appendMessage(botResponse, false);
      } else {
        appendMessage('Error: Could not send message', false);
      }

      typingIndicator.remove();
    } catch (error) {
      console.error('Error sending message:', error);
      appendMessage('Error: Could not send message', false);
      typingIndicator.remove();
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatSend.click();
    }
  });

  // Add keyframe animation for typing effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes typingAnimation {
      0% { content: "Typing."; }
      33% { content: "Typing.."; }
      66% { content: "Typing..."; }
      100% { content: "Typing."; }
    }
  `;
  document.head.appendChild(style);
})();