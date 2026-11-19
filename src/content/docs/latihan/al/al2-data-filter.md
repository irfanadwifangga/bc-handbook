---
title: "AL2 — Data dan filter"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Basic
sidebar:
  order: 2
---

**Estimasi waktu:** 75 menit. **Tujuan:** Menguji scope data dan total Sales Line per customer/order.

## Prasyarat

AL1, modul AL-1.5, satu Sales Order demo dan customer yang diketahui; akses baca cukup. [Indeks modul](/04-al-developer/al-1-fundamentals/).

## Langkah

1. Catat customer, document type dan nomor satu order; pastikan currency dan angka line yang akan dibandingkan jelas.
2. Tambahkan procedure OrderAmount dan FindDemoCustomer pada codeunit, lalu panggil dari action halaman latihan. Jangan menghitung lintas currency.
3. Uji order milik customer yang benar, customer berbeda, order tidak ada, dan filter tanpa hasil; catat expected/actual.
4. Tambahkan variasi FindSet untuk membaca beberapa customer bernama saja memakai SetLoadFields(Name), tanpa Get/CalcFields per baris yang tidak dibutuhkan.
5. Bandingkan CalcSums dengan jumlah line pada scope UI yang sama. Tinjau debugger/profiler atau trace query yang tersedia untuk memastikan tidak ada pola lookup N+1; catat keterbatasan alat.

## Kriteria lulus

- Filter memilih customer/order/type yang benar.
- Amount cocok dengan jumlah line tanpa VAT pada scope/currency sama.
- SetLoadFields dipakai pada pembacaan dan tidak ada lookup per baris yang tidak perlu.
- Kasus kosong/salah customer diuji; bukti kompilasi dan run tersedia.

## Hint

<details><summary>Lihat hint</summary>

SetLoadFields tidak membatasi record; SetRange/SetFilter yang menentukan scope. CalcSums mengikuti filter yang dipasang.

</details>

## Sumber resmi

- [record](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-get-find-and-next-methods).
- [partial](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-partial-records).
- [validate](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-validate-method).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
