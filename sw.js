self.addEventListener('install', function (evt) {
  self.skipWaiting();
  evt.waitUntil(
    caches.open('cache').then(function (cache) {
      return cache.addAll(
        [
          '/'
        ]
      );
    })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (evt) {
  const requestURL = new URL(evt.request.url);
  // Use cache and fallback to network, add to cache if not already for PNGs, SVGs, MP3s, WOFFs and WOFF2s
  if (/\.png$/.test(requestURL.pathname) || /\.svg$/.test(requestURL.pathname) || /\.mp3$/.test(requestURL.pathname) || /\.woff$/.test(requestURL.pathname) || /\.woff2$/.test(requestURL.pathname)) {
    evt.respondWith(cacheStatic(evt.request));
  } else { // Use network and fallback to cache, then update cache for everything else
    evt.respondWith(cacheDynamic(evt.request));
    evt.waitUntil(update(evt.request));
  }
});

async function cacheDynamic(request) {
  const cache = await caches.open('cache');
    try {
      return await fetch(request);
    } catch (err) {
      return cache.match(request);
    };
};
async function cacheStatic(request) {
  const cache = await caches.open('cache');
  return cache.match(request).then(function (matching) {
    if (matching) {
      return matching;
    } else {
      update(request);
      return fetch(request);
    }
  });
};
async function update(request) {
  const cache = await caches.open('cache');
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.log("Cache update failed")
  }
};