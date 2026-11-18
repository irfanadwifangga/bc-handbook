# BC Handbook — Instruksi untuk AI Agent

> File ini adalah sumber kebenaran aturan kerja untuk **semua AI agent** yang mengerjakan proyek ini.
> Baca **seluruh file ini** sebelum mulai bekerja. Detail kurikulum, cheatsheet, dan latihan ada di `docs/BC-CURRICULUM-PLAN.md`.

---

## Konteks proyek

- **Apa:** Situs dokumentasi & kurikulum Dynamics 365 Business Central (BC), berisi materi belajar bertingkat, cheatsheet, dan latihan.
- **Untuk siapa:** Seorang Business Analyst yang juga mempelajari API atas permintaan atasan.
- **Bahasa konten:** Indonesia. Istilah teknis tetap English.
- **Track prioritas:** Business Analysis (Track 3A) dan Integrasi & API (Track 3B). Track lain (AL Developer, Admin/DevOps, AI/Agents) bersifat opsional.
- **Versi BC saat penulisan:** 29.x (2026 release wave 2).

## Tech stack

| Komponen | Pilihan |
|---|---|
| Framework | **Astro Starlight** (content-first, Markdown/MDX) |
| Search | Pagefind (bawaan Starlight) |
| Package manager (JS) | **bun** — jangan pakai npm/yarn/pnpm |
| Python runtime | **uv** — jalankan dengan `uv run`, jangan `pip install` global |
| Deploy | Vercel atau Cloudflare Pages (lokal dulu, deploy belakangan) |

## File penting

| File | Fungsi |
|---|---|
| `docs/BC-CURRICULUM-PLAN.md` | Kurikulum lengkap, struktur folder, daftar cheatsheet, latihan, capstone — **baca ini untuk detail konten** |
| `docs/PROGRESS.md` | Checklist langkah & commit message terakhir — **update setiap selesai satu fase** |
| `docs/DESIGN.md` | Design system (token, komponen, layout) — **dibuat di Fase 5.1, semua keputusan UI mengikuti file ini** |

## Aturan kerja (WAJIB)

### Proses
1. **Kerja per langkah kecil.** Satu fase → commit message → update `docs/PROGRESS.md` → baru lanjut. Jangan bangun semuanya sekaligus.
2. **Ikuti urutan fase di Bagian 5** `docs/BC-CURRICULUM-PLAN.md`. Jangan loncat fase.
3. **Tunjukkan rencana sebelum eksekusi.** Jika langkah > 1, jelaskan rencana dan tunggu persetujuan.

### Konten
4. **Jangan menyalin teks Microsoft Learn.** Tulis ulang dengan kata sendiri, ringkas, lalu tautkan ke sumber resmi.
5. **Setiap halaman wajib front-matter:**
   ```yaml
   bc_version_verified: "29.x"   # versi BC yang dicek
   last_verified: "2026-11-18"   # tanggal terakhir diverifikasi
   ```
   Halaman tanpa field ini dianggap belum selesai.
6. **Jika ragu soal fakta BC** (nomor tabel, nama field, signature event, nama halaman), tulis `> ⚠️ Verifikasi:` di halaman. Jangan mengarang.
7. **Template halaman materi:** `Tujuan belajar` → `Konsep singkat` → `Langkah di BC` → `Cheat box` (5–8 baris) → `Kesalahan umum` → `Latihan terkait` → `Sumber resmi`.

### Keamanan & privasi
8. **Dilarang menaruh data rahasia di repo:** tenant ID, client secret, nama environment produksi, data pelanggan. Pakai placeholder `<TENANT_ID>`, `<ENV>`, `<COMPANY_ID>`.
9. **Semua contoh memakai data demo (CRONUS) dan sandbox.**

### UI & desain
10. **Semua keputusan UI mengikuti `docs/DESIGN.md`.** Jika `docs/DESIGN.md` belum ada (sebelum Fase 5.1), jangan buat komponen custom — tulis konten Markdown biasa dulu.
11. Situs harus **mobile-friendly** dan **bisa dicari** (full-text search).

### Kualitas
12. **Jangan mengarang hasil.** Verifikasi lewat eksekusi nyata. Laporan harus menyebut tes yang dilakukan dan batasnya.
13. **Berhenti setelah 3 kegagalan berturut-turut** atau error yang sama muncul 2 kali. Laporkan error dan tanya.

## Prioritas jika waktu terbatas

Cheatsheet harian (Fase 5.3) → Level 1 Basic (5.4) → Business Analysis (5.6) → API (5.7) → sisanya.

## Yang TIDAK perlu dikerjakan kecuali diminta

- Track opsional: AL Developer (3C), Admin/DevOps (3D), AI/Agents/MCP.
- Modul opsional: Manufacturing, Warehouse, Service, Projects, Cost Accounting.
- Deploy ke production.
- Konten dalam bahasa Inggris (semua konten ditulis dalam bahasa Indonesia).
