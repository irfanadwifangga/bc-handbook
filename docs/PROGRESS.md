# Progress Tracker

> Update file ini setiap selesai satu fase. Format: checklist + commit message + tanggal.

---

## Fase Pembangunan Situs

- [x] **5.0** — Inisialisasi Astro Starlight, struktur folder, docs/PROGRESS.md, build lokal
- [x] **5.1** — Design tokens, landing page, search, dark mode, komponen inti, docs/DESIGN.md
- [x] **5.2** — Level 0 Orientasi
- [x] **5.3** — Cheatsheet #1–#7 (navigasi, alur dokumen, ledger, posting group, error, setup, pre-posting)
- [x] **5.4** — Level 1 Basic (modul 1.1–1.8) + latihan B1–B8
- [x] **5.5** — Level 2 Intermediate + cheatsheet #14 (RapidStart) + latihan M1–M10
- [ ] **5.6** — Level 3 Track 3A (Business Analysis) + cheatsheet #15–#16 + latihan E1–E3
- [ ] **5.7** — Track 3B (API) + cheatsheet API & AL + latihan E4–E6 + capstone
- [ ] **5.8** — Glosarium, referensi, release checklist, progress tracker component
- [ ] **5.9** — Audit: link rusak, `last_verified`, data rahasia, uji mobile

## Log

### Hasil Fase 5.5 — 2026-11-18

- Modul Intermediate 2.1–2.16, latihan M1–M10 dan cheatsheet #14 Configuration Worksheet / RapidStart tersedia. Seluruh halaman memuat metadata serta sumber Microsoft; modul memakai tujuh bagian dan CheatBox enam baris, latihan memakai kriteria daftar biasa dan hint tertutup. Modul 2.17 dan Intercompany tetap opsional/ditunda.
- Verifikasi dokumen membedakan User Groups legacy dari Security Groups, permission efektif dari profile/license, serta VAT simulasi dari aturan pajak Indonesia. Availability agents diperiksa menurut region/bahasa/tenant; tidak ada aktivasi AI atau billing. Import, Validate dan Apply RapidStart dibedakan; package kecil tidak dianggap konfigurasi penuh company.
- Sebelum penerapan diff indeks: build 64 halaman/Pagefind berhasil; bun test lulus; audit struktur 16 modul dan 10 latihan lulus. Audit seluruh HTML menemukan 5589 tautan internal/anchor valid dan hanya temuan aset /favicon.svg pada 64 halaman. Favicon tetap ditunda sesuai arahan pengguna, sehingga audit aset keseluruhan tidak dinyatakan bersih.
- Audit browser 108 kombinasi halaman baru pada desktop 1280px/mobile 360px dan light/dark lulus: status 200, satu H1, axe, overflow body, error JavaScript, CheatBox, serta hint lewat keyboard. Satu pemeriksaan cetak lulus: PDF cheatsheet satu halaman A4; tiga pemeriksaan cetak di proyek lain sengaja dilewati. Artefak lokal di .codex-tmp/phase-5.5/.
- Preview tes dihentikan otomatis. Tidak ada perubahan komponen/CSS/dependensi, operasi tenant, praktik sandbox, transfer bank, email nyata, push atau deploy. Warning i18n kosong, fallback 404 dan sitemap tanpa site tetap ada; build berhasil. Firefox/WebKit, screen reader dan gate praktik BC belum diuji.
- Commit message: docs: add level 2 intermediate, rapidstart cheatsheet and exercises. Fase 5.6 belum dimulai.


### Hasil Fase 5.4 — 2026-11-18

