---
title: B5 — Purchase end-to-end
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 5
---

**Estimasi waktu:** 60 menit. **Tujuan:** menambah stok melalui pembelian dan menutup invoice vendor dengan payment yang sesuai.

## Prasyarat

[Modul 1.5](/01-basic/05-purchasing/), CRONUS sandbox, vendor dan item Inventory demo, location sederhana, bank demo serta setup yang sudah ditinjau. Gunakan LCY dan satuan dasar. Tidak ada ekspor payment file atau transfer uang nyata.

## Langkah

1. Catat Inventory awal pada item/location latihan. Buat Purchase Order untuk lima unit dengan biaya demo yang ditentukan pembimbing.
2. Periksa kuantitas penerimaan/invoice, tanggal, UoM, pajak dan Vendor Invoice No. demo yang unik.
3. Preview lalu Post **Receive and Invoice**. Catat Posted Purchase Receipt dan Posted Purchase Invoice. Periksa Item Ledger Entries dan Vendor Ledger Entries.
4. Pada Payment Journals, catat payment vendor dengan balancing Bank Account demo; pilih invoice latihan melalui Apply Entries atau Applies-to Doc. No. Cocokkan jumlah termasuk pajak dan periksa arah pembayaran.
5. Preview, lalu Post jika hasil sesuai. Tinjau Remaining Amount/Open invoice dan payment; simpan rantai nomor dokumen sebagai bukti.

## Kriteria lulus

- Receipt dan invoice vendor dapat ditelusuri dari order yang sama.
- Stok item/location bertambah lima unit dibanding sebelum latihan, tanpa pembelian ganda.
- Payment cocok dengan invoice; Remaining Amount nol dan invoice entry tertutup.
- Bisa membedakan utang vendor, pembayaran tercatat, dan pengiriman uang melalui bank nyata.

## Hint

<details><summary>Lihat hint</summary>

Untuk penerimaan parsial, jangan memakai angka order penuh secara otomatis. Jika invoice belum bisa diposting, periksa receipt dan kuantitas; jangan membuat invoice kedua dengan baris item baru untuk barang yang sama.

</details>

## Sumber resmi

[Record purchases](https://learn.microsoft.com/en-us/dynamics365/business-central/purchasing-how-record-purchases), [vendor payment application](https://learn.microsoft.com/en-us/dynamics365/business-central/payables-how-apply-purchase-transactions-manually).

Belum dieksekusi penulis; selisih harus dijelaskan dengan bukti ledger sandbox.
