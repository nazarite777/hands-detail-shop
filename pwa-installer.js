// PWA Installation and Service Worker Registration
let deferredPrompt;
let installButton;

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Handle PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();

  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Show install button/banner
  showInstallPromotion();
});

// Show install promotion
function showInstallPromotion() {
  // Create install banner if it doesn't exist
  if (!document.getElementById('pwa-install-banner')) {
    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1565c0, #1e88e5);
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 350px;
        animation: slideIn 0.3s ease-out;
      ">
        <button id="pwa-install-close" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
        ">&times;</button>

        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="font-size: 40px;">📱</div>
          <div>
            <div style="font-weight: bold; margin-bottom: 5px;">Install Our App</div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">
              Get quick access to booking and quotes!
            </div>
            <button id="pwa-install-button" style="
              background: white;
              color: #1565c0;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              font-weight: bold;
              cursor: pointer;
              font-size: 14px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">Install Now</button>
          </div>
        </div>
      </div>
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }

      #pwa-install-banner.closing {
        animation: slideOut 0.3s ease-out;
      }

      #pwa-install-button:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
      }

      #pwa-install-close:hover {
        transform: scale(1.2);
        transition: transform 0.2s;
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(banner);

    // Add event listeners
    installButton = document.getElementById('pwa-install-button');
    const closeButton = document.getElementById('pwa-install-close');

    installButton.addEventListener('click', installApp);
    closeButton.addEventListener('click', closeInstallBanner);

    // Store that we've shown the banner
    localStorage.setItem('pwa-banner-shown', 'true');
  }
}

// Install the app
async function installApp() {
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);

  // Clear the deferredPrompt
  deferredPrompt = null;

  // Hide the install banner
  closeInstallBanner();
}

// Close install banner
function closeInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.classList.add('closing');
    setTimeout(() => {
      banner.remove();
    }, 300);
  }
}

// Track app installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
  closeInstallBanner();

  // Track installation (could send to analytics)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'engagement',
      event_label: 'PWA Installed'
    });
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('App is online');
  updateOnlineStatus(true);
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  updateOnlineStatus(false);
});

function updateOnlineStatus(isOnline) {
  // Remove existing status banner
  const existingBanner = document.getElementById('offline-banner');
  if (existingBanner) {
    existingBanner.remove();
  }

  // Show offline banner if offline
  if (!isOnline) {
    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: #f44336;
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 9999;
        font-size: 14px;
      ">
        📡 You're currently offline. Some features may be limited.
      </div>
    `;
    document.body.appendChild(banner);
  }
}

// Check if app is running in standalone mode
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

// Log if running as PWA
if (isStandalone()) {
  console.log('Running as installed PWA');
}
