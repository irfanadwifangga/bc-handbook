---
title: "AL7 — Testing otomatis"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 7
---

**Estimasi waktu:** 90 menit. **Tujuan:** Membuat dan menjalankan rangkaian unit test otomatis pada AL Test Tool untuk memverifikasi logika setup dan pemblokiran event subscriber.

## Prasyarat

Menyelesaikan latihan AL1–AL4, memiliki sandbox Business Central dengan ekstensi pengujian atau AL Test Tool aktif, serta referensi modul [AL-3.1 Testing otomatis](/04-al-developer/al-3-advanced/01-testing/).

## Langkah

1. Buat file codeunit pengujian baru dengan properti `Subtype = Test` dan `TestIsolation = Codeunit` di direktori proyek latihan.
2. Tulis skenario pengujian positif untuk logika Setup (AL3): verifikasi bahwa record setup demo dapat diinisialisasi dan dibaca dengan benar.
3. Tulis skenario pengujian negatif untuk logika pemblokiran posting event subscriber (AL4): simulasikan kondisi ketika field kustom kosong atau tidak valid, dan pastikan assertion menangkap pesan galat yang diharapkan.
4. Buat minimal satu prosedur pengujian yang menggunakan `TestPage` atau handler UI (`[ConfirmHandler]`, `[MessageHandler]`) untuk memastikan dialog tidak menggantung eksekusi runner otomatis.
5. Publikasikan ekstensi pengujian ke sandbox, buka halaman AL Test Tool (Page 130451), buat suite pengujian baru, dan muat codeunit pengujian MYP.
6. Jalankan seluruh pengujian (Run Selected / Run All) dan catat hasil eksekusi (Pass / Fail) serta log assertion.

## Kriteria lulus

- Codeunit pengujian terkompilasi tanpa galat dengan `Subtype = Test`.
- Minimal terdapat 1 kasus uji positif dan 1 kasus uji negatif untuk setiap perilaku logika bisnis.
- Semua pengujian berhasil dieksekusi dengan status hijau (Pass) pada AL Test Tool.
- Transaksi pengujian terisolasi dan tidak meninggalkan rekaman kotor di basis data operasional sandbox.

## Hint

<details><summary>Lihat hint</summary>

Gunakan fungsi `asserterror` di depan pemanggilan prosedur untuk menguji skenario negatif. Pastikan handler dialog didefinisikan jika prosedur memicu konfirmasi pengguna.

</details>

## Sumber resmi

- [Testing in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-testing-application).
- [AL Test Tool Page](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-test-tool).
- [AssertError Statement](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/system/system-asserterror-method).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
