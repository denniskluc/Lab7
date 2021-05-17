// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

var CACHE_NAME = 'journal-entriees-SPA';
var urlsToCache = ['https://cse110lab6.herokuapp.com/entries'];

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});

