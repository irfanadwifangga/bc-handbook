---
title: "M9 — Configuration Worksheet"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 9
---

**Estimasi waktu:** 90 menit. **Tujuan:** Memindahkan setup terbatas ke company kosong dan memeriksa template/questionnaire.

## Prasyarat

Baca [modul terkait](/02-intermediate/08-rapidstart/). CRONUS sumber dan company tujuan baru di sandbox, versi/schema/extensions sesuai, akses langsung tabel yang diperlukan serta data demo. Pembimbing menyiapkan dependensi baseline; paket kecil ini bukan konfigurasi penuh company.

## Langkah

1. Di Worksheet sumber, pilih No. Series beserta lines/dependensi, Payment Terms dan Customer Posting Group yang telah ditinjau. Assign Package dan pilih field yang diperlukan.
2. Export Excel, ubah hanya nilai demo yang disepakati lalu import kembali ke package. Review/Validate sampai Package Errors nol; export .rapidstart untuk dipindahkan ke tujuan bila diperlukan.
3. Di company tujuan baru, import dan review paket, pastikan company aktif, lalu Apply setelah dependensi tersedia. Jangan memasukkan posted ledger.
4. Cocokkan setup tujuan dengan sumber, termasuk akun yang dirujuk. Jelaskan mengapa kesamaan versi saja belum menggantikan kompatibilitas schema.
5. Buat satu Configuration Template default Customer dan satu Questionnaire tiga pertanyaan setup; review format jawaban secara manual sebelum Apply Answers pada target demo.

## Kriteria lulus

- Setup yang dipilih cocok pada tujuan, Package Errors nol.
- Relasi/dependensi serta field yang disertakan dapat dijelaskan.
- Satu template dan questionnaire tiga pertanyaan ditinjau.
- Perbedaan Import, Validate dan Apply dapat dibuktikan.

## Hint

<details><summary>Lihat hint</summary>

Tabel related dapat bersyarat dan tidak semuanya ditambahkan otomatis. Jangan menyimpulkan company siap posting hanya karena tiga kelompok setup berhasil dipindah.

</details>

## Sumber resmi

- [Configuration packages](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/set-up-standard-company-configuration-packages).
- [Apply configuration packages](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/apply-company-configuration-packages).
- [Customer templates](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-register-new-customers).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
