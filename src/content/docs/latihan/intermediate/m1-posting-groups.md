---
title: "M1 — Posting group debugging"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 1
---

**Estimasi waktu:** 35 menit. **Tujuan:** Menjelaskan hubungan error setup dengan pasangan posting group yang benar.

## Prasyarat

Baca [modul terkait](/02-intermediate/02-posting-groups/). Salinan CRONUS terisolasi, dua kode posting group latihan baru, akun demo dan draft transaksi tanpa posting; pembimbing meninjau setup awal.

## Langkah

1. Buat pasangan Gen. Business/Gen. Product khusus latihan dan arahkan hanya record demo kepadanya. Jangan menghapus kombinasi yang dipakai transaksi lain.
2. Simpan bukti setup awal, lalu hapus satu baris kombinasi latihan atau biarkan kombinasi latihan itu belum lengkap sesuai skenario pembimbing.
3. Preview transaksi demo dan rekam pesan error persis, customer/vendor, item dan kombinasi pada barisnya.
4. Lengkapi kembali kombinasi dengan akun demo yang disetujui. Ulangi Preview dan bandingkan hasil; tidak perlu Post untuk membuktikan diagnosis.
5. Tuliskan akar masalah dalam tiga kalimat: kombinasi yang dicari, bagian yang hilang, dan bukti perbaikannya.

## Kriteria lulus

- Error dapat direproduksi hanya pada record latihan.
- Pasangan posting group penyebab dapat ditunjukkan.
- Preview berhasil setelah setup yang tepat dipulihkan.
- Penjelasan tiga kalimat dan bukti sebelum/sesudah lengkap.

## Hint

<details><summary>Lihat hint</summary>

Baca nama field pada error. Jangan mengganti specific Customer/Vendor Posting Group bila yang hilang adalah kombinasi General Posting Setup.

</details>

## Sumber resmi

- [Posting groups](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-posting-groups).
- [VAT setup](https://learn.microsoft.com/en-us/dynamics365/business-central/finance-setup-vat).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
