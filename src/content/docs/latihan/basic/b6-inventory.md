---
title: B6 — Inventory
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 6
---

**Estimasi waktu:** 40 menit. **Tujuan:** membedakan kuantitas persediaan dari nilai biayanya.

## Prasyarat

[Modul 1.6](/01-basic/06-inventory/), item Inventory demo dengan Base UoM jelas, batch Item Journal kosong, setup biaya/akun yang ditinjau pembimbing dan location sederhana tanpa advanced warehouse di CRONUS sandbox.

## Langkah

1. Catat Inventory awal, location, UoM dan Costing Method. Pilih tanggal posting yang diizinkan dan biaya demo untuk adjustment masuk.
2. Isi Item Journal dengan Positive Adjmt. lima unit serta Document No. **B6-DEMO-IN** atau number series yang berlaku. Tinjau hasil sebelum Post.
3. Buka Item Ledger Entries untuk item/dokumen itu. Telusuri Value Entries terkait dan catat Quantity serta nilai biaya yang relevan.
4. Buat Negative Adjmt. dua unit dengan nomor dokumen baru, location/UoM sama, dan kuantitas positif pada entry type pengurangan. Tinjau sebelum Post, lalu periksa entry hasilnya.
5. Bandingkan stok awal dan akhir: perubahan bersih tiga unit bila tidak ada transaksi lain. Jelaskan mengapa nilai biaya tidak dapat dihitung dari harga jual semata; catat expected/actual cost bila muncul.

## Kriteria lulus

- Bukti menunjukkan adjustment masuk lima dan keluar dua unit.
- Perubahan stok bersih tiga unit dengan scope item/location/UoM konsisten.
- Bisa menunjuk Item Ledger untuk kuantitas dan Value Entries untuk nilai terkait.
- Perbedaan biaya/kuantitas dijelaskan tanpa mengedit stok atau mengubah costing method sembarangan.

## Hint

<details><summary>Lihat hint</summary>

Periksa tanda entry yang terposting, bukan hanya field Quantity pada jurnal. Satu Item Ledger Entry dapat terkait beberapa Value Entries; jangan menganggap selalu satu baris nilai per satu baris pergerakan.

</details>

## Sumber resmi

[Inventory journals](https://learn.microsoft.com/en-us/dynamics365/business-central/inventory-how-count-adjust-reclassify), [expected cost/value entries](https://learn.microsoft.com/en-us/dynamics365/business-central/design-details-expected-cost-posting).

Belum dieksekusi penulis; angka biaya akhir bergantung setup dan transaksi sandbox.
