// Service Worker para optimización de caché ultra-rápida
const CACHE_NAME = 'iafy-v2';
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/5841271165010691996-removebg.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  'https://videomp46523.live-website.com/wp-content/uploads/2025/07/VIDEO-WEBINAR-PREVIO-A-DEMO-2.mp4'
];

// Estrategia de caché agresiva
self.addEventListener('install', (event) => {
  // Forzar activación inmediata
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cachear recursos críticos primero
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Limpiar cachés antiguos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tomar control inmediato
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Estrategia cache-first para recursos estáticos
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Network-first para recursos dinámicos
        return fetch(event.request).then((response) => {
          // Solo cachear respuestas válidas
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar respuesta para cachear
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Fallback para recursos offline
          return caches.match('/');
        });
      }
    )
  );
});