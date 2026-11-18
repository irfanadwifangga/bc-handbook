---
title: "M3 — Dimension wajib"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 3
---

**Estimasi waktu:** 45 menit. **Tujuan:** Membuktikan kewajiban dimension dan analisis hasilnya.

## Prasyarat

Baca [modul terkait](/02-intermediate/03-dimensions/). CRONUS sandbox terisolasi, Department/Project demo, akun jurnal latihan dan permission mengatur Default Dimensions. Tidak mengganti global dimensions company bersama.

## Langkah

1. Buat atau pilih value demo untuk Department dan Project; catat kode/value serta aturan yang diinginkan.
2. Pada akun latihan, gunakan Default Dimensions dan aturan Code Mandatory atau Same Code sesuai skenario; catat perbedaannya.
3. Preview jurnal dengan satu dimension wajib kosong. Simpan error, isi value yang benar dan ulangi preview.
4. Post jurnal demo yang telah ditinjau. Filter G/L Entries dengan dimension latihan dan bandingkan totalnya.
5. Tinjau Analysis View yang relevan beserta update/filter-nya; cocokkan angka dengan ledger dan jelaskan satu kombinasi yang dibatasi bila digunakan.

## Kriteria lulus

- Kasus dimension kosong ditolak dengan alasan yang benar.
- Transaksi valid menyimpan value yang dimaksud.
- Angka per dimension cocok dengan ledger.
- Default, aturan wajib dan filter analisis dapat dibedakan.

## Hint

<details><summary>Lihat hint</summary>

Code Mandatory mewajibkan value; Same Code juga membatasi value sesuai aturan akun. Periksa sumber default pada dokumen/baris.

</details>

## Sumber resmi

- [Dimensions](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-dimensions).
- [Financial Report definitions](https://learn.microsoft.com/en-us/dynamics365/business-central/application/base-application/table/microsoft.finance.financialreports.financial-report).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
