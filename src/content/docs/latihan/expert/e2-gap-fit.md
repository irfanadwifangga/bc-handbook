---
title: "E2 — Gap-fit analysis"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Expert
sidebar:
  order: 2
---

**Estimasi waktu:** 90 menit. **Tujuan:** Menyusun sepuluh kebutuhan, BRD ringkas dan matriks keputusan solusi.

## Prasyarat

Baca [modul terkait](/03-expert/business-analysis/04-gap-fit/). Hasil E1, perusahaan dagang demo lima user, CRONUS sandbox serta [cheatsheet #15](/cheatsheets/15-gap-fit-analysis/). Semua klasifikasi awal merupakan hipotesis.

## Langkah

1. Tulis BRD ringkas: tujuan, stakeholder, scope, risiko, asumsi dan keputusan terbuka. Buat sepuluh kebutuhan R01–R10 dengan acceptance.
2. Bandingkan tiap kebutuhan dengan proses/fitur standar BC yang relevan. Rekam versi, setup, role, data demo dan bukti pemeriksaan.
3. Isi delapan kolom matriks wajib: ID, kebutuhan, modul, status, fitur/halaman, catatan/solusi, prioritas dan effort. Tambahkan owner/evidence pada dokumen kerja.
4. Untuk setiap gap, bandingkan konfigurasi, app, customization dan workaround. Catat dependency, risiko upgrade serta bagian kebutuhan yang belum dipenuhi.
5. Pilih satu gap untuk draft functional specification, tautkan requirement ID dan acceptance positif/negatif, lalu review keputusan dengan owner simulasi.

## Kriteria lulus

- Sepuluh kebutuhan lengkap dan dapat diuji.
- Seluruh baris matriks terisi dengan bukti atau status belum terbukti yang jelas.
- Setiap gap memiliki rekomendasi, risiko dan keputusan yang diperlukan.
- BRD, satu draft spesifikasi dan trace ke proses tersedia tanpa klaim sign-off palsu.

## Hint

<details><summary>Lihat hint</summary>

Tidak menemukan fitur pada satu role bukan bukti fitur tidak ada. Periksa setup/permission/app; jangan menjadikan ukuran effort relatif sebagai janji durasi.

</details>

## Sumber resmi

- [Requirements](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution-define-requirements).
- [Fit-to-standard dan fit-gap](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution-fit-to-standard-fit-gap-analysis).
- [Functional/technical design documents](https://learn.microsoft.com/en-us/dynamics365/guidance/patterns/create-functional-technical-design-document).

Latihan belum dieksekusi penulis. Gunakan data demo; jangan menyimpan data pelanggan, identitas tenant atau kredensial dalam dokumen/bukti yang dibagikan.
