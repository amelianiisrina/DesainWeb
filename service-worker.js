const cacheName = 'melimemo-v2';
const assetsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/Gambar/192.png',
    '/Gambar/512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
        
    );
  });
    
const offlinePage = '/offline.html';

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  }
});
