console.log('Service Worker Loaded...');

self.addEventListener ('push', e=> {
    const data = e.data.json();
    console.log('Push received...');
    self.registration.showNotification(data.title, {
        body: 'Det virker!!! - Jannick S Pedersen',
        icon:'https://cdn.shopify.com/s/files/1/0036/4806/1509/products/s0105131_cd5ce0b3-2852-45e6-b98d-3cfc0b238501.jpg?v=1578563558'
    });
});

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'index.html',
  'client.js',
  'manifest.json',
  '/index.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

