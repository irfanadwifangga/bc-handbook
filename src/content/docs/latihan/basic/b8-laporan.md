---
title: B8 — Laporan
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 8
---

**Estimasi waktu:** 45 menit. **Tujuan:** mencocokkan tiga laporan dengan ledger pada scope yang sama dan mengekspor hasil ke Excel.

## Prasyarat

[Modul 1.7](/01-basic/07-laporan/), bukti B3–B5 dan CRONUS sandbox yang sama. Hak membaca report/ledger serta membuka output Excel. Bila report atau Excel tidak tersedia, catat hambatan; jangan tandai bagian itu lulus.

## Langkah

1. Catat company, tanggal akhir/periode, currency dan dimension. Gunakan tanggal setelah semua posting latihan agar pemeriksaan awal tidak menambah kasus historis.
2. Jalankan Trial Balance. Cocokkan pergerakan akun dari B3 dengan G/L Entries pada periode/filter sama; jangan menjumlahkan akun total dan detail ganda.
3. Jalankan Aged Accounts Receivable dan Aged Accounts Payable. Catat varian report, basis aging, tanggal akhir dan filter pihak demo.
4. Cocokkan saldo customer/vendor latihan dengan invoice dan payment B4/B5. Jika keduanya sudah lunas pada tanggal akhir, jelaskan saldo nol; untuk melihat aging yang tidak nol, gunakan entry demo open lain dan catat asalnya.
5. Ekspor ketiga hasil ke Excel melalui output/varian report yang tersedia. Jika beralih ke report Excel lain, catat nama dan filter; Open in Excel pada list bukan bukti report yang sama sudah diekspor.
6. Buat tabel report → filter → angka → ledger pembanding → selisih/alasan. Simpan hanya file berisi data demo.

## Kriteria lulus

- Ketiga report dapat dijalankan dan output Excel-nya diperiksa.
- Angka cocok dengan ledger pada company, tanggal, currency dan dimension yang sama.
- Setiap selisih dapat dijelaskan; tidak mengubah transaksi agar laporan terlihat cocok.
- Bisa menjelaskan saldo open saat ini versus saldo historis dan basis aging yang digunakan.

## Hint

<details><summary>Lihat hint</summary>

Pembayaran sesudah ending date dapat membuat laporan historis berbeda dari Remaining Amount sekarang. Mulai dari transaksi yang kamu kenal sebelum merekonsiliasi seluruh CRONUS.

</details>

## Sumber resmi

[Trial Balance](https://learn.microsoft.com/en-us/dynamics365/business-central/reports/report-6), [reporting overview](https://learn.microsoft.com/en-us/dynamics365/business-central/reports-bi-reporting), [available reports](https://learn.microsoft.com/en-us/dynamics365/business-central/reports-available-reports).

Belum dieksekusi penulis; checklist ini tidak menyatakan hasil rekonsiliasi telah lulus.
