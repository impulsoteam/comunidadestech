const CACHE_NAME = 'comunidadestech-v1'
const urlsToCache = ['/']

self.addEventListener('install', event => {
  console.log('[SW] install ' + event)
  const preLoaded = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  event.waitUntil(preLoaded)
})

self.addEventListener('fetch', event => {
  console.log('[SW] fetch ' + event)
  const response = caches.match(event.request)
    .then(match => match || fetch(event.request))
  event.respondWith(response)
})

self.addEventListener('notificationclick', function (event) {
  console.log('[SW] notificationclick: ', event)
})
