---
title: "M7 — Migrasi master lewat Excel"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 7
---

**Estimasi waktu:** 75 menit. **Tujuan:** Mengimpor 50 Item dan 20 Customer demo dengan kontrol jumlah serta validasi.

## Prasyarat

Baca [modul terkait](/02-intermediate/08-rapidstart/). CRONUS sandbox, Edit in Excel/add-in yang berfungsi pada halaman terkait, posting setup/template valid dan dataset fiktif. Gunakan batch deskripsi M7-DEMO.

## Langkah

1. Siapkan tabel 50 Item dan 20 Customer dengan key unik. Periksa tipe Item, UoM, posting groups dan relasi; jangan sertakan data pelanggan nyata.
2. Catat jumlah awal dan identitas batch. Buka Edit in Excel pada halaman yang mendukung, bukan Open in Excel.
3. Uji publish satu record tiap tipe terlebih dahulu dan verifikasi di BC. Perbaiki sumber bila validasi gagal; jangan mematikan validation.
4. Publish sisa record dalam batch terkendali. Refresh dan catat error per record agar retry tidak membuat duplikasi.
5. Hitung hasil menggunakan filter batch/key: tepat 50 Item dan 20 Customer termasuk pilot. Jika halaman/add-in tidak mendukung skenario, catat blocker; M9 adalah latihan RapidStart terpisah, bukan bukti M7 lulus.

## Kriteria lulus

- Tepat 50 Item dan 20 Customer demo terverifikasi.
- Key, field wajib dan relasi valid tanpa duplikasi.
- Tidak ada error publish yang belum diselesaikan.
- Jumlah awal/akhir serta bukti retry terdokumentasi.

## Hint

<details><summary>Lihat hint</summary>

Template dan number series harus sesuai cara halaman menerbitkan data. Jangan menghitung row Excel sebagai bukti record sudah tersimpan di BC.

</details>

## Sumber resmi

- [Open/Edit in Excel](https://learn.microsoft.com/en-us/dynamics365/business-central/across-work-with-excel).
- [Customer templates](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-register-new-customers).
- [Item templates](https://learn.microsoft.com/en-us/dynamics365/business-central/inventory-how-register-new-items).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
