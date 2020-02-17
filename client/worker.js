console.log('Service Worker Loaded...');

self.addEventListener ('push', e=> {
    const data = e.data.json();
    console.log('Push received...');
    self.registration.showNotification(data.title, {
        body: 'Det virker!!! - Jannick S Pedersen',
        icon:'https://cdn.shopify.com/s/files/1/0036/4806/1509/products/s0105131_cd5ce0b3-2852-45e6-b98d-3cfc0b238501.jpg?v=1578563558'
    });
});

const cacheName = 'offlinecache';
const staticAssets = [
  '/index.html',
  '/index.js',
  '/client.js',
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
