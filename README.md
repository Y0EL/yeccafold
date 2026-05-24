<div align="center">
  <img src="banner.svg" alt="yeccafold" width="100%" />
</div>

<br />

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

<br />

> Satu platform. Semua kreator. Tanpa WhatsApp chaos.

---

## Tentang yeccafold

**yeccafold** adalah platform manajemen kreator KOL terpadu untuk tim agensi profesional Indonesia. Dari tahap reachout pertama hingga konfirmasi pembayaran terakhir, setiap kreator dikelola dalam satu sistem yang terstruktur dan transparan.

Kebanyakan tim KOL Indonesia masih mengandalkan WhatsApp, spreadsheet terpisah, dan berkas fisik untuk mengelola puluhan hingga ratusan kreator sekaligus. Hasilnya adalah dokumen yang hilang, status yang tidak sinkron, dan brief yang salah kirim.

yeccafold menggantikan seluruh rantai koordinasi tersebut dengan pipeline 6 tahap yang terintegrasi, dokumen otomatis dalam 30 detik, dan visibilitas penuh atas setiap kreator dalam kampanye.

---

## Fitur Utama

### Pipeline 6 Tahap
Setiap kreator melewati alur kerja yang sama dan terukur: **Reachout** untuk kontak pertama, **Dealing** untuk negosiasi rate, **Sampling** untuk pengiriman produk, **Drafting** untuk review konten, **Financing** untuk penagihan, dan **Finished** saat kampanye selesai.

### Dokumen Otomatis
Invoice dan MOU dibuat otomatis dari data kreator yang sudah ada di dalam platform. Tidak ada lagi menyalin data secara manual atau menunggu tim admin.

### Magic Link Tanda Tangan
Kreator menerima tautan unik untuk menandatangani MOU secara digital tanpa perlu aplikasi tambahan. Status tanda tangan terpantau secara langsung.

### Curator Board
Panel review konten terpusat untuk menilai draft unggahan kreator, memberikan komentar, dan mengirim persetujuan, semua tanpa berpindah ke WhatsApp atau email.

### Sinkronisasi Google Sheets
Data kreator, status pipeline, dan catatan kampanye tersinkron secara otomatis ke Google Sheets. Tim yang sudah terbiasa dengan spreadsheet tidak perlu mengubah kebiasaan kerja.

### Pencarian Cerdas dengan AI
Temukan kreator yang tepat berdasarkan niche, jumlah pengikut, riwayat kampanye, dan metrik relevan lainnya menggunakan mesin pencarian berbasis AI.

---

## Alur Kerja

```
Reachout  →  Dealing  →  Sampling  →  Drafting  →  Financing  →  Finished
   ○            ○            ○            ○            ◉            ○
Kontak     Negosiasi    Produk       Review        Invoice      Selesai
pertama      rate        dikirim      konten        dibuat
```

---

## Teknologi

| Kategori | Teknologi |
|---|---|
| Framework | React 18 dengan TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animasi | Framer Motion 11 |
| Font | Libre Caslon Display, Dancing Script, Inter |
| Deployment | Netlify (Forms, CDN, CI/CD) |
| Ikon | Lucide React |

---

## Menjalankan Secara Lokal

Pastikan Node.js versi 18 atau lebih baru sudah terpasang.

```bash
git clone <url-repositori>
cd yeccafold
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

Untuk membuat build produksi:

```bash
npm run build
```

Output tersimpan di folder `dist/`.

---

## Deployment ke Netlify

### Via Antarmuka Netlify

1. Jalankan `npm run build` untuk menghasilkan folder `dist/`.
2. Buat arsip ZIP dari seluruh isi folder `dist/` (bukan folder itu sendiri).
3. Masuk ke dasbor Netlify, pilih **Add new site**, lalu **Deploy manually**.
4. Unggah file ZIP tersebut.

### Via Git

Hubungkan repositori ini ke Netlify. Build command: `npm run build`. Publish directory: `dist`.

### Catatan Netlify Forms

Formulir demo request menggunakan Netlify Forms. File `index.html` sudah menyertakan elemen form tersembunyi yang dibutuhkan Netlify untuk mendeteksi formulir saat proses build. Pengiriman data dikirim via AJAX dari komponen React tanpa reload halaman.

---

## Keamanan dan Privasi

Dokumen kebijakan keamanan, perlindungan data, dan kepatuhan terhadap regulasi tersedia di [`SECURITY.md`](SECURITY.md).

Platform ini dirancang untuk memenuhi ketentuan **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi** dan prinsip kepatuhan **GDPR** bagi pengguna dari wilayah Uni Eropa.

---

## Hak Cipta

Hak cipta dilindungi. PT. Yeccafold Indonesia, 2026.

Platform ini adalah perangkat lunak proprietary. Tidak ada izin yang diberikan untuk menyalin, mendistribusikan, atau memodifikasi tanpa persetujuan tertulis dari PT. Yeccafold Indonesia.
