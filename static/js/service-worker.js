self.addEventListener('install', event => {
    console.log("Service Worker Installing...");
    event.waitUntil(
        caches.open('ahaguru-analytics-cache').then(cache => {
            console.log("Caching files...");
            return cache.addAll([
                'index.html',
                'static/css/pwa.css',
                'static/js/pwa-frame.js',
                'static/js/pwa.js',
                'manifest.json',
                'static/icons/icon-192x192.png',
                'static/icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log("Fetching:", event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('/pwa.html'));
        })
    );
});

self.addEventListener('activate', event => {
    console.log("Service Worker Activated");
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== 'ahaguru-analytics-cache')
                    .map(key => caches.delete(key))
            );
        })
    );
});

