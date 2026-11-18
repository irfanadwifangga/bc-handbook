---
title: B4 — Sales end-to-end
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 4
---

**Estimasi waktu:** 60 menit. **Tujuan:** menyelesaikan penjualan demo dan membuktikan invoice lunas.

## Prasyarat

[Modul 1.4](/01-basic/04-sales/) dan [pilot interaktif](/01-basic/alur-sales/). Gunakan CRONUS sandbox, customer demo, item Inventory dengan stok minimal dua unit, bank demo dan posting setup yang sudah ditinjau. Pakai currency LCY agar latihan tidak menambah kasus kurs; pajak mengikuti setup demo yang berlaku.

## Langkah

1. Catat stok awal. Buat Sales Quote untuk dua unit, tinjau harga/UoM/location, lalu Make Order. Catat kedua nomor dokumen.
2. Pada order, periksa kuantitas dan Preview Posting, lalu Post **Ship and Invoice**. Catat Posted Sales Shipment dan Posted Sales Invoice.
3. Telusuri invoice di Customer Ledger Entries serta kuantitas keluar di Item Ledger Entries.
4. Pada Cash Receipt Journals, catat payment customer dengan balancing Bank Account demo. Gunakan jumlah total invoice, periksa tanda penerimaan dan isi Applies-to Doc. No. untuk invoice latihan. Preview sebelum Post.
5. Bila payment sudah diposting tanpa application, lakukan Apply Entries dari Customer Ledger Entries lalu Post Application sesuai [panduan pembayaran](/01-basic/04-sales/). Hindari application ke invoice CRONUS lain.
6. Rekam invoice, payment, application, Remaining Amount dan status Open. Jangan menyertakan identitas customer nyata atau informasi bank nyata.

## Kriteria lulus

- Quote/order dapat ditelusuri ke shipment dan invoice yang sesuai.
- Item Ledger menunjukkan keluar dua unit, tanpa penjualan ganda.
- Payment diaplikasikan ke invoice yang benar; Remaining Amount nol dan invoice entry tertutup.
- Bisa menjelaskan perbedaan Ship, Invoice, Payment dan Apply.

## Hint

<details><summary>Lihat hint</summary>

Jangan menilai lunas hanya dari adanya payment. Periksa invoice spesifik. Bila sisa tidak nol, cek jumlah termasuk pajak, payment discount, currency dan invoice yang dipilih sebelum mengubah apa pun.

</details>

## Sumber resmi

[Posting sales](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-post-sales), [payment/application](https://learn.microsoft.com/en-us/dynamics365/business-central/receivables-how-apply-sales-transactions-manually).

Belum dieksekusi penulis; tidak ada pembayaran bank sungguhan melalui situs.
