---
title: "M8 — Permission auditor"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 8
---

**Estimasi waktu:** 50 menit. **Tujuan:** Membuktikan izin baca dan penolakan perubahan pada user auditor demo.

## Prasyarat

Baca [modul terkait](/02-intermediate/09-permissions/). Dua sesi user: administrator konfigurasi dan auditor uji berlisensi sesuai; CRONUS sandbox serta matriks objek/halaman yang boleh dibaca.

## Langkah

1. Buat permission set user-defined untuk kebutuhan baca demo; sertakan Execute hanya pada objek yang memang diperlukan dan tanpa hak posting/tulis bisnis.
2. Assign ke auditor dalam company scope latihan. Tinjau assignment langsung, security groups, included sets serta entitlement license.
3. Periksa effective permissions; hilangkan akses tulis yang tidak diperlukan pada akun uji dengan arahan administrator, bukan mengubah user nyata.
4. Masuk sebagai auditor dan buka ledger/report yang disetujui; lalu uji edit master data dan posting transaksi demo yang sudah disiapkan.
5. Catat akses baca berhasil serta write/post ditolak, termasuk pesan asli. Jika masih bisa menulis, telusuri seluruh assignment sebelum menilai permission set baru aman.

## Kriteria lulus

- Auditor dapat membaca cakupan yang disetujui.
- Perubahan master dan posting ditolak.
- Effective permissions/company scope didokumentasikan.
- Tidak ada SUPER atau assignment luas yang menyamarkan hasil.

## Hint

<details><summary>Lihat hint</summary>

Profile read-only atau tombol tersembunyi bukan bukti keamanan. Uji dengan user auditor sendiri dan cek hasil efektif gabungan assignment.

</details>

## Sumber resmi

- [Permissions](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-define-granular-permissions).
- [User Groups (legacy)](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-legacy-user-groups).
- [Microsoft 365 access FAQ](https://learn.microsoft.com/en-us/dynamics365/business-central/admin-access-with-m365-license-faq).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
