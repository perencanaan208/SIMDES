[README (2).md](https://github.com/user-attachments/files/29067646/README.2.md)
# SIMDES — Desa Baleharjo (Domain Custom via Vercel)

Folder ini membuat **domain sendiri** (misal `simdes-baleharjo.vercel.app` atau domain pribadi seperti `simdes.desabaleharjo.id`) yang menampilkan aplikasi SIMDES dari Google Apps Script, tanpa mengubah link panjang `script.google.com/...` yang aslinya.

## Cara kerja

1. Vercel menghosting satu halaman `index.html` ringan.
2. Halaman itu memuat SIMDES (URL Google Apps Script Anda) di dalam `<iframe>` yang memenuhi seluruh layar.
3. Yang muncul di address bar browser adalah domain Vercel Anda — bukan URL Google.
4. Judul tab, ikon (favicon), dan preview saat link dibagikan (WhatsApp/Telegram/dll) memakai identitas "SIMDES — Desa Baleharjo", bukan URL mentah.

## Langkah 1 — Cek URL SIMDES (sudah otomatis diisi)

File `index.html` di folder ini **sudah otomatis diisi** dengan URL SIMDES Anda saat ini:

```
https://script.google.com/macros/s/AKfycbyMzYLlPNDLDTbJpCiJKQSDCAhFJQX9-pEadsFjlh-JD9v-FUbJ500aST1TO4vfVsWN/exec
```

Jika suatu saat Anda redeploy Apps Script dan mendapat URL `/exec` yang **berbeda**, buka `index.html`, cari teks URL di atas (ada di 2 tempat: atribut `href` tombol fallback, dan atribut `src` pada `<iframe>`), lalu ganti dengan URL deploy yang baru.

Anda juga perlu menyiapkan 3 gambar (boleh logo desa atau logo Kabupaten Sragen), letakkan di folder yang sama dengan `index.html`:
- `favicon.png` — 32x32 px, untuk ikon tab browser
- `icon-192.png` — 192x192 px, untuk ikon saat disimpan ke homescreen HP
- `og-image.png` — 1200x630 px, untuk gambar preview saat link dibagikan

Jika belum punya gambar-gambar ini, aplikasi tetap berjalan normal — hanya saja ikon akan kosong/default sampai gambar disediakan.

## Langkah 2 — Upload ke GitHub

1. Buat repository baru di GitHub (boleh public atau private), misal nama `simdes-baleharjo`.
2. Upload 3 file dari folder ini (`index.html`, `vercel.json`, `README.md`) plus 3 gambar yang sudah disiapkan, ke repository tersebut.
   - Lewat web: buka repo → tombol **Add file → Upload files** → drag semua file → **Commit changes**.
   - Lewat terminal:
     ```bash
     git init
     git add .
     git commit -m "Setup SIMDES proxy domain"
     git branch -M main
     git remote add origin https://github.com/USERNAME/simdes-baleharjo.git
     git push -u origin main
     ```

## Langkah 3 — Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → login dengan akun GitHub.
2. Klik **Add New → Project**.
3. Pilih repository `simdes-baleharjo` yang baru dibuat.
4. Pada bagian **Framework Preset**, pilih **Other** (karena ini bukan project React/Next.js, hanya HTML statis).
5. Klik **Deploy**. Tunggu kurang lebih 30–60 detik.
6. Setelah selesai, Vercel akan memberi URL seperti `https://simdes-baleharjo.vercel.app` — inilah domain baru Anda.

## Langkah 4 — (Opsional) Pasang domain sendiri

Jika desa punya domain resmi (misal `desabaleharjo.id`), Anda bisa memasang subdomain seperti `simdes.desabaleharjo.id`:

1. Di dashboard Vercel, buka project → tab **Settings → Domains**.
2. Masukkan domain yang diinginkan, misal `simdes.desabaleharjo.id`.
3. Vercel akan memberi instruksi DNS (biasanya tambah **CNAME record** mengarah ke `cname.vercel-dns.com`).
4. Masukkan instruksi tersebut di panel pengaturan DNS domain Anda (GoDaddy, Niagahoster, dll).
5. Tunggu propagasi DNS (biasanya 5 menit – 24 jam), lalu domain aktif otomatis dengan HTTPS gratis dari Vercel.

## Setelah live — yang akan terjadi

- Saat seseorang membuka `https://simdes-baleharjo.vercel.app`, address bar menampilkan domain itu (bukan URL Google), tapi isinya tetap SIMDES yang sama persis.
- Saat link dibagikan di WhatsApp/Telegram, preview yang muncul adalah judul **"SIMDES — Desa Baleharjo"** dengan gambar `og-image.png`, bukan teks URL mentah.
- Tab browser menampilkan judul **"SIMDES — Desa Baleharjo"** beserta ikon dari `favicon.png`.

## Update SIMDES di kemudian hari

Anda **tidak perlu** redeploy Vercel setiap kali mengubah kode SIMDES (`index.html`/`Kode.gs` di Apps Script). Vercel hanya menampilkan "jendela" ke aplikasi Google Apps Script Anda — begitu Anda redeploy versi baru di Apps Script, perubahan otomatis muncul di domain Vercel juga, tanpa langkah tambahan.

Redeploy Vercel hanya diperlukan jika:
- URL deploy GAS Anda berubah (redeploy baru dengan URL `/exec` yang berbeda)
- Anda ingin mengganti ikon/judul/gambar preview

## Catatan teknis

- Google Apps Script web app sudah mengizinkan dibuka dalam iframe (`XFrameOptionsMode.ALLOWALL` di `doGet()`), sehingga pendekatan iframe ini bisa berjalan tanpa perlu mengubah kode backend SIMDES.
- Jika suatu saat iframe gagal memuat (misalnya Google mengubah kebijakan, atau koneksi lambat), halaman otomatis menampilkan tombol fallback untuk membuka SIMDES langsung di tab baru setelah 12 detik.

## Troubleshooting: nama file di GitHub hilang ekstensinya (index, json, readme — tanpa titik)

Jika di repository GitHub Anda file-nya muncul sebagai `index`, `json`, `readme` (tanpa ekstensi `.html`, `.json`, `.md`), ini adalah sumber masalah utama domain men-download file. Tanpa ekstensi yang benar, Vercel tidak tahu cara menyajikan file tersebut sebagai halaman web.

**Cara memperbaiki langsung di GitHub (tanpa upload ulang):**

1. Buka repository → klik nama file **`index`**.
2. Klik ikon pensil (Edit this file) di pojok kanan atas.
3. Di bagian atas editor, klik nama file **`index`** (di sebelah ikon repo), ubah menjadi **`index.html`**.
4. Scroll ke bawah → klik **Commit changes**.
5. Ulangi langkah yang sama untuk:
   - file **`json`** → ubah nama jadi **`vercel.json`**
   - file **`readme`** → ubah nama jadi **`README.md`**
6. Setelah ketiga nama file diperbaiki, Vercel akan otomatis redeploy dalam beberapa puluh detik.
7. Buka kembali domain Anda — seharusnya sudah tampil normal sebagai halaman web.

**Catatan penting:** pastikan juga **isi** ketiga file tersebut benar (bukan hanya nama-nya). Klik masing-masing file untuk memeriksa isinya cocok dengan yang seharusnya — terutama `vercel.json` harus berisi persis:
```json
{ "cleanUrls": true }
```
Jika isinya berbeda atau kosong, hapus seluruh isi dan ganti dengan kode di atas sebelum commit.

Ini terjadi jika `vercel.json` punya konfigurasi header yang tidak standar (versi awal file ini memang sempat begitu — sudah diperbaiki). Jika Anda mengalami ini setelah deploy:

1. Pastikan isi `vercel.json` di repository GitHub Anda **hanya** berisi:
   ```json
   { "cleanUrls": true }
   ```
   Jika masih ada bagian `"headers"` di dalamnya, hapus dan ganti dengan isi di atas.
2. Commit & push perubahan ke GitHub.
3. Vercel otomatis redeploy dalam beberapa puluh detik (karena sudah terhubung ke branch `main`).
4. Buka kembali domain Anda — seharusnya sudah normal terbuka sebagai halaman web, bukan file unduhan.

Jika Anda ingin memaksa redeploy manual tanpa menunggu, buka dashboard Vercel → tab **Deployments** → klik deployment terbaru → tombol **Redeploy**.
