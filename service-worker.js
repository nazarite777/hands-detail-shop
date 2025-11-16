const CACHE_NAME = 'hands-detail-shop-v1';
const RUNTIME_CACHE = 'hands-detail-runtime-v1';

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/services.html',
  '/booking.html',
  '/quote.html',
  '/contact.html',
  '/membership.html',
  '/gallery.html',
  '/reviews.html',
  '/faq.html',
  '/portal.html',
  '/rewards.html',
  '/gift-certificates.html',
  '/styles.css',
  '/main.js',
  '/20200723_030424~2.png',
  '/autopic.jpg',
  '/IMG_20250919_124905970_HDR_AE_optimized.jpg',
  '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests, use network first, fallback to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // For other requests, use cache first, fallback to network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME_CACHE).then((cache) => {
          return fetch(event.request).then((response) => {
            // Only cache successful responses
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
  );
});

// Message event - handle skip waiting
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
