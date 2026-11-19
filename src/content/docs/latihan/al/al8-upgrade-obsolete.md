---
title: "AL8 — Upgrade dan deprecation"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 8
---

**Estimasi waktu:** 75 menit. **Tujuan:** Mengelola siklus deprecation skema dari versi 1.0 ke 1.1, memigrasikan data melalui Upgrade Codeunit, dan mencatat Upgrade Tag idempoten.

## Prasyarat

Menyelesaikan latihan AL1, memahami konsep skema database, dan mempelajari modul [AL-3.3 Siklus hidup dan pola upgrade](/04-al-developer/al-3-advanced/03-siklus-hidup-upgrade/).

## Langkah

1. Siapkan ekstensi versi 1.0.0.0 dengan field teks sederhana pada tabel Customer (misal `MYP Legacy Note`, Text[50]), pasang di sandbox, dan isi beberapa data contoh.
2. Buat branch versi 1.1.0.0: naikkan versi pada manifest `app.json`.
3. Tandai field `MYP Legacy Note` dengan `ObsoleteState = Pending; ObsoleteReason = 'Gunakan MYP New Note'; ObsoleteTag = '29.0';`.
4. Tambahkan field pengganti baru `MYP New Note` (Text[100]) pada tabel/page extension terkait.
5. Buat codeunit baru bertipe `Subtype = Upgrade` dengan trigger `OnUpgradePerCompany`.
6. Implementasikan pemeriksaan `UpgradeTag.HasUpgradeTag()` dan pindahkan data dari field lama ke field baru menggunakan operasi batch.
7. Simpan penyelesaian tag migrasi dengan `UpgradeTag.SetUpgradeTag()`.
8. Pasang dan sinkronisasikan versi 1.1.0.0 ke sandbox; periksa bahwa nilai pada field baru telah terisi dan tag upgrade tercatat di sistem.

## Kriteria lulus

- Ekstensi versi 1.1.0.0 terpasang tanpa error kompilasi atau breaking change warning.
- Field lama berstatus `ObsoleteState = Pending` dengan alasan dan tag terdefinisi.
- Seluruh data yang ada pada record Customer lama berhasil berpindah ke field baru.
- Upgrade Tag tercatat di tabel log sistem dan tidak dieksekusi ulang saat sinkronisasi berikutnya.

## Hint

<details><summary>Lihat hint</summary>

Jangan pernah menghapus field lama secara langsung. Tetap pertahankan field lama dengan status Pending agar dependensi lain memiliki waktu untuk beradaptasi. Gunakan konstanta tag yang jelas dan unik.

</details>

## Sumber resmi

- [Upgrading Extension Code](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-upgrading-extensions).
- [Upgrade Tag Codeunit](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-upgrade-tag-codeunit).
- [Deprecating Tables and Fields](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-deprecating-objects).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
