---
title: B7 — Koreksi
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Basic
sidebar:
  order: 7
---

**Estimasi waktu:** 45 menit. **Tujuan:** membetulkan invoice demo dan mempertahankan jejak audit yang dapat ditelusuri.

## Prasyarat

[Modul 1.8](/01-basic/08-konsep-posting/). Gunakan CRONUS sandbox terpisah dari transaksi B4/B5, customer demo dan akun G/L pendapatan demo yang ditentukan pembimbing. Buat invoice jasa/baris G/L tanpa pergerakan barang untuk membatasi kasus; gunakan setup pajak demo yang sudah benar.

## Langkah

1. Tentukan nilai skenario yang benar 100 LCY sebelum pajak, lalu buat dan Post Sales Invoice demo senilai 120 LCY sebelum pajak sebagai kesalahan yang disengaja. Jangan apply payment.
2. Catat invoice dan Customer/G/L Entries, termasuk nilai pajak bila berlaku. Identifikasi asal dokumen dan status unpaid sebelum memilih koreksi.
3. Gunakan Correct/Cancel hanya jika dokumen memenuhi syarat. Untuk Correct, tinjau corrective credit memo dan invoice pengganti sebelum posting nilai benar. Jika fitur tidak tersedia, buat corrective credit memo sesuai panduan dan invoice baru; jangan memaksa Reverse Transaction.
4. Telusuri application pembalik ke invoice salah dan pastikan nilai salah telah dinetralkan. Invoice pengganti yang belum dibayar memang masih open.
5. Susun tabel nomor invoice asal, credit memo, invoice pengganti dan perubahan bersih. Jelaskan mengapa tagihan tersisa harus senilai 100 sebelum pajak ditambah pajak yang sesuai, bukan nol untuk seluruh skenario.

## Kriteria lulus

- Kesalahan 120 dibalik dengan dokumen koreksi yang dapat ditelusuri.
- Invoice benar 100 sebelum pajak tercatat satu kali; saldo akhir sesuai skenario.
- Bukti ledger dan hubungan dokumen lengkap, tanpa menghapus sejarah.
- Bisa menjelaskan alasan jalur koreksi yang dipilih dan batasnya.

## Hint

<details><summary>Lihat hint</summary>

Invoice awal unpaid bukan satu-satunya pertimbangan. Periksa kondisi dokumen dan dukungan action. Jika memerlukan credit memo manual, pastikan apply ke invoice yang salah; refund tidak diperlukan karena contoh ini belum menerima payment.

</details>

## Sumber resmi

[Correct/Cancel](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-correct-cancel-sales-invoice), [credit memo](https://learn.microsoft.com/en-us/dynamics365/business-central/sales-how-process-sales-returns-cancellations), [reverse journal](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-how-reverse-journal-posting).

Belum dieksekusi penulis; ini kasus sandbox untuk belajar, bukan prosedur koreksi produksi.
