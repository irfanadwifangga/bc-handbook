# DESIGN.md — Design System "BC Handbook"

> Sumber kebenaran UI untuk situs BC Handbook (Astro Starlight).
> **Untuk AI agent:** semua keputusan visual harus berasal dari dokumen ini. Jika sesuatu tidak ada di sini, **jangan improvisasi** — pilih opsi yang lebih sederhana/padat, lalu tambahkan ke dokumen ini di commit yang sama.
> Versi dokumen: **2.0** · 2026-11-18

### Riwayat perubahan
| Versi | Perubahan |
|---|---|
| 1.0 | Draf awal: arah "buku manual teknis tenang dan padat", token, komponen 4.1–4.9, template layout. |
| 1.x | Pembaruan hasil implementasi: verifikasi variabel Starlight 0.43.1, wrapper `PageTitle`/`Footer`/`SocialIcons`, Search adapter (4.10), FlowPlayer & ReferenceVideo (4.11), implementasi cetak cheatsheet (Fase 5.3), pengecualian animasi pembelajaran. |
| **2.0** | **Arah visual baru: netral-first, terinspirasi tata letak & ritme `nextjs.org/docs`** (bukan salinan). Palet netral, font Geist self-hosted, radius/ritme baru, code block & Tabs gaya docs modern, struktur landing 3 seksi. Semua pembaruan 1.x digabung dan dirapikan. |

---

## 1. Arah desain (satu kalimat)

**"Dokumentasi teknis modern: netral, tenang, dan padat"** — dibaca berulang saat bekerja: cepat dipindai, tabel & kode jelas, tidak ada dekorasi yang mengalihkan perhatian. Referensi tata letak dan ritme: `nextjs.org/docs`.

### Prinsip (urutan prioritas jika bentrok)
1. **Keterbacaan & kecepatan menemukan** > estetika.
2. **Padat tapi lega:** informasi banyak per layar, tetapi tetap ada ruang napas.
3. **Konsisten:** komponen yang sama selalu terlihat sama.
4. **Aksesibel:** kontras AA, keyboard-friendly, tidak mengandalkan warna saja.
5. **Ringan:** tanpa CDN eksternal, tanpa animasi dekoratif, tanpa gambar besar.
6. **Netral dulu, aksen hemat:** permukaan dan teks netral (abu-abu); warna aksen hanya untuk link, fokus, dan status aktif.

### Apa yang diambil dari `nextjs.org/docs` — dan apa yang tidak

**Diambil (pola yang terverifikasi dari halaman docs):**
- Struktur informasi tiga seksi (Getting Started / Guides / API Reference) → di sini **Belajar per level / Cheatsheets / Latihan**.
- Halaman pembuka yang menjelaskan *cara memakai dokumentasi* dan *prasyarat pengetahuan*.
- Navigasi: sidebar berkelompok + pencarian `Ctrl/Cmd+K` + TOC halaman di kanan (bawaan Starlight).
- Metadata "terakhir diperbarui" per halaman → di sini `VersionBadge` (`last_verified`).

**Diambil (gaya umum docs modern; detail visualnya adalah keputusan proyek ini, bukan hasil ekstraksi dari situs):**
- Palet netral dengan border tipis, tanpa bayangan; radius kecil; heading semibold dengan letter-spacing rapat.
- Font Geist (Sans + Mono), code block dengan header nama file, tab untuk varian bahasa, callout "Perlu diketahui".

**Sengaja tidak diambil:**
- Header translucent/blur (tetap dilarang — lihat daftar larangan).
- Dropdown pengalih router/versi, tombol "Was this helpful?", breadcrumbs, `llms.txt` (tidak sepadan manfaat vs biaya untuk situs satu pemilik; boleh dipertimbangkan ulang kemudian).
- Logo, ikon merek, teks, atau aset milik Next.js/Vercel. Jangan menyalin CSS dari situs tersebut.

### Yang SENGAJA tidak dipakai
Gradient, glassmorphism/blur (termasuk pada header), bayangan tebal, ilustrasi hero/stock photo, ikon dekoratif berlebihan, emoji sebagai hiasan, animasi masuk/scroll-reveal, parallax, carousel, pop-up/modal pada halaman materi.

