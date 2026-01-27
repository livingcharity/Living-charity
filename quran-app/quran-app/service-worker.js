self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('quran-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/data/quran/quran-uthmani.json',
        '/data/tafsir/ibn-kathir.json',
        '/data/tafsir/saadi.json',
        '/data/asbab-alnuzul/asbab.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
