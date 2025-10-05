const cacheName = 'melimemo-v2';
const assetsToCache = [
    '/',
    '/DesainWeb/index.html',
    '/DesainWeb/offline.html',
    '/DesainWeb/manifest.json',
    '/DesainWeb/Gambar/192.png',
    '/DesainWeb/Gambar/512.png'
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
