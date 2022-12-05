let cacheName = "trabalho final";
let filesToCache = ["/", "/index.html",
                "/css/style.css", "/js/main.js"];

/* inicializando a service worker e fazendo o 
download do conteúdo da aplicação */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* disponibilizando o conteudo quando estiver offline */
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if(url.origin === location.origin) {
      e.respondWith(cacheFirst(req));
    }else {
      e.respondWith(networkFirst(req));
    }
});