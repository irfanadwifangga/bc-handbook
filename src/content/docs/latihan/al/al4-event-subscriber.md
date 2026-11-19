---
title: "AL4 — Event Subscriber dan Validasi Dokumen"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Intermediate
sidebar:
  order: 4
---

**Estimasi waktu:** 60 menit. **Tujuan:** Mengimplementasikan EventSubscriber pada alur posting Sales Invoice untuk memblokir dokumen bila field kustom belum terisi menggunakan ErrorInfo dan navigasi perbaikan.

## Prasyarat

Menyelesaikan jalur AL-1; membaca modul [AL-2.1 Event-driven](/04-al-developer/al-2-intermediate/01-event-driven/) dan [AL-2.2 Posting dokumen](/04-al-developer/al-2-intermediate/02-posting-dokumen/). Menyiapkan VS Code dengan extension AL terhubung ke environment Sandbox BC dengan symbols terunduh.

## Langkah

1. Buat TableExtension pada tabel "Sales Header" untuk menambahkan field `MYP Verification Note` (Text[100], DataClassification = CustomerContent, ID 50201).
2. Tambahkan PageExtension pada "Sales Invoice" card agar field baru tampil pada grup General.
3. Buka AL Explorer (`Ctrl+Alt+E`), telusuri Codeunit 80 ("Sales-Post"), lalu cari event validasi sebelum posting dokumen dijalankan (misal `OnBeforePostSalesDoc`).
4. Buat Codeunit baru (ID 50205) berisi procedure subscriber dengan dekorator `[EventSubscriber]`. Periksa nilai `IsHandled`.
5. Jika field `MYP Verification Note` bernilai kosong, bentuk objek `ErrorInfo`: tentukan Message, DetailedMessage, dan sertakan `AddNavigationAction` yang mengarahkan fokus ke halaman dokumen. Panggil `Error(ErrorInfo)`.
6. Kompilasi package AL, publish ke Sandbox demo. Lakukan dua pengujian:
   - **Kasus Negatif:** Posting Sales Invoice dengan field kosong; pastikan posting terblokir dan pesan ErrorInfo muncul dengan tombol tindakan.
   - **Kasus Positif:** Isi catatan verifikasi, jalankan posting kembali; pastikan proses invoice berhasil diposting tanpa gangguan.

## Kriteria lulus

- Field kustom tersimpan dan dapat diedit pada UI Sales Invoice Sandbox.
- Signature EventSubscriber cocok dengan symbols Codeunit target di BC 29.x.
- Posting tertahan ketika catatan kosong dengan bukti error dialog yang memiliki tombol aksi.
- Dokumen sukses terposting ketika field kustom telah diisi.

## Hint

<details><summary>Lihat hint</summary>

Gunakan snippet `teventsub` di VS Code untuk menghindari kesalahan urutan parameter atribut `[EventSubscriber]`. Pastikan parameter tabel pada procedure subscriber menggunakan kata kunci `var` jika membutuhkan mutasi state.

</details>

## Sumber resmi

- [eventsubscriber](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/attributes/devenv-eventsubscriber-attribute).
- [errorinfoclass](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/errorinfo/errorinfo-data-type).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
