
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('weather-cache').then((cache) => {
//         return cache.addAll([
//           '/',
//           '/index.html',
//           '/static/js/bundle.js',
//           '/static/css/main.css',
         
//         ]);
//       })
//     );
//   });
  
//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   });
  