---

## 2. Dasar teknis

- Basis: **Astro Starlight** dengan tema bawaan. Kustomisasi **minimal** lewat satu file `src/styles/custom.css` (didaftarkan di `customCss` pada `astro.config.mjs`). **Jangan menulis ulang layout Starlight** kecuali tertulis di dokumen ini.
- Komponen kustom: Astro components di `src/components/`. Selain progress tracker dan enhancement Search, JS kecil diizinkan untuk FlowPlayer dan ReferenceVideo pada Bagian 4.11; tanpa library UI tambahan.
- Bahasa halaman: `lang="id"`.
- Tidak ada CDN/font/ikon eksternal. **Pengecualian font:** Geist Sans dan Geist Mono boleh dipakai bila **self-hosted** dari aset/paket proyek (lihat 3.2) — bukan dimuat dari CDN. Ikon: SVG inline sederhana (stroke 1.5–2px) atau bawaan Starlight.
- CSS variable Starlight diverifikasi pada versi 0.43.1 melalui `dist/style/props.css`; pemetaan warna, font, heading, dan lebar konten memakai variabel yang tersedia.
- Integrasi tampilan memakai wrapper `PageTitle` (judul bawaan + metadata), `Footer` (footer bawaan + catatan), dan slot `SocialIcons` (tautan Cheatsheets di header desktop/menu mobile). Layout bawaan tetap dipakai.
- Halaman indeks berisi tautan dan status ketersediaan; materi lengkap mengikuti fase konten. Landing menampilkan status latihan sampai progress tracker tersedia pada Fase 5.8.
- Pengujian dan perintah lokal: lihat `docs/DEVELOPMENT.md`. Perubahan visual **wajib** menjalankan ulang build, `bun test`, dan suite Playwright/axe (Bagian 8).

---

## 3. Design tokens

Semua nilai warna/ukuran **hanya boleh didefinisikan di sini / `custom.css`** sebagai variabel. Dilarang menulis hex, px, atau font di komponen.

### 3.1 Warna (netral-first)

> Nilai foreground/background terinspirasi default starter Next.js (`#171717` / `#FFFFFF` dan `#EDEDED` / `#0A0A0A`). Kelas abu-abu lainnya adalah keputusan proyek ini.

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `--bc-bg` | `#FFFFFF` | `#0A0A0A` | Latar halaman |
| `--bc-surface` | `#FAFAFA` | `#111111` | Kartu, CheatBox, kode inline, code block |
| `--bc-surface-2` | `#F4F4F5` | `#1A1A1A` | Header tabel, hover, item sidebar aktif |
| `--bc-border` | `#E4E4E7` | `#262626` | Garis, border |
| `--bc-text` | `#171717` | `#EDEDED` | Teks utama |
| `--bc-text-muted` | `#52525B` | `#A1A1AA` | Teks sekunder, metadata, label grup sidebar |
| `--bc-accent` | `#0F766E` | `#2DD4BF` | Link, tombol utama, fokus, indikator aktif |
| `--bc-accent-hover` | `#115E59` | `#5EEAD4` | Hover aksen |
| `--bc-accent-soft` | `#E6F6F4` | `#0F2A2A` | Latar aksen halus (CheatBox) |
| `--bc-info` | `#1D4ED8` | `#60A5FA` | Catatan info |
| `--bc-success` | `#15803D` | `#4ADE80` | Berhasil / lulus |
| `--bc-warning` | `#B45309` | `#FBBF24` | Perlu verifikasi |
| `--bc-danger` | `#B91C1C` | `#F87171` | Bahaya / error |

**Kenapa aksen tetap teal (bukan biru):** biru sudah dipakai `--bc-info`; memakainya juga sebagai aksen membuat "link" dan "catatan info" tampak sama.

**Warna level (badge):** Basic `--bc-success` · Intermediate `--bc-info` · Expert `--bc-expert` (`#7E22CE`, dark: `#C084FC`). Badge **selalu** memuat teks ("Basic", "Intermediate", "Expert") — warna bukan satu-satunya penanda.

