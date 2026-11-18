# Progress Tracker

> Update file ini setiap selesai satu fase. Format: checklist + commit message + tanggal.

---

## Fase Pembangunan Situs

- [x] **5.0** — Inisialisasi Astro Starlight, struktur folder, docs/PROGRESS.md, build lokal
- [ ] **5.1** — Design tokens, landing page, search, dark mode, komponen inti, docs/DESIGN.md
- [ ] **5.2** — Level 0 Orientasi
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

### Hasil Fase 5.0

- Dependensi: Astro `7.4.12`, Starlight `0.43.1`, Sharp `0.35.5`; versi terkunci di `bun.lock`.
- Semua direktori Bagian 2 tersedia, termasuk track opsional sebagai folder kosong dengan `.gitkeep`.
- `index.mdx`, `glosarium.md`, dan `referensi.md` berisi kerangka Markdown dengan metadata wajib. Metadata versi mengikuti target kurikulum; materi BC belum diverifikasi di sandbox.
- Schema konten mewajibkan `bc_version_verified` dan `last_verified`.
- Tampilan bawaan Starlight digunakan; tidak ada komponen custom. `docs/DESIGN.md` yang sudah ada dipertahankan.
- Verifikasi nyata: `bun run build` exit code 0; menghasilkan 4 halaman statis dan indeks pencarian Pagefind.
- Warning build: koleksi `i18n` kosong, entry `docs → 404` tidak ditemukan (fallback 404 tetap dihasilkan), dan sitemap dilewati karena opsi `site` belum ditentukan.
- Interaksi search, dark mode, dan tampilan mobile belum diuji di browser. Tidak ada server yang dijalankan atau deploy; cakupan permintaan Fase 5.0 ini lokal.
- Commit message di atas merupakan saran; belum dibuat commit Git.
- Fase 5.1 menunggu persetujuan.

### Fase 5.1 — implementasi, verifikasi belum selesai

- Design tokens, landing, sidebar, VersionBadge, LevelBadge, CheatBox, dan halaman indeks sudah dibuat; format sidebar disesuaikan dengan Starlight 0.43.1.
- Tes nyata: bun test lulus 3 tes; bun run build berhasil dengan 13 halaman dan indeks Pagefind.
- Browser: search sandbox menghasilkan 2 hasil; tema terang/gelap berganti; landing pada viewport 360px tidak overflow horizontal (scrollWidth 345px).
- Audit tautan terhenti: anchor /cheatsheets/#navigasi-shortcut tidak ditemukan. Menunggu persetujuan perbaikan; Fase 5.1 belum selesai.
- Preview lokal sudah dihentikan. Lighthouse, uji negatif schema, print, dan audit keyboard lengkap belum dilakukan.
- Git: branch main belum memiliki commit; file proyek masih untracked.
