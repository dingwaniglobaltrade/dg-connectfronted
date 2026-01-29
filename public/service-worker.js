const CACHE_NAME = "myapp-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js", "/icon.png"];

// Install service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch resources from cache first, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
