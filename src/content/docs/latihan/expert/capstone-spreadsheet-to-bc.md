---
title: "Capstone — Spreadsheet-to-BC"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 7
---

**Estimasi waktu:** 4–8 jam bertahap. **Tujuan:** Menggabungkan BA, konfigurasi demo dan impor master melalui API.

## Prasyarat

E1–E6, Basic/Intermediate, sandbox terisolasi dan owner simulasi. Angka waktu adalah perkiraan belajar, bukan estimasi proyek. Baca [Track 3B](/03-expert/integrasi-api/).

## Langkah

1. Tulis BRD 1–2 halaman untuk perusahaan dagang demo: scope Sales/Purchasing/Inventory/report, tujuan terukur, role dan risiko. Turunkan sepuluh kebutuhan serta gap-fit.
2. Konfigurasikan company sandbox sesuai kebutuhan: akun, posting groups, dimension, No. Series dan master pendukung. Catat baseline serta bukti transaksi demo; jangan menganggap package kecil sebagai company lengkap.
3. Buat tiga CSV demo berkolom externalKey,number,displayName; Item juga type dan baseUnitOfMeasureCode. Mapping entity→endpoint adalah Customer→customers, Vendor→vendors, Item→items. Tinjau field writable pada referensi masing-masing.
4. Bangun importer Python pada workspace latihan: parse CSV, validasi header/tipe/duplikasi/mapping, keluarkan preview payload dan rejects sebelum write. Dry-run harus membuat nol request write. Uji dengan MockTransport.
5. Setelah review, import batch kecil. Simpan mapping externalKey→BC id dan status per baris; batasi worker. Pada timeout write, cari/rekonsiliasi sebelum replay. Restart harus melewati baris sukses yang sudah direkonsiliasi; jangan menganggap nomor bisnis otomatis menjamin idempotency.
6. Uji positif, field wajib kosong, duplikat, master relasi hilang, 403, 412, 429, dan timeout setelah write. Rekonsiliasi jumlah serta nilai master di BC; jangan memaksa status Pass pada kasus Blocked.
7. Jalankan lima UAT yang trace ke kebutuhan; catat actual/evidence, defect/retest dan keputusan owner. Serahkan BRD, gap-fit, setup checklist, mapping CSV, script, hasil impor dan UAT.

## Kriteria lulus

- BRD, gap-fit dan UAT lengkap dengan trace requirement.
- Company sandbox dapat dipakai posting demo dengan konfigurasi yang direview.
- Customer/Vendor/Item masuk via API tanpa error tersisa dan tanpa duplikasi saat restart yang direkonsiliasi.
- Bukti praktik, rejects dan keputusan owner tersedia tanpa secret/data nyata.

## Hint

<details><summary>Lihat hint</summary>

Contoh client repo belum menyediakan importer CSV atau journal lengkap. Implementasi importer dan pembuktian restart merupakan pekerjaan capstone pembelajar. Capstone AL Invoice Staging adalah fase terpisah.

</details>

## Sumber resmi

- [customer](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_customer_create).
- [vendor](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_vendor_create).
- [item](https://learn.microsoft.com/en-gb/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_item_create).

**Status:** Belum dijalankan di BC. Isi actual result, executor, waktu dan bukti lokal setelah praktik. Tes situs/mock tidak membuktikan kelulusan latihan.
