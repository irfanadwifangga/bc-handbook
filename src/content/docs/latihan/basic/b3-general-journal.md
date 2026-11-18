---
title: B3 — General Journal
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 3
---

**Estimasi waktu:** 35 menit. **Tujuan:** menelusuri jurnal seimbang ke ledger dan laporan.

## Prasyarat

[Modul 1.3](/01-basic/03-general-ledger/), batch General Journal kosong di CRONUS sandbox, tanggal posting yang diizinkan dan dua akun G/L Posting demo tanpa pajak yang ditentukan pembimbing. Contoh ini setoran modal fiktif 1.000 LCY, bukan transaksi perusahaan nyata.

## Langkah

1. Catat saldo awal akun kas/modal latihan dan filter laporan. Pastikan tidak ada baris user lain di batch.
2. Buat dua baris bertanggal dan Document No. sama: debit kas latihan 1.000, kredit modal latihan 1.000. Isi Description **B3-DEMO** dan dimension bila diwajibkan.
3. Karena memakai dua baris, kosongkan balancing account yang akan menggandakan lawan transaksi. Periksa jumlah debit sama dengan kredit per dokumen.
4. Jalankan Preview Posting. Jika akun, tanggal, jumlah atau setup tidak sesuai, berhenti sebelum Post dan minta pembimbing meninjau.
5. Post, catat nomor dokumen, lalu filter General Ledger Entries pada nomor tersebut. Jalankan Trial Balance untuk periode yang sama dan cocokkan perubahan terhadap saldo awal.

## Kriteria lulus

- Bukti preview dan entry terposting menunjukkan akun, tanggal serta nilai yang direncanakan.
- Debit dan kredit dokumen seimbang; perubahan kedua akun sebesar 1.000 dengan arah benar.
- Bisa menelusuri dokumen dari jurnal ke G/L dan Trial Balance.
- Tidak ada posting langsung ke control account customer/vendor atau perubahan setup tanpa review.

## Hint

<details><summary>Lihat hint</summary>

Saldo akhir CRONUS sudah berisi transaksi demo lain. Bandingkan selisih sebelum/sesudah dan filter dokumen, jangan berharap total akun langsung menjadi 1.000. Jurnal seimbang tetap bisa salah akun.

</details>

## Sumber resmi

[General journals](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-work-general-journals), [Trial Balance](https://learn.microsoft.com/en-us/dynamics365/business-central/reports/report-6).

Belum dieksekusi penulis; hasil angka harus dibuktikan sendiri di sandbox.
