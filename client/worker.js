console.log('Service Worker Loaded...');

self.addEventListener ('push', e=> {
    const data = e.data.json();
    console.log('Push received...');
    self.registration.showNotification(data.title, {
        body: 'Det virker!!! - Jannick S Pedersen',
        icon:'https://cdn.shopify.com/s/files/1/0036/4806/1509/products/s0105131_cd5ce0b3-2852-45e6-b98d-3cfc0b238501.jpg?v=1578563558'
    });
});

self.addEventListener('install', (e) => {
    var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  'client.js',
  'index.html',
  'manifest.json',
  '/index.js'

];
var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });


    console.log('[Service Worker] Install');
});

