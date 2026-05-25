const cacheName = "LawlantisDevTeam-Lawlantis-0.1.0";
const contentToCache = [
    "Build/87840f7e24e4019b6d36bc87bbf34837.loader.js",
    "Build/5abc13a973568f463c6d3a3a5100e0bf.framework.js.unityweb",
    "Build/e896f408b3a678d2c7399d0eb1b372d4.data.unityweb",
    "Build/25ceb5778602baba136dac52625d62c9.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
