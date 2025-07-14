const CACHE_NAME = 'blackjack-dashboard-pro-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js'
  // Nota: Los íconos y la imagen de estrategia no se cachean aquí
  // porque son cargados externamente o el navegador los maneja bien.
];

// Evento de instalación: abre el caché y guarda los archivos principales.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Evento de fetch: intercepta las peticiones.
// Si el recurso está en el caché, lo sirve desde ahí.
// Si no, lo busca en la red.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso desde el caché o lo busca en la red
        return response || fetch(event.request);
      })
  );
});