---
title: "AL1 — Hello extension"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Basic
sidebar:
  order: 1
---

**Estimasi waktu:** 90 menit. **Tujuan:** Mengompilasi dan menampilkan field customer demo.

## Prasyarat

Basic selesai, VS Code AL dan sandbox sendiri; baca AL-1.1–AL-1.4 serta AL-1.7. [Indeks modul](/04-al-developer/al-1-fundamentals/).

## Langkah

1. Buat folder project demo kosong terpisah; scaffold AL: Go!, review app.json/runtime/dependency/idRanges dan launch target Sandbox.
2. Download symbols dan buat field customer serta PageExtension pada modul objek; pilih ID bebas konflik. Tambah codeunit DiscountedAmount dan action pada halaman demo untuk memanggilnya.
3. Kompilasi, catat compiler/versi BC/date; bila gagal simpan error pertama yang relevan dan cocokkan symbols.
4. Publish sendiri ke Sandbox, buka customer CRONUS, isi note, tutup/buka lagi. Uji amount 100 percent 10, 0, 100 serta -1/101.
5. Debug satu kasus negatif dengan breakpoint/call stack. Dokumentasikan hasil dan fungsi setiap objek; jangan menyertakan tenant ID atau kredensial.

## Kriteria lulus

- Field tampil dan tersimpan pada customer demo.
- App terpasang di Sandbox dan bukti compile/versi/tanggal ada.
- Procedure lulus kasus normal dan menolak input invalid dengan bukti actual.
- PTE vs AppSource serta manifest dapat dijelaskan.

## Hint

<details><summary>Lihat hint</summary>

Jika field ada di tabel tetapi UI kosong, periksa PageExtension, ApplicationArea, anchor, publish dan role.

</details>

## Sumber resmi

- [start](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-get-started).
- [tableext](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object).
- [pageext](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-ext-object).
- [debug](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-debugging).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
