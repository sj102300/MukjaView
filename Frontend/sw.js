// sw.js

//나중에 오프라인 캐싱이랑, 작업해야함 지금은 연결만 해놓은 상태

// install event
self.addEventListener("install", (e) => {
    console.log("[Service Worker] installed");
});

// activate event
self.addEventListener("activate", (e) => {
    console.log("[Service Worker] actived", e);
});

// fetch event
self.addEventListener("fetch", (e) => {
    console.log("[Service Worker] fetched resource " + e.request.url);
});