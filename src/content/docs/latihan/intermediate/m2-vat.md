---
title: "M2 — VAT demo"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 2
---

**Estimasi waktu:** 45 menit. **Tujuan:** Mencocokkan dasar pajak, persentase simulasi dan akun VAT pada sales/purchase.

## Prasyarat

Baca [modul terkait](/02-intermediate/02-posting-groups/). Salinan CRONUS, VAT groups demo baru, akun VAT serta calculation type yang ditinjau pembimbing. Angka 11% adalah simulasi matematika sandbox, bukan penetapan tarif/aturan pajak Indonesia.

## Langkah

1. Tentukan dua transaksi tanpa diskon, harga tidak termasuk pajak dan dasar masing-masing 100 LCY. Gunakan calculation type Normal VAT untuk simulasi sederhana bila sesuai lokalisasi latihan.
2. Isi kombinasi VAT demo dengan 11% dan akun sales/purchase VAT yang disetujui; jangan mengubah kombinasi pajak operasional.
3. Buat satu sales invoice dan satu purchase invoice demo, periksa VAT groups pada header/baris dan Preview Posting.
4. Pastikan tiap transaksi menghasilkan VAT 11 LCY dan total 111 LCY pada kondisi simulasi. Jika lokalisasi memakai mekanisme lain, hentikan skenario ini dan dokumentasikan penyesuaian dengan pembimbing.
5. Post hanya setelah review; telusuri VAT Entries dan G/L VAT masing-masing transaksi, lalu cocokkan ke dokumen.

## Kriteria lulus

- Asumsi kalkulasi simulasi dicatat.
- Akun dan kombinasi VAT pada kedua sisi benar.
- Dokumen, VAT Entries dan G/L cocok pada scope latihan.
- Bisa membedakan persentase demo dari kewajiban pajak nyata.

## Hint

<details><summary>Lihat hint</summary>

Jika jumlah berbeda, periksa Prices Including VAT, calculation type, diskon dan rounding. Jangan memaksa hasil dengan mengubah amount manual.

</details>

## Sumber resmi

- [VAT setup](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-setup-vat).
- [VAT pada transaksi](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-work-with-vat).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