**Aturan:** teks isi minimal kontras 4.5:1, elemen UI 3:1. Tidak boleh ada warna di luar tabel ini. **Satu pengecualian:** warna sintaks pada code block mengikuti tema Expressive Code (lihat 4.7).

Pemetaan ke Starlight (dipakai di `custom.css`; nama variabel sudah diverifikasi pada 0.43.1 — periksa ulang saat Starlight di-upgrade):
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
--bc-font-sans: "Geist", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--bc-font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
```

**Aturan font (Geist):**
- Lisensi SIL OFL (boleh self-host). **Self-host saja**: paket terkunci di `bun.lock` (mis. `@fontsource-variable/geist` dan `@fontsource-variable/geist-mono` — ⚠️ verifikasi nama paket & versi sebelum dipasang) atau berkas `woff2` di `public/fonts/`.
- Hanya subset **latin** (cukup untuk bahasa Indonesia), **variable font**, `font-display: swap`. Preload hanya Geist Sans; Mono dimuat sesuai kebutuhan.
- Stack fallback tetap lengkap (di atas) agar halaman terbaca walau font gagal dimuat.
- **Cara membatalkan:** hapus `@font-face`/impor font — stack otomatis jatuh ke font sistem tanpa perubahan lain.
- Pengecekan: tab Network **tidak boleh** menampilkan request ke domain font eksternal.

| Token | Ukuran | Line-height | Dipakai |
|---|---|---|---|
| `--bc-text-xs` | 12px | 1.4 | Metadata, badge |
| `--bc-text-sm` | 14px | 1.5 | Tabel, cheat box, kode, sidebar, TOC |
| `--bc-text-base` | 16px | 1.65 | Isi |
| `--bc-text-lg` | 19px | 1.5 | Lead paragraph |
| `--bc-h3` | 21px | 1.3 | H3 |
| `--bc-h2` | 26px | 1.25 | H2 |
| `--bc-h1` | 32px | 1.2 | H1 (satu per halaman) |

Bobot: 400 isi · 500 label UI/sidebar/nav · 600 semua heading dan judul kecil. **Tidak memakai 700.** Letter-spacing heading: `--bc-tracking-heading: -0.02em` (H1–H2) dan `-0.01em` (H3); isi 0. Tidak ada italic panjang; tidak ada huruf kapital semua kecuali badge.

### 3.3 Spasi, bentuk, gerak
- Skala spasi (basis 4px): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` → token `--bc-space-1…8`.
- Radius: `--bc-radius-sm: 6px` (badge, input, kode inline) · `--bc-radius-md: 8px` (kartu, CheatBox, code block).
- Border: 1px `--bc-border`. Bayangan: **tidak dipakai** (pengecualian: dropdown/dialog search bawaan Starlight).
- Lebar konten maksimum: **72ch** untuk teks; tabel & kode boleh lebih lebar dan **scroll horizontal di dalam kontainernya sendiri**.
- Gerak: hanya `transition: background-color, border-color, color 150ms ease-out`. Hormati `prefers-reduced-motion` (matikan transisi).
- Breakpoint: `≤ 640px` mobile · `641–1024px` tablet · `≥ 1025px` desktop.

### 3.4 Token tambahan yang sudah ada di `custom.css`
| Kelompok | Token |
|---|---|
| Level | `--bc-expert` |
| Tipografi | token line-height (`--bc-line-meta`, dll.), bobot font, `--bc-tracking-heading` |
| Komponen | token border, fokus, durasi transisi, lebar konten |
| Cetak | `--bc-print-font` (10.5pt), `--bc-print-bg` (putih), `--bc-print-text` (hitam) |
| FlowPlayer / video | `--bc-flow-touch` (44px), `--bc-flow-columns` (3), `--bc-video-ratio` (16 / 9) |

---

## 4. Komponen (daftar tertutup)

Hanya komponen di bawah yang boleh dipakai. Jika perlu komponen baru → tambahkan ke bagian ini dulu.

