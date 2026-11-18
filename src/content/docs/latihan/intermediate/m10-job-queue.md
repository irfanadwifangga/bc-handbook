---
title: "M10 — Job Queue debugging"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 10
---

**Estimasi waktu:** 50 menit. **Tujuan:** Membuktikan diagnosis error dan satu run background yang berhasil.

## Prasyarat

Baca [modul terkait](/02-intermediate/14-job-queue/). Salinan CRONUS sandbox, report nonposting yang didukung background, user uji dan skenario error aman yang dipilih pembimbing. Tidak memakai job terjadwal bersama/produksi.

## Langkah

1. Buat job latihan On Hold, catat object ID dari lookup yang valid, parameter dan output. Batasi percobaan; gunakan run sekali bila cukup.
2. Dengan pembimbing, siapkan satu error aman, misalnya permission Execute report yang belum diberikan pada user job khusus latihan. Jangan merusak setup posting atau integrasi.
3. Set Ready dan temukan error pada job/log terkait. Rekam pesan, waktu, user dan kondisi yang menyebabkan gagal.
4. Perbaiki akar masalah pada user/input latihan, tinjau kemungkinan hasil parsial lalu restart satu kali. Cari log sukses serta output yang benar.
5. Kembalikan job latihan ke nonaktif/On Hold bila recurring. Jelaskan bahwa Ready sesudah recurring run tidak sama dengan bukti sukses tanpa log.

## Kriteria lulus

- Error aman dapat ditelusuri ke log dan penyebab.
- Perbaikan tepat sasaran, tanpa permission berlebihan.
- Ada log sukses dan output setelah perbaikan.
- Jadwal latihan ditutup dan tidak meninggalkan proses aktif.

## Hint

<details><summary>Lihat hint</summary>

Gunakan Log Entries dari job yang sama. On Hold mencegah run baru, tetapi bukan tombol membatalkan run yang sudah In Process.

</details>

## Sumber resmi

- [Job queues](https://learn.microsoft.com/en-us/dynamics365/business-central/admin-job-queues-schedule-tasks).
- [Job queue execution](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-job-queue).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
