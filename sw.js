/* Service Worker — Chỗ của Bi (PWA)
   Cache-first cho asset tĩnh; data.js & API luôn ưu tiên mạng. */
const CACHE = "bihub-v1";
const CORE = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "config.js",
  "assets/anh_bi.jpg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Không cache API worker hay request khác origin (Drive, fonts...) — để mạng lo.
  if (url.origin !== location.origin) return;

  // data.js: network-first để nội dung luôn mới, fallback cache khi offline.
  if (url.pathname.endsWith("/data.js") || url.pathname.endsWith("data.js")) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Còn lại: cache-first.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }))
  );
});
