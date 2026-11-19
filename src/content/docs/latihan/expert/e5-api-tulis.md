---
title: "E5 — API tulis dan posting"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 5
---

**Estimasi waktu:** 90 menit. **Tujuan:** Membuat draft invoice, menangani konflik ETag dan memverifikasi posting sandbox.

## Prasyarat

E4 selesai; modul 3B.4–3B.5; vendor/item, pajak, posting groups, tanggal dan permission demo sudah direview. Posting memerlukan izin latihan pemilik. Baca [Track 3B](/03-expert/integrasi-api/).

## Langkah

1. Siapkan satu JSON invoice dengan external run ID lokal dan header/lines demo; review target sandbox.
2. Buat draft sekali, simpan id dan periksa total/quantity/status di UI. Simulasikan partial failure/timeout write lewat mock; jangan otomatis mengulang POST.
3. GET ETag, PATCH field yang diperbolehkan; buat konflik dengan ETag lama. Catat 412, baca ulang dan review sebelum mencoba perubahan baru.
4. Simulasikan 429 melalui mock dan periksa cooldown/batas retry. Jangan sengaja membuat beban tenant untuk memicu throttling.
5. Setelah review, pemilik menjalankan Microsoft.NAV.post pada draft demo. Tautkan posted invoice ke ledger dan catat hasil 204 serta bukti bisnis; bila hasil ambigu, rekonsiliasi dahulu.

## Kriteria lulus

- Header dan lines draft cocok dengan JSON dan setup demo.
- 412 tidak menimpa perubahan; 429 ditangani dengan batas retry.
- Posted invoice dan ledger terbukti di sandbox, bukan hanya respons HTTP.
- Write timeout tidak membuat duplikasi karena replay tanpa review.

## Hint

<details><summary>Lihat hint</summary>

Respons posting 204 tidak memiliki JSON; cari bukti pada dokumen posted dan ledger.

</details>

## Sumber resmi

- [create](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_purchaseinvoice_create).
- [patch](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_purchaseinvoice_update).
- [invoice](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/resources/dynamics_purchaseinvoice).
- [limits](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/dynamics-rate-limits).

**Status:** Belum dijalankan di BC. Isi actual result, executor, waktu dan bukti lokal setelah praktik. Tes situs/mock tidak membuktikan kelulusan latihan.
