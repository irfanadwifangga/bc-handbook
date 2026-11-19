---
title: Glosarium
description: Daftar istilah Indonesia dan English untuk Business Central.
bc_version_verified: "29.x"
last_verified: "2026-11-19"
---

Daftar padanan istilah resmi Business Central dalam Bahasa Indonesia dan Bahasa Inggris untuk mempermudah komunikasi antara tim bisnis, Business Analyst, dan pengembang teknis.

## Finance & Akuntansi

| Istilah Indonesia | Istilah English | Definisi & Konteks |
|---|---|---|
| **Bagan Akun** | Chart of Accounts (COA) | Struktur daftar seluruh akun G/L untuk mencatat transaksi keuangan. |
| **Buku Besar** | General Ledger (G/L) | Buku pencatatan transaksi final setelah dokumen/jurnal diposting. |
| **Buku Besar Pembantu Piutang** | Customer Ledger Entries | Jejak detail transaksi penagihan dan pelunasan tiap pelanggan. |
| **Buku Besar Pembantu Utang** | Vendor Ledger Entries | Jejak detail tagihan invoice dan pembayaran ke pemasok. |
| **Buku Besar Persediaan** | Item Ledger Entries (ILE) | Riwayat kuantitas mutasi keluar-masuk stok fisik barang. |
| **Buku Besar Nilai** | Value Entry | Riwayat nilai moneter (HPP/COGS) yang menempel pada mutasi persediaan. |
| **Jurnal Umum** | General Journal | Lembar kerja untuk input transaksi akuntansi sebelum masuk ke buku besar. |
| **Jurnal Pembayaran** | Payment Journal | Jurnal pengeluaran kas/bank untuk pembayaran faktur vendor. |
| **Jurnal Rekonsiliasi Pembayaran** | Payment Reconciliation Journal | Jurnal pencocokan mutasi bank dengan buku besar secara semi-otomatis. |
| **Kelompok Posting** | Posting Groups | Matriks pemetaan transaksi operasional ke akun G/L dan pajak tertentu. |
| **Kelompok Posting Umum** | General Posting Setup | Kombinasi Gen. Bus. PG × Gen. Prod. PG penentu akun Penjualan & Pembelian. |
| **Kelompok Posting PPN** | VAT Posting Setup | Matriks kombinasi VAT Bus. × VAT Prod. penentu akun dan tarif PPN. |
| **Dimensi** | Dimensions | Parameter analitik tambahan (Departemen, Proyek) tanpa menambah akun G/L. |
| **Rekonsiliasi Bank** | Bank Account Reconciliation | Proses pencocokan saldo rekening koran bank dengan catatan internal BC. |
| **Aset Tetap** | Fixed Assets (FA) | Pencatatan aset berwujud perusahaan beserta perhitungan depresiasinya. |
| **Buku Depresiasi** | Depreciation Book | Pengaturan metode penyusutan (Straight-line, declining, dsb.) untuk aset. |
| **Periode Akuntansi** | Accounting Periods | Pembagian siklus kalender buku tahunan dan bulanan di G/L. |
| **Penyesuaian Kurs** | Adjust Exchange Rates | Proses revaluasi piutang/utang mata uang asing akibat fluktuasi kurs. |

## Penjualan & Pembelian

| Istilah Indonesia | Istilah English | Definisi & Konteks |
|---|---|---|
| **Penawaran Penjualan** | Sales Quote | Dokumen penawaran harga dan spesifikasi barang ke calon pelanggan. |
| **Pesanan Penjualan** | Sales Order | Kesepakatan transaksi penjualan sebelum pengiriman fisik dan penagihan. |
| **Pengiriman Penjualan** | Sales Shipment | Dokumen bukti fisik bahwa barang telah keluar dari gudang ke pelanggan. |
| **Faktur Penjualan** | Sales Invoice | Tagihan resmi yang memposting piutang pelanggan dan pendapatan G/L. |
| **Pesanan Pembelian** | Purchase Order | Order pengadaan barang/jasa resmi yang dikirimkan kepada vendor. |
| **Penerimaan Pembelian** | Purchase Receipt | Dokumen pencatatan fisik barang masuk dari vendor di gudang penerimaan. |
| **Faktur Pembelian** | Purchase Invoice | Tagihan resmi dari vendor yang memposting utang dan biaya/persediaan. |
| **Nota Kredit** | Credit Memo | Dokumen koreksi pembalik saldo tagihan faktur atas retur atau diskon. |
| **Pesanan Retur** | Return Order | Alur penerimaan kembali barang cacat/rusak dari pelanggan atau ke vendor. |
| **Aplikasi Pembayaran** | Apply Entries | Pengikatan pembayaran kas/bank terhadap satu atau beberapa nomor faktur. |
| **Batal / Koreksi Faktur** | Cancel / Correct Invoice | Fitur otomasi pembentukan Credit Memo untuk mengoreksi faktur salah. |

