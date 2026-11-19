---
title: "Capstone AL — Vendor Invoice Staging"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Expert
sidebar:
  order: 10
---

**Estimasi waktu:** 4–8 jam bertahap. **Tujuan:** Membangun ekstensi Per-Tenant Extension (PTE) komprehensif yang menyediakan API staging invoice vendor, validasi integritas data, pembuatan draft Purchase Invoice secara idempoten, rangkaian pengujian otomatis, serta codeunit upgrade.

## Prasyarat

Menyelesaikan AL1–AL9, memiliki sandbox Business Central terisolasi dengan data demo CRONUS, penguasaan custom API page, serta unit testing di AL. Gunakan prefix demo `MYP` dan rentang ID demo `50200–50220`. Jangan menyertakan objek, nama tabel, atau logika bisnis kantor nyata.

## Langkah

1. **Rancang Tabel Staging:** Buat tabel `50200 "MYP Vendor Invoice Staging"` dengan field kunci SystemId, External Document No., Vendor No., Posting Date, Currency Code, Amount, Status (Pending/Processed/Failed), Error Message, dan Created Purchase Invoice No.
2. **Kembangkan Custom API Page:** Buat halaman API `50201 "MYP Vendor Invoice Staging API"` (`PageType = API; APIPublisher = 'myp'; APIGroup = 'staging'; APIVersion = 'v1.0'; EntityName = 'vendorInvoiceStaging'; EntitySetName = 'vendorInvoicesStaging'; ODataKeyFields = SystemId;`) untuk mendukung operasi Create dan Read data staging.
3. **Logika Validasi & Pemrosesan:** Bangun codeunit pemrosesan `50202 "MYP Process Invoice Staging"`:
   - Validasi keberadaan Vendor aktif di master BC.
   - Validasi kelengkapan tanggal dan nilai transaksi.
   - Kembalikan kesalahan menggunakan tipe `ErrorInfo` terstruktur jika validasi gagal, lalu ubah status staging menjadi Failed.
4. **Pembuatan Purchase Invoice Idempoten:** Jika validasi berhasil, buat dokumen draft Purchase Header dan Line. Pastikan proses bersifat idempoten: jika baris staging sudah berstatus Processed atau Purchase Invoice sudah pernah terbentuk untuk External Document No. tersebut, cegah pembuatan dokumen ganda.
5. **Permission Set Minimal:** Definisikan `permissionset 50200 "MYP Staging User"` yang hanya memberikan hak akses Read/Write pada tabel staging dan hak eksekusi codeunit pemrosesan tanpa memberikan izin SUPER.
6. **Rangkaian Test Otomatis (≥ 6 Test):** Buat test codeunit `50203 "MYP Staging Capstone Test"` (`Subtype = Test`):
   - Test 1: Pembuatan dan pembacaan record staging via API page.
   - Test 2: Validasi gagal saat Vendor No. tidak terdaftar di sistem (ErrorInfo verifikasi).
   - Test 3: Validasi gagal saat Amount nol atau negatif.
   - Test 4: Pembuatan dokumen draft Purchase Invoice sukses dari data staging yang valid.
   - Test 5: Uji idempotensi (pemanggilan ulang tidak membuat purchase invoice duplikat).
   - Test 6: Verifikasi rollback data saat terjadi galat tak terduga.
7. **Siklus Upgrade:** Buat codeunit `Subtype = Upgrade` dengan pemanfaatan `Upgrade Tag` untuk memfasilitasi migrasi data jika ada penambahan struktur field staging di masa depan.
8. *(Opsional)* Konfigurasikan workflow CI pada repositori GitHub untuk memvalidasi kompilasi dan kelulusan seluruh test secara otomatis.

## Kriteria lulus

- Custom API Page mendukung pembuatan dan pembacaan record staging menggunakan SystemId.
- Validasi bisnis menolak input tidak valid dengan `ErrorInfo` deskriptif tanpa mengotori tabel transaksi.
- Logika pembuatan Purchase Invoice terbukti idempoten (tidak memicu duplikasi saat eksekusi berulang).
- Permission set terdefinisi secara minimal dan aman.
- Minimal 6 unit test lulus penuh (hijau) di AL Test Tool.
- Tersedia Upgrade Codeunit dengan verifikasi Upgrade Tag.
- Seluruh kode bebas dari data rahasia (secret, tenant ID, kredensial) dan tidak menggunakan kode kantor.

## Hint

<details><summary>Lihat hint</summary>

Untuk menguji API page di test codeunit, gunakan `TestPage` atau buat record staging langsung melalui metode buffer. Pastikan memeriksa field `External Document No.` pada tabel `Purchase Header` sebelum memanggil `Insert(true)` untuk menjamin idempotensi.

</details>

## Sumber resmi

- [Developing Custom APIs in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-api-pagetype).
- [ErrorInfo Data Type](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/errorinfo/errorinfo-data-type).
- [Testing in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-testing-application).
- [Upgrade Tag Codeunit](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-upgrade-tag-codeunit).

**Status:** Belum dijalankan di BC. Isi actual result, executor, waktu dan bukti lokal setelah praktik. Tes situs tidak membuktikan kelulusan capstone.