### 4.1 `VersionBadge`
- Posisi: tepat di bawah H1 setiap halaman materi/cheatsheet.
- Isi: `BC 29.1 · diverifikasi 2026-11-18` (dari front-matter `bc_version_verified` & `last_verified`).
- Tampilan: pill kecil, `--bc-surface` dengan border 1px, teks `--bc-text-xs`.
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
Pakai komponen **aside bawaan Starlight** (`:::note`, `:::tip`, `:::caution`, `:::danger`) — jangan buat sendiri. Warna memakai surface dan token info/success/warning/danger.
- `⚠️ Verifikasi` pada rencana konten = `:::caution[Verifikasi]` di Markdown.
- Kesalahan umum = `:::danger[Kesalahan umum]`.
- **"Perlu diketahui"** (padanan *Good to know* di docs modern: informasi tambahan yang tidak kritis) = `:::note[Perlu diketahui]`. Pakai hemat; maksimal 2 per halaman.

### 4.5 `ExerciseCard`
Struktur tetap, berurutan: **Judul + LevelBadge + estimasi waktu** → Prasyarat → Langkah (ordered list) → **Kriteria lulus** (daftar biasa; checklist interaktif menyusul bersama `ProgressChecklist` di Fase 5.8) → `<details><summary>Hint</summary>…</details>`.
- Satu kartu = satu latihan; border 1px, radius md, latar `--bc-surface`.

### 4.6 `ProgressChecklist`
- Checkbox yang tersimpan di `localStorage` (bungkus semua akses dengan `try/catch`; jika gagal, tetap berfungsi tanpa simpan).
- Menampilkan "x/y selesai" per halaman dan agregat per level di landing.
- Fokus & area sentuh ≥ 44×44px.
- Status: dikerjakan di Fase 5.8; sebelum itu landing menampilkan status ketersediaan latihan.

### 4.7 Code block
- Pakai Expressive Code/bawaan Starlight; wajib: **tombol copy**, label bahasa, **judul file** bila ada (tampil sebagai header bar di atas blok).
- Tampilan: latar `--bc-surface`, border 1px `--bc-border`, radius md, header bar `--bc-surface-2`. **Tidak ada line-wrap**; scroll horizontal. Ukuran `--bc-text-sm`, font `--bc-font-mono`.
- Tombol copy tetap terlihat saat fokus keyboard dan pada layar sentuh (tidak hanya saat hover).
- **Tema sintaks:** satu pasangan tema terang/gelap dari Expressive Code (mis. `github-light` / `github-dark` — ⚠️ verifikasi tersedia di versi terpasang dan kontras ≥ 4.5:1). Ini satu-satunya pengecualian aturan "tidak ada warna di luar tabel".
- Placeholder rahasia selalu `<TENANT_ID>`, `<ENV>`, `<COMPANY_ID>`, `<CLIENT_SECRET>`.

### 4.8 Tabel
- Header sticky di dalam kontainer scroll, latar `--bc-surface-2`, teks 600.
- Tanpa zebra; garis tipis antar baris. Padding sel 8px 12px. Ukuran `--bc-text-sm`.
- Di mobile: kontainer `overflow-x: auto`, kolom pertama boleh `position: sticky; left: 0`.
- Kolom pertama memakai pemenggalan kata normal (istilah seperti *Inventory* tidak boleh terpotong di tengah kata); scroll terjadi di dalam tabel.

### 4.9 Navigasi
- Sidebar dikelompokkan: **Orientasi · Basic · Intermediate · Expert · Cheatsheets · Latihan · Referensi**.
- Gaya sidebar: label grup `--bc-text-xs`, 600, `--bc-text-muted`, tanpa huruf kapital semua; item `--bc-text-sm`; hover dan item aktif memakai latar `--bc-surface-2`, item aktif berteks `--bc-text` bobot 500 (tanpa bayangan). Tidak ada ikon default.
- Header: latar solid `--bc-bg` dengan border bawah 1px — **tanpa blur/translucent**.
- TOC halaman di kanan ("Pada halaman ini") memakai komponen bawaan Starlight; teks `--bc-text-sm` muted, item aktif `--bc-text`.
- Cheatsheets selalu mudah dijangkau (grup tersendiri di sidebar + tautan di header).
- Pencarian: Pagefind bawaan Starlight; shortcut `Ctrl/Cmd+K`.
- Footer: teks "Catatan belajar tidak resmi — bukan produk Microsoft. Selalu cek Microsoft Learn." (tanpa logo Microsoft/Dynamics) dengan spasi eksplisit sebelum tautan.

