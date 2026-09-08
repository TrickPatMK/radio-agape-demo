# 📻 Radio Agape — Official Website & Streaming Platform

Platform resmi penyiaran digital **Radio Agape**: menghadirkan siaran streaming audio langsung 24/7, arsip podcast & audio-on-demand, jadwal siaran terpadu, serta sarana interaksi jemaat/pendengar (permohonan doa dan dukungan persembahan kasih).

---

## 🌟 Fitur Utama

- 🎵 **Persistent Audio Player**: Pemutar audio mengambang (*floating bottom bar*) yang tetap berputar tanpa henti saat pengguna berpindah antar halaman di situs web.
- 📡 **24/7 Live Streaming Relay**: Terkoneksi dengan server siaran Icecast/AzuraCast berlatensi rendah dengan *auto-reconnect* dan dukungan ICY Metadata (*Now Playing*).
- 🎙️ **Podcast & Audio-on-Demand (AOD)**: Katalog khotbah, renungan, dan talkshow berseri dilengkapi kontrol kecepatan audio, *scrubbing*, dan sindikasi otomatis ke **RSS Feed** (Apple Podcasts & Spotify).
- 📱 **Mobile Lock Screen Controls (MediaSession API)**: Kontrol play/pause langsung dari layar kunci smartphone atau panel notifikasi OS.
- 📲 **Progressive Web App (PWA)**: Dapat dipasang langsung ke layar utama ponsel pintar (*Add to Home Screen*) tanpa perlu mengunduh dari App Store.
- 🙏 **Permohonan Doa & Interaksi Komunitas**: Formulir kirim pokok doa terenkripsi dengan opsi dibacakan di siaran atau didoakan khusus oleh tim pastoral, serta tombol request lagu via WhatsApp.
- 💳 **Dukungan Operasional (Giving / Tithe)**: Penyediaan info rekening dan barcode QRIS resmi dengan tombol *One-Click Copy*.
- ⚙️ **Admin CMS**: Pengelolaan jadwal acara, pengunggahan audio episode podcast, dan moderasi pesan doa pendengar.

---

## 🏗️ Rekomendasi Arsitektur Teknologi

```
+-------------------------------------------------------------------------+
|                              PENDENGAR                                  |
|         Desktop Browser / Mobile Smartphone / PWA Installed App         |
+-------------------------------------------------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
          v                                                   v
+-------------------------------+             +-------------------------------+
|     NEXT.JS 15+ APP ROUTER    |             |    LIVE AUDIO STREAM PROXY    |
| - Persistent Audio Provider   |             | - Icecast2 / AzuraCast Relay  |
| - Tailwind CSS & Shadcn UI    |             | - Cloudflare CDN Caching      |
| - MediaSession API Controller |             | - SSL / HTTPS Reverse Proxy   |
+-------------------------------+             +-------------------------------+
          |                                                   |
          +-------------------------+-------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                           DATA & STORAGE                                |
|  - PostgreSQL (Prisma ORM): Jadwal, metadata podcast, permohonan doa    |
|  - Cloudflare R2: File audio podcast (.mp3/.m4a) dengan $0 egress fee   |
+-------------------------------------------------------------------------+
```

Detail arsitektur lengkap dapat dibaca pada [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 📚 Dokumentasi Proyek

Dokumentasi lengkap telah disinkronisasikan ke dalam Obsidian Knowledge Base (`main-vault`):
- 📄 **[Product Requirements Document (PRD) — Website Publik](docs/PRD.md)** — Spesifikasi lengkap seluruh modul publik: Streaming 24/7, player persisten, dan podcast.
- 🎛️ **[PRD & Konsep CMS Dashboard (Studio Cockpit)](docs/PRD-CMS-DASHBOARD.md)** — Spesifikasi sistem operasional harian: Rundown hari ini, cockpit penyiar, moderasi doa, dan jadwal.
- 🏗️ **[System Architecture Blueprint](docs/ARCHITECTURE.md)** — Topologi sistem, diagram alur audio, skema basis data, dan pembagian tugas agen AI.
- 🧭 **Obsidian Vault MOC**: `[[Radio-Agape/_MOC - Radio Agape]]`

---

## 👥 Kolaborasi Tim Agen

* **🌸 Ayca (Antigravity - PC Lokal)**: Pengembangan Frontend/Client, Persistent Audio Player UI, Tailwind CSS, MediaSession API, dan integrasi PWA.
* **💻 Ayi (Antigravity - VPS)**: Perancangan database (PostgreSQL/Prisma), API Route Handlers, RSS XML feed podcast generator, dan integrasi backend.
* **👑 Bro Gen (Hermes - VPS)**: Manajemen server VPS, konfigurasi Icecast2 / AzuraCast, SSL Nginx reverse proxy, dan pemantauan siaran 24/7.

---

## 🚀 Memulai Pengembangan Lokal (Frontend)

```bash
# Clone repositori
git clone git@github.com:TrickPatMK/radio-agape-giap.git
cd radio-agape-giap

# Instalasi dependensi (setelah inisialisasi framework)
npm install

# Jalankan server pengembangan
npm run dev
```

---

## 📄 Lisensi

Hak Cipta © 2026 Radio Agape. Seluruh hak cipta dilindungi.
