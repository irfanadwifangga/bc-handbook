---
title: "E4 — API baca"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 4
---

**Estimasi waktu:** 60 menit. **Tujuan:** Mengambil token S2S dan membaca company/customer dengan query serta paging.

## Prasyarat

Modul 3B.1–3B.3, admin yang menyiapkan app demo, sandbox CRONUS dan permission baca. Jika belum tersedia, status praktik Blocked. Baca [Track 3B](/03-expert/integrasi-api/).

## Langkah

1. Catat kontrak endpoint, versi, role app dan company yang dipilih; jangan menyimpan tenant ID/token pada bukti publik.
2. Pemilik menyiapkan environment kredensial, mengambil token melalui client, lalu GET companies. Pilih CRONUS yang cocok dengan UI.
3. GET customers dengan filter/select/top; uji hasil kosong dan satu record demo yang diketahui.
4. Uji paging dengan Prefer maxpagesize kecil; bandingkan jumlah/ID terhadap scope query. Jangan gunakan top untuk mengklaim ekspor lengkap.
5. Jalankan test mock nextLink asing dan 429; uji permission negatif di sandbox tanpa membanjiri API. Catat actual/evidence dan hal yang belum dijalankan.

## Kriteria lulus

- Query/paging menghasilkan data sesuai scope dan company.
- Token/secret tidak berada di log atau repo.
- Bukti run Python nyata di sandbox tersedia; mock dicatat terpisah.
- Kasus akses ditolak/hasil kosong dapat dijelaskan.

## Hint

<details><summary>Lihat hint</summary>

Jika 403 muncul setelah token sukses, periksa permission BC dan company scope, bukan hanya consent Entra.

</details>

## Sumber resmi

- [auth](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication).
- [paging](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/server-driven-paging-in-odata-web-services).
- [query](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/odata-client-performance).

**Status:** Belum dijalankan di BC. Isi actual result, executor, waktu dan bukti lokal setelah praktik. Tes situs/mock tidak membuktikan kelulusan latihan.
