const V='nihongo-v7',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin!==location.origin){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x})));return}
e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))});
