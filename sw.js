// ==========================================
// 英検3級 クロノ・オデッセイ Service Worker (sw.js)
// オフライン完全対応・CDN動的キャッシュ機構付き
// ==========================================
const CACHE_NAME = 'eiken3-chrono-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './data_part1.js',
  './data_part2.js',
  './data_exam.js',
  './data_extra.js',
  './app.js',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        urlsToCache.map((url) => {
          const req = url.startsWith('./') ? new Request(url, { cache: 'reload' }) : url;
          return cache.add(req).catch((err) => console.warn('Cache skip:', url, err));
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function fetchWithTimeout(request, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Network timeout')), timeoutMs);
    fetch(request).then(
      (res) => { clearTimeout(timer); resolve(res); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isSameOrigin = event.request.url.startsWith(self.location.origin);

  if (isSameOrigin) {
    // 3秒以内に応答がなければ即座にキャッシュを返し、パケ詰まりでの起動フリーズを防止
    event.respondWith(
      fetchWithTimeout(event.request, 3000)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('./index.html')))
    );
  } else {
    // 外部CDN（Tailwind CSS等）はキャッシュ優先で高速化＆オフライン維持
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetchWithTimeout(event.request, 5000).then((networkResponse) => {
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
            return networkResponse;
          }
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return networkResponse;
        });
      })
    );
  }
});