### 4.10 Search adapter (integrasi Starlight)
- Wrapper tetap memakai Search bawaan Starlight beserta Pagefind dan shortcut-nya.
- Skrip kecil memisahkan teks caption dan keycap dengan spasi, lalu menyelaraskan aria-label dengan teks tombol. Tidak menambah island atau library UI.
- Selector tema memakai lebar intrinsik agar label bahasa Indonesia tampil utuh; tanpa ukuran baru di luar token.
- Verifikasi mencakup axe, Ctrl/Cmd+K sesuai platform, Escape, mobile, serta tema terang/gelap. Pengujian Windows tidak dianggap bukti pengujian macOS.

### 4.11 FlowPlayer dan ReferenceVideo (pilot Sales)
- Komponen Astro dengan enhancement custom element; tanpa dependensi tambahan. Stylesheet `src/styles/learning-flow.css` memakai palet, font, spasi, radius, dan fokus yang sudah ditetapkan.
- FlowPlayer menampilkan enam node bernomor dengan panah, penanda tahap aktif, serta panel Analogi toko → Dokumen / halaman BC → Dampak utama. Desktop tiga kolom dengan alur berkelok (1→2→3, turun ke 4 lalu 5←4 dan 6←5); urutan DOM/keyboard tetap 1–6. Di bawah 50rem, satu kolom vertikal. Token tambahan: `--bc-flow-touch: 44px` untuk target sentuh, `--bc-flow-columns: 3`, `--bc-video-ratio: 16 / 9`.
- Pemutaran mulai dijeda; Putar/Jeda, Sebelumnya, Berikutnya, Ulangi, dan pilihan tahap berupa tombol native. Delapan detik per tahap; progress waktu hanya visual. Jeda mempertahankan waktu; navigasi manual dan tab tersembunyi menjeda; Ulangi mereset tahap/waktu; akhir berhenti tanpa loop.
- `aria-current="step"` menandai tahap aktif; status polite hanya berubah saat tahap atau status pemutaran berubah. Tidak mengambil alih shortcut keyboard. Reduced motion menyembunyikan gerak progress; teks dan pilihan tahap tetap berfungsi. Tanpa JS dan saat cetak, semua panel terbaca.
- ReferenceVideo memuat iframe resmi setelah klik, tanpa autoplay, dengan judul dan tautan sumber permanen. Video dilabeli menurut topik sebenarnya; jangan mengklaim video lama mendemonstrasikan BC 29.x. Embed eksternal adalah pengecualian larangan CDN untuk media pembelajaran yang diminta pengguna; tidak memuat font/library eksternal.
- Verifikasi: desktop/mobile, light/dark, keyboard, reduced motion, tanpa JS, pause/resume/reset/akhir, axe dan build. Playback video eksternal harus dilaporkan terpisah dari pengujian wrapper lokal.

### 4.12 `Tabs` (bawaan Starlight) — varian bahasa/platform
Dipakai untuk **varian setara dari satu hal yang sama**: `curl | Python | C#`, atau `Windows | macOS`.
- Pakai komponen `Tabs`/`TabItem` bawaan Starlight; sinkronkan pilihan antar blok dengan `syncKey` (mis. `lang`) bila tersedia — ⚠️ verifikasi di versi terpasang.
- Tab default = varian paling umum (Python untuk contoh API). Jangan menaruh informasi **kritis** hanya di tab non-default.
- **Cheatsheet yang ditargetkan satu halaman A4 tidak memakai Tabs**; gunakan blok kode berurutan agar semua varian tercetak.

### 4.13 `Cards` (bawaan Starlight) — landing & indeks seksi
- Boleh memakai `Card`, `CardGrid`, `LinkCard` bawaan Starlight di **landing dan halaman indeks seksi**.
- Tampilan: border 1px `--bc-border`, radius md, latar `--bc-surface`, tanpa bayangan; hover hanya mengubah `border-color` ke `--bc-accent`. Tanpa gambar/ikon dekoratif.
- Satu kartu = satu tujuan + satu kalimat deskripsi.