## Persediaan & Operasional

| Istilah Indonesia | Istilah English | Definisi & Konteks |
|---|---|---|
| **Kartu Barang** | Item Card | Data master barang memuat tipe (Inventory, Service, Non-Inventory) dan harga. |
| **Jurnal Barang** | Item Journal | Lembar kerja penyesuaian stok positif (masuk) atau negatif (keluar). |
| **Metode Penilaian Persediaan** | Costing Method | Kebijakan akuntansi nilai barang: FIFO, LIFO, Specific, Average, Standard. |
| **Lokasi Gudang** | Location | Entitas fisik penyimpanan persediaan (misal Gudang Pusat, Cabang). |
| **Bin Gudang** | Bin | Koordinat rak atau kotak terkecil di dalam satu lokasi gudang. |
| **Satuan Ukuran** | Unit of Measure (UoM) | Satuan kuantitas barang (Pcs, Box, Pallet) beserta faktor konversinya. |
| **Nomor Seri Dokumen** | No. Series | Generator penomoran otomatis berurut untuk dokumen dan master data. |
| **Alur Persetujuan** | Approval Workflow | Mekanisme pembatasan posting dokumen sebelum disetujui atasan. |
| **Antrean Tugas** | Job Queue | Penjadwal eksekusi tugas background (posting otomatis, sync, export). |
| **Pusat Peran** | Role Center | Tampilan beranda pengguna disesuaikan dengan wewenang pekerjaan. |
| **Inspeksi Halaman** | Page Inspection | Fitur audit (`Ctrl+Alt+F1`) penampil nomor tabel, field, dan ekstensi aktif. |
| **Katakan pada Saya** | Tell Me | Fitur pencarian cepat (`Alt+Q`) halaman, laporan, dan tindakan di sistem. |

## Konfigurasi & Migrasi Data

| Istilah Indonesia | Istilah English | Definisi & Konteks |
|---|---|---|
| **Lembar Kerja Konfigurasi** | Configuration Worksheet | Halaman perencanaan daftar tabel setup yang akan dikonfigurasi/dimigrasi. |
| **Paket Konfigurasi** | Configuration Package | Wadah tabel dan field untuk ekspor-impor data via Excel atau `.rapidstart`. |
| **Templat Konfigurasi** | Configuration Template | Nilai default otomatis untuk field master data baru saat proses impor. |
| **Kuesioner Konfigurasi** | Configuration Questionnaire | Daftar pertanyaan kebutuhan bisnis untuk mengotomasi pengisian setup. |
| **Edit di Excel** | Edit in Excel | Fitur integrasi dua arah untuk mengubah master data lewat add-in Excel. |
| **Log Perubahan** | Change Log | Fasilitas perekaman jejak audit perubahan nilai field penting oleh user. |

## Integrasi & Pengembang AL

| Istilah Indonesia | Istilah English | Definisi & Konteks |
|---|---|---|
| **Aplikasi Per-Tenant** | Per-Tenant Extension (PTE) | Kustomisasi AL khusus untuk satu tenant perusahaan tertentu. |
| **Ekstensi Pasar** | AppSource App | Modul ekstensi komersial terverifikasi yang didistribusikan global. |
| **Halaman Ekstensi** | Page Extension | Objek AL untuk menambah field atau aksi baru pada halaman standar BC. |
| **Tabel Ekstensi** | Table Extension | Objek AL untuk menyisipkan kolom data kustom pada tabel standar BC. |
| **Pelanggan Peristiwa** | Event Subscriber | Prosedur AL yang mendengarkan event terbitan sistem tanpa mengubah base app. |
| **Pencegah Eksekusi Standar** | IsHandled Pattern | Variabel boolean pemutus logika base app agar digantikan logika ekstensi. |
| **Informasi Galat Aksi** | ErrorInfo | Tipe data pesan galat modern AL yang menyertakan tombol navigasi perbaikan. |
| **Penyimpanan Terisolasi** | Isolated Storage | Brankas penyimpanan konfigurasi rahasia per-ekstensi yang terenkripsi. |
| **Teks Rahasia** | SecretText | Tipe data AL untuk menampung token/kunci rahasia tanpa bocor di telemetri. |
| **Koneksi Antar-Layanan** | Service-to-Service (S2S) | Autentikasi OAuth 2.0 tanpa interaksi pengguna via Entra Application. |
| **Tag Versi Usang** | Obsolete State & Tag | Properti penanda kode/field yang akan dihapus pada rilis wave mendatang. |