- Delapan modul 1.1–1.8 dan latihan B1–B8 tersedia dalam bahasa Indonesia dengan metadata dan sumber Microsoft. Modul memuat tujuh bagian wajib serta CheatBox enam baris; latihan memuat tujuan, prasyarat, langkah, empat kriteria lulus, estimasi dan hint tertutup. Modul Sales menautkan pilot interaktif yang sudah ada.
- Verifikasi sebelum penerapan diff indeks: build berhasil menghasilkan 37 halaman dan indeks Pagefind; 3 tes Bun lulus; struktur/metadata 16 halaman lulus. Audit menemukan 2.100 tautan internal/anchor valid serta /favicon.svg hilang yang direferensikan 37 halaman. Favicon tidak diperbaiki sesuai arahan pengguna; audit tautan keseluruhan tidak dinyatakan bersih.
- Pengujian pertama menemukan axe label pada checkbox Markdown. Setelah persetujuan, 32 kriteria lulus B1–B8 diubah menjadi daftar biasa. Build, tes Bun dan audit struktur diulang. Percobaan suite gabungan berikutnya dihentikan karena selector hint tes sementara ikut memilih sidebar; selector dibatasi ke konten setelah persetujuan. Hasil suite gabungan itu tidak dinyatakan seluruhnya lulus.
- Pengujian terfokus terakhir: 64 audit halaman baru lulus pada desktop 1280px/mobile 360px, light/dark; mencakup axe, overflow body, error JavaScript, CheatBox serta hint lewat keyboard. Pemeriksaan regression route/404, navigasi, search dan pilot telah dijalankan pada percobaan gabungan sebelumnya; tidak diulang setelah perubahan selector tes sementara yang tidak memengaruhi source situs.
- Screenshot modul master data dan latihan B4 disimpan lokal di .codex-tmp/phase-5.4/. Preview otomatis dihentikan. Tidak ada komponen/CSS/dependensi baru atau eksekusi transaksi sandbox. Tracker tersimpan tetap Fase 5.8.
- Warning lama i18n kosong, fallback 404 dan sitemap tanpa site masih ada; build berhasil. Firefox/WebKit, screen reader, playback video eksternal dan praktik BC belum diuji. Tidak ada push atau deploy.
- Commit message: docs: add level 1 basic and exercises. Fase 5.5 belum dimulai.


### Pilot alur Sales interaktif — 2026-11-18

- Halaman `/01-basic/alur-sales/` tersedia lewat sidebar Basic: analogi toko CRONUS, enam tahap Quote → Order → Shipment → Invoice → Payment → Apply, dokumen dan dampak utama per tahap. Ini pilot tambahan yang diminta pengguna; Fase 5.4 belum ditandai selesai.
- FlowPlayer mendukung Putar/Jeda (delapan detik per tahap), navigasi manual, Ulangi, berhenti di akhir, serta jeda saat tab tersembunyi. Penanda bernomor dan status teks melengkapi warna. Reduced motion menyembunyikan gerak progress; semua penjelasan tersedia tanpa JavaScript dan saat cetak.
- ReferenceVideo memuat video setup customer resmi Microsoft Learn hanya setelah klik, tanpa autoplay; tautan sumber selalu tersedia. Video adalah materi prasyarat, bukan demo seluruh alur atau bukti tampilan BC 29.x. Pengujian wrapper memakai respons tiruan; playback layanan eksternal belum diverifikasi. Alat browsing sebelumnya tidak dapat membuka redirect player Microsoft.
- DESIGN.md mencatat pengecualian animasi pembelajaran dan embed, kontrol, token serta fallback. Implementasi Astro/custom element dan stylesheet terpisah; tidak ada dependensi baru.
- Verifikasi nyata: build dua kali berhasil (21 halaman dan indeks Pagefind); `bun test` 3 lulus; suite Playwright lengkap 148 lulus. Setelah perapian panah dan jarak tombol, build dan 20 tes pilot diulang, seluruhnya lulus pada desktop/mobile 360px dan light/dark. Axe tidak menemukan pelanggaran pada halaman pilot; keyboard Enter, pause/resume, reset, akhir, reduced motion, tab tersembunyi, tanpa JS dan lazy video wrapper diuji. Screenshot desktop/mobile terbaru diinspeksi; tidak ada overflow body. `git diff --check` lulus.
- Preview otomatis dihentikan; pemeriksaan port 4323 tidak menemukan listener. Tidak ada akses tenant/transaksi sandbox, push atau deploy. Firefox/WebKit, screen reader dan playback video sungguhan belum diuji. Warning lama i18n kosong, fallback 404 dan sitemap tanpa site masih ada; build berhasil.
- Commit message: `feat: add interactive sales flow and reference video`.

