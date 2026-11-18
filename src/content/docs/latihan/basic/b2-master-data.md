---
title: B2 — Master data
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 2
---

**Estimasi waktu:** 60 menit. **Tujuan:** membuat master data konsisten dari template, tanpa data pihak nyata.

## Prasyarat

[Modul 1.2](/01-basic/02-master-data/), CRONUS sandbox dengan hak membuat master data, template dan posting setup demo yang disetujui pembimbing. Gunakan prefix deskripsi **B2-DEMO**; biarkan number series membuat ID bila sudah dikonfigurasi.

## Langkah

1. Catat daftar template Customer, Vendor dan Item yang sesuai. Bila belum ada, minta pembimbing menyiapkannya dari konfigurasi demo; jangan menebak akun/posting group.
2. Buat tiga Customer dan tiga Vendor bernama fiktif melalui template. Isi field wajib, alamat demo dan payment terms yang relevan.
3. Buat lima Item: tiga Inventory dan dua Service. Tentukan deskripsi serta Base Unit of Measure; periksa posting groups yang relevan dengan tipe dan transaksi yang direncanakan.
4. Buka ulang semua sebelas record. Catat ID, template, tipe, UoM dan hasil pemeriksaan posting setup dalam tabel lokal.
5. Bandingkan nilai yang diisi template dengan nilai yang kamu ubah. Jelaskan satu kegunaan dimension tanpa menambah akun G/L untuk tiap departemen.

## Kriteria lulus

- Tersedia 3 Customer, 3 Vendor dan 5 Item demo; tidak ada duplikasi ID.
- Field wajib untuk skenario latihan lengkap dan posting groups relevan terisi serta cocok dengan setup.
- Tiga Inventory dan dua Service memiliki tipe/UoM yang tepat.
- Bisa menjelaskan bahwa template tidak membuktikan transaksi pasti lolos posting.

## Hint

<details><summary>Lihat hint</summary>

Template tunggal dapat dipakai otomatis saat New; beberapa template memunculkan pilihan. Review card setelah pembuatan. Jangan memakai Apply Template massal pada record CRONUS lama untuk menyelesaikan latihan ini.

</details>

## Sumber resmi

[Customers](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-register-new-customers), [vendors](https://learn.microsoft.com/en-us/dynamics365/business-central/purchasing-how-register-new-vendors), [items](https://learn.microsoft.com/en-us/dynamics365/business-central/inventory-how-register-new-items).

Belum dieksekusi penulis; checklist adalah kriteria praktik, bukan hasil tes sandbox.
