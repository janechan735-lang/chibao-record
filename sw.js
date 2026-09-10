const CACHE='chibao-v2'
const ROOT=new URL('./',self.registration.scope).toString()
const CORE=[ROOT,new URL('./manifest.webmanifest',ROOT).toString(),new URL('./wing.svg',ROOT).toString()]

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))))
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))))
self.addEventListener('fetch',e=>{
  if(e.request.method==='GET') e.respondWith(
    fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r})
      .catch(()=>caches.match(e.request).then(r=>r||caches.match(ROOT)))
  )
})
