---
title: "AL3 — Setup dan Request demo"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Basic
sidebar:
  order: 3
---

**Estimasi waktu:** 150 menit. **Tujuan:** Membuat Setup single-record dan dokumen bernomor melalui No. Series.

## Prasyarat

AL1–AL2; modul AL-1.6; ID range bebas konflik; pemilik menyiapkan No. Series dan user uji. [Indeks modul](/04-al-developer/al-1-fundamentals/).

## Langkah

1. Buat Setup table/card dari modul permission. Pastikan seluruh kode memakai key konvensional kosong dan halaman tidak membuat key lain.
2. Buat tabel MYP Request dengan No., Description serta validasi yang jelas; Card dan List terhubung dengan CardPageId dan dapat ditemukan lewat Tell Me.
3. Buat seri demo melalui UI, isi Request Nos. pada setup; pada OnInsert gunakan No. Series.GetNextNo sebagaimana referensi resmi. Hindari Max+1 dan Commit untuk alokasi nomor.
4. Buat permission set minimum untuk objek/data demo dan tinjau dependency No. Series bersama pembimbing. Uji memakai user terpisah dengan effective permissions yang dicatat.
5. Buat dua request dan buka ulang; uji setup hilang, seri kosong/tidak valid serta user tanpa hak write. Jangan menghapus setup/data yang digunakan latihan lain.
6. Catat nomor unik sesuai konfigurasi, persistensi, pesan negatif, compiler/BC/version/date dan hak efektif. Tidak menjanjikan nomor bebas celah.

## Kriteria lulus

- Setup konsisten satu record melalui semua jalur demo dan Request Card/List dapat digunakan.
- Nomor unik mengikuti seri/tanggal yang dikonfigurasi, tanpa Max+1.
- User uji punya hak minimum yang dibuktikan; akses yang tidak diizinkan ditolak.
- Missing setup/series serta persistensi diuji di sandbox dengan bukti.

## Hint

<details><summary>Lihat hint</summary>

Key kosong adalah konvensi semua caller, bukan constraint single-record otomatis. Periksa trigger Insert(true) dan setup sebelum mengubah logika nomor.

</details>

## Sumber resmi

- [permission](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-permissionset-object).
- [series](https://learn.microsoft.com/en-us/dynamics365/business-central/application/business-foundation/codeunit/microsoft.foundation.noseries.no.-series).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
