# DESIGN.md — Design System "BC Handbook"

> Sumber kebenaran UI untuk situs BC Handbook (Astro Starlight).
> **Untuk AI agent:** semua keputusan visual harus berasal dari dokumen ini. Jika sesuatu tidak ada di sini, **jangan improvisasi** — pilih opsi yang lebih sederhana/padat, lalu tambahkan ke dokumen ini di commit yang sama.
> Versi dokumen: 1.0 · 2026-11-18

---

## 1. Arah desain (satu kalimat)

**"Buku manual teknis yang tenang dan padat"** — dibaca berulang saat bekerja: cepat dipindai, tabel & kode jelas, tidak ada dekorasi yang mengalihkan perhatian.

### Prinsip (urutan prioritas jika bentrok)
1. **Keterbacaan & kecepatan menemukan** > estetika.
2. **Padat tapi lega:** informasi banyak per layar, tetapi tetap ada ruang napas.
3. **Konsisten:** komponen yang sama selalu terlihat sama.
4. **Aksesibel:** kontras AA, keyboard-friendly, tidak mengandalkan warna saja.
5. **Ringan:** tanpa font eksternal, tanpa animasi dekoratif, tanpa gambar besar.

### Yang SENGAJA tidak dipakai
Gradient, glassmorphism/blur, bayangan tebal, ilustrasi hero/stock photo, ikon dekoratif berlebihan, emoji sebagai hiasan, animasi masuk/scroll-reveal, parallax, carousel, pop-up/modal pada halaman materi.

---

## 2. Dasar teknis

- Basis: **Astro Starlight** dengan tema bawaan. Kustomisasi **minimal** lewat satu file `src/styles/custom.css` (didaftarkan di `customCss` pada `astro.config.mjs`). **Jangan menulis ulang layout Starlight** kecuali tertulis di dokumen ini.
- Komponen kustom: Astro components di `src/components/`. Interaktivitas (progress tracker) memakai satu *island* kecil; selain itu **zero JS**.
- Bahasa halaman: `lang="id"`.
- Tidak ada CDN/font/ikon eksternal. Ikon: SVG inline sederhana (stroke 1.5–2px) atau bawaan Starlight.
- CSS variable Starlight diverifikasi pada versi 0.43.1 melalui `dist/style/props.css`; pemetaan warna, font, heading, dan lebar konten memakai variabel yang tersedia.
- Integrasi tampilan memakai wrapper `PageTitle` (judul bawaan + metadata), `Footer` (footer bawaan + catatan), dan slot `SocialIcons` (tautan Cheatsheets di header desktop/menu mobile). Layout bawaan tetap dipakai.
- Halaman indeks berisi tautan dan status ketersediaan; materi lengkap mengikuti fase konten. Landing menampilkan status latihan sampai progress tracker tersedia pada Fase 5.8.
- Token tambahan di `custom.css`: `--bc-expert` untuk warna Expert; token line-height, bobot font, border, fokus, durasi transisi, dan lebar konten mengambil nilai yang sudah ditetapkan di dokumen ini.

---

## 3. Design tokens

Semua nilai warna/ukuran **hanya boleh didefinisikan di sini / `custom.css`** sebagai variabel. Dilarang menulis hex, px, atau font di komponen.

### 3.1 Warna

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `--bc-bg` | `#FFFFFF` | `#0F1720` | Latar halaman |
| `--bc-surface` | `#F6F8FA` | `#151F2B` | Kartu, CheatBox, kode inline |
| `--bc-surface-2` | `#EEF2F6` | `#1C2836` | Header tabel, hover |
| `--bc-border` | `#D8DEE4` | `#2A3748` | Garis, border |
| `--bc-text` | `#1F2933` | `#E6EDF3` | Teks utama |
| `--bc-text-muted` | `#52606D` | `#9FB0C0` | Teks sekunder, metadata |
| `--bc-accent` | `#0F766E` | `#2DD4BF` | Link, tombol utama, fokus |
| `--bc-accent-hover` | `#115E59` | `#5EEAD4` | Hover aksen |
| `--bc-accent-soft` | `#E6F6F4` | `#0F2A2A` | Latar aksen halus (CheatBox) |
| `--bc-info` | `#1D4ED8` | `#60A5FA` | Catatan info |
| `--bc-success` | `#15803D` | `#4ADE80` | Berhasil / lulus |
| `--bc-warning` | `#B45309` | `#FBBF24` | Perlu verifikasi |
| `--bc-danger` | `#B91C1C` | `#F87171` | Bahaya / error |

**Warna level (badge):** Basic `--bc-success` · Intermediate `--bc-info` · Expert `#7E22CE` (dark: `#C084FC`). Badge **selalu** memuat teks ("Basic", "Intermediate", "Expert") — warna bukan satu-satunya penanda.