---

## 5. Template layout halaman

| Jenis | Struktur (urut dari atas) |
|---|---|
| **Landing** | H1 + 1 kalimat tujuan → **3 kartu seksi** (*Belajar per level*, *Cheatsheets*, *Latihan*; masing-masing 1 kalimat + tautan) → **Cara memakai handbook** (3–4 baris: mulai dari level mana, kapan membuka cheatsheet, versi BC yang diverifikasi) → **Prasyarat** (akses sandbox, data demo CRONUS, tidak memakai data nyata) → status ketersediaan & progres latihan. **Tanpa hero image.** |
| **Modul** | H1 → VersionBadge + LevelBadge → Tujuan belajar → Konsep singkat → Langkah di BC → CheatBox → Kesalahan umum → Latihan terkait → Sumber resmi |
| **Cheatsheet** | H1 → VersionBadge → isi tabel/ringkas (maks. ± 1 halaman A4 saat dicetak) → Sumber resmi |
| **Latihan** | H1 → LevelBadge + estimasi → ExerciseCard |
| **Referensi/Glosarium** | H1 → tabel dua kolom (ID ↔ EN), urut abjad, bisa dicari |

### Mode cetak (khusus cheatsheet)
`@media print`: latar putih, teks hitam, sembunyikan sidebar/header/footer/pencarian, font 10.5–11pt, hindari pemutusan di tengah tabel (`break-inside: avoid`), tampilkan URL sumber di akhir.

**Implementasi (Fase 5.3):**
- Halaman cheatsheet memakai kontainer semantik sederhana dengan class `bc-cheatsheet`; layout Starlight tetap dipakai.
- CSS cetak dibatasi ke halaman yang memuat class tersebut. Gunakan named page A4 dengan margin 12mm; satu kolom agar urutan tabel mudah dibaca.
- Token cetak: `--bc-print-font` 10.5pt, `--bc-print-bg` putih, `--bc-print-text` hitam. Judul cetak memakai ukuran token `--bc-h3`; line-height memakai `--bc-line-meta`.
- Sembunyikan header, sidebar, navigasi, pagination, dan footer; tampilkan URL sumber Microsoft di akhir setiap tautan sumber. Tabel tidak dipotong di tengah dan header tabel kembali statis ketika dicetak.
- Verifikasi target satu halaman A4 dilakukan lewat hasil cetak nyata; bila belum diuji, jangan nyatakan lolos. **Perubahan font atau token wajib mengulang cetak nyata** (Geist dapat mengubah panjang baris).

---

## 6. Aksesibilitas & perilaku

- Fokus terlihat: `outline: 2px solid var(--bc-accent); outline-offset: 2px` pada semua elemen interaktif.
- Link di dalam teks **bergaris bawah**; jangan hanya mengandalkan warna.
- Urutan heading benar (satu H1; tidak melompati level).
- Semua gambar/ikon bermakna punya `alt`/`aria-label`; ikon dekoratif `aria-hidden`.
- Navigasi bisa penuh dengan keyboard; skip-link ke konten.
- Dark/light mengikuti sistem + toggle bawaan Starlight; keduanya wajib diuji.
- Reduced motion: transisi dimatikan (0s) dan gerak progress disembunyikan.

---

## 7. Aturan untuk AI agent (DO / DON'T)

**DO**
- Pakai token & komponen di dokumen ini; tambahkan ke dokumen ini sebelum membuat yang baru.
- Pilih opsi paling sederhana jika ragu.
- Uji di lebar **360px**, dark mode, dan print preview (untuk cheatsheet).
- Pertahankan struktur template halaman (Bagian 5).
- Kerjakan perubahan visual **per langkah kecil** (Lampiran A), dengan commit message dan pembaruan `docs/PROGRESS.md` di setiap langkah.

