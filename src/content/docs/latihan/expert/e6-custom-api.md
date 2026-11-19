---
title: "E6 — Custom API page dan CRUD"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 6
---

**Estimasi waktu:** 120 menit. **Tujuan:** Mengekspos entity demo sendiri dan membuktikan kontrak CRUD/permission.

## Prasyarat

Modul 3B.6; VS Code AL, symbols target, ID range demo, sandbox sendiri. Kode contoh berstatus Belum dikompilasi sampai pemilik membuktikannya. Baca [Track 3B](/03-expert/integrasi-api/).

## Langkah

1. Salin contoh tabel/API/permission set ke project AL demo terpisah dan sesuaikan app.json. Jangan menggunakan kode atau ID range kantor.
2. Kompilasi sendiri, catat compiler/runtime/versi BC dan perbaiki error berdasarkan symbols. Publish hanya ke sandbox.
3. Assign permission minimum ke app. POST MYP-001, catat id dan GET record; periksa nilai yang diterima.
4. PATCH description dengan ETag terbaru, lalu uji ETag lama, kode kosong/duplikat dan app tanpa izin. Catat expected/actual tiap kasus.
5. DELETE record demo dengan ETag setelah review; GET ulang membuktikan tidak ditemukan. Dokumentasikan URL versi, field, error dan bukti kompilasi.

## Kriteria lulus

- Kompilasi dan publish sandbox dibuktikan pemilik.
- Create/read/update/delete entity demo berhasil dengan expected result.
- Konflik ETag, validasi dan permission negatif diuji.
- Kontrak API terdokumentasi tanpa data/kode kantor.

## Hint

<details><summary>Lihat hint</summary>

Untuk ODataKeyFields = SystemId, URL record memakai GUID id dari respons, bukan nilai code.

</details>

## Sumber resmi

- [custom](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-develop-custom-api).
- [auth](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication).

**Status:** Belum dijalankan di BC. Isi actual result, executor, waktu dan bukti lokal setelah praktik. Tes situs/mock tidak membuktikan kelulusan latihan.
