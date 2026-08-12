/* ================================================================
   SERVICE WORKER — SIMDES Desa Baleharjo
   ================================================================
   Kegunaannya CUMA SATU: memenuhi syarat "installability" Chrome di
   Android supaya "Simpan ke Layar Utama" menghasilkan ikon aplikasi
   BERSIH (tanpa badge kecil logo Chrome di pojok) — bukan cuma
   shortcut/bookmark biasa. Tanpa file ini terdaftar, Android Chrome
   sering menganggap halaman belum "benar-benar installable" walau
   manifest & ikonnya sudah lengkap, dan tetap memasang badge Chrome.

   File ini SENGAJA dibuat sesederhana mungkin (cuma meneruskan setiap
   request apa adanya ke jaringan) — TIDAK melakukan caching offline,
   TIDAK menyimpan data apapun. Iframe di dalam wrapper tetap selalu
   mengambil data terbaru langsung dari Google Apps Script seperti
   biasa, service worker ini tidak ikut campur sama sekali di situ.
================================================================ */

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
});
