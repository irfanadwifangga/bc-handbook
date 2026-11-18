# Progress Tracker

> Update file ini setiap selesai satu fase. Format: checklist + commit message + tanggal.

---

## Fase Pembangunan Situs

- [x] **5.0** — Inisialisasi Astro Starlight, struktur folder, docs/PROGRESS.md, build lokal
- [x] **5.1** — Design tokens, landing page, search, dark mode, komponen inti, docs/DESIGN.md
- [x] **5.2** — Level 0 Orientasi
- [ ] **5.3** — Cheatsheet #1–#7 (navigasi, alur dokumen, ledger, posting group, error, setup, pre-posting)
- [ ] **5.4** — Level 1 Basic (modul 1.1–1.8) + latihan B1–B8
- [ ] **5.5** — Level 2 Intermediate + cheatsheet #14 (RapidStart) + latihan M1–M10
- [ ] **5.6** — Level 3 Track 3A (Business Analysis) + cheatsheet #15–#16 + latihan E1–E3
- [ ] **5.7** — Track 3B (API) + cheatsheet API & AL + latihan E4–E6 + capstone
- [ ] **5.8** — Glosarium, referensi, release checklist, progress tracker component
- [ ] **5.9** — Audit: link rusak, `last_verified`, data rahasia, uji mobile

## Log

| Tanggal | Fase | Commit message | Catatan |
|---|---|---|---|
| 2026-11-18 | 5.0 | `chore: init starlight site and content structure` | Astro Starlight diinisialisasi dengan bun; struktur Bagian 2 tersedia; `bun run build` berhasil (4 halaman dan indeks Pagefind). |
| 2026-11-18 | 5.1 | `fix: finish phase 5.1 checks and cheatsheet link` | Design tokens, landing, sidebar, dan komponen inti selesai; build, tes komponen/metadata, dan audit tautan lulus; Lighthouse mobile landing Performance 100, Accessibility 100. |
| 2026-11-18 | 5.2 | `docs: add level 0 orientation` | Materi Orientasi dan latihan O0/gate Level 0; build berhasil, 333 tautan internal/anchor valid, template dan komponen hasil render diperiksa. |

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
- Fase 5.3 menunggu persetujuan.
