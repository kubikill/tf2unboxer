"use strict";

self.addEventListener('install', function (evt) {
  self.skipWaiting();
  evt.waitUntil(caches.open('unboxertf').then(function (cache) {
    return cache.addAll(['./']);
  }));
});
self.addEventListener('fetch', function (event) {
  var fileExt = event.request.url.split('.').pop();
  event.respondWith(caches.open('unboxertf').then(function (cache) {
    if (["webp", "png", "mp3", "woff2", "ttf", "woff", "svg"].includes(fileExt)) {
      return caches.match(event.request).then(function (res) {
        if (res != undefined) {
          return res;
        } else {
          return fetch(event.request).then(function (response) {
            if (response.status != 206 && response.ok) {
              cache.put(event.request, response.clone());
            }

            return response;
          });
        }
      });
    } else {
      return fetch(event.request).then(function (response) {
        if (response.type == "opaque" || response.ok) {
          if (event.request.method != "POST" && response.type != "opaque") {
            cache.put(event.request, response.clone());
          }

          return response;
        } else {
          throw new Error();
        }
      })["catch"](function () {
        return caches.match(event.request).then(function (response) {
          if (response != undefined) {
            return response;
          } else {
            throw new Error("".concat(event.request.url, " - Can't reach resource from network, and resource is not in cache"));
          }
        });
      });
    }
  }));
});