| Tanggal | Fase | Commit message | Catatan |
|---|---|---|---|
| 2026-11-18 | 5.0 | `chore: init starlight site and content structure` | Astro Starlight diinisialisasi dengan bun; struktur Bagian 2 tersedia; `bun run build` berhasil (4 halaman dan indeks Pagefind). |
| 2026-11-18 | 5.1 | `fix: finish phase 5.1 checks and cheatsheet link` | Design tokens, landing, sidebar, dan komponen inti selesai; build, tes komponen/metadata, dan audit tautan lulus; Lighthouse mobile landing Performance 100, Accessibility 100. |
| 2026-11-18 | 5.2 | `docs: add level 0 orientation` | Materi Orientasi dan latihan O0/gate Level 0; build berhasil, 333 tautan internal/anchor valid, template dan komponen hasil render diperiksa. |
| 2026-11-18 | 5.3 | `docs: add core cheatsheets (nav, flow, ledger, posting, errors)` | Tujuh cheatsheet, CSS cetak A4, 613 tautan valid, mobile/copy dan hasil cetak diperiksa. |

### Hasil Fase 5.0

- Dependensi: Astro `7.4.12`, Starlight `0.43.1`, Sharp `0.35.5`; versi terkunci di `bun.lock`.
- Semua direktori Bagian 2 tersedia, termasuk track opsional sebagai folder kosong dengan `.gitkeep`.
- `index.mdx`, `glosarium.md`, dan `referensi.md` berisi kerangka Markdown dengan metadata wajib. Metadata versi mengikuti target kurikulum; materi BC belum diverifikasi di sandbox.
- Schema konten mewajibkan `bc_version_verified` dan `last_verified`.
- Tampilan bawaan Starlight digunakan; tidak ada komponen custom. `docs/DESIGN.md` yang sudah ada dipertahankan.
- Verifikasi nyata: `bun run build` exit code 0; menghasilkan 4 halaman statis dan indeks pencarian Pagefind.
- Warning build: koleksi `i18n` kosong, entry `docs → 404` tidak ditemukan (fallback 404 tetap dihasilkan), dan sitemap dilewati karena opsi `site` belum ditentukan.
- Interaksi search, dark mode, dan tampilan mobile belum diuji di browser. Tidak ada server yang dijalankan atau deploy; cakupan permintaan Fase 5.0 ini lokal.
- Setup awal dan implementasi UI tercakup dalam checkpoint `08246e0` (`chore: checkpoint handbook setup and phase 5.1 work`).

### Hasil Fase 5.1

- Design tokens, landing, sidebar, VersionBadge, LevelBadge, CheatBox, dan halaman indeks sudah dibuat; format sidebar disesuaikan dengan Starlight 0.43.1.
- Tes nyata: bun test lulus 3 tes; bun run build berhasil dengan 13 halaman dan indeks Pagefind.
- Browser: search sandbox menghasilkan 2 hasil; tema terang/gelap berganti; landing pada viewport 360px tidak overflow horizontal (scrollWidth 345px).
- Anchor navigasi diperbaiki menjadi `/cheatsheets/#navigasi--shortcut`; audit 274 tautan internal/anchor di 13 halaman lulus.
- Tes fixture sementara melalui build nyata: CheatBox, LevelBadge Expert, dan VersionBadge usang berhasil dirender; halaman tanpa `bc_version_verified` dan `last_verified` ditolak build sesuai harapan. Fixture dihapus dan build final kembali berhasil.
- Audit source: tidak ada hex/px/font-family langsung dalam komponen; LevelBadge Basic ditemukan dalam HTML hasil build.
- Lighthouse mobile pada landing lokal: Performance 100 dan Accessibility 100. Laporan lokal: `.codex-tmp/lighthouse-phase-5.1.report.html` dan `.json` (tidak masuk Git).
- Warning build i18n kosong, fallback 404, dan sitemap tanpa `site` masih ada; build berhasil.
- Preview lokal sudah dihentikan. Audit keyboard manual lengkap dan print preview belum dilakukan. Belum ada cheatsheet berisi materi; print diuji setelah kontennya tersedia. Skor Lighthouse terbatas pada landing dan satu pengukuran lokal, bukan jaminan semua halaman.
- Fase 5.2 dilanjutkan atas persetujuan pengguna. Tidak ada deploy atau push.

