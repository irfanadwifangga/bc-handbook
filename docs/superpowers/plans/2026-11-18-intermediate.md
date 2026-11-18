# Fase 5.5 — Intermediate

Rencana lima langkah disetujui pengguna pada 2026-11-18. Dikerjakan langsung tanpa subagen/dependensi baru. Sumber UI tetap DESIGN.md; tidak mengubah komponen/CSS. Tidak menjalankan operasi BC atau mengakses kredensial.

- [x] Baca kurikulum dan sumber Microsoft. User Groups dibahas sebagai legacy; permissions memakai akses efektif/Security Groups. VAT 11% dilabeli simulasi, bukan tarif Indonesia. Ketersediaan agents bergantung tenant/region/bahasa/license.
- [x] Tulis modul 2.1–2.16, M1–M10 dan cheatsheet #14. Modul 2.17 dan Intercompany tetap opsional/ditunda. Kriteria lulus memakai daftar biasa.
- [x] Verifikasi build, metadata, struktur, internal links/anchors, axe, overflow, hint keyboard, mobile/light/dark, serta PDF A4 cheatsheet. Build 64 halaman dan bun test lulus; 5.589 tautan internal/anchor valid, hanya favicon hilang yang tetap ditunda. Browser: 108 tes halaman + 1 tes cetak lulus, 3 tes cetak duplikat sengaja dilewati. PDF nyata 1 halaman A4 (594.96 × 841.92 pt) dirender untuk inspeksi; screenshot modul dan latihan RapidStart tersedia lokal. Preview dihentikan otomatis.
- [x] Siapkan diff indeks Intermediate, indeks latihan, landing, indeks cheatsheets dan PROGRESS.md; tampilkan untuk persetujuan sebelum diterapkan. Draft `.codex-tmp/phase-5.5/existing-files.patch` mencakup enam file lama dan lolos git apply --check; belum diterapkan.
- [x] Setelah persetujuan diff, terapkan, verifikasi perubahan terkait, update PROGRESS.md dan commit lokal.

Verifikasi akhir setelah penerapan diff yang disetujui: build 64 halaman berhasil; audit 5.632 tautan internal/anchor valid dengan satu temuan aset favicon yang tetap ditunda; 20 tes indeks pada lima halaman × desktop/mobile × light/dark lulus, termasuk axe, overflow, error JavaScript dan daftar tautan. Tidak ada perubahan komponen/CSS/dependensi. Preview dihentikan otomatis; tidak ada operasi BC, push atau deploy.

Gate Level 2 merupakan target praktik pembelajar: company sandbox baru dapat melakukan sales/purchase dengan pajak demo serta dimension dan menjelaskan error. Keberhasilan dokumentasi/build tidak dianggap bukti gate sandbox lulus. Latihan perubahan setup memakai salinan CRONUS terisolasi; perubahan produksi, aktivasi AI/billing, pengiriman email dan job nyata tidak dilakukan.
