---
title: "AL9 — Pipeline CI/CD AL-Go"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 9
---

**Estimasi waktu:** 90 menit *(Opsional)*. **Tujuan:** Menginisialisasi repositori Git berbasis template AL-Go for GitHub, mengonfigurasi rahasia pipeline, dan menjalankan kompilasi serta pengujian otomatis di GitHub Actions.

## Prasyarat

Akun GitHub, Git terpasang di komputer lokal, ekstensi AL yang sudah memiliki unit test (latihan AL7), dan pemahaman modul [AL-3.6 Praktik DevOps dan CI/CD](/04-al-developer/al-3-advanced/06-devops/).

## Langkah

1. Buat repositori baru di GitHub menggunakan template resmi `microsoft/AL-Go-PTE`.
2. Lakukan clone repositori ke komputer lokal dan letakkan kode sumber ekstensi demo ke dalam struktur direktori aplikasi (`src/` dan `test/`).
3. Pastikan file `.gitignore` mengabaikan cache lokal, file binary `.app`, folder `.alpackages/`, serta file `launch.json` yang berisi credential.
4. Buka tab Settings > Secrets and variables > Actions di GitHub dan daftarkan rahasia pipeline yang diperlukan untuk autentikasi lingkungan uji jika menggunakan target cloud sandbox.
5. Jalankan workflow manual atau lakukan push perubahan ke branch baru dan buka Pull Request.
6. Pantau eksekusi GitHub Actions workflow: verifikasi tahapan download symbols, kompilasi kode AL, eksekusi test runner, dan pengunggahan artefak build.

## Kriteria lulus

- Repositori GitHub terkonfigurasi dengan alur kerja AL-Go for GitHub standar.
- Eksekusi workflow CI pada GitHub Actions berhasil secara penuh dengan status hijau.
- Seluruh unit test dieksekusi secara otomatis dan lulus dalam runner build.
- Repositori bersih dari file kredensial, token akses, maupun file binary `.app`.

## Hint

<details><summary>Lihat hint</summary>

Gunakan workflow `CI/CD` bawaan AL-Go. Jika build gagal karena simbol, periksa konfigurasi `application` dan `platform` di manifest `app.json` agar cocok dengan image container yang diunduh pipeline.

</details>

## Sumber resmi

- [AL-Go for GitHub Repository](https://github.com/microsoft/AL-Go).
- [AL-Go Getting Started](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-algo-overview).
- [Securing GitHub Actions](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
