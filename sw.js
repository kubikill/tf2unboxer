self.addEventListener('install', evt => {
    self.skipWaiting();
    evt.waitUntil(
        caches.open('unboxertf').then(cache => {
            return cache.addAll(
                [
                    './'
                ]
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const fileExt = event.request.url.split('.').pop();
    event.respondWith(
        caches.open('unboxertf').then(cache => {
            if (["webp", "png", "mp3", "woff2", "ttf", "woff", "svg"].includes(fileExt)) {
                return caches.match(event.request).then(res => {
                    if (res != undefined) {
                        return res;
                    } else {
                        return fetch(event.request)
                            .then(response => {
                                if (response.ok) {
                                    cache.put(event.request, response.clone());
                                    return response;
                                } else {
                                    throw new Error(`${response.url} - Resource is not in cache and can't reach resource from network`);
                                }
                            });
                    }
                })
            } else {
                return fetch(event.request)
                    .then(response => {
                        if (response.type == "opaque" || response.ok) {
                            if (event.request.method != "POST" && response.type != "opaque") {
                                cache.put(event.request, response.clone());
                            }
                            return response;
                        } else {
                            throw new Error;
                        }
                    }).catch(() => {
                        return caches.match(event.request).then(response => {
                            if (response != undefined) {
                                return response;
                            } else {
                                throw new Error(`${event.request.url} - Can't reach resource from network, and resource is not in cache`);
                            }
                        });
                    })
            }
        })
    );

});