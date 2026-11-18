---
title: "M4 — Approval dua user"
bc_version_verified: "29.x"
last_verified: "2026-11-18"
level: Intermediate
sidebar:
  order: 4
---

**Estimasi waktu:** 60 menit. **Tujuan:** Membuktikan PO tidak dapat dilanjutkan saat approval diwajibkan dan masih pending.

## Prasyarat

Baca [modul terkait](/02-intermediate/04-approval-workflow/). Dua user uji berizin sebagai requester/approver pada CRONUS sandbox, template workflow dan batas demo 1.000 LCY. Tidak ada email ke penerima nyata.

## Langkah

1. Catat Approval User Setup, limit dan alur approver. Buat workflow purchase approval dari template lalu tinjau kondisi amount > 1.000 LCY.
2. Sebagai requester, buat PO demo di atas limit, kirim approval dan rekam status/approval entry.
3. Uji Release/Post saat pending dengan requester. Catat penolakan atau hambatan yang harus ditinjau, tanpa menaikkan permission.
4. Sebagai approver, approve request; kembali sebagai requester dan buktikan proses bisa dilanjutkan sesuai haknya.
5. Ulangi kasus reject/cancel serta dokumen di bawah threshold. Catat hasil setiap kasus dan matikan workflow latihan setelah selesai.

## Kriteria lulus

- Requester dan approver benar-benar user berbeda.
- Pending approval membatasi proses sebagaimana aturan.
- Approval dan rejection tercatat serta dapat ditelusuri.
- Kasus threshold dan notifikasi demo diperiksa.

## Hint

<details><summary>Lihat hint</summary>

Kondisi workflow dan limit user adalah dua konfigurasi yang harus konsisten. Email terkirim saja belum membuktikan kontrol approval.

</details>

## Sumber resmi

- [Purchase approval walkthrough](https://learn.microsoft.com/en-us/dynamics365/business-central/walkthrough-setting-up-and-using-a-purchase-approval-workflow).
- [Approval users](https://learn.microsoft.com/en-us/dynamics365/business-central/across-how-to-set-up-approval-users).
- [Workflow notifications](https://learn.microsoft.com/en-us/dynamics365/business-central/across-how-to-specify-when-and-how-to-receive-notifications).

Latihan belum dieksekusi penulis. Kriteria di atas adalah target praktik kamu, bukan hasil lulus yang diklaim situs. Jangan memakai company produksi atau data pihak nyata.
