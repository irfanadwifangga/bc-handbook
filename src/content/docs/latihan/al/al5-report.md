---
title: "AL5 — Pembuatan Report dan Word Layout"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Intermediate
sidebar:
  order: 5
---

**Estimasi waktu:** 75 menit. **Tujuan:** Membuat objek Report baru untuk menyajikan daftar Open Vendor Ledger Entries menggunakan Word Layout yang dapat dicetak dan diekspor ke PDF.

## Prasyarat

Menyelesaikan AL-1; membaca modul [AL-2.4 Report](/04-al-developer/al-2-intermediate/04-report/) dan [AL-2.5 Performa dasar](/04-al-developer/al-2-intermediate/05-performa-dasar/). Memiliki aplikasi Microsoft Word untuk mendesain file layout template.

## Langkah

1. Buat file report baru `MYPOpenVendorReport.al` (ID 50211, prefix MYP).
2. Tentukan properti `DefaultLayout = Word` dan tautkan path `WordLayout = 'src/layout/MYPOpenVendorReport.docx'`.
3. Definisikan `dataset` dengan `dataitem` utama tabel "Vendor Ledger Entry", filter statis `Open = const(true)`, serta `RequestFilterFields = "Vendor No.", "Posting Date"`.
4. Tambahkan kolom yang diperlukan: "Entry No.", "Vendor No.", "Document Type", "Document No.", "Posting Date", "Amount", dan "Remaining Amount".
5. Siapkan `requestpage` sederhana dengan opsi pengurutan atau pengelompokan.
6. Buat file template Word awal (.docx), masukkan XML Mapping Part dataset report ke dalam tabel Microsoft Word dengan baris berulang (repeater row).
7. Kompilasi package, publish ke Sandbox, jalankan report dari menu Report Viewer BC, cetak (Print Preview) dan download sebagai PDF.
8. Bandingkan total nominal sisa tagihan pada hasil cetak PDF dengan total pada halaman daftar Vendor Ledger Entries asli.

## Kriteria lulus

- Report terdaftar dan dapat dibuka dari menu Tell Me di Business Central Sandbox.
- Desain Word Layout teraplikasi sempurna tanpa field data yang kosong atau unmapped.
- Hasil ekspor file PDF menampilkan baris data terbuka yang cocok nilainya dengan data buku besar vendor CRONUS.
- Request page mengizinkan filter dinamis nomor vendor dan tanggal.

## Hint

<details><summary>Lihat hint</summary>

Untuk mengaktifkan XML Mapping di Microsoft Word: aktifkan tab Developer pada Word Options → Ribbon, lalu klik XML Mapping Pane dan pilih Custom XML Part yang sesuai dengan schema report AL.

</details>

## Sumber resmi

- [reportobjects](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-reports).
- [wordlayouts](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-howto-report-layout).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