**Aturan:** teks isi minimal kontras 4.5:1, elemen UI 3:1. Tidak boleh ada warna di luar tabel ini.

Pemetaan ke Starlight (contoh, verifikasi nama variabel):
```css
:root {
  --sl-color-accent: var(--bc-accent);
  --sl-color-accent-high: var(--bc-accent-hover);
  --sl-color-accent-low: var(--bc-accent-soft);
  --sl-font: var(--bc-font-sans);
  --sl-font-mono: var(--bc-font-mono);
}
```

### 3.2 Tipografi
```css
--bc-font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--bc-font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
```
| Token | Ukuran | Line-height | Dipakai |
|---|---|---|---|
| `--bc-text-xs` | 12px | 1.4 | Metadata, badge |
| `--bc-text-sm` | 14px | 1.5 | Tabel, cheat box, kode |
| `--bc-text-base` | 16px | 1.65 | Isi |
| `--bc-text-lg` | 19px | 1.5 | Lead paragraph |
| `--bc-h3` | 21px | 1.3 | H3 |
| `--bc-h2` | 26px | 1.25 | H2 |
| `--bc-h1` | 32px | 1.2 | H1 (satu per halaman) |

Bobot: 400 isi · 600 judul kecil/label · 700 H1–H2. Tidak ada italic panjang; tidak ada huruf kapital semua kecuali badge.

