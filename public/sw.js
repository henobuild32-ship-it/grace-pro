// Grace Production Service Worker
// Minimal PWA service worker for offline support + installability on Android.
// Strategy: network-first for navigation, cache-first for static assets, with
// runtime caching of successful responses.

const CACHE_VERSION = 'gp-v1'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`

// Precache on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache
        .addAll([
          '/',
          '/manifest.webmanifest',
          '/icons/favicon-32.png',
          '/icons/apple-touch-icon.png',
          '/icons/icon-192.png',
        ])
        .catch(() => {
          // Ignore individual failures — these will be cached at runtime.
        })
    )
  )
  self.skipWaiting()
})

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event
  // Only handle GET requests
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  // Skip cross-origin requests (e.g., Google Maps, wa.me, fonts)
  if (url.origin !== self.location.origin) return
  // Skip Next.js HMR / dev requests
  if (url.pathname.startsWith('/_next/webpack-hmr')) return
  // Skip API requests (they need fresh data)
  if (url.pathname.startsWith('/api/')) return

  // Network-first for navigation (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/'))
        )
    )
    return
  }

  // Cache-first for static assets (images, CSS, JS, fonts)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then((response) => {
          // Only cache successful, same-origin responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          const copy = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => cached)
    })
  )
})
