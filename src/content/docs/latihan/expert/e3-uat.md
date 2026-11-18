---
title: "E3 — UAT planning dan execution"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Expert
sidebar:
  order: 3
---

**Estimasi waktu:** 120 menit. **Tujuan:** Menyusun lima test script, menjalankannya di sandbox dan mencatat bukti hasil nyata.

## Prasyarat

Baca [modul terkait](/03-expert/business-analysis/06-uat/). Hasil E2, baseline konfigurasi CRONUS sandbox yang ditinjau, data demo, user uji per role dan izin praktik. Jika akses tidak tersedia, dokumen dapat disusun tetapi tahap eksekusi tetap Blocked/Belum dijalankan.

## Langkah

1. Pilih lima skenario yang mencakup alur end-to-end dan kasus negatif. Tautkan requirement/process ID, actor, input serta acceptance masing-masing.
2. Tulis script bernomor dengan expected result per langkah, termasuk bukti dokumen/ledger/approval yang akan diperiksa.
3. Jalankan sendiri di sandbox sesuai role yang ditetapkan. Isi actual result, waktu, executor, evidence dan Pass/Fail setelah kejadian; gunakan Blocked bila prasyarat tidak tersedia.
4. Catat defect dengan reproduksi, expected/actual, severity, owner dan evidence. Kebutuhan baru masuk daftar gap/change request.
5. Retest perbaikan dan nilai coverage/kebutuhan tersisa. Susun laporan serta permintaan sign-off ke owner; jika belum disetujui, biarkan status persetujuan terbuka.

## Kriteria lulus

- Lima script lengkap dan tertaut ke kebutuhan/proses.
- Actual result serta Pass/Fail disertai bukti eksekusi sandbox; yang terhalang tidak dianggap lulus.
- Defect, retest dan kebutuhan terbuka dapat ditelusuri.
- Laporan UAT tersedia; keputusan sign-off mencerminkan otoritas/status sebenarnya.

## Hint

<details><summary>Lihat hint</summary>

Jangan menyalin expected ke actual sebelum tes. Kelulusan tes situs ini tidak membuktikan E3 dijalankan; gunakan bukti transaksi/log sandbox kamu sendiri.

</details>

## Sumber resmi

- [Testing strategy](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy).
- [Test types dan UAT](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy-test-types).
- [Execution dan defect tracking](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy-run-tests).

Latihan belum dieksekusi penulis. Gunakan data demo; jangan menyimpan data pelanggan, identitas tenant atau kredensial dalam dokumen/bukti yang dibagikan.
