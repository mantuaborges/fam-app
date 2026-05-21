// Fam PWA Service Worker — with Push Notification support
// v3 — fixes: chrome-extension cache crash, stale-cache disasters, missing icons

// Bump this string on every deploy to invalidate old caches
const CACHE_VERSION = "v3-2026-05-21";
const CACHE_NAME    = `fam-${CACHE_VERSION}`;

const URLS_TO_CACHE = [
  "/fam-app/",
  "/fam-app/index.html",
  "/fam-app/fam.html",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.50.0/dist/umd/supabase.js"
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
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = req.url;

  // Bug 1 fix: only handle http(s). Skip chrome-extension://, blob:, data:, etc.
  if (!url.startsWith("http://") && !url.startsWith("https://")) return;

  // Skip non-GET
  if (req.method !== "GET") return;

  // Skip API calls — these must always be live
  if (url.includes("supabase.co"))      return;
  if (url.includes("api.anthropic.com")) return;
  if (url.includes("spoonacular.com"))   return;
  if (url.includes("googleapis.com"))    return;

  // Bug 2 fix: network-first for HTML, cache-first for everything else
  const isHTML = req.mode === "navigate" ||
                 (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    // Network first: try fresh, fall back to cache if offline
    event.respondWith(
      fetch(req).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          // Best-effort cache update — never let cache errors break the response
          caches.open(CACHE_NAME)
            .then(cache => cache.put(req, clone))
            .catch(() => {});
        }
        return response;
      }).catch(() => caches.match(req).then(c => c || caches.match("/fam-app/fam.html")))
    );
  } else {
    // Cache first for static assets (JS, CSS, images, fonts)
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(req, clone))
              .catch(() => {});
          }
          return response;
        }).catch(() => undefined);
      })
    );
  }
});

// ── Push notifications ────────────────────────────────────────
self.addEventListener("push", event => {
  let data = { title: "Fam", body: "You have a new reminder" };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      try { data.body = event.data.text(); } catch {}
    }
  }

  // Bug 4 fix: don't reference manifest.json as an icon. Omit it; OS will use
  // the PWA's default icon. We can add proper icon files later if desired.
  const options = {
    body:               data.body,
    tag:                data.tag  || "fam-notification",
    data:               data.data || { url: "/fam-app/" },
    requireInteraction: false,
    vibrate:            [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ── Notification click — open the app ────────────────────────
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/fam-app/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes("/fam-app/") && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open a new tab
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
