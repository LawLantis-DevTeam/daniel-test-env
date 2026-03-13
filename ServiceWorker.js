const cacheName = "LawlantisDevTeam-Lawlantis-0.1.0";
const contentToCache = [
    "Build/e1bc53376f97cbd08e526f24804fde03.loader.js",
    "Build/5abc13a973568f463c6d3a3a5100e0bf.framework.js.unityweb",
    "Build/d066b5bcd091ffab19a941a950a503ea.data.unityweb",
    "Build/55288779a455e09021f30de4a5e51070.wasm.unityweb",
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
