// Fam PWA Service Worker — with Push Notification support
const CACHE_NAME = "fam-v2";
const URLS_TO_CACHE = [
  "/fam-app/",
  "/fam-app/index.html",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"
];

// ── Install ───────────────────────────────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE).catch(() => {}))
  );
  self.skipWaiting();
});

// ── Activate ──────────────────────────────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("supabase.co")) return;
  if (event.request.url.includes("api.anthropic.com")) return;
  if (event.request.url.includes("spoonacular.com")) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match("/fam-app/index.html"));
    })
  );
});

// ── Push notifications ────────────────────────────────────────
self.addEventListener("push", event => {
  let data = { title: "Fam", body: "You have a new reminder" };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body:             data.body,
    icon:             "/fam-app/manifest.json",
    badge:            "/fam-app/manifest.json",
    tag:              data.tag  || "fam-notification",
    data:             data.data || { url: "/fam-app/" },
    requireInteraction: false,
    vibrate:          [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ── Notification click — open the app ────────────────────────
self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = event.notification.data?.url || "/fam-app/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      // If app is already open, focus it and navigate
      for (const client of clientList) {
        if (client.url.includes("fam-app") && "focus" in client) {
          client.focus();
          client.postMessage({ type: "NAVIGATE", url });
          return;
        }
      }
      // Otherwise open a new tab
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
