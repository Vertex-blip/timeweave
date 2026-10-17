// Increment this version when releasing changed app-shell assets.
const CACHE='timeweave-shell-v1';
const PREFIX='timeweave-shell-';
const FILES=['./','./index.html','./styles.css','./app.js','./product.js','./ui.js','./core.js','./manifest.webmanifest','./assets/logo.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;event.respondWith(caches.open(CACHE).then(async cache=>{const cached=await cache.match(event.request);if(cached)return cached;try{return await fetch(event.request);}catch{if(event.request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();return Response.error();}}));});