**DON'T**
- Menambah font (selain Geist self-hosted), warna, library UI (Tailwind/MUI/dll.), atau CDN.
- Menulis nilai warna/ukuran langsung di komponen.
- Mengubah copywriting/konten materi saat mengerjakan tugas UI (dan sebaliknya).
- Menambahkan animasi dekoratif, gradient, blur/translucent, ilustrasi, atau gambar stok. Animasi pembelajaran pada Bagian 4.11 diizinkan dengan kontrol pengguna.
- Memakai logo/gambar bermerek Microsoft, Dynamics 365, Next.js, atau Vercel, atau screenshot yang berisi data nyata. Jangan menyalin CSS/aset dari `nextjs.org`.
- "Mempercantik" halaman yang tidak diminta dalam langkah tersebut.

---

## 8. Checklist penerimaan UI (jalankan sebelum commit)

- [ ] Hanya token & komponen dari dokumen ini yang dipakai (grep: tidak ada hex/px/font liar di komponen).
- [ ] Light **dan** dark mode terbaca; kontras AA (termasuk teks muted dan warna sintaks code block).
- [ ] Mobile 360px: tidak ada scroll horizontal pada body; tabel/kode scroll di dalam kontainernya.
- [ ] Navigasi keyboard + fokus terlihat; skip-link berfungsi.
- [ ] VersionBadge muncul dan tervalidasi; halaman tanpa front-matter ditolak build.
- [ ] Cheatsheet: print preview rapi (≈ 1 halaman A4) — diuji dengan cetak nyata.
- [ ] Font: tidak ada request ke domain font eksternal; fallback tetap terbaca bila font diblokir.
- [ ] `bun run build` berhasil; `bun test` lulus; `bunx playwright test` lulus (route/404, overflow, light/dark, fokus, search, axe). Jika ekspektasi warna/ukuran di tes berubah karena token baru, ubah **hanya** nilai yang memang berubah dan catat di `docs/PROGRESS.md`.
- [ ] Lighthouse mobile pada landing: Accessibility ≥ 95, Performance ≥ 90.
- [ ] `docs/PROGRESS.md` diperbarui + commit message diberikan.

---

## 9. Referensi dan atribusi

- Referensi tata letak/ritme: `https://nextjs.org/docs` (diambil sebagai inspirasi; tidak ada aset atau CSS yang disalin).
- Font: Geist Sans & Geist Mono (SIL Open Font License) — self-hosted.
- Starlight (komponen & variabel bawaan): dokumentasi resmi Astro Starlight; versi terpasang tercatat di `bun.lock`.
- Pedoman tambahan yang pernah dipakai audit: Vercel Web Interface Guidelines. Keputusan visual utama tetap dokumen ini.

---

## Lampiran A — Rencana penerapan v2.0 (langkah kecil)

Satu langkah = satu commit. Jangan lompat; jalankan checklist Bagian 8 di tiap langkah. Alokasikan **tidak lebih dari ± 1 sesi kerja** untuk U2–U4 agar Fase 5.6–5.9 (konten) tidak tertunda.

| Langkah | Pekerjaan | Commit message (saran) |
|---|---|---|
| U1 | Ganti `docs/DESIGN.md` dengan v2.0 ini (hanya dokumen) | `docs: update design system to v2.0 (neutral, nextjs-docs-inspired)` |
| U2 | Ganti nilai token warna (3.1), radius md 8px, bobot & letter-spacing heading di `custom.css`; tanpa mengubah markup | `style: apply neutral color tokens and heading rhythm` |
| U3 | Pasang Geist self-hosted (3.2) + preload Sans; ukur Lighthouse & cetak A4 ulang | `style: self-host geist fonts` |
| U4 | Gaya code block (4.7), sidebar/TOC/header (4.9), kartu & Tabs (4.12–4.13) | `style: code blocks, navigation and cards` |
| U5 | Restruktur landing sesuai template baru (Bagian 5) | `feat: restructure landing into three sections` |
| U6 | Audit penuh ulang: semua route × desktop/mobile × light/dark, axe, cetak 7 cheatsheet, tangkapan layar sebelum/sesudah | `chore: ui audit after design v2.0` |

**Batas yang harus tetap dijaga:** tidak ada perubahan konten materi, tidak ada komponen baru di luar daftar 4.x, tidak ada push/deploy tanpa persetujuan pemilik.