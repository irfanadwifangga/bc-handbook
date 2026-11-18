---
title: "M5 — Bank reconciliation"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 5
---

**Estimasi waktu:** 60 menit. **Tujuan:** Mencocokkan statement dummy dengan ledger bank tanpa payment ganda.

## Prasyarat

Baca [modul terkait](/02-intermediate/05-bank-cash/). CRONUS sandbox, bank/account entries demo, saldo awal diketahui dan file statement dummy dalam format impor yang sudah disiapkan pembimbing.

## Langkah

1. Catat statement ending date/balance dan Bank Account Ledger Entries pembanding.
2. Buat rekonsiliasi bank, impor statement dummy dan simpan identitas file latihan agar tidak diimpor ulang tanpa sengaja.
3. Tinjau automatic matching baris demi baris. Periksa referensi, tanggal serta jumlah, termasuk transaksi bernilai sama.
4. Untuk biaya bank/payment yang belum tercatat, gunakan jurnal demo yang ditinjau dan hindari pencatatan ulang transaksi yang sudah ada.
5. Setelah selisih dan unmatched entries dipahami, Post rekonsiliasi. Simpan bukti saldo/statement lines dan ledger yang sudah direkonsiliasi.

## Kriteria lulus

- Statement dummy berhasil diimpor dengan format benar.
- Seluruh match dapat dijelaskan berdasarkan transaksi.
- Saldo akhir sesuai dan tidak ada payment duplikat.
- Bukti rekonsiliasi terposting serta penanganan selisih lengkap.

## Hint

<details><summary>Lihat hint</summary>

Saldo total sama tidak membuktikan match tiap baris benar. Jika format belum tersedia, catat blocker dan jangan menandai impor berhasil.

</details>

## Sumber resmi

- [Reconciliation dan application](https://learn.microsoft.com/en-us/dynamics365/business-central/receivables-apply-payments-auto-reconcile-bank-accounts).
- [Posting groups](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-posting-groups).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