### Hasil Fase 5.2

- Materi Orientasi mencakup pengenalan BC, online/on-premises, tenant/environment/company, sandbox, navigasi, siklus rilis, dan lokalisasi Indonesia; penjelasan ditulis ulang dengan rujukan resmi Microsoft.
- Halaman menjadi `src/content/docs/00-orientasi/index.mdx` agar memakai CheatBox; URL `/00-orientasi/` tetap sama. Status ketersediaan Orientasi di landing diperbarui.
- Template materi tujuh bagian, metadata wajib, satu H1, satu CheatBox tujuh baris, latihan O0, hint, dan gate Level 0 tersedia.
- Verifikasi nyata: `bun run build` berhasil menghasilkan 13 halaman dan indeks Pagefind; audit 333 tautan internal/anchor lulus; pemeriksaan urutan template, metadata, H1, CheatBox, serta latihan/hint pada hasil render lulus; `git diff --check` lulus.
- Verifikasi dokumentasi dibedakan dari praktik sandbox. Belum ada interaksi dengan tenant atau data nyata; gate harus dijalankan sendiri oleh pembelajar. Pemeriksaan browser/Lighthouse untuk halaman Orientasi belum dilakukan ulang.
- Warning i18n kosong, fallback 404, dan sitemap tanpa `site` masih ada; build berhasil. Tidak ada dependensi baru, server yang dijalankan, deploy, atau push pada fase ini.
- Fase 5.3 dilanjutkan atas persetujuan pengguna.

### Hasil Fase 5.3

- Tujuh cheatsheet utama tersedia: navigasi/shortcut, alur dokumen, ledger entries map, posting groups, troubleshooting error, setup checklist, dan pre-posting checklist. Semua memuat metadata serta sumber resmi Microsoft; contoh memakai sandbox CRONUS.
- Indeks dan tautan landing diperbarui. CSS cetak khusus cheatsheet mengikuti docs/DESIGN.md, termasuk A4, margin 12mm, URL sumber tercetak, dan navigasi/footer disembunyikan.
- Verifikasi nyata: bun run build berhasil menghasilkan 20 halaman dan indeks Pagefind; audit 613 tautan internal/anchor lulus; tujuh halaman memiliki metadata serta sumber resmi; git diff --check lulus.
- Browser: ketujuh halaman lulus pemeriksaan overflow body pada viewport 360px. Tema gelap/terang diperiksa; tombol copy menyalin tiga shortcut yang sesuai ke clipboard.
- Cetak nyata melalui Playwright dan profil Brave terpisah: ketujuh PDF masing-masing 1 halaman A4 (594.96 x 841.92 pt), dirender untuk inspeksi visual. Konten dan URL sumber terlihat utuh. Perbaikan kolom pertama memastikan angka 10 tetap satu baris; pemeriksaan DOM mobile dan mode cetak lulus, serta render terbaru pre-posting checklist diperiksa.
- Artefak verifikasi lokal berada di .codex-tmp/phase-5.3/verified-print/ dan tidak masuk Git. Percobaan CLI cetak sebelumnya macet; verifikasi akhirnya berhasil melalui Playwright.
- Tidak ada dependensi proyek baru. Alat tes sementara dan hasil cetak tidak dilacak Git. Browser tes serta server preview dihentikan setelah pemeriksaan.
- Batas: transaksi sandbox belum dijalankan; Lighthouse tidak diulang untuk ketujuh cheatsheet. Warning i18n kosong, fallback 404, dan sitemap tanpa site masih ada; build berhasil. Tidak ada deploy atau push.
- Fase 5.4 menunggu persetujuan.
