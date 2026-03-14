/**
 * Hands Detail Shop - Floating Chat Widget
 * Embed on any page with: <script src="chat-widget.js"></script>
 * 
 * Creates a floating chat button in bottom-right corner that opens
 * the AI assistant interface when clicked.
 */

(function() {
  // CSS for the floating chat widget
  const styles = `
    #hands-chat-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C9A84C 0%, #8a6f2e 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 4px 20px rgba(201, 168, 76, 0.4);
      z-index: 9998;
      transition: all 0.3s ease;
    }

    #hands-chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(201, 168, 76, 0.5);
    }

    #hands-chat-button:active {
      transform: scale(0.95);
    }

    #hands-chat-iframe {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 440px;
      height: 620px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 0 0 1px rgba(201, 168, 76, 0.05),
                  0 24px 80px rgba(0, 0, 0, 0.8),
                  0 0 60px rgba(201, 168, 76, 0.04);
      z-index: 9999;
      display: none;
      animation: slideUp 0.3s ease;
    }

    #hands-chat-iframe.open {
      display: block;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      #hands-chat-iframe {
        width: calc(100vw - 48px);
        height: 70vh;
        bottom: 40%;
        right: 24px;
        left: 24px;
      }
    }

    @media (max-width: 480px) {
      #hands-chat-button {
        bottom: 20px;
        right: 20px;
      }

      #hands-chat-iframe {
        bottom: 20px;
        right: 20px;
        left: 20px;
        width: calc(100vw - 40px);
        height: 80vh;
      }
    }

    .hands-chat-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #4ade80;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
      }
    }
  `;

  // Create and inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create the chat button and iframe
  function initChat() {
    // Create button
    const button = document.createElement('button');
    button.id = 'hands-chat-button';
    button.innerHTML = '💬';
    button.title = 'Chat with our AI Assistant';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'hands-chat-iframe';
    iframe.src = '/ai-assistant.html';
    
    // Add badge
    const badge = document.createElement('div');
    badge.className = 'hands-chat-badge';
    badge.textContent = '✓';
    badge.title = 'AI Assistant Ready';
    button.appendChild(badge);
    
    // Toggle chat on button click
    let isOpen = false;
    button.addEventListener('click', () => {
      isOpen = !isOpen;
      iframe.classList.toggle('open');
      button.style.opacity = isOpen ? '0.8' : '1';
    });

    // Close chat when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        iframe.classList.remove('open');
        button.style.opacity = '1';
      }
    });

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && 
          e.target !== button && 
          !button.contains(e.target) && 
          e.target !== iframe &&
          !iframe.contains(e.target)) {
        isOpen = false;
        iframe.classList.remove('open');
        button.style.opacity = '1';
      }
    });

    // Append to body
    document.body.appendChild(button);
    document.body.appendChild(iframe);

    console.log('🖐️ Hands Detail Chat Widget loaded');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }
})();