### 3.3 Spasi, bentuk, gerak
- Skala spasi (basis 4px): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` → token `--bc-space-1…8`.
- Radius: `--bc-radius-sm: 6px` (badge, input, kode inline) · `--bc-radius-md: 10px` (kartu, CheatBox).
- Border: 1px `--bc-border`. Bayangan: **tidak dipakai** (pengecualian: dropdown search bawaan Starlight).
- Lebar konten maksimum: **72ch** untuk teks; tabel & kode boleh lebih lebar dan **scroll horizontal di dalam kontainernya sendiri**.
- Gerak: hanya `transition: background-color, border-color, color 150ms ease-out`. Hormati `prefers-reduced-motion` (matikan transisi).
- Breakpoint: `≤ 640px` mobile · `641–1024px` tablet · `≥ 1025px` desktop.

---

## 4. Komponen (daftar tertutup)

Hanya komponen di bawah yang boleh dipakai. Jika perlu komponen baru → tambahkan ke bagian ini dulu.

### 4.1 `VersionBadge`
- Posisi: tepat di bawah H1 setiap halaman materi/cheatsheet.
- Isi: `BC 29.1 · diverifikasi 2026-11-18` (dari front-matter `bc_version_verified` & `last_verified`).
- Tampilan: pill kecil, `--bc-surface`, teks `--bc-text-xs`.
- **State "usang":** jika `last_verified` > 180 hari → warna `--bc-warning` + teks "perlu verifikasi ulang".
- Halaman tanpa kedua field → **build gagal** (validasi di schema content collection).

### 4.2 `LevelBadge`
`Basic | Intermediate | Expert` — pill dengan titik warna + teks. Dipakai di sidebar (opsional), kartu latihan, dan header modul.

### 4.3 `CheatBox`
Ringkasan 5–8 baris di akhir tiap modul / awal cheatsheet.
- Latar `--bc-accent-soft`, border kiri 4px `--bc-accent`, radius md, padding 16px.
- Judul "Cheat box" (`--bc-text-sm`, 600). Isi berupa list pendek atau tabel kecil.
- Maksimal **1 per halaman**, kecuali halaman cheatsheet.

### 4.4 `Aside` (catatan)
Pakai komponen **aside bawaan Starlight** (`:::note`, `:::tip`, `:::caution`, `:::danger`) — jangan buat sendiri.
- `⚠️ Verifikasi` pada rencana konten = `:::caution[Verifikasi]` di Markdown.
- Kesalahan umum = `:::danger[Kesalahan umum]`.

### 4.5 `ExerciseCard`
Struktur tetap, berurutan: **Judul + LevelBadge + estimasi waktu** → Prasyarat → Langkah (ordered list) → **Kriteria lulus** (checklist) → `<details><summary>Hint</summary>…</details>`.
- Satu kartu = satu latihan; border 1px, radius md, latar `--bc-surface`.
- Kriteria lulus memakai `ProgressChecklist`.

### 4.6 `ProgressChecklist`
- Checkbox yang tersimpan di `localStorage` (bungkus semua akses dengan `try/catch`; jika gagal, tetap berfungsi tanpa simpan).
- Menampilkan "x/y selesai" per halaman dan agregat per level di landing.
- Fokus & area sentuh ≥ 44×44px.

### 4.7 Code block
- Pakai Expressive Code/bawaan Starlight; wajib: **tombol copy**, label bahasa, judul file bila ada.
- **Tidak ada line-wrap**; scroll horizontal. Ukuran `--bc-text-sm`.
- Placeholder rahasia selalu `<TENANT_ID>`, `<ENV>`, `<COMPANY_ID>`, `<CLIENT_SECRET>`.

### 4.8 Tabel
- Header sticky di dalam kontainer scroll, latar `--bc-surface-2`, teks 600.
- Tanpa zebra; garis tipis antar baris. Padding sel 8px 12px. Ukuran `--bc-text-sm`.
- Di mobile: kontainer `overflow-x: auto`, kolom pertama boleh `position: sticky; left: 0`.

### 4.9 Navigasi
- Sidebar dikelompokkan: **Orientasi · Basic · Intermediate · Expert · Cheatsheets · Latihan · Referensi**.
- Cheatsheets selalu mudah dijangkau (grup tersendiri di sidebar + tautan di header).
- Pencarian: Pagefind bawaan Starlight; shortcut `Ctrl/Cmd+K`.
- Footer: teks "Catatan belajar tidak resmi — bukan produk Microsoft. Selalu cek Microsoft Learn." (tanpa logo Microsoft/Dynamics).

---

## 5. Template layout halaman

| Jenis | Struktur (urut dari atas) |
|---|---|
| **Landing** | H1 + 1 kalimat tujuan → 3 blok: *Mulai dari mana* (4 tautan level), *Cheatsheet populer* (5 tautan), *Latihan* (progres per level). **Tanpa hero image.** |
| **Modul** | H1 → VersionBadge + LevelBadge → Tujuan belajar → Konsep singkat → Langkah di BC → CheatBox → Kesalahan umum → Latihan terkait → Sumber resmi |
| **Cheatsheet** | H1 → VersionBadge → isi tabel/ringkas (maks. ± 1 halaman A4 saat dicetak) → Sumber resmi |
| **Latihan** | H1 → LevelBadge + estimasi → ExerciseCard |
| **Referensi/Glosarium** | H1 → tabel dua kolom (ID ↔ EN), urut abjad, bisa dicari |

### Mode cetak (khusus cheatsheet)
`@media print`: latar putih, teks hitam, sembunyikan sidebar/header/footer/pencarian, font 10.5–11pt, 2 kolom bila perlu, hindari pemutusan di tengah tabel (`break-inside: avoid`), tampilkan URL sumber di akhir.

---

## 6. Aksesibilitas & perilaku

- Fokus terlihat: `outline: 2px solid var(--bc-accent); outline-offset: 2px` pada semua elemen interaktif.
- Link di dalam teks **bergaris bawah**; jangan hanya mengandalkan warna.
- Urutan heading benar (satu H1; tidak melompati level).
- Semua gambar/ikon bermakna punya `alt`/`aria-label`; ikon dekoratif `aria-hidden`.
- Navigasi bisa penuh dengan keyboard; skip-link ke konten.
- Dark/light mengikuti sistem + toggle bawaan Starlight; keduanya wajib diuji.

---

## 7. Aturan untuk AI agent (DO / DON'T)

**DO**
- Pakai token & komponen di dokumen ini; tambahkan ke dokumen ini sebelum membuat yang baru.
- Pilih opsi paling sederhana jika ragu.
- Uji di lebar **360px**, dark mode, dan print preview (untuk cheatsheet).
- Pertahankan struktur template halaman (Bagian 5).

**DON'T**
- Menambah font, warna, library UI (Tailwind/MUI/dll.), atau CDN.
- Menulis nilai warna/ukuran langsung di komponen.
- Mengubah copywriting/konten materi saat mengerjakan tugas UI (dan sebaliknya).
- Menambahkan animasi, gradient, ilustrasi, atau gambar stok.
- Memakai logo/gambar bermerek Microsoft atau Dynamics 365, atau screenshot yang berisi data nyata.
- "Mempercantik" halaman yang tidak diminta dalam langkah tersebut.

---

## 8. Checklist penerimaan UI (jalankan sebelum commit)

- [ ] Hanya token & komponen dari dokumen ini yang dipakai (grep: tidak ada hex/px/font liar di komponen).
- [ ] Light **dan** dark mode terbaca; kontras AA.
- [ ] Mobile 360px: tidak ada scroll horizontal pada body; tabel/kode scroll di dalam kontainernya.
- [ ] Navigasi keyboard + fokus terlihat; skip-link berfungsi.
- [ ] VersionBadge muncul dan tervalidasi; halaman tanpa front-matter ditolak build.
- [ ] Cheatsheet: print preview rapi (≈ 1 halaman A4).
- [ ] Lighthouse: Accessibility ≥ 95, Performance ≥ 90 (mobile).
- [ ] `docs/PROGRESS.md` diperbarui + commit message diberikan